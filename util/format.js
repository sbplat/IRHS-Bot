const { ms } = require("./constants.js");

module.exports.argsInfo = "<> = required, [] = optional";

module.exports.formatUsage = (client, command) => {
    if (typeof(command) === "string") {
        command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    }

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
    let timeArr = [];
    if (days) { timeArr.push(pluralStr(days, "day")); }
    if (hours) { timeArr.push(pluralStr(hours, "hour")); }
    if (minutes) { timeArr.push(pluralStr(minutes, "minute")); }
    if (seconds) { timeArr.push(pluralStr(seconds, "second")); }
    return [timeArr.slice(0, -1).join(", "), timeArr.slice(-1)[0]].join(timeArr.length <= 1 ? "" : " and ");
};
