import { disconnectDb } from "../models/db.js"
import { createFavoritePlace } from "../models/favoritePlaces.js"

if (process.argv.length < 6) {
    console.log('Usage: createFavoritePlace <name> <latitude> <longitude> <person>')
    process.exit(0)
}

const name = process.argv[2]
const latitude = Number(process.argv[3])
const longitude = Number(process.argv[4])
const person = process.argv[5]

await createFavoritePlace(name, latitude, longitude, person)
console.log(`Created ${name} at [${longitude}, ${latitude}]`)

await disconnectDb();