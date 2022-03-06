const discord = require("discord.js");
const { pluralStr } = require("../../util/format.js");

module.exports = {
    name: "purge",
    aliases: ["clear", "delete"],
    category: "moderation",
    description: "Deletes messages from a channel",
    usage: "[amount (1-100)]",
    example: "10",
    guildOnly: true,
    requiredPerms: ["MANAGE_MESSAGES"],
    enabled: true,
    run: async (client, message, args) => {
        await message.delete();

        const amount = Math.min(parseInt(args[0]) || 1, 100);

        await message.channel.bulkDelete(amount);

        let embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Messages deleted")
            .setDescription(`Deleted ${pluralStr(amount, "message")}!`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        return await message.channel.send({ embeds: [embed] }).then((msg) => {
            setTimeout(async () => await msg.delete(), 2 * 1000);
        });
    }
};
