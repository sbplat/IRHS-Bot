const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "source",
    aliases: ["src", "sourcecode", "inspect"],
    category: "information",
    description: "View a command's source code",
    usage: "<command>",
    example: "source",
    enabled: true,
    run: async (client, message, args) => {
        if (!args[0]) {
            return await inputError(client, "source", message.author, message.channel, `<command> is required`);
        }

        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

        if (!command) {
            return await inputError(client, "source", message.author, message.channel, `${insertZeroWidth(args[0])} aka <command> is not a valid command`);
        }

        const title = `Source code for \`${command.name}\``;
        const sourceCode = command.run.toString().replaceAll("    ", "  ");

        const messageChunks = await discord.Util.splitMessage(sourceCode, { maxLength: 1950, char: "\n" });

        await message.channel.send(`${title}\n${codeBlock("js", messageChunks[0])}`);
        for (let i = 1; i < messageChunks.length; ++i) {
            await message.channel.send(`${codeBlock("js", messageChunks[i])}`);
        }
    }
};
