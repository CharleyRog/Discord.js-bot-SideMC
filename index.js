// IMPORT MODULES

const path = require('path')
const fs = require('fs')
const config = require('./config/config.json')
const client = require('./client')

// CODE

fs.readdirSync('./events')
	.filter((file) => file.endsWith('.js'))
	.forEach((file) => {
		try {
			const event = require(path.join(__dirname, 'events', file))
			const eventName = file.split('.')[0]
			console.log(`Инициализация события: ${eventName}`)
			client.on(eventName, (...args) => event(...args))
		} catch (error) {
			console.error(error)
		}
	})

client.login(config.token)
