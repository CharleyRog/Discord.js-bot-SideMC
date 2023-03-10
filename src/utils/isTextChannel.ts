import { TextChannel } from 'discord.js'

export default function isTextChannel(channel: any): channel is TextChannel {
  return channel instanceof TextChannel
}
