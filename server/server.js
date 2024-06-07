import express from 'express'
import favoritesController from './controllers/favorites.js'

const app = express()

app.use(express.json())
app.use('/api/favorites', favoritesController)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('App server listening on port ' + PORT)
})