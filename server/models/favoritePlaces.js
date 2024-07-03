import mongoose, { Schema } from "./db.js"

const FavoritePlacesSchema = new Schema({
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number]
        }
    },
    whose: String,
    isPublic: Boolean
})

FavoritePlacesSchema.index({ location: '2dsphere' });

export const FavoritePlaces = mongoose.model("favoritePlaces", FavoritePlacesSchema)

export async function getAllFavoritePlaces(userName){
    const privatePlaces = await FavoritePlaces.find({isPublic: false, whose: userName})
    const publicPlaces = await FavoritePlaces.find({isPublic: true})
    return privatePlaces.concat(publicPlaces)
}

export async function createFavoritePlace(name, latitude, longitude, whose, isPublic=true) {
    return FavoritePlaces.create({
        name, 
        location: {
            type: "Point",
            coordinates: [ longitude, latitude ]
        },
        whose,
        isPublic
    })
}

export async function findFavoritesNear(latitude, longitude, rangeM) {
    return FavoritePlaces.find({
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [ longitude, latitude]},
                $minDistance: 0,
                $maxDistance: rangeM
            }
        }
    })
}
