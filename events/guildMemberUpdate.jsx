// IMPORT MODULES

const { EmbedBuilder } = require("discord.js");
const config = require("../config/config.json");

// guildMemberUpdate EVENT CODE

module.exports = async (oldMember, newMember) => {
  try {
    const roleLogChannelID = config.roleLogChannelID;
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const addedRoles = newRoles.filter((role) => !oldRoles.has(role.id));
    const removedRoles = oldRoles.filter((role) => !newRoles.has(role.id));

    const auditLog = await newMember.guild.fetchAuditLogs({
      type: 25,
    });

    const log = auditLog.entries.first();
    const executor = log ? log.executor : null;

    if (executor.bot) {
      return;
    }

    addedRoles.forEach(async (role) => {
      const logChannel = newMember.guild.channels.cache.get(roleLogChannelID);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor("#00FF00")
          .setTitle("Выдана роль")
          .addFields(
            { name: "Пользователь", value: executor ? `<@${executor.id}>` : `Неизвестно`, inline: true },
            { name: "Выдал роль", value: `<@&${role.id}>`, inline: true },
            { name: "Пользователю", value: `<@${newMember.id}>`, inline: true }
          );
        await logChannel.send({ embeds: [embed] });
      }
    });

    removedRoles.forEach(async (role) => {
      const logChannel = newMember.guild.channels.cache.get(roleLogChannelID);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("Снята роль")
          .addFields(
            { name: "Пользователь", value: executor ? `<@${executor.id}>` : "Неизвестно", inline: true },
            { name: "Снял роль", value: `<@&${role.id}>`, inline: true },
            { name: "Пользователю", value: `<@${newMember.id}>`, inline: true }
          );
        await logChannel.send({ embeds: [embed] });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
