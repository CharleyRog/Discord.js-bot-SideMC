// IMPORT MODULES

const client = require('../../client')
const embedBuilderFoo = require('../../functions/embedBuilderFoo')
const config = require('../../config/config.json')

// unhandledRejection EVENT CODE

module.exports = async (reason, promise) => {
	console.error(
		'[FATAL] Possibly Unhandled Rejection at: Promise ',
		promise,
		' reason: ',
		reason.message
	)

	const embed = embedBuilderFoo({
		title: 'Unhandled Promise Rejection',
		color: '#F00000'
	})

	embed.addFields([
		{ name: 'Promise', value: `${promise}` },
		{ name: 'Reason', value: `${reason.message}` }
	])

	client.channels.cache.get(config.errorsChannelID).send({ embeds: [embed] })
}
