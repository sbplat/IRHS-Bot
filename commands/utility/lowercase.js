const discord = require("discord.js");

module.exports = {
    name: "lowercase",
    aliases: ["lower", "tolower", "tolowercase"],
    category: "utility",
    description: "Converts a string to lowercase letters",
    usage: "<string>",
    example: "abcdefg hijklmnop qrstuv wxyz",
    enabled: true,
    run: async (client, message, args) => {
        const string = args.join(" ");

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Lowercase:")
            .setDescription(`${string.toLowerCase()}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return await message.channel.send({ embeds: [embed] });
    }
};
