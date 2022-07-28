const { Router } = require("express");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

router.get("/users", async(req, res) => {
    try {
        const users = await User.findAll({
            where: req.query,
            order: [
                ['id', 'ASC']
            ]
        });
        res.json(users);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.post("/users", async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                quantity: "must be greater than 0",
                title: "must not be empty",
            });
        } else {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

router.put("/users/:id", async(req, res) => {
    try {
        const result = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true,
        });
        const [, lines] = result;
        if (!lines[0]) {
            res.sendStatus(404);
        } else {
            res.json(lines[0]);
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(error);
            res.status(422).json({
                quantity: "must be greater than 0",
                title: "must not be empty",
            });
        } else {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

router.delete("/users/:id", async(req, res) => {
    try {
        const nbLine = await User.destroy({ where: { id: req.params.id } });
        if (!nbLine) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.get("/users/:id", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(user);
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

// Friendship routes
router.get("/users/:id/followers", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(await user.getFollowers());
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.get("/users/:id/following", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(await user.getFollowed());
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.post("/users/:id/friend/:fid/request", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const friend = await User.findByPk(req.params.fid);
        if (!user || !friend) {
            res.sendStatus(404);
        } else {
            await user.requestFriendship(req.params.fid).then(() => {
                res.sendStatus(201);
            });
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.put("/users/:id/friend/:fid/accept", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const friend = await User.findByPk(req.params.fid);
        if (!user || !friend) {
            res.sendStatus(404);
        } else {
            await user.acceptFriendshipRequest(req.params.fid).then(() => {
                res.sendStatus(201);
            });
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.delete("/users/:id/friend/:fid/deny", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const friend = await User.findByPk(req.params.fid);
        if (!user || !friend) {
            res.sendStatus(404);
        } else {
            await user.denyFriendshipRequest(req.params.fid).then(() => {
                res.sendStatus(201);
            });
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.delete("/users/:id/friend/:fid/unfollow", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const friend = await User.findByPk(req.params.fid);
        if (!user || !friend) {
            res.sendStatus(404);
        } else {
            await user.unfollowUser(req.params.fid).then(() => {
                res.sendStatus(201);
            });
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

/* Friend list route */
router.get("/users/:id/awaitingFriendsRequests", async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(await user.getFriendshipRequests());
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});


module.exports = router;