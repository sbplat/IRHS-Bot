module.exports = {
    name: "ready",
    async execute(client, message) {
        await client.user.setActivity(`people code | ${client.prefix}help`, {type: "WATCHING"});
        console.log(`${client.user.tag} ready!`);
    }
}
