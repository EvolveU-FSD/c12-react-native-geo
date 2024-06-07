import { disconnectDb } from "../models/db.js";
import { createFavoritePlace } from "../models/favoritePlaces.js";

await createFavoritePlace("Peace Bridge", 51.05428445623271, -114.07939299847652, "Tony")
await createFavoritePlace("Ship & Anchor",51.03806264962165, -114.07372928762007, "Ryan")
await createFavoritePlace("Canyon Meadows Cinema", 50.93306471395915, -114.0655622914823, "Marlo")
await createFavoritePlace("Southland Leisure Center", 50.96318899658497, -114.10377148650504, "Maalkum")
await createFavoritePlace("Prince's Island Park", 51.05570230156857, -114.07029222964621, "Anix")
await createFavoritePlace("Inglewood Bird Sanctuary", 51.03145196345433, -114.01771038608463, "Mohamed")
await createFavoritePlace("Shooting Edge", 50.98638128372672, -114.05388261772778, "Shana")
await createFavoritePlace("Crescent Heights Lookout Point", 51.05923519425607, -114.06666505576231, "Izabella")
await createFavoritePlace("Joe's Field of Peace and Harmony", 51.154045655100646, -114.09307279139416, "Joe")

disconnectDb()