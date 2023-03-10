// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import config from '../../config/config.json'
import client from '../../client.js'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import isTextChannel from '../../utils/isTextChannel.js'

// uncaughtException EVENT CODE

export default async (err: any): Promise<void> => {
  console.error('Uncaught Exception: ' + err)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Uncaught Exception',
    description: `${err}`,
    color: '#F00000',
  })

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
