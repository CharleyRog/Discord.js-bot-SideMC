// IMPORT MODULES

import config from '../config/config.json' assert { type: 'json' }

// isDiscordSostav CODE

export const isDiscordSostav = (user: any): any => {
  if (user) {
    const arr: string[] = [config.ROLES_ID.MODERATOR_DISCORDA_ROLE_ID, config.ROLES_ID.GL_MODERATOR_DISCORDA_ROLE_ID]
    let status = false

    arr.forEach((roleID: string) => {
      if (user.roles.cache.has(roleID)) {
        status = true
      }
    })
  }
  return status
}

export const isBot = (user: any): any => {
  if (user) {
    const USERS_ID: any = config.USERS_ID
    const arr: string[] = [USERS_ID.SIDEMC_NET_DEV_ID, USERS_ID.SIDEMC_NET_ID]
    let status: boolean = false

    arr.forEach((roleID) => {
      if (user.roles.cache.has(roleID)) {
        status = true
      }
    })
    return status
  }
}

export const isAdminsSostav = (user: any): boolean => {
  if (user) {
    return user.roles.cache.has(config.ROLES_ID.ADMIN_MOD_SOSTAV_ROLE_ID)
  }
  return false
}

export const isAdmin = (user: any): any => {
  if (user) {
    const arr: string[] = [
      config.ROLES_ID.STAR_ROLE_ID,
      config.ROLES_ID.DOUBLE_STAR_ROLE_ID,
      config.ROLES_ID.PLUS_ROLE_ID,
      config.ROLES_ID.INFINITY_ROLE_ID,
      config.ROLES_ID.ADMINISTRATOR_ROLE_ID,
    ]
    let status: boolean = false

    arr.forEach((roleID) => {
      if (user.roles.cache.has(roleID)) {
        status = true
      }
    })
    return status
  }
}

export const isStSostav = (user: any): any => {
  if (user) {
    return user.roles.cache.has(config.ROLES_ID.ST_MOD_SOSTAV_ROLE_ID)
  }
  return false
}

export const isCharleyRogByID = (userID: string): boolean => {
  if (userID) {
    return userID == config.USERS_ID.CHARLEYROG_ID
  }
  return false
}
