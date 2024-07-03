import './databaseHelper.js'
import { createFavoritePlace, getAllFavoritePlaces } from '../models/favoritePlaces.js'
import { createUser } from '../models/user.js'

async function createUserWithFavorite({
    userName = 'Tyler',
    latitude = 51,
    longitude = -114,
    name = "test favorite",
    isPublic = true,
}) {
    const user = await createUser({userName})
    const favorite = await createFavoritePlace(name, latitude, longitude, userName, isPublic)
    return { user, favorite }
}

describe('favorites model', () => {
    
    it('find all favorites should find nothing in empty database', async() => {
        // setup

        // execute
        const favorites = await getAllFavoritePlaces()

        // verify
        expect(favorites.length).toEqual(0)  
    })

    it('find all favorites should find one public place that is mine', async() => {
        // setup
        const fixture = await createUserWithFavorite({})
        const expectedFavorite = fixture.favorite

        // execute
        const favorites = await getAllFavoritePlaces(fixture.user.userName)

        // verify
        expect(favorites.length).toEqual(1)  
        const favorite = favorites[0]        
        expect(favorite.name).toEqual(expectedFavorite.name)
        expect(favorite.location.coordinates[1]).toEqual(expectedFavorite.location.coordinates[1])
        expect(favorite.location.coordinates[0]).toEqual(expectedFavorite.location.coordinates[0])
        expect(favorite.whose).toEqual(expectedFavorite.whose)
        expect(favorite.isPublic).toEqual(expectedFavorite.isPublic)
    })

    it('find all favorites should not find someone elses private place', async() => {
        // setup
        const myUserName = 'Tony'
        await createUser({userName: myUserName})
        await createUserWithFavorite({ isPublic: false})

        // execute
        const favorites = await getAllFavoritePlaces(myUserName)

        // verify
        expect(favorites.length).toEqual(0)  
    })

    it('find all favorites should find my private places', async() => {
        // setup
        const fixture = await createUserWithFavorite({ isPublic: false})
        const expectedFavorite = fixture.favorite

        // execute
        const favorites = await getAllFavoritePlaces(fixture.user.userName)

        // verify
        expect(favorites.length).toEqual(1)  
        const favorite = favorites[0]
        expect(favorite.name).toEqual(expectedFavorite.name)
        expect(favorite.location.coordinates[1]).toEqual(expectedFavorite.location.coordinates[1])
        expect(favorite.location.coordinates[0]).toEqual(expectedFavorite.location.coordinates[0])
        expect(favorite.whose).toEqual(expectedFavorite.whose)
        expect(favorite.isPublic).toEqual(expectedFavorite.isPublic)
    })

    it.skip('find all favorites should find multiple public places that are mine', async() => {
        throw new Error('unimplemented')
    })

    it.skip('find all favorites should find someone elses public place', async() => {
        throw new Error('unimplemented')
    })


    it.skip('find all favorites should find multiple of my private places', async() => {
        throw new Error('unimplemented')
    })

    it.skip('find all favorites should find both my public and private places', async() => {
        throw new Error('unimplemented')
    })

    it.skip('find all favorites should find all of my public places, my private places, and other peoples public places', async() => {
        throw new Error('unimplemented')
    })

})