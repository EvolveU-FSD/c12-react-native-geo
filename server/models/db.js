import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017/favorites'
await mongoose.connect(connectionString)


export default mongoose
export * from 'mongoose'
export async function disconnectDb() {
    await mongoose.disconnect()
}
