const discord = require("discord.js");
//const { isOwner, checkPerms } = require("../../util/checks.js");
const { inputError } = require("../../util/errors.js");
const { argsInfo, formatUsage, formatExample, insertZeroWidth, titleCase } = require("../../util/format.js");

const MAX_COMMANDS_PER_PAGE = 7;

module.exports = {
    name: "help",
    aliases: ["h", "commands", "cmds", "list"],
    category: "info",
    description: "Bot commands",
    usage: "[category/command] [page #]",
    example: "ping",
    enabled: true,
    run: async (client, message, args) => {
        let page = 1,
            query = "";
        // query is greedy because it's a string
        // try to parse the page # first
        if (args[0] && args[1]) {
            page = parseInt(args[1]);
            if (isNaN(page)) {
                page = 1;
            }
            query = args[0];
        } else if (args[0]) {
            page = parseInt(args[0]);
            if (isNaN(page)) {
                page = 1;
                query = args[0];
            }
        }

        query = query.toLowerCase();

        if (query.length === 0) {
            // main help page
            // list all categories

            let embed = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Command Categories")
                .setDescription(`Run \`${client.prefix}help category\` to view the list of commands available in that category`)
                .addField("Club", "Programming club", true)
                .addField("Info", "General information", true)
                .addField("Moderation", "Moderation tools", true)
                .addField("Utility", "Random utilities", true)
                .setTimestamp()
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            return await message.channel.send({ embeds: [embed] });

        } else {
            if (client.categories.has(query)) {
                // category help page

                if (page < 1) {
                    return await inputError(client, "help", message.author, message.channel, `${page} aka [page #] must be at least 1`);
                }

                let commandsInfo = [];
                client.commands.forEach((command) => {
                    if (command.category === query /*&& (!message.guild || !command.guildOnly || isOwner(client, message.author.id) || checkPerms(client, command, message.member, message.guild))*/ ) {
                        commandsInfo.push([command.name, command.description]);
                    }
                });

                commandsInfo.sort();

                const maxPages = Math.ceil(commandsInfo.length / MAX_COMMANDS_PER_PAGE);

                if (page > maxPages) {
                    return await inputError(client, "help", message.author, message.channel, `${insertZeroWidth(page)} aka [page #] must be at most ${maxPages}`);
                }

                let embed = new discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`${titleCase(query)} Category`)
                    .setTimestamp()
                    .setFooter({ text: `${message.author.tag} | Page ${page}/${maxPages}`, iconURL: message.author.displayAvatarURL() });

                let description = `Run \`${client.prefix}help command\` to view the detailed help message for that command\n\n`;
                for (let i = (page - 1) * MAX_COMMANDS_PER_PAGE; i < Math.min(page * MAX_COMMANDS_PER_PAGE, commandsInfo.length); ++i) {
                    description += `**${titleCase(commandsInfo[i][0])}**\n${commandsInfo[i][1]}\n\n`;
                }

                embed.setDescription(description);

                return await message.channel.send({ embeds: [embed] });

            } else {
                const command = client.commands.get(query) || client.commands.get(client.aliases.get(query));

                if (command /*&& (!message.guild || !command.guildOnly || isOwner(client, message.author.id) || checkPerms(client, command, message.member, message.guild))*/ ) {
                    // specific command help page

                    let embed = new discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Help for **${titleCase(command.name)}**`)
                        .setDescription(
                            `Name: **${titleCase(command.name)}**\n` +
                            `Aliases: ${command.aliases.join(", ") || "none"}\n` +
                            `Category: ${titleCase(command.category)}\n` +
                            `Description: ${command.description}\n` +
                            `Usage: \`${formatUsage(client, command)}\` (${argsInfo})\n` +
                            `Example: \`${formatExample(client, command)}\`\n` +
                            `Guild Only: ${(new Boolean(command.guildOnly)).toString()}`
                        )
                        .setTimestamp()
                        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

                    return await message.channel.send({ embeds: [embed] });

                } else {
                    return await inputError(client, "help", message.author, message.channel, `${insertZeroWidth(query)} aka [category/command] is not a valid category or command`);
                }
            }
        }
    }
};
