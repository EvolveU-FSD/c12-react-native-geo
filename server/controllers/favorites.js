import { Router } from "express";
import { createFavoritePlace, getAllFavoritePlaces } from "../models/favoritePlaces.js";

let router = new Router()

router.get('/all', async (req, res) => {
    try {
        const favorites = await getAllFavoritePlaces()
        res.send(favorites)    
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/create', async (req, res) => {
    const { name, latitude, longitude, whose } = req.body
    try {
        const newFavorite = await createFavoritePlace(name, latitude, longitude,  whose)
        res.send(newFavorite)    
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

export default router