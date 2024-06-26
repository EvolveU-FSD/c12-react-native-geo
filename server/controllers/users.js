import { Router } from "express";
import { checkPasswordAndReturnUserOrDie } from "../models/user.js";

let router = new Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await checkPasswordAndReturnUserOrDie(username, password)
        res.send(user)    
    }
    catch (err) {
        console.log(err)
        res.sendStatus(401)
    }
})

export default router