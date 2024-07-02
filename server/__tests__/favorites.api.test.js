import { executeGetOrDie } from './serverHelper.js'
import { createFavoritePlace } from '../models/favoritePlaces.js'

describe('favorites api', () => {
    
    it('should find no favorites in an empty database', async () => {
        // setup

        // execute
        const favorites = await executeGetOrDie('/api/favorites/all')

        // verify 
        expect(favorites.length).toEqual(0)
    })


    it('should find some favorites', async () => {
        // setup
        await createFavoritePlace('Place 1', 51, -114, 'tony', true)

        // execute
        const favorites = await executeGetOrDie('/api/favorites/all')

        // verify 
        expect(favorites.length).toEqual(1)
        const favorite = favorites[0]
        expect(favorite.name).toEqual('Place 1')
        expect(favorite.location.coordinates[0]).toEqual(-114)
        expect(favorite.location.coordinates[1]).toEqual(51)
        expect(favorite.whose).toEqual('tony')
        expect(favorite.isPublic).toEqual(true)
    })


})