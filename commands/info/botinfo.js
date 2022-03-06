const discord = require("discord.js");
const { formatMSDuration } = require("../../util/format.js");

module.exports = {
    name: "botinfo",
    aliases: ["about", "information", "github"],
    category: "info",
    description: "Information regarding the bot",
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Bot information")
            .setDescription(
                `**IRHS Bot v${client.version}**\n` +
                `Uptime: ${formatMSDuration(client.uptime)}\n` +
                //`Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024)}mb\n` +
                `API Latency: ${Math.round(client.ws.ping)}ms\n` +
                `\n` +
                `GitHub link **[Here](https://github.com/sbplat/IRHS-Bot)**\n` +
                `Powered by [discord.js v${discord.version}](https://discord.js.org/)`
            );

        return await message.channel.send({ embeds: [embed] });
    }
};
