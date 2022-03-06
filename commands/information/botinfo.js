const discord = require("discord.js");
const { formatMSDuration } = require("../../util/format.js");

// Do not remove
const GitHubLink = `https://github.com/sbplat/IRHS-Bot`,
    NodeJsLink = `https://nodejs.org/en/`,
    DiscordJsLink = `https://discord.js.org/#/`;

module.exports = {
    name: "botinfo",
    aliases: ["about", "github"],
    category: "information",
    description: "Information regarding the bot",
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${client.user.username} v${client.version} Information`)
            .addField("General Information",
                `Bot Tag: ${client.user.tag}\n` +
                `Bot Prefix: \`${client.prefix}\`\n` +
                `Total Commands: ${client.commands.size}\n` +
                `Uptime: ${formatMSDuration(client.uptime)}\n` +
                `API Latency: ${Math.round(client.ws.ping)}ms`
            )
            .addField("Version Information",
                `[Bot Version: ${client.version}](${GitHubLink})\n` +
                `[Node.js: ${process.version}](${NodeJsLink})\n` +
                `[Discord.js: ${discord.version}](${DiscordJsLink})`
            )
            .addField("System Information",
                `Platform: ${process.platform}\n` +
                `Ram usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
            )
            .addField("Source Code",
                `[GitHub Link Here](${GitHubLink})`
            )
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        return await message.channel.send({ embeds: [embed] });
    }
};
