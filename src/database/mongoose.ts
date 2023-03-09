import config from '../config/config.json'
import mongoose from 'mongoose'

export default async function initializeMongoose() {
  console.log(`Connecting to MongoDb...`)

  try {
    const DATABASE = config.DATABASE
    const databaseUrl = `mongodb+srv://${DATABASE.USERNAME}:${DATABASE.PASSWORD}@${DATABASE.CLUSTER}.${DATABASE.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`

    await mongoose.connect(databaseUrl, {
      keepAlive: true,
    })

    console.log('Mongoose: Database connection established')

    return mongoose.connection
  } catch (err) {
    console.error('Mongoose: Failed to connect to database', err)
    process.exit(1)
  }
}
