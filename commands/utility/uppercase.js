const discord = require("discord.js");

module.exports = {
    name: "uppercase",
    aliases: ["upper", "toupper", "touppercase"],
    category: "utility",
    description: "Converts a string to uppercase letters",
    usage: "<string>",
    example: "abcdefg hijklmnop qrstuv wxyz",
    enabled: true,
    run: async (client, message, args) => {
        const string = args.join(" ");

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Uppercase:")
            .setDescription(`${string.toUpperCase()}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return await message.channel.send({ embeds: [embed] });
    }
};
