// IMPORT MODULES

const embedBuilderFoo = require('../../functions/embedBuilderFoo')
const config = require('../../config/config.json')
const { isAdmin, isBot } = require('../../functions/isHavePerm')

// messageUpdate EVENT CODE

module.exports = async (oldMessage, newMessage) => {
	if (!oldMessage || !newMessage) return

	const user = newMessage.member

	if (!isBot(user) && !isAdmin(user)) {
		const channel = newMessage.channel
		let oldContent = oldMessage.content
		let newContent = newMessage.content
		const messageChangeChannelID = config.messageChangeChannelID
		const logChannel = newMessage.guild.channels.cache.get(
			messageChangeChannelID
		)
		const guildID = config.guildID

		if (!oldContent) {
			try {
				oldContent = await oldMessage.fetch().content
			} catch (error) {
				console.error(`Error fetching message: ${error}`)
				return
			}
		}

		const embed = embedBuilderFoo({
			color: '#FFFF00',
			title: 'Сообщение изменено',
			url: `https://discord.com/channels/${guildID}/${newMessage.channel.id}/${newMessage.id}`
		})

		embed.addFields(
			{ name: 'Пользователь:', value: `<@${user.id}>`, inline: true },
			{ name: 'В канале:', value: `${channel.toString()}`, inline: true }
		)

		if (oldContent) {
			if (oldContent[0] == '<' || oldContent[0] == ':') {
				oldContent = oldContent
			} else {
				oldContent = `\`\`\`${oldContent}\`\`\``
			}
			embed.addFields({
				name: 'До изменения:',
				value: oldContent,
				inline: false
			})
		}

		if (newContent[0] !== '<' || newContent[0] !== ':') {
			newContent = `\`\`\`${newContent}\`\`\``
		}

		embed.addFields({
			name: 'После изменения:',
			value: newContent,
			inline: false
		})

		await logChannel.send({ embeds: [embed] })
	}
}
