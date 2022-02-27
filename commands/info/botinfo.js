const discord = require("discord.js");

module.exports = {
    name: "botinfo",
    aliases: ["about", "information", "source", "github"],
    category: "info",
    description: "Information regarding the bot",
    enabled: true,
    run: async (client, message, args) => {
        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Bot information")
            .setDescription(
                `**IRHS Code Bot**\n` +
                `GitHub link **[Here](https://github.com/sbplat/IRHS-Code-Bot)**\n` +
                `Powered by [discord.js](https://discord.js.org/)`
            )

        return await message.channel.send({embeds: [embed]});
    }
}
