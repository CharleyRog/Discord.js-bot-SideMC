// IMPORT MODULES

import {
  ActionRowBuilder,
  BaseInteraction,
  GuildBasedChannel,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import config from '../../config/config.json'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import { isAdmin } from '../../utils/isHavePerm.js'

// CODE

export default async (interaction: BaseInteraction): Promise<void> => {
  if (interaction.isCommand()) {
    try {
      if (isAdmin(interaction.member) && interaction.commandName == 'say') {
        // @ts-ignore
        const messageToReply = interaction.options.getString('message')
        if (interaction.channel) {
          await interaction.channel.send(messageToReply)
        }
        await interaction.reply({ content: 'Sent', ephemeral: true })
      }

      if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!', ephemeral: true })
      }

      if (interaction.commandName === 'hello') {
        await interaction.reply(`Hello, ${interaction.user.username}!`)
      }
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'An error occurred while processing your command.',
        ephemeral: true,
      })
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'createNewsMainPost-button') {
      const modal: ModalBuilder = new ModalBuilder()
        .setCustomId('createNewsMainPost-modal')
        .setTitle('Создание основной новости')

      const titleInput = new TextInputBuilder()
        .setCustomId('createNewsMainPost-titleInput')
        .setLabel('Заголовок')
        .setMinLength(4)
        .setStyle(TextInputStyle.Short)
        .setMinLength(4)
        .setPlaceholder('Введите заголовок')
        .setRequired(true)

      const linkTextInput = new TextInputBuilder()
        .setCustomId('createNewsMainPost-linkText')
        .setLabel('Ссылка на новость')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Введите ссылку на новость')
        .setRequired(false)

      const textInput = new TextInputBuilder()
        .setCustomId('createNewsMainPost-textInput')
        .setLabel('Текст новости')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(4)
        .setPlaceholder('Введите текст новости')
        .setRequired(true)

      const linkImgInput = new TextInputBuilder()
        .setCustomId('createNewsMainPost-linkImgInput')
        .setLabel('Ссылка на картинку')
        .setStyle(TextInputStyle.Short)
        .setMinLength(4)
        .setPlaceholder('Введите ссылку на картинку')
        .setRequired(false)

      const titleActionRow = new ActionRowBuilder().addComponents(titleInput)
      const linkActionRow = new ActionRowBuilder().addComponents(linkTextInput)
      const linkTextActionRow = new ActionRowBuilder().addComponents(textInput)
      const linkImgActionRow = new ActionRowBuilder().addComponents(linkImgInput)

      // @ts-ignore
      modal.addComponents(titleActionRow, linkActionRow, linkTextActionRow, linkImgActionRow)

      await interaction.showModal(modal)
    }
    if (interaction.customId === 'createNewsTestPost-button') {
      const modal = new ModalBuilder().setCustomId('createNewsTestPost-modal').setTitle('Создание тестовой новости')

      const titleInput = new TextInputBuilder()
        .setCustomId('createNewsTestPost-titleInput')
        .setLabel('Заголовок')
        .setMinLength(4)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Введите заголовок')
        .setRequired(true)

      const linkTextInput = new TextInputBuilder()
        .setCustomId('createNewsTestPost-linkText')
        .setLabel('Ссылка на новость')
        .setStyle(TextInputStyle.Short)
        .setMinLength(4)
        .setPlaceholder('Введите ссылку на новость')
        .setRequired(false)

      const textInput = new TextInputBuilder()
        .setCustomId('createNewsTestPost-textInput')
        .setLabel('Текст новости')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(4)
        .setPlaceholder('Введите текст новости')
        .setRequired(true)

      const linkImgInput = new TextInputBuilder()
        .setCustomId('createNewsTestPost-linkImgInput')
        .setLabel('Ссылка на картинку')
        .setStyle(TextInputStyle.Short)
        .setMinLength(4)
        .setPlaceholder('Введите ссылку на картинку')
        .setRequired(false)

      const titleActionRow = new ActionRowBuilder().addComponents(titleInput)
      const linkActionRow = new ActionRowBuilder().addComponents(linkTextInput)
      const linkTextActionRow = new ActionRowBuilder().addComponents(textInput)
      const linkImgActionRow = new ActionRowBuilder().addComponents(linkImgInput)

      // @ts-ignore
      modal.addComponents(titleActionRow, linkActionRow, linkTextActionRow, linkImgActionRow)

      await interaction.showModal(modal)
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'createNewsMainPost-modal') {
      const titleInput = interaction.fields.getTextInputValue('createNewsMainPost-titleInput')
      const linkText = interaction.fields.getTextInputValue('createNewsMainPost-linkText')
      const textInput = interaction.fields.getTextInputValue('createNewsMainPost-textInput')
      const linkImgInput = interaction.fields.getTextInputValue('createNewsMainPost-linkImgInput')

      try {
        const mainNewsChannel: GuildBasedChannel | undefined = interaction.guild?.channels.cache.get(
          config.CHANNELS_ID.MAIN_NEWS_CHANNEL_ID,
        )

        const data = {
          color: '#FFFF00',
          title: titleInput,
          url: linkText,
          description: textInput,
          image: linkImgInput,
        }

        const embed = embedBuilderFoo(data)
        if (mainNewsChannel && mainNewsChannel.isTextBased()) {
          await mainNewsChannel.send({ content: '@everyone', embeds: [embed] })
        }
        await interaction.reply({
          content: `Новость ${data.title} опубликована в канале ${mainNewsChannel}`,
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (interaction.customId === 'createNewsTestPost-modal') {
      const titleInput = interaction.fields.getTextInputValue('createNewsTestPost-titleInput')
      const linkText = interaction.fields.getTextInputValue('createNewsTestPost-linkText')
      const textInput = interaction.fields.getTextInputValue('createNewsTestPost-textInput')
      const linkImgInput = interaction.fields.getTextInputValue('createNewsTestPost-linkImgInput')

      try {
        const testNewsChannel: GuildBasedChannel | undefined = interaction.guild?.channels.cache.get(
          config.CHANNELS_ID.TEST_NEWS_CHANNEL_ID,
        )

        const data = {
          color: '#FFFF00',
          title: titleInput,
          url: linkText,
          description: textInput,
          image: linkImgInput,
        }

        const embed = embedBuilderFoo(data)
        if (testNewsChannel && testNewsChannel.isTextBased()) {
          await testNewsChannel.send({ content: 'тап :)', embeds: [embed] })
        }
        await interaction.reply({
          content: `Новость ${data.title} опубликована в канале ${testNewsChannel}`,
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
