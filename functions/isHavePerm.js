// IMPORT MODULES

const rolesIDs = require('../config/rolesIDs.json')
const usersIDs = require('../config/usersIDs.json')

// isDiscordSostav CODE

const isDiscordSostav = (user) => {
	if (user) {
		const arr = [rolesIDs.moderatorDiscorda, rolesIDs.glModeratorDiscorda]

		let status = false

		arr.forEach((roleID) => {
			if (user.roles.cache.has(roleID)) {
				status = true
			}
		})
		return status
	}
}
const isBot = (user) => {
	if (user) {
		const arr = [usersIDs.SideMCNet, usersIDs.SideMCNetDev]
		let status = false

		arr.forEach((roleID) => {
			if (user.roles.cache.has(roleID)) {
				status = true
			}
		})
		return status
	}
}
const isAdminsSostav = (user) => {
	if (user) {
		return user.roles.cache.has(rolesIDs.adminModSostavRole)
	}
	return false
}
const isAdmin = (user) => {
	if (user) {
		const arr = [
			rolesIDs.starRole,
			rolesIDs.doubleStarRole,
			rolesIDs.plusRole,
			rolesIDs.infinityRole,
			rolesIDs.administratorRole
		]
		let status = false

		arr.forEach((roleID) => {
			if (user.roles.cache.has(roleID)) {
				status = true
			}
		})
		return status
	}
}
const isStSostav = (user) => {
	if (user) {
		return user.roles.cache.has(rolesIDs.stModSostavRole)
	}
	return false
}
const isCharleyRogByID = (userID) => {
	if (userID) {
		return userID == usersIDs.CharleyRog
	}
	return false
}

module.exports = {
	isDiscordSostav,
	isBot,
	isAdminsSostav,
	isAdmin,
	isStSostav,
	isCharleyRogByID
}
