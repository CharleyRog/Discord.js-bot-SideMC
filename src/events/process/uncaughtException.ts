// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'

const client = require('../../client.ts')
const embedBuilderFoo = require('../../utils/embedBuilderFoo.ts')
const config = require('../../config/config.json')

// uncaughtException EVENT CODE

export default async (err: any): Promise<void> => {
  console.error('Uncaught Exception: ' + err)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Uncaught Exception',
    description: `${err}`,
    color: '#F00000',
  })

  client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID).send({ embeds: [embed] })
}
