const discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "information",
    description: "Get the bot's ping",
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        let start = Date.now();

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Pong!")
            .addField("Bot Latency", `???ms`, true)
            .addField("API Latency", `???ms`, true);

        const msg = await message.channel.send({ embeds: [embed] });

        let latency = Date.now() - start;

        let embed1 = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Pong!")
            .addField("Bot Latency", `${latency}ms`, true)
            .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true);

        return await msg.edit({ embeds: [embed1] });
    }
};
