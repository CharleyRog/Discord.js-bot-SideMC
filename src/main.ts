// IMPORT MODULES

import { TOKEN } from './utils/devModeChecker.js'
import eventsInit from './events/eventsInit.js'
import client from './client.js'

// CODE

;(async () => {
  await eventsInit()
  // const database = await initializeMongoose()
  await client.login(TOKEN)
})()
