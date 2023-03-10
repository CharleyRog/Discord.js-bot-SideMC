// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }
import typesOfAuditLogs from '../static/typesOfAuditLogs.js'

// CODE

export default async (oldRole: any, newRole: any): Promise<void> => {
  const auditLog = await newRole.guild
    .fetchAuditLogs({ type: typesOfAuditLogs.ROLE_UPDATE })
    .then((audit: { entries: { first: () => any } }) => audit.entries.first())

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Роль обновлена',
    color: '#FFFF00',
  })

  if (oldRole.color !== newRole.color) {
    embed
      .setDescription('Цвет изменен')
      .addFields([
        { name: 'ID:', value: `${newRole.id}`, inline: true },
        { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
        { name: 'Название:', value: newRole.name, inline: true },
      ])
      .addFields([
        { name: 'Старый цвет:', value: `${oldRole.hexColor}`, inline: true },
        { name: 'Новый цвет:', value: `${newRole.hexColor}`, inline: true },
      ])
  }

  if (oldRole.name !== newRole.name) {
    embed
      .setDescription('Название изменено')
      .addFields([
        { name: 'ID:', value: `${newRole.id}`, inline: true },
        { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
      ])
      .addFields([
        { name: 'Старое название:', value: `${oldRole.name}`, inline: true },
        { name: 'Новое название:', value: `${newRole.name}`, inline: true },
      ])
  }

  if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
    const addedPermissions = newRole.permissions.missing(oldRole.permissions)
    const removedPermissions = oldRole.permissions.missing(newRole.permissions)

    embed.addFields([
      { name: 'ID:', value: `${newRole.id}`, inline: true },
      { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
      { name: 'Название:', value: newRole.name, inline: true },
    ])

    if (addedPermissions.length) {
      embed.setDescription('Разрешения удалены').addFields({ name: 'Разрешения:', value: addedPermissions.join(', ') })
    }

    if (removedPermissions.length) {
      embed
        .setDescription('Разрешения добавлены')
        .addFields({ name: 'Разрешения:', value: removedPermissions.join(', ') })
    }
  }

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ROLE_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
