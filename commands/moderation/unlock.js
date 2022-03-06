const discord = require("discord.js");

module.exports = {
    name: "unlock",
    aliases: ["unlockchannel"],
    category: "moderation",
    description: "Unlock a channel",
    guildOnly: true,
    requiredPerms: ["MANAGE_CHANNELS"],
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        if (message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
            return await message.channel.send(`${message.author}, this channel is already unlocked!`);
        }

        await message.channel.permissionOverwrites.set([{
            id: message.guild.roles.everyone,
            null: [discord.Permissions.FLAGS.SEND_MESSAGES]
        }], `Unlocked by ${message.author.tag} (ID: ${message.author.id})`); // reason doesn't work...

        let embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Channel unlocked")
            .setDescription(`🔓 | ${message.channel} is now unlocked!`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        return await message.channel.send({ embeds: [embed] });
    }
};
