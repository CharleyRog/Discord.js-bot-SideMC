// IMPORT MODULES

import { DEV_MODE } from '../utils/devModeChecker.js'
import client from '../client.js'
import path from 'path'
import fs from 'fs'
import config from '../config/config.json' assert { type: 'json' }

// CODE

const devModeEvents = ['ready', 'roleCreate', 'roleDelete', 'roleUpdate']

const eventFileInit = async (eventName: any, folder: any, file: any, __dirname: string): Promise<void> => {
  const buildModeHandler = config.BUILD_MODE ? '' : '/src'
  const eventModule = await import(path.join(__dirname, `.${buildModeHandler}/events/${folder.name}`, file))
  const event = eventModule.default

  let pos: any = client
  console.log(`Инициализация ${folder.name} события: ${eventName}`)
  if (folder.name === 'process') {
    pos = process
  }
  pos.on(eventName, (...args: any) => event(...args))
}
const eventsInit = async (): Promise<void> => {
  const __dirname: string = path.resolve()
  const buildModeHandler = config.BUILD_MODE ? '' : '/src'
  fs.readdirSync(path.join(__dirname, `.${buildModeHandler}/events`), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((folder) => {
      fs.readdirSync(path.join(__dirname, `.${buildModeHandler}/events/${folder.name}`))
        .filter((file) => file.endsWith('.ts'))
        .forEach(async (file) => {
          const eventName: string = file.split('.')[0]
          if (DEV_MODE) {
            for (const devEvent of devModeEvents) {
              if (devEvent === eventName) {
                await eventFileInit(eventName, folder, file, __dirname)
              }
            }
          } else {
            await eventFileInit(eventName, folder, file, __dirname)
          }
        })
    })
}

export default eventsInit
