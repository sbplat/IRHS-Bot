const express = require("express");
const server = express();

server.all("/", (req, res) => {
    res.send("Bot is online");
});

module.exports = () => {
    server.listen(3000, () => {
        console.log("Server is running");
    });
};
