module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.bot) {
            return;
        }

        // bot mentioned exactly
        if (message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) {
            return message.channel.send(`${message.author}, my prefix is \`${client.prefix}\``);
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
            return message.channel.send("This command is disabled.");
        }

        // check permissions

        if (command.ownerOnly && !client.owners.some((id) => id == message.author.id)) {
            // owner only, don't send anything
            return;
        }

        if (!message.guild && command.guildOnly) {
            return message.channel.send("This command can only be used in servers.");
        }

        if (!message.member.permissions.has(command.requiredPerms || [])) {
            return message.channel.send("You do not have permission to execute this command!");
        }

        // execute the command
        try {
            command.run(client, message, args);
        } catch (err) {
            console.log(err);
            message.channel.send(`There was an error executing that command.\n\`\`\`${err.message}\`\`\``);
        }
    }
}