import { checkPasswordAndReturnUserOrDie } from "../models/user.js"

export default async function authenticateWithBasic(req, res, next) {
    // check the authorization header
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        // console.log('Basic authentication not provided!')
        // console.log('Asking browser to try again with credentials.')
        // console.log()
        res.set('WWW-Authenticate', 'Basic realm="mymiddleware"' )
        return res.sendStatus(401)    
    }
    
    // if we got this far, authentication header was present
    // console.log('Middleware got authorization header: ', authHeader)

    const usernamePasswordBase64 = authHeader.split(' ')[1]
    // console.log('- encoded credentials', usernamePasswordBase64)

    const usernamePasswordDecoded = Buffer.from(usernamePasswordBase64, 'base64').toString('utf-8')
    // console.log('- decoded credentials', usernamePasswordDecoded)

    const [username, password] = usernamePasswordDecoded.split(':')
    // console.log('- checking', username, 'with password', password)
    
    try {
        const user = await checkPasswordAndReturnUserOrDie(username, password)
        // console.log('- password is good, stashing the user on req for future handlers to find')
        req.user = user
        next()
    }
    catch (error) {
        console.log('- checkPassword threw an exception because ', error.message)
        // console.log('- sending a 401 back, but without the invitation to try again')
        return res.status(401).send('Authentication failed')
    }
}