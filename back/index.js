const express = require("express");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const AdminRouter = require("./routes/admin");
const verifyToken = require("./middlewares/verifyToken");
const MessageRouter = require("./routes/message");
const cors = require('cors');
const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res, next) => {
    res.json({
        title: "coucou",
    });
});


app.use("/", SecurityRouter);

app.use("/api", verifyToken, UserRouter, AdminRouter, MessageRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});