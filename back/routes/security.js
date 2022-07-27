const {
    Router
} = require("express");
const {
    createToken
} = require("../lib/jwt");
const {
    User
} = require("../models/postgres");
const {
    ValidationError
} = require("sequelize");
const bcryptjs = require("bcryptjs");

const router = new Router();

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        res.json({
            token: createToken(user),
            user: user,
        });
        if (!user) {
            return res.status(401).json({
                email: "Email not found",
            });
        }
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                password: "Password is incorrect",
            });
        }

    } catch (error) {
        res.sendStatus(500);
        console.error(error.message);
    }
});

router.post("/register", async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                error: error
            });
        } else {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

module.exports = router;