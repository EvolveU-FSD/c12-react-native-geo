import express from 'express'
import favoritesController from './controllers/favorites.js'
import userController from './controllers/users.js'

const app = express()

app.use(express.json())
app.use('/api/favorites', favoritesController)
app.use('/api/user', userController)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('App server listening on port ' + PORT)
})