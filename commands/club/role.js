const discord = require("discord.js");
const { formatUsage } = require("../../util/format.js");

const pygame = new Set(["pg", "pygame"]);
const discordjs = new Set(["djs", "discord", "discordjs", "discord.js"]);

module.exports = {
    name: "role",
    aliases: ["selfrole"],
    category: "club",
    description: "Get a category role",
    usage: "[category]",
    example: "pygame",
    guildOnly: true,
    enabled: true,
    run: async (client, message, args) => {
        let category = undefined;

        if (args[0]) {
            const option = args[0].toLowerCase();

            if (pygame.has(option)) {
                category = "pygame";
            } else if (discordjs.has(option)) {
                category = "discord.js";
            }
        }

        if (!category) {
            // main roles page
            // list all available roles

            let embed = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Role Categories")
                .setDescription(`Run \`${formatUsage(client, "role")}\` to get the role for that category`)
                .addField("Pygame", `Aliases: \`${[...pygame].join(", ")}\``)
                .addField("Discord.js", `Aliases: \`${[...discordjs].join(", ")}\``)
                .setTimestamp()
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            return await message.channel.send({ embeds: [embed] });

        } else {
            const role = message.member.guild.roles.cache.find((role) => role.name === category);
            await message.member.roles.add(role, "Self role");

            let embed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`Role added!`)
                .setDescription(`Gave you the ${role} role!`)
                .setTimestamp()
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            return await message.channel.send({ content: `${message.author}`, embeds: [embed] });
        }
    }
};
