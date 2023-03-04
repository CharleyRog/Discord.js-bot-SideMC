// IMPORT MODULES

const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const { isCharleyRogByID } = require('../../utils/isHavePerm')
const embedBuilderFoo = require('../../utils/embedBuilderFoo')

// CODE

module.exports = async (message) => {
  if (!message.content || message.author.bot) return

  const command = message.content.toLowerCase()

  try {
    if (isCharleyRogByID(message.author.id)) {
      if (message.content === '!createAdminsPanel') {
        let button = new ActionRowBuilder()

        const createNewsTestPostButton = new ButtonBuilder()
          .setCustomId('createNewsTestPost-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Проверить новость')

        const createNewsMainPostButton = new ButtonBuilder()
          .setCustomId('createNewsMainPost-button')
          .setStyle(ButtonStyle.Success)
          .setLabel('Опубликовать новость')

        button.addComponents(createNewsTestPostButton, createNewsMainPostButton)

        const embed = embedBuilderFoo({
          color: '#FFFF00',
          title: 'Панель администратора',
          description:
            'Данная панель доступна исключительно Администраторам данного сервера. Функционал будет дополняться в будущем',
        })

        message.reply({
          components: [button],
          embeds: [embed],
        })
      }

      if (message.content === '!createModersPanel') {
        let button = new ActionRowBuilder()
        let button2 = new ActionRowBuilder()

        const addToBlacklist = new ButtonBuilder()
          .setCustomId('addToBlacklist-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Добавить в чс')

        const addToHWIDBlackList = new ButtonBuilder()
          .setCustomId('addToHWIDBlackList-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Добавить в hwid-чс')

        const givePermissionsRoles = new ButtonBuilder()
          .setCustomId('givePermissionsRoles-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Выдать права')

        const takePermissionsRoles = new ButtonBuilder()
          .setCustomId('takePermissionsRoles-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Снять права')

        const giveFreeRoles = new ButtonBuilder()
          .setCustomId('giveFreeRoles-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Выдать бесплатную роль')

        const takeFreeRoles = new ButtonBuilder()
          .setCustomId('takeFreeRoles-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Забрать бесплатную роль')

        const sendMessageToAdmins = new ButtonBuilder()
          .setCustomId('sendMessageToAdmins-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Анонимное сообщение администрации')

        const giveWarn = new ButtonBuilder()
          .setCustomId('giveWarn-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Выдать варн')

        const takeWarn = new ButtonBuilder()
          .setCustomId('takeWarn-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Снять варн')

        const history = new ButtonBuilder()
          .setCustomId('history-button')
          .setStyle(ButtonStyle.Primary)
          .setLabel('История пользователя')

        button.addComponents(
          addToBlacklist,
          addToHWIDBlackList,
          givePermissionsRoles,
          takePermissionsRoles,
          giveFreeRoles,
        )

        button2.addComponents(takeFreeRoles, sendMessageToAdmins, giveWarn, takeWarn, history)

        const embed = embedBuilderFoo({
          color: '#FFFF00',
          title: 'Панель модератора',
          description:
            'Данная панель доступна исключительно Старшему модераторскому составу. Функционал будет дополняться в будущем',
        })

        message.reply({
          components: [button, button2],
          embeds: [embed],
        })
      }
    }

    if (command === 'чмок') {
      message.channel.send(`Чмок в пупок :hearts:`)
    }

    if (command === 'чпок') {
      message.channel.send(`Чпок`)
    }

    if (command === 'вай') {
      message.channel.send(`вай вай :)`)
    }

    if (message.content === 'Как назвать ребенка?') {
      message.channel.send(`SideMC.net`)
    }
  } catch (error) {
    console.error(error)
  }
}
