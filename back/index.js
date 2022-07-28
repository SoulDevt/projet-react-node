const express = require("express");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const AdminRouter = require("./routes/admin");
const verifyToken = require("./middlewares/verifyToken");
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
    console.log("test");
    res.json({
        title: "coucou",
    });
});


app.use("/", SecurityRouter);

app.use("/api", verifyToken, UserRouter, AdminRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});