module.exports.argsInfo = "<> = required, [] = optional";

module.exports.formatUsage = (client, command) => {
    return `${client.prefix}${command.name}${command.usage ? " " + command.usage : ""}`;
};

module.exports.formatExample = (client, command) => {
    return `${client.prefix}${command.name}${command.example ? " " + command.example : ""}`;
};

module.exports.insertZeroWidth = (string) => {
    return (string && "\u200b" + string.toString().split("").join("\u200b") + "\u200b") || "";
};

module.exports.titleCase = (string) => {
    return (string && string[0].toUpperCase() + string.slice(1)) || "";
};
