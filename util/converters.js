const ID_REGEX = new RegExp("^([0-9]{15,20})$"),
    MENTION_REGEX = new RegExp("^<@!?([0-9]{15,20})>$");

function extractIDFromString(string) {
    if (!string) {
        return;
    }

    const match = ID_REGEX.exec(string) || MENTION_REGEX.exec(string);

    if (match) {
        return match[1];
    }

    return;
}

module.exports.extractIDFromString = extractIDFromString;

module.exports.getUserFromString = async (client, string) => {
    if (!string) {
        return;
    }

    const idMatch = extractIDFromString(string);

    if (idMatch) {
        return client.users.cache.get(idMatch);
    }

    string = string.toLowerCase();

    let user;

    if (string.includes("#")) {
        user = client.users.cache.find((user) => user.tag.toLowerCase() == string);
    } else {
        user = client.users.cache.find((user) => user.username.toLowerCase() == string);
    }

    if (user) {
        return client.users.cache.get(user.id);
    }
};

module.exports.getMemberFromUser = async (user, guild) => {
    try {
        return await guild.members.fetch(user);

    } catch (err) {
        return;
    }
};
