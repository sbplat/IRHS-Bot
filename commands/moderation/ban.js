//const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { extractIDFromString, getUserFromString, getMemberFromUser } = require("../../util/converters.js");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "ban",
    aliases: ["banuser", "banmember"],
    category: "moderation",
    description: "Bans a user",
    usage: "<user>",
    example: "username#0001",
    guildOnly: true,
    requiredPerms: ["BAN_MEMBERS"],
    enabled: true,
    run: async (client, message, args) => {
        const extractedID = extractIDFromString(args.join(" "));
        const user = await getUserFromString(client, args.join(" "));

        if (extractedID || user) {
            if (extractedID === message.member.id || user && user.id === message.member.id) {
                return await message.channel.send(`${message.author}, you cannot ban yourself!`);
            }

            if (user) {
                const member = await getMemberFromUser(user, message.guild);

                if (member && member.roles.highest.position >= message.member.roles.highest.position) {
                    return await message.channel.send(`${message.author}, you cannot ban someone who has an equal or higher role than you!`);
                }
            }

            try {
                await message.guild.members.ban(extractedID || user, { reason: `Banned by ${message.author.tag} (ID: ${message.author.id})` });
                return message.channel.send(`Successfully banned ${user ? user.tag : client.users.cache.get(extractedID).tag} from the server!`);

            } catch (err) {
                return message.channel.send(`Could not ban ${user ? user.tag : extractedID} from the server.\n${codeBlock(err.message)}`);
            }

        } else {
            return await inputError(client, "ban", message.author, message.channel, `${insertZeroWidth(args.join(" "))} aka [user] is not a valid user`);
        }
    }
};
