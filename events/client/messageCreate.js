const { codeBlock } = require("@discordjs/builders");
const { isOwner, checkPerms } = require("../../util/checks.js");
const { logCommandError } = require("../../util/loggers.js");

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.bot) {
            return;
        }

        if (message.channel.partial) {
            await message.channel.fetch();
        }

        if (message.partial) {
            await message.fetch();
        }

        // bot mentioned exactly
        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            return await message.channel.send(`${message.author}, my prefix is \`${client.prefix}\``);
        }

        // ignore messages that don't start with the bot prefix or bot mention
        if (!message.content.startsWith(client.prefix) && !message.content.startsWith(`<@!${client.user.id}>` && !message.content.startsWith(`<@${client.user.id}>`))) {
            return;
        }

        // parse command
        const args = message.content.slice(client.prefix.length).trim().split(/\s+/);
        const cmdName = args.shift().toLowerCase();
        const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));

        if (!command) {
            return;
        }

        if (!command.enabled) {
            return await message.channel.send("This command is disabled.");
        }

        if (!message.guild && command.guildOnly) {
            return await message.channel.send("This command can only be used in servers.");
        }

        // check permissions
        if (!isOwner(client, message.author.id) && message.guild && !checkPerms(client, command, message.member, message.guild)) {
            return await message.channel.send("You do not have permission to execute this command!");
        }

        // execute the command
        try {
            await command.run(client, message, args);
        } catch (err) {
            console.error(`Error executing ${cmdName}. (${message.content})\n`, err);
            await logCommandError(client, err, command, message);
            return await message.channel.send(`There was an error executing that command.\n${codeBlock(err.message)}`);
        }
    }
};
