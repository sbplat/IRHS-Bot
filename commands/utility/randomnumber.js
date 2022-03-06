const discord = require("discord.js");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "randomnumber",
    aliases: ["rand", "random", "randnum"],
    category: "utility",
    description: "Get a random integer in a range (both inclusive)",
    usage: "<lower bound> <upper bound>",
    example: "1 6",
    enabled: true,
    run: async (client, message, args) => {
        let lowerbound = parseInt(args[0]),
            upperbound = parseInt(args[1]);

        if (isNaN(lowerbound)) {
            return await inputError(client, "randomnumber", message.author, message.channel, `${insertZeroWidth(args[0])} aka <lower bound> is an invalid integer`);
        }

        if (isNaN(upperbound)) {
            return await inputError(client, "randomnumber", message.author, message.channel, `${insertZeroWidth(args[1])} aka <upper bound> is an invalid integer`);
        }

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Random number (${lowerbound}-${upperbound}):`)
            .setDescription(`${Math.floor(Math.random() * (upperbound - lowerbound + 1) + lowerbound)}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return await message.channel.send({ embeds: [embed] });
    }
};
