import express from 'express'
import favoritesController from './controllers/favorites.js'
import userController from './controllers/users.js'

export function configureServer(app) {
    app.use(express.json())
    app.use('/api/favorites', favoritesController)
    app.use('/api/user', userController)
}