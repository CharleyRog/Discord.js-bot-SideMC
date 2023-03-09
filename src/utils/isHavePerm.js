// IMPORT MODULES

import config from '../config/config.json' assert { type: 'json' }

// isDiscordSostav CODE

export const isDiscordSostav = (user) => {
  if (user) {
    const ROLES_ID = config.ROLES_ID
    const arr = [ROLES_ID.MODERATOR_DISCORDA_ROLE_ID, ROLES_ID.GL_MODERATOR_DISCORDA_ROLE_ID]

    let status = false

    arr.forEach((roleID) => {
      if (user.roles.cache.has(roleID)) {
        status = true
      }
    })
    return status
  }
}

export const isBot = (user) => {
  if (user) {
    const USERS_ID = config.USERS_ID
    const arr = [USERS_ID.SIDEMC_NET_DEV_ID, USERS_ID.SIDEMC_NET_ID]
    let status = false

    arr.forEach((roleID) => {
      if (user.roles.cache.has(roleID)) {
        status = true
      }
    })
    return status
  }
}

export const isAdminsSostav = (user) => {
  if (user) {
    return user.roles.cache.has(config.ROLES_ID.ADMIN_MOD_SOSTAV_ROLE_ID)
  }
  return false
}

export const isAdmin = (user) => {
  if (user) {
    const ROLES_ID = config.ROLES_ID
    const arr = [
      ROLES_ID.STAR_ROLE_ID,
      ROLES_ID.DOUBLE_STAR_ROLE_ID,
      ROLES_ID.PLUS_ROLE_ID,
      ROLES_ID.INFINITY_ROLE_ID,
      ROLES_ID.ADMINISTRATOR_ROLE_ID,
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

export const isStSostav = (user) => {
  if (user) {
    return user.roles.cache.has(config.ROLES_ID.ST_MOD_SOSTAV_ROLE_ID)
  }
  return false
}

export const isCharleyRogByID = (userID) => {
  if (userID) {
    return userID == config.USERS_ID.CHARLEYROG_ID
  }
  return false
}
