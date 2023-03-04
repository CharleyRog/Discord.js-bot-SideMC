// IMPORT MODULES

const config = require('./config/config')
const client = require('./client')
const eventsInit = require('./events/eventsInit')
const { TOKEN } = require('./utils/devModeChecker')
const { initializeMongoose } = require('./database/mongoose')

// CODE

;(async () => {
  await eventsInit()
  // const database = await initializeMongoose()
  await client.login(TOKEN)
})()
