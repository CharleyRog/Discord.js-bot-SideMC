// IMPORT MODULES

import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (error: any): Promise<void> => {
  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Отловлена ошибка',
    color: '#FF0000',
  })

  if (error.message) {
    embed.addFields([{ name: 'Message:', value: error.message, inline: true }])
  }

  if (error.method) {
    embed.addFields([{ name: 'Method:', value: error.method, inline: true }])
  }

  if (error.path) {
    embed.addFields([{ name: 'Path:', value: error.path, inline: true }])
  }

  if (error.code) {
    embed.addFields([{ name: 'Code:', value: error.code, inline: true }])
  }

  if (error.httpStatus) {
    embed.addFields([{ name: 'HttpStatus:', value: error.httpStatus, inline: true }])
  }

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
