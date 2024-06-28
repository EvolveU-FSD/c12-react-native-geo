import './globalSetup.js'
import { createUser, getUserById } from "../models/user"

describe('user', () => {
    it('should find a user by id', async () => {
        // setup
        const expectedUserName = 'Tony'
        const { _id: userId } = await createUser({ userName: expectedUserName })

        // execute
        const user = await getUserById(userId)

        // verify 
        expect(user.userName).toEqual(expectedUserName)
    })

    it('should not give the password hash when looking up a user', async () => {
        // setup
        const expectedUserName = 'Tony'
        const { _id: userId } = await createUser({ userName: expectedUserName })

        // execute
        const user = await getUserById(userId)

        // verify 
        expect(user.userName).toEqual(expectedUserName)
        expect(user.passwordHash).not.toBeDefined()
    })

    // add password checkers here!
})