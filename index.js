//require("./util/keep-alive.js")();
const { Client, Collection } = require("discord.js");
require("dotenv").config();
const TOKEN = process.env.TOKEN;

const client = new Client({
    intents: 32767,
    partials: ["CHANNEL"]
});

client.categories = new Set();
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.prefix = "-";
client.owners = [396479397537906689];
//client.owners = [];

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

["command", "event"].forEach(async (handler) => {
    await require(`./handlers/${handler}`)(client);
});

client.login(TOKEN).then(() => {
    console.log("Successfully logged in!");
}).catch((error) => {
    console.log(`Invalid TOKEN!\n${error}`);
});
