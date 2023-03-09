// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'

const client = require('../../client.ts')
const embedBuilderFoo = require('../../utils/embedBuilderFoo.ts')
const config = require('../../config/config.json')

// unhandledRejection EVENT CODE

export default async (reason: any, promise: any): Promise<void> => {
  console.error('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Unhandled Promise Rejection',
    color: '#F00000',
  })

  embed.addFields([
    { name: 'Promise', value: `${promise}` },
    { name: 'Reason', value: `${reason.message}` },
  ])

  client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID).send({ embeds: [embed] })
}
