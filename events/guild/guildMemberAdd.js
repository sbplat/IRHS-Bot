const discord = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        let embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Welcome ${member.user.username}`)
            .setDescription(`Welcome ${member.user} to ${member.guild.name}!`)
            .setTimestamp()
            .setFooter({text: `${member.user.tag}`, iconURL: member.user.displayAvatarURL()});
        await member.guild.systemChannel.send({embeds: [embed]});

        const coderRole = member.guild.roles.cache.find((role) => role.name == "Coder");
        return await member.roles.add(coderRole, "New member joined");
    }
}
