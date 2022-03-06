const discord = require("discord.js");
const { DateTime } = require("luxon");
const { getUserFromString, getMemberFromUser } = require("../../util/converters.js");
const { titleCase } = require("../../util/format.js");
const { emoji } = require("../../util/constants.js");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "aboutuser"],
    category: "information",
    description: "Information about a user (or yourself)",
    usage: "[user]",
    example: "939234240137158656",
    guildOnly: true,
    enabled: true,
    run: async (client, message, args) => {
        let user = await getUserFromString(client, args.join(" "));
        user = user ? await getMemberFromUser(user, message.guild) : message.member;

        let rolesCount = 0,
            roles = [];
        user.roles.cache.forEach((role) => {
            if (role.name != "@everyone") {
                roles.push(role);
                ++rolesCount;
            }
        });

        let activity = "None";
        if (user.presence.activities[0]) {
            const firstActivity = user.presence.activities[0];
            activity = `${firstActivity.name} (type: ${firstActivity.type.toLowerCase()})\n${firstActivity.state}`;
        }

        let rolesValue;
        if (rolesCount === 0) {
            rolesValue = "Roles:";
        } else if (rolesCount === 1) {
            rolesValue = "1 Role:";
        } else {
            rolesValue = `${rolesCount} Roles:`;
        }

        if (roles.length == 0) {
            roles = "None";
        } else if (roles.length > 16) {
            roles = roles.slice(0, 16).join(", ") + ` and **${roles.length - 16}** more...`;
        } else {
            roles = roles.join(", ");
        }

        let allowedPermissions = [];
        const allPermissions = Object.keys(discord.Permissions.FLAGS);
        allPermissions.forEach((permission) => {
            if (user.permissions.has(permission)) {
                allowedPermissions.push(titleCase(permission.replaceAll("_", " ").replaceAll("GUILD", "SERVER")));
            }
        });

        allowedPermissions = allowedPermissions.join(", ");

        const createdAgo = `${user.user.createdAt.toLocaleString()} (${DateTime.local().minus(Date.now() - user.user.createdTimestamp).toRelative()})`;
        const joinedAgo = `${user.joinedAt.toLocaleString()} (${DateTime.local().minus(Date.now() - user.joinedTimestamp).toRelative()})`;

        let embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`About ${user.user.tag}`)
            .setDescription(`${emoji.status[user.presence.status]} ${user}'s information (ID: \`${user.id}\`)`)
            .setThumbnail(user.displayAvatarURL())
            .addField("Activity:", activity)
            .addField("Joined:", joinedAgo, true)
            .addField("Created:", createdAgo, true)
            .addField(rolesValue, roles)
            .addField("Permissions:", allowedPermissions)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        return await message.channel.send({ embeds: [embed] });
    }
};
