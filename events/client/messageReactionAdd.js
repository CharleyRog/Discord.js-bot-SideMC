// IMPORT MODULES

const config = require('../../config/config.json')
const {
	isAdmin,
	isBot,
	isAdminsSostav,
	isDiscordSostav,
	isStSostav
} = require('../../functions/isHavePerm')
const embedBuilderFoo = require('../../functions/embedBuilderFoo')

// messageReactionAdd EVENT CODE

module.exports = async (reaction, user) => {
	if (!user || !reaction || user.bot) return

	const emojiIcon = '🚫'

	if (reaction.emoji.name !== emojiIcon) return

	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error)
			return
		}
	}

	const message = reaction.message
	const member = message.guild.members.cache.get(user.id)

	if (
		isAdmin(member) ||
		isDiscordSostav(member) ||
		isStSostav(member) ||
		isAdminsSostav(member)
	) {
		const messageMember = message.guild.members.cache.get(message.author.id)

		if (!isAdmin(messageMember) && !isBot(messageMember)) {
			const deleteChannelId = config.deleteChannelId
			const logChannel = message.guild.channels.cache.get(deleteChannelId)

			let imageStickerUrl =
				message.attachments.size > 0 ? message.attachments.first().url : ''
			if (
				!imageStickerUrl &&
				!reaction.partial &&
				reaction.message.content.includes('<:')
			) {
				imageStickerUrl = `https://cdn.discordapp.com/stickers/${
					reaction.emoji.id
				}.${reaction.emoji.animated ? 'gif' : 'png'}`
			}

			const embed = embedBuilderFoo({
				color: '#FF0000',
				title: 'Сообщение удалено'
			})
			embed.addFields(
				{ name: 'Модератор', value: `<@${user.id}>`, inline: true },
				{
					name: 'В канале',
					value: `${message.channel.toString()}`,
					inline: true
				},
				{
					name: 'Удалил сообщение пользователя',
					value: `<@${message.author.id}>`,
					inline: true
				}
			)

			if (message.content !== '') {
				embed.addFields({
					name: 'Содержание сообщения:',
					value: message.content,
					inline: false
				})
			}

			if (imageStickerUrl) {
				embed.setImage(imageStickerUrl)
			}

			await message.delete()
			await logChannel.send({ embeds: [embed] })
		}
	}
}
