const { Router } = require("express");
const { User } = require("../models/postgres");
const { Message } = require("../models/mongo");
const { ValidationError } = require("sequelize");
const formatError = require("../lib/formatError");

const router = new Router();

router.get("/admin", async(req, res) => {
    try {
        const totalMessages = await Message.countDocuments();
        const totalMessagesPerUser = await Message.aggregate([{
                $group: {
                    _id: {
                        sender: "$sender",
                        receiver: "$receiver",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);
        const totalUsers = await User.count();
        res.json(totalMessages, totalMessagesPerUser, totalUsers);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

module.exports = router;