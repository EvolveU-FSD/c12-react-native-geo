import './databaseHelper.js'
import { checkPasswordAndReturnUserOrDie, createUser, getUserById, setPassword } from "../models/user"

describe('user model', () => {
    
    it('should not find a user with invalid id', async () => {
        // setup

        // execute
        const user = await getUserById("000aaa0000000aaaaaa00000")

        // verify 
        expect(user).toBeNull()
    })

    it('should find a user by id', async () => {
        // setup
        const expectedUserName = 'Tony'
        const { _id: userId } = await createUser({ userName: expectedUserName })

        // execute
        const user = await getUserById(userId)

        // verify 
        expect(user).toBeDefined()
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
    it('checkPassword should match with correct password for user', async() => {
        // setup
        const expectedUserName = 'Tony'
        const expectedPassword = '123456'
        const { _id: userId } = await createUser({ userName: expectedUserName })
        await setPassword(userId, expectedPassword)

        // execute
        const user = await checkPasswordAndReturnUserOrDie(expectedUserName, expectedPassword)

        // assert
        expect(user).toBeDefined()
        expect(user.userName).toEqual(expectedUserName)
        expect(user.passwordHash).not.toBeDefined()
    })

    it('checkPassword should fail when password does not match', async() => {
        // setup
        const expectedUserName = 'Tony'
        const expectedPassword = '123456'
        const { _id: userId } = await createUser({ userName: expectedUserName })
        await setPassword(userId, expectedPassword)

        // execute
        try {
            await checkPasswordAndReturnUserOrDie(expectedUserName, 'dark helmet')
            throw new Error('password mismatch did not fail!')
        }
        catch (err) {
            // assert
            expect(err.message).toEqual('Password match failed')
        }     
    })

    it('checkPassword should fail when no password is given', async() => {
        // setup
        const expectedUserName = 'Tony'
        const expectedPassword = '123456'
        const { _id: userId } = await createUser({ userName: expectedUserName })
        await setPassword(userId, expectedPassword)

        // execute
        try {
            await checkPasswordAndReturnUserOrDie(expectedUserName, null)
            throw new Error('no password supplied should fail')
        }
        catch (err) {
            // assert
            expect(err.message).toEqual('No password supplied')
        }     
    })

    it('checkPassword should fail when there is no user that matches username', async() => {
        // setup
        const expectedUserName = 'Tony'
        const expectedPassword = '123456'
        const { _id: userId } = await createUser({ userName: expectedUserName })
        await setPassword(userId, expectedPassword)

        // execute
        try {
            await checkPasswordAndReturnUserOrDie('Dark Helmet', '123456')
            throw new Error('No matching user should fail')
        }
        catch (err) {
            // assert
            expect(err.message).toEqual('User not found \"Dark Helmet\"')
        }     
    })

    it('checkPassword should fail when the user has no password', async() => {
        // setup
        const expectedUserName = 'Tony'
        const expectedPassword = '123456'
        const { _id: userId } = await createUser({ userName: expectedUserName })
        // await setPassword(userId, expectedPassword)

        // execute
        try {
            await checkPasswordAndReturnUserOrDie(expectedUserName, expectedPassword)
            throw new Error('User without password should fail')
        }
        catch (err) {
            // assert
            expect(err.message).toEqual('User does not have a password set')
        }     
    })

    it.skip('checkPassword should should lock out a user after a certain number of failed attempts', async() => {
        throw new Error('unimplemented')
    })

    it.skip('checkPassword should should release the lockout after some time', async() => {
        throw new Error('unimplemented')
    })

})