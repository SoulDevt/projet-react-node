const express = require("express");
const ProductRouter = require("./routes/product");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const PostRouter = require("./routes/post");
const verifyToken = require("./middlewares/verifyToken");
const socket = require("./socket.js")
const app = express();
// Socket.io
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    origins: "localhost:3000",
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res, next) => {
    console.log("test");
    res.json({
        title: "coucou",
    });
});

app.use("/", SecurityRouter);

app.use("/api", verifyToken, ProductRouter, UserRouter, PostRouter);



// établissement de la connexion
io.on("connection", socket => {
    console.log("socket connected");
});

httpServer.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});