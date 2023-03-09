// IMPORT MODULES

import initializeMongoose from './database/mongoose.js'

import { TOKEN } from './utils/devModeChecker.js'
import eventsInit from './events/eventsInit.js'
import config from './config/config.json' assert { type: 'json' }
import client from './client.js'
import any = jasmine.any

// CODE

// ;(async () => {
//   await eventsInit()
//   // const database = await initializeMongoose()
//   await client.login(TOKEN)
// })()

console.log(config.DEV_MODE)

client.login(TOKEN)
