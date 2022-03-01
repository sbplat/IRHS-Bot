module.exports.checkPerms = (client, command, user, guild) => {
    if (client.owners.some((id) => id === user.id)) {
        return true;
    }

    if (!command.ownerOnly && command.enabled) {
        if (!command.guildOnly || (guild && user.permissions.has(command.requiredPerms || []))) {
            return true;
        }
    }

    return false;
};
