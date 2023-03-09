// IMPORT MODULES

import config from '../config/config.json' assert { type: 'json' }

// CODE

export const TOKEN: string = config.DEV_MODE ? config.DEV_TOKEN : config.TOKEN
export const CLIENT_ID: string = config.DEV_MODE ? config.DEV_CLIENT_ID : config.CLIENT_ID
export const DEV_MODE: boolean = config.DEV_MODE
