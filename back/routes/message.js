const { Router } = require("express");
const { User } = require("../models/postgres");
const { Message } = require("../models/mongo");
const { ValidationError } = require("sequelize");
const formatError = require("../lib/formatError");

const router = new Router();

router.get("/messages", async(req, res) => {
    try {
        const totalMessages = await Message.estimatedDocumentCount();
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
        res.json(totalMessages);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.get("/messages:id", async(req, res) => {
    try {
        const totalMessagesPerUser = await Message.aggregate([{
                $group: {
                    _id: {
                        sender: res.params.id,
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
        res.json(totalMessagesPerUser);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

module.exports = router;