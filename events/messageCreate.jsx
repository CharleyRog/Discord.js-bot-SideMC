// IMPORT MODULES

const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const config = require('../config/config.json')
const { isCharleyRogByID } = require('../functions/isHavePerm')
const embedBuilderFoo = require('../functions/embedBuilderFoo')

// messageCreate EVENT CODE

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

				const data = {
					color: '#FFFF00',
					title: 'Панель администратора',
					description:
						'Данная панель доступна исключительно Администраторам данного сервера. Функционал будет дополняться в будущем'
				}

				const embed = embedBuilderFoo(data)

				message.reply({
					components: [button],
					embeds: [embed]
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
					giveFreeRoles
				)

				button2.addComponents(
					takeFreeRoles,
					sendMessageToAdmins,
					giveWarn,
					takeWarn,
					history
				)

				const data = {
					color: '#FFFF00',
					title: 'Панель модератора',
					description:
						'Данная панель доступна исключительно Старшему модераторскому составу. Функционал будет дополняться в будущем'
				}

				const embed = embedBuilderFoo(data)

				message.reply({
					components: [button, button2],
					embeds: [embed]
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

		if (message.content === 'Бот, кого я люблю?') {
			if (message.author.id == '388767423081349130') {
				const user = client.users.cache.get('533616290854600714') // Хомяк
				if (user) {
					message.channel.send(`Конечно же <@${user.id}> :hearts:`)
				}
			} else if (
				message.author.id == '533616290854600714' ||
				message.author.id == '767099886687748144'
			) {
				const user = client.users.cache.get('388767423081349130') // Француз
				if (user) {
					message.channel.send(`Конечно же <@${user.id}> :hearts:`)
				}
			} else if (message.author.id == '288352260390387712') {
				// Difex
				const user = client.users.cache.get('674148024745984031') // Аня
				if (user) {
					message.channel.send(`Конечно же <@${user.id}> :hearts:`)
				}
			} else if (message.author.id == '674148024745984031') {
				// Аня
				const user = client.users.cache.get('288352260390387712') // Difex
				if (user) {
					message.channel.send(`Конечно же <@${user.id}> :hearts:`)
				}
			} else {
				message.channel.send(`Только <@${message.author.id}> любимого :hearts:`)
			}
		}
	} catch (error) {
		console.error(error)
	}
}
