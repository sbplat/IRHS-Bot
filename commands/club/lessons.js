const discord = require("discord.js");
const { resources } = require("../../util/constants.js");
const { titleCase } = require("../../util/format.js");

const pygame = new Set(["pg", "pygame"]);
const discordjs = new Set(["djs", "discord", "discordjs", "discord.js"]);

module.exports = {
    name: "lessons",
    aliases: ["lesson", "resource", "resources"],
    category: "club",
    description: "Access past club lessons",
    usage: "[category]",
    example: "pygame",
    enabled: true,
    run: async (client, message, args) => {
        let category = undefined;

        if (args[0]) {
            const option = args[0].toLowerCase();

            if (pygame.has(option)) {
                category = "pygame";
            } else if (discordjs.has(option)) {
                category = "discordjs";
            }
        }

        if (!category) {
            // main lessons page
            // list all categories

            let embed = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Lesson Categories")
                .addField("Pygame", `Aliases: \`${[...pygame].join(", ")}\``)
                .addField("Discord.js", `Aliases: \`${[...discordjs].join(", ")}\``)
                .setTimestamp()
                .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

            return await message.channel.send({embeds: [embed]});

        } else {
            // list the resources for the specific category

            const categoryResources = resources[category];

            let embed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`${titleCase(category)} Lessons`)
                .setTimestamp()
                .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

            let counter = 1;
            for (const title in categoryResources) {
                embed.addField(`${counter++}:`, `[${title}](${categoryResources[title]})`);
            }

            return await message.channel.send({embeds: [embed]});
        }
    }
};
