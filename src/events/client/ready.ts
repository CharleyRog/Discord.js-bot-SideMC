// IMPORT MODULES

import registerCommands from '../../utils/registerCommands.js'
import monitoringOnlineUpdate from '../../utils/monitoringOnlineUpdate.js'

// CODE

export default async (client: any): Promise<void> => {
  // await registerCommands()
  console.log(`Бот запущен. ID: ${client.user.tag}`)
  //   monitoringOnlineUpdate();
  // setInterval(monitoringOnlineUpdate, 60000);
}
