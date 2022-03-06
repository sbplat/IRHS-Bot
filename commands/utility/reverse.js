const discord = require("discord.js");

module.exports = {
    name: "reverse",
    aliases: ["backward", "backwards"],
    category: "utility",
    description: "Reverses a string",
    usage: "<string>",
    example: "abcdefg hijklmnop qrstuv wxyz",
    enabled: true,
    run: async (client, message, args) => {
        const string = args.join(" ");

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Lowercase:")
            .setDescription(`${[...string].reverse().join("")}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return await message.channel.send({ embeds: [embed] });
    }
};
