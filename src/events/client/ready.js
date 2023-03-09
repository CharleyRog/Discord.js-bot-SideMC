// IMPORT MODULES

const registerCommands = require('../../utils/registerCommands.js')
const monitoringOnlineUpdate = require('../../utils/monitoringOnlineUpdate.js')

// CODE

module.exports = async (client) => {
  // await registerCommands()
  console.log(`Бот запущен. ID: ${client.user.tag}`)
  //   monitoringOnlineUpdate();
  // setInterval(monitoringOnlineUpdate, 60000);
}
