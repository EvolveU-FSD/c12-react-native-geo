import express from 'express'

const app = express()

configureServer(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('App server listening on port ' + PORT)
})