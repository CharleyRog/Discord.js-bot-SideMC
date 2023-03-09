// IMPORT MODULES

import { EmbedBuilder, Guild } from 'discord.js'
import cheerio, { CheerioAPI } from 'cheerio'
import axios from 'axios'
import client from '../client.ts'
import config from '../config/config.json' assert { type: 'json' }

// monitoringOnlineUpdate CODE

const monitoringOnlineUpdate = async () => {
  try {
    const serversOnlineChanelID: string = config.CHANNELS_ID.SERVERS_ONLINE_CHANNEL_ID
    const serversOnlineMessageID: string = config.MESSAGES_ID.SERVERS_ONLINE_MESSAGE_ID
    const monitoringLink: string = config.LINKS.ONLINE_MONITORING_LINK
    const guildID: string = config.GUILD_ID

    const guild = client.guilds.cache.get(guildID)
    const logChannel = guild.channels.cache.get(serversOnlineChanelID)
    const logMessage = await logChannel.messages.fetch(serversOnlineMessageID)

    let arr: [] = []
    let str = ''
    let sumOnline = 0

    if (!logChannel) {
      console.error(`Channel with ID ${serversOnlineChanelID} not found.`)
      return
    }

    await axios
      .get(monitoringLink)
      .then((response) => {
        const $ = cheerio.load(response.data)

        const monitoring = $('.monitoring')

        for (let i = 0; i < monitoring.length; i++) {
          const el: any = {
            server: monitoring[i].children[3].children[0].data,
            online: monitoring[i].children[1].children[0].data,
          }
          arr.push(el)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    const embed = new EmbedBuilder().setColor('#00FF00').setTitle('Мониторинг онлайна серверов')

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].online) {
        str = str.concat(`${i + 1}. ${arr[i].server} \`[${arr[i].online}/100]\` \n\n`)
        sumOnline = sumOnline + parseInt(arr[i].online)
      } else {
        str = str.concat(`${i + 1}. ${arr[i].server} \`[выключен]\` \n\n`)
      }
    }

    embed.setDescription(str).setFields({
      name: 'Общий онлайн:',
      value: `\`[${sumOnline}]\` игроков`,
      inline: false,
    })

    // logChannel.send({ embeds: [embed] });
    await logMessage.edit({ embeds: [embed] })
  } catch (error) {
    console.error(error)
  }
}

export default monitoringOnlineUpdate
