// IMPORT MODULES

import { EmbedBuilder } from 'discord.js'

// embedBuilderFoo CODE

const embedBuilderFoo = (data) => {
  const embed = new EmbedBuilder()

  if (data.color) embed.setColor(data.color)
  if (data.title) embed.setTitle(data.title)
  if (data.url) embed.setURL(data.url)
  if (data.author) embed.setAuthor(data.author)
  if (data.description) embed.setDescription(data.description)
  if (data.thumbnail) embed.setThumbnail(data.thumbnail)
  if (data.fields) embed.setFields(data.fields)
  if (data.image) embed.setImage(data.image)
  if (data.timestamp) embed.setTimestamp()
  if (data.footer) embed.setFooter(data.footer)

  return embed
}

export default embedBuilderFoo
