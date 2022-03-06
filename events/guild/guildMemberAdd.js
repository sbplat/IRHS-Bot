const discord = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        // eslint-disable-next-line no-loss-of-precision
        if (member.guild.id != 762013638780911688) {
            return;
        }

        let embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Welcome ${member.user.username}`)
            .setDescription(`Welcome ${member.user} to ${member.guild.name}!`)
            .setTimestamp()
            .setFooter({ text: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() });
        await member.guild.systemChannel.send({ embeds: [embed] });

        if (!member.user.bot) {
            const coderRole = member.guild.roles.cache.find((role) => role.name === "Coder");
            return await member.roles.add(coderRole, "New member joined");

        } else {
            const botRole = member.guild.roles.cache.find((role) => role.name === "Bot");
            return await member.roles.add(botRole, "New bot joined");
        }
    }
};
