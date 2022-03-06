const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { insertZeroWidth } = require("./format.js");

const logChannelID = "949686725414895676";

module.exports.logError = async (client, error) => {
    const logChannel = await client.channels.cache.get(logChannelID);
    let failMsg;

    if (!logChannel) {
        failMsg = "Invalid log channel!";

    } else {
        try {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Critical Error`)
                .setDescription(
                    `Name: \`${error.name}\`\n` +
                    `Message: \`${error.message}\`\n` +
                    `Stack:\n${codeBlock(error.stack.replaceAll(process.cwd(), ""))}`
                )
                .setTimestamp();

            return await logChannel.send({ content: "<@396479397537906689>", embeds: [embed] });

        } catch (err) {
            failMsg = err.message;
        }
    }

    console.log(`Error logging error:\n${failMsg}`);
};

module.exports.logReady = async (client) => {
    const logChannel = await client.channels.cache.get(logChannelID);
    let failMsg;

    if (!logChannel) {
        failMsg = "Invalid log channel!";

    } else {
        try {
            let embed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Bot is online!")
                .setTimestamp();

            return await logChannel.send({ content: "<@396479397537906689>", embeds: [embed] });

        } catch (err) {
            failMsg = err.message;
        }
    }

    console.log(`Error logging error:\n${failMsg}`);
};

module.exports.logCommandError = async (client, error, command, message) => {
    const logChannel = await client.channels.cache.get(logChannelID);
    let failMsg;

    if (!logChannel) {
        failMsg = "Invalid log channel!";

    } else {
        try {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Error executing ${command.name}`)
                .setDescription(
                    `${codeBlock(insertZeroWidth(message.content))}\n` +
                    `Name: \`${error.name}\`\n` +
                    `Message: \`${error.message}\`\n` +
                    `Stack:\n${codeBlock(error.stack.replaceAll(process.cwd(), ""))}`
                )
                .setTimestamp()
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            return await logChannel.send({ embeds: [embed] });

        } catch (err) {
            failMsg = err.message;
        }
    }

    console.log(`Error logging error:\n${failMsg}`);
};
