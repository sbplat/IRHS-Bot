//const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { getUserFromString } = require("../../util/converters.js");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "unban",
    aliases: ["unbanuser", "unbanmember"],
    category: "moderation",
    description: "Unbans a user",
    usage: "<user>",
    example: "username#0001",
    guildOnly: true,
    requiredPerms: ["BAN_MEMBERS"],
    enabled: true,
    run: async (client, message, args) => {
        await message.guild.bans.fetch();
        const user = await getUserFromString(client, args.join(" "));

        if (user) {
            try {
                await message.guild.members.unban(user, `Unbanned by ${message.author.tag} (ID: ${message.author.id})`);
                return message.channel.send(`Successfully unbanned ${user.tag} from the server!`);

            } catch (err) {
                if (err.message === "Unknown Ban") {
                    return message.channel.send(`${user.tag} is not banned!`);
                }

                return message.channel.send(`Could not unban ${user.tag} from the server.\n${codeBlock(err.message)}`);
            }

        } else {
            return await inputError(client, "unban", message.author, message.channel, `${insertZeroWidth(args.join(" "))} aka [user] is not a valid user`);
        }
    }
};
