//const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { getUserFromString, getMemberFromUser } = require("../../util/converters.js");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "kick",
    aliases: ["kickuser", "kickmember", "kickout"],
    category: "moderation",
    description: "Kicks out a member",
    usage: "<member>",
    example: "username#0001",
    guildOnly: true,
    requiredPerms: ["KICK_MEMBERS"],
    enabled: true,
    run: async (client, message, args) => {
        let user = await getUserFromString(client, args.join(" "));

        if (user) {
            user = await getMemberFromUser(user, message.guild);

            if (user == message.member) {
                return await message.channel.send(`${message.author}, you cannot kick yourself!`);
            }

            if (user.roles.highest.position >= message.member.roles.highest.position) {
                return await message.channel.send(`${message.author}, you cannot kick someone who has an equal or higher role than you!`);
            }

            try {
                await user.kick(`Kicked by ${message.author.tag} (ID: ${message.author.id})`);
                return message.channel.send(`Successfully kicked ${user.user.tag} from the server!`);

            } catch (err) {
                return message.channel.send(`Could not kick ${user.user.tag} from the server.\n${codeBlock(err.message)}`);
            }

        } else {
            return await inputError(client, "kick", message.author, message.channel, `${insertZeroWidth(args.join(" "))} aka [member] is not a valid member`);
        }
    }
};
