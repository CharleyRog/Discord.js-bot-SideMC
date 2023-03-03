// IMPORT MODULES

const client = require('../../client')
const embedBuilderFoo = require('../../functions/embedBuilderFoo')
const config = require('../../config/config.json')

// uncaughtException EVENT CODE

module.exports = async (err) => {
	console.error('Uncaught Exception: ' + err)

	const embed = embedBuilderFoo({
		title: 'Uncaught Exception',
		description: `${err}`,
		color: '#F00000'
	})

	client.channels.cache.get(config.errorsChannelID).send({ embeds: [embed] })
}
