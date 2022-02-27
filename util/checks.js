const discord = require("discord.js");

module.exports.checkPerms = async (client, command, user) => {
    return client.owners.some((id) => id == user.id) || (!command.ownerOnly && command.enabled && user.permissions.has(command.requiredPerms || []));
}
