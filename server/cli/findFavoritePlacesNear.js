import { disconnectDb } from "../models/db.js"
import { createFavoritePlace, findFavoritesNear } from "../models/favoritePlaces.js"

if (process.argv.length < 5) {
    console.log('Usage: createFavoritePlace <latitude> <longitude> <range>')
    process.exit(0)
}

const latitude = Number(process.argv[2])
const longitude = Number(process.argv[3])
const rangeM = Number(process.argv[4])

const faves = await findFavoritesNear(latitude, longitude, rangeM)
console.log(faves)

await disconnectDb();