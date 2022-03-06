const { logReady } = require("../../util/loggers.js");

module.exports = {
    name: "ready",
    // eslint-disable-next-line no-unused-vars
    async execute(client, message) {
        console.log(`${client.user.tag} ready!`);
        await logReady(client);
        await client.user.setActivity(`people code | ${client.prefix}help`, { type: "WATCHING" });
    }
};
