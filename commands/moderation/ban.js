//const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { getUserFromString, getMemberFromUser } = require("../../util/converters.js");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "ban",
    aliases: ["banuser", "banmember"],
    category: "moderation",
    description: "Bans a member",
    usage: "<member>",
    example: "username#0001",
    guildOnly: true,
    requiredPerms: ["BAN_MEMBERS"],
    enabled: true,
    run: async (client, message, args) => {
        let user = await getUserFromString(client, args.join(" "));

        if (user) {
            user = await getMemberFromUser(user, message.guild);

            if (user == message.member) {
                return await message.channel.send(`${message.author}, you cannot ban yourself!`);
            }

            if (user.roles.highest.position >= message.member.roles.highest.position) {
                return await message.channel.send(`${message.author}, you cannot ban someone who has an equal or higher role than you!`);
            }

            try {
                await message.guild.members.ban(user, { reason: `Banned by ${message.author.tag} (ID: ${message.author.id})` });
                return message.channel.send(`Successfully banned ${user.user.tag} from the server!`);

            } catch (err) {
                return message.channel.send(`Could not ban ${user.user.tag} from the server.\n${codeBlock(err.message)}`);
            }

        } else {
            return await inputError(client, "ban", message.author, message.channel, `${insertZeroWidth(args.join(" "))} aka [member] is not a valid member`);
        }
    }
};
