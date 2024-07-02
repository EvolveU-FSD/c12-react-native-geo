import { connectionString, disconnectDb } from "../models/db.js"
import { FavoritePlaces } from "../models/favoritePlaces.js"
import { User } from "../models/user.js"

beforeEach(async () => {
    if (!connectionString.endsWith('Test')) {
        throw new Error('Error: You can only run tests against a test database!')
    }
    await FavoritePlaces.deleteMany()
    await User.deleteMany()
})

afterAll(() => {
    disconnectDb()
})
