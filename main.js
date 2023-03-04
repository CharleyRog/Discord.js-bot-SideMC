// IMPORT MODULES

const config = require('./config/config')
const client = require('./client')
const eventsInit = require('./events/eventsInit')
const { TOKEN } = require('./utils/devModeChecker')

eventsInit()

client.login(TOKEN)
