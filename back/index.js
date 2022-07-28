const express = require("express");
const ProductRouter = require("./routes/product");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const PostRouter = require("./routes/post");
const AdminRouter = require("./routes/admin");
const verifyToken = require("./middlewares/verifyToken");
const MessageRouter = require("./routes/message");
const cors = require('cors');
const app = express();
const { createServer } = require('http');
const chat = require('./lib/socket');
const { Server } = require('socket.io');

app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

app.use("/api", verifyToken, ProductRouter, UserRouter, PostRouter, AdminRouter, MessageRouter);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

server.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
chat(io);