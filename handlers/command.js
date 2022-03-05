const discord = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const asyncGlob = promisify(glob);

module.exports = async (client) => {
    let msg = "Loading commands...\n";
    (await asyncGlob(`${process.cwd()}/commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        const relPath = file.slice(process.cwd().length + "/commands/".length);

        if (!command.name) {
            return msg += `  ${relPath} missing name\n`;
        }

        if (!command.category) {
            return msg += `  ${relPath} missing category\n`;
        }

        if (!command.description) {
            return msg += `  ${relPath} missing description\n`;
        }

        client.commands.set(command.name, command);
        client.categories.add(command.category);

        if (command.aliases) {
            command.aliases.forEach((alias) => {
                client.aliases.set(alias, command.name);
            });
        }

        command.requiredPerms = new discord.Permissions(command.requiredPerms || []);

        return msg += `  ${relPath} loaded\n`;
    });

    msg += "Loaded commands handler";
    console.log(msg);
};
