// IMPORT MODULES

const config = require('../config/config.json')

// CODE

module.exports = {
  TOKEN: config.DEV_MODE ? config.DEV_TOKEN : config.TOKEN,
  CLIENT_ID: config.DEV_MODE ? config.DEV_CLIENT_ID : config.CLIENT_ID,
  DEV_MODE: config.DEV_MODE,
}
