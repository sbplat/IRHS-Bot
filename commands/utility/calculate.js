const discord = require("discord.js");
const axios = require("axios");
const { inputError } = require("../../util/errors.js");
const { insertZeroWidth } = require("../../util/format.js");

module.exports = {
    name: "calculate",
    aliases: ["calc", "solve", "math"],
    category: "utility",
    description: "Evaluate math equations/problems",
    usage: "<expression>",
    example: "[1+1, sqrt(-2)+5x10]",
    enabled: true,
    run: async (client, message, args) => {
        const expression = args.join(" ");
        let filteredExpr = expression;
        [
            ["\n", ""],
            ["\t", ""],
            ["x", "*"],
            ["**", "^"]
        ].forEach((pair) => {
            filteredExpr = filteredExpr.replace(pair[0], pair[1]);
        });

        let response, hasError = false;

        ["{", "}"].every((string) => {
            if (expression.includes(string)) {
                hasError = true;
                return false;
            }
        });

        if (!hasError) {
            try {
                response = await axios.request({
                    method: "GET",
                    url: `https://api.mathjs.org/v4/`,
                    params: {
                        expr: filteredExpr,
                        precision: 10
                    }
                });
            } catch (error) {
                hasError = true;
            }
        }

        if (hasError) {
            return await inputError(client, "calculate", message.author, message.channel, `${insertZeroWidth(expression)} aka <expression> is an invalid expression`);
        }

        let embed = new discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle(`Expression: ${expression}`)
            .setDescription(`= ${response.data}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return await message.channel.send({ embeds: [embed] });
    }
};
