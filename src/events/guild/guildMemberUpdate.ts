// IMPORT MODULES

import { GuildBasedChannel, GuildMember } from 'discord.js'
import config from '../../config/config.json' assert { type: 'json' }
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'

// CODE

export default async (oldMember: GuildMember, newMember: GuildMember): Promise<void> => {
  try {
    const roleLogChannelID = config.CHANNELS_ID.ROLE_LOG_CHANNEL_ID
    const oldRoles = oldMember.roles.cache
    const newRoles = newMember.roles.cache

    const addedRoles = newRoles.filter((role: any) => !oldRoles.has(role.id))
    const removedRoles = oldRoles.filter((role: any) => !newRoles.has(role.id))

    const auditLog = await newMember.guild.fetchAuditLogs({
      type: 25,
    })

    const log = auditLog.entries.first()
    const executor = log ? log.executor : null

    if (!executor || executor.bot) {
      return
    }

    addedRoles.forEach((role: any) => {
      if (role.id === config.ROLES_ID.BOOSTER_ROLE_ID) return
      const logChannel: GuildBasedChannel | undefined = newMember.guild.channels.cache.get(roleLogChannelID)
      if (logChannel && logChannel.isTextBased()) {
        const embed = embedBuilderFoo({
          color: '#00FF00',
          title: 'Выдана роль',
        })

        embed.addFields(
          {
            name: 'Пользователь',
            value: executor ? `<@${executor.id}>` : `Неизвестно`,
            inline: true,
          },
          { name: 'Выдал роль', value: `<@&${role.id}>`, inline: true },
          { name: 'Пользователю', value: `<@${newMember.id}>`, inline: true },
        )
        logChannel.send({ embeds: [embed] })
      }
    })

    removedRoles.forEach((role: any) => {
      if (role.id === config.ROLES_ID.BOOSTER_ROLE_ID) return
      const logChannel: GuildBasedChannel | undefined = newMember.guild.channels.cache.get(roleLogChannelID)
      if (logChannel && logChannel.isTextBased()) {
        const embed = embedBuilderFoo({
          color: '#FF0000',
          title: 'Снята роль',
        })
        embed.addFields(
          {
            name: 'Пользователь',
            value: executor ? `<@${executor.id}>` : 'Неизвестно',
            inline: true,
          },
          { name: 'Снял роль', value: `<@&${role.id}>`, inline: true },
          { name: 'Пользователю', value: `<@${newMember.id}>`, inline: true },
        )

        logChannel.send({ embeds: [embed] })
      }
    })
  } catch (error) {
    console.error(error)
  }
}
