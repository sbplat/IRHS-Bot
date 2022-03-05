const { ms } = require("./constants.js");

module.exports.argsInfo = "<> = required, [] = optional";

module.exports.formatUsage = (client, command) => {
    return `${client.prefix}${command.name}${command.usage ? " " + command.usage : ""}`;
};

module.exports.formatExample = (client, command) => {
    return `${client.prefix}${command.name}${command.example ? " " + command.example : ""}`;
};

function pluralStr(count, word, end = "s") {
    return `${count} ${word}${count == 1 ? "" : end}`;
}
module.exports.pluralStr = pluralStr;

module.exports.insertZeroWidth = (string) => {
    return (string && "\u200b" + string.toString().split("").join("\u200b") + "\u200b") || "";
};

module.exports.titleCase = (string) => {
    return (string && string[0].toUpperCase() + string.slice(1).toLowerCase()) || "";
};

module.exports.formatMSDuration = (msTime) => {
    const days = Math.floor(msTime / ms.day);
    const hours = Math.floor((msTime % ms.day) / ms.hour);
    const minutes = Math.floor((msTime % ms.hour) / ms.minute);
    const seconds = Math.floor((msTime % ms.minute) / ms.second);
    return `${pluralStr(days, "day")}, ${pluralStr(hours, "hour")}, ${pluralStr(minutes, "minute")} and ${pluralStr(seconds, "second")}`;
};
