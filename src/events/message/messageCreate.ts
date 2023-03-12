// IMPORT MODULES

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message } from 'discord.js'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import { isCharleyRogByID } from '../../utils/isHavePerm.js'

// CODE

export default async (message: Message): Promise<void> => {
  if (!message.content || message.author.bot) return
  const command: string = message.content.toLowerCase()

  const askSayData = [
    {
      ask: 'вай',
      say: 'Вай вай :)',
    },
    {
      ask: 'как назвать ребенка',
      say: 'SideMC.net',
    },
    {
      ask: 'чмок',
      say: 'Чмок в пупок :hearts:',
    },
    {
      ask: 'чпок',
      say: 'Чпок',
    },
  ]

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

        await message.reply({
          // @ts-ignore
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

        await message.reply({
          // @ts-ignore
          components: [button, button2],
          embeds: [embed],
        })
      }
    }

    for (const obj of askSayData) {
      if (obj.ask === command) {
        await message.reply(obj.say)
        return
      }
    }
  } catch (error) {
    console.error(error)
  }
}
