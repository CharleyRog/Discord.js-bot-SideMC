// IMPORT MODULES

const embedBuilderFoo = require('../../utils/embedBuilderFoo')
const config = require('../../config/config.json')

// CODE

module.exports = async (oldMember, newMember) => {
  try {
    const roleLogChannelID = config.CHANNELS_ID.ROLE_LOG_CHANNEL_ID
    const oldRoles = oldMember.roles.cache
    const newRoles = newMember.roles.cache

    const addedRoles = newRoles.filter((role) => !oldRoles.has(role.id))
    const removedRoles = oldRoles.filter((role) => !newRoles.has(role.id))

    const auditLog = await newMember.guild.fetchAuditLogs({
      type: 25,
    })

    const log = auditLog.entries.first()
    const executor = log ? log.executor : null

    if (executor.bot) {
      return
    }

    addedRoles.forEach((role) => {
      const logChannel = newMember.guild.channels.cache.get(roleLogChannelID)
      if (logChannel) {
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

    removedRoles.forEach((role) => {
      const logChannel = newMember.guild.channels.cache.get(roleLogChannelID)
      if (logChannel) {
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
