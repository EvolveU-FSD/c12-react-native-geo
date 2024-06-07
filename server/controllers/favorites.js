import { Router } from "express";
import { getAllFavoritePlaces } from "../models/favoritePlaces.js";

let router = new Router()

router.get('/all', async (req, res) => {
    try {
        const favorites = await getAllFavoritePlaces()
        res.send(favorites)    
    }
    catch (err) {
        res.status(500).send(err)
    }
})

export default router