// IMPORT MODULES

import { DEV_MODE } from '../utils/devModeChecker.js'
import client from '../client.js'
import path from 'path'
import fs from 'fs'

// CODE

const devModeEvents = ['ready']

const eventFileInit = (folder: any, file: any): void => {
  try {
    const event = require(path.join(__dirname, `./${folder.name}`, file))
    const eventName = file.split('.')[0]
    let pos: any = client
    console.log(`Инициализация ${folder.name} события: ${eventName}`)
    if (folder.name === 'process') pos = process
    pos.on(eventName, (...args: any) => event(...args))
  } catch (error) {
    console.error(error)
  }
}

const eventsInit = (): void => {
  fs.readdirSync('./events', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((folder) => {
      fs.readdirSync(`./events/${folder.name}`)
        .filter((file) => file.endsWith('.js'))
        .forEach((file) => {
          if (DEV_MODE) {
            devModeEvents.forEach((devEvent) => {
              if (devEvent === file.split('.')[0]) {
                eventFileInit(folder, file)
              }
            })
          } else {
            eventFileInit(folder, file)
          }
        })
    })
}

export default eventsInit
