// IMPORT MODULES

const client = require('../../client')
const embedBuilderFoo = require('../../utils/embedBuilderFoo')
const config = require('../../config/config.json')

// uncaughtException EVENT CODE

module.exports = async (err) => {
  console.error('Uncaught Exception: ' + err)

  const embed = embedBuilderFoo({
    title: 'Uncaught Exception',
    description: `${err}`,
    color: '#F00000',
  })

  client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID).send({ embeds: [embed] })
}
