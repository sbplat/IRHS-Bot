const { promisify } = require("util");
const { glob } = require("glob");
const asyncGlob = promisify(glob);

module.exports = async(client) => {
    (await asyncGlob(`${process.cwd()}/commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        const relPath = file.slice(process.cwd().length + "/commands/".length);

        if (!command.name) {
            return console.log(`${relPath} missing name`);
        }

        if (!command.category) {
            return console.log(`${relPath} missing category`);
        }

        if (!command.description) {
            return console.log(`${relPath} missing description`);
        }

        client.commands.set(command.name, command);
        client.categories.add(command.category);

        if (command.aliases) {
            command.aliases.forEach((alias) => {
                client.aliases.set(alias, command.name);
            });
        }

        return console.log(`${relPath} loaded`);
    });

    console.log("Loaded commands handler");
}
