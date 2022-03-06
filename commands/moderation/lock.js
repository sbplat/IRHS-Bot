const discord = require("discord.js");

module.exports = {
    name: "lock",
    aliases: ["lockchannel"],
    category: "moderation",
    description: "Lock a channel",
    guildOnly: true,
    requiredPerms: ["MANAGE_CHANNELS"],
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
            return await message.channel.send(`${message.author}, this channel is already locked!`);
        }

        await message.channel.permissionOverwrites.set([{
            id: message.guild.roles.everyone,
            deny: [discord.Permissions.FLAGS.SEND_MESSAGES]
        }], `Locked by ${message.author.tag} (ID: ${message.author.id})`); // reason doesn't work...

        let embed = new discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Channel locked")
            .setDescription(`🔒 | ${message.channel} is now locked!`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        return await message.channel.send({ embeds: [embed] });
    }
};
