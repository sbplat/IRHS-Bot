const isOwner = (client, userID) => client.owners.some((id) => id === userID);
module.exports.isOwner = isOwner;

module.exports.checkPerms = (client, command, user, guild) => {
    if (!command.ownerOnly && command.enabled) {
        if (!command.guildOnly || (guild && user.permissions.has(command.requiredPerms))) {
            return true;
        }
    }

    return false;
};
