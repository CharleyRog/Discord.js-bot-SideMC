// IMPORT MODULES

const fs = require('fs')
const path = require('path')
const client = require('../client')
const { DEV_MODE } = require('../utils/devModeChecker')

// CODE

const devModeEvents = ['interactionCreate', 'ready']

const eventFileInit = (folder, file) => {
  try {
    const event = require(path.join(__dirname, `./${folder.name}`, file))
    const eventName = file.split('.')[0]
    let pos = client
    console.log(`Инициализация ${folder.name} события: ${eventName}`)
    if (folder.name === 'process') pos = process
    pos.on(eventName, (...args) => event(...args))
  } catch (error) {
    console.error(error)
  }
}

const eventsInit = () => {
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

module.exports = eventsInit
