const { promisify } = require("util");
const { glob } = require("glob");
const asyncGlob = promisify(glob);

module.exports = async (client) => {
    (await asyncGlob(`${process.cwd()}/events/**/*.js`)).map(async (file) => {
        const event = require(file);

        const relPath = file.slice(process.cwd().length + "/events/".length);

        if (!event.name) {
            return console.log(`${relPath} missing name`);
        }

        client.on(event.name, (...args) => {
            event.execute(client, ...args);
        });

        return console.log(`${relPath} loaded`);
    });

    console.log("Loaded events handler");
};
