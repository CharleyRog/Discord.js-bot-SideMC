// IMPORT MODULES

const config = require("../config/config.json");

// isDiscordSostav CODE

const isDiscordSostav = (user) => {
  if (!user) return;

  const arr = [
    "1076288248164393100", // Гл. Модератор Discord`а
    "1076290372218658876", // Модератор Discord`а
  ];

  let status = false;

  arr.forEach((roleID) => {
    if (user.roles.cache.has(roleID)) {
      status = true;
    }
  });

  return status;
};

// isBot CODE

const isBot = (user) => {
  if (!user) return;

  const arr = [
    "1076508214415339632", // SideMC.net
    "1077705016548270144", // SideMC.net [dev]
  ];

  let status = false;

  arr.forEach((roleID) => {
    if (user.roles.cache.has(roleID)) {
      status = true;
    }
  });

  return status;
};

// isAdminsSostav CODE

const isAdminsSostav = (user) => {
  if (!user) return;

  const id = "660519101382393856"; // Администраторский состав

  return user.roles.cache.has(id);
};

// isAdmin CODE

const isAdmin = (user) => {
  if (!user) return;

  const arr = [
    "846817243534721035", // *
    "881558607324413964", // **
    "665261203181797432", // +
    "560053244420947978", // ∞
    "1075357030983938118", // Администратор
  ];
  let status = false;

  arr.forEach((roleID) => {
    if (user.roles.cache.has(roleID)) {
      status = true;
    }
  });

  return status;
};

// isStSostav CODE

const isStSostav = (user) => {
  if (!user) return;

  const id = "629582854673924117"; // Старший мод. состав

  return user.roles.cache.has(id);
};

const isCharleyRogByID = (userID) => {
  return userID == config.charleyRogID;
};

module.exports = { isDiscordSostav, isBot, isAdminsSostav, isAdmin, isStSostav, isCharleyRogByID };
