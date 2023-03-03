// IMPORT MODULES

const registerCommands = require('../functions/registerCommands')
const monitoringOnlineUpdate = require('../functions/monitoringOnlineUpdate')

// ready EVENT CODE

module.exports = async (bot) => {
	// await registerCommands();
	console.log(`Бот запущен. ID: ${bot.user.tag}`)
	//   monitoringOnlineUpdate();
	// setInterval(monitoringOnlineUpdate, 60000);
}
