// IMPORT MODULES

const registerCommands = require('../../utils/registerCommands.ts')
const monitoringOnlineUpdate = require('../../utils/monitoringOnlineUpdate.ts')

// CODE

export default async (client: any): Promise<void> => {
  // await registerCommands()
  console.log(`Бот запущен. ID: ${client.user.tag}`)
  //   monitoringOnlineUpdate();
  // setInterval(monitoringOnlineUpdate, 60000);
}
