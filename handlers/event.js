const { promisify } = require("util");
const { glob } = require("glob");
const asyncGlob = promisify(glob);

module.exports = async (client) => {
    let msg = "Loading events...\n";
    (await asyncGlob(`${process.cwd()}/events/**/*.js`)).map(async (file) => {
        const event = require(file);

        const relPath = file.slice(process.cwd().length + "/events/".length);

        if (!event.name) {
            return msg += `  ${relPath} missing name\n`;
        }

        client.on(event.name, (...args) => {
            event.execute(client, ...args);
        });

        return msg += `  ${relPath} loaded\n`;
    });

    msg += "Loaded events handler!";
    console.log(msg);
};
