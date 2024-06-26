import { setApiCredentials, login } from "@/api"
import { createContext, useContext, useState } from "react"


const LoginContext = createContext({ 
    loggedInUser: undefined,
    login: (username, password) => {},
    logout: () => {}
})


export function LoginProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState()

    async function tryLogin(username, password) {
        const user = await login(username, password)
        console.log("User credentials worked for", user)
        setLoggedInUser(user)
        setApiCredentials(username, password)
    }

    async function doLogout() {
        setLoggedInUser(undefined)
        setApiCredentials('','')
    }

    return (
        <LoginContext.Provider value={ { loggedInUser, tryLogin, logout: doLogout} }>
            { children }
        </LoginContext.Provider>
    )
}

export function IfLoggedIn({ children }) {
    const context = useContext(LoginContext)
    return (context.loggedInUser !== undefined) && children 
}

export function IfNotLoggedIn({ children }) {
    const context = useContext(LoginContext)
    return (context.loggedInUser === undefined) && children 
}

export default LoginContext