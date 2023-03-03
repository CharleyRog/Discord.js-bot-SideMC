// IMPORT MODULES

const config = require('../config/config.json')
// interactionCreate EVENT CODE

module.exports = async (interaction) => {
	if (interaction.isCommand()) {
		try {
			if (interaction.commandName === 'say') {
				await interaction.reply({ content: 'Pong!', ephemeral: true })
			}
		} catch (error) {
			console.error(error)
			await interaction.reply({
				content: 'An error occurred while processing your command.',
				ephemeral: true
			})
		}
	}
}
