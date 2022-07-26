const {
    io
} = require("socket.io-client");

module.exports = (server) => {
    const socket = io(server);
    socket.on("connection", (client) => {
        console.log("socket connected");
    });
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });
}