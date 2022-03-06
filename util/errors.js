const discord = require("discord.js");
const { argsInfo, formatUsage } = require("./format.js");

module.exports.inputError = async (client, cmdName, user, channel, errorMessage) => {
    const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));

    if (!command) {
        return console.log(`[inputError] ${cmdName} does not exist!`);
    }

    let embed = new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Invalid Input!")
        .setDescription(
            `Invalid input from executing the ${command.name} command!\n` +
            `Usage: \`${formatUsage(client, command)}\` (${argsInfo})\n\n` +
            `\`\`\`ERROR: ${errorMessage}!\`\`\``
        )
        .setTimestamp()
        .setFooter({ text: `${user.tag}`, iconURL: user.displayAvatarURL() });
    return await channel.send({ content: `${user}`, embeds: [embed] });
};
