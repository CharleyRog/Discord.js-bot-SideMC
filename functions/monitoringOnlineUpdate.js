// IMPORT MODULES

const config = require('../config/config.json')
const client = require('../client')
const axios = require('axios')
const cheerio = require('cheerio')
const { EmbedBuilder } = require('discord.js')

// monitoringOnlineUpdate CODE

const monitoringOnlineUpdate = async () => {
	try {
		const serversOnlineChanelID = config.serversOnlineChanelID
		const serversOnlineMessageID = config.serversOnlineMessageID
		const monitoringLink = config.linkForOnlineMonitoring
		let arr = []
		let str = ''
		let sumOnline = 0
		const guildID = config.guildID
		const guild = client.guilds.cache.get(guildID)
		const logChannel = guild.channels.cache.get(serversOnlineChanelID)
		const logMessage = await logChannel.messages.fetch(serversOnlineMessageID)

		if (!logChannel) {
			console.error(`Channel with ID ${serversOnlineChanelID} not found.`)
		}

		await axios
			.get(monitoringLink)
			.then((response) => {
				const $ = cheerio.load(response.data)

				const monitoring = $('.monitoring')

				for (let i = 0; i < monitoring.length; i++) {
					arr.push({
						server: monitoring[i].children[3].children[0].data,
						online: monitoring[i].children[1].children[0].data
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {})

		const embed = new EmbedBuilder()
			.setColor('#00FF00')
			.setTitle('Мониторинг онлайна серверов')

		for (let i = 0; i < arr.length; i++) {
			sumOnline = sumOnline + parseInt(arr[i].online)
			if (arr[i].online) {
				str = str.concat(
					`${i + 1}. ${arr[i].server} \`[${arr[i].online}/100]\` \n\n`
				)
			} else {
				str = str.concat(`${i + 1}. ${arr[i].server} \`[выключен]\` \n\n`)
			}
		}

		embed.setDescription(str).setFields({
			name: 'Общий онлайн:',
			value: `\`[${sumOnline}]\` игроков`,
			inline: false
		})

		// logChannel.send({ embeds: [embed] });
		logMessage.edit({ embeds: [embed] })
	} catch (error) {
		console.error(error)
	}
}

module.exports = monitoringOnlineUpdate
