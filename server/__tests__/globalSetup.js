import { connectionString, disconnectDb } from "../models/db"
import { FavoritePlaces } from "../models/favoritePlaces"
import { User } from "../models/user"

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
