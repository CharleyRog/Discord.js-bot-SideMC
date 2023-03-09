// IMPORT MODULES

import config from '../config/config.json' assert { type: 'json' }

// CODE

const devModeChecker = {
  TOKEN: config.DEV_MODE ? config.DEV_TOKEN : config.TOKEN,
  CLIENT_ID: config.DEV_MODE ? config.DEV_CLIENT_ID : config.CLIENT_ID,
  DEV_MODE: config.DEV_MODE,
}

export default devModeChecker
