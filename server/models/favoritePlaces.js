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
    whose: String
})

FavoritePlacesSchema.index({ location: '2dsphere' });

export const FavoritePlaces = mongoose.model("favoritePlaces", FavoritePlacesSchema)

export async function getAllFavoritePlaces(){
    return await FavoritePlaces.find()
}

export async function createFavoritePlace(name, latitude, longitude, whose) {
    return FavoritePlaces.create({
        name, 
        location: {
            type: "Point",
            coordinates: [ longitude, latitude ]
        },
        whose
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
