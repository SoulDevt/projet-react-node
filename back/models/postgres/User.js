// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes, Op } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");
const Friends = require("./Friends");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "user",
    paranoid: true,
  }
);
User.belongsToMany(User, {
    as: "Following",
    through: Friends,
    foreignKey: "follower_user_id",
    onDelete: "CASCADE",
});
User.belongsToMany(User, {
    as: "Followed",
    through: Friends,
    foreignKey: "followed_user_id",
    onDelete: "CASCADE",
});

User.prototype.hasValidPassword = function ( password ) {
    return bcryptjs.compareSync(password, this.password);
}
User.prototype.requestFriendship = async function (userId) {
    if (userId !== this.id)
        await Friends.create({
            follower_user_id: this.id,
            followed_user_id: userId,
        });
    else throw new Error("You can't request friendship with yourself");
}
User.prototype.acceptFriendshipRequest = async function (userId) {
    if (userId !== this.id)
        await Friends.update({
        accepted: true, denied: false,
        }, {
            where: {
                follower_user_id: userId,
                followed_user_id: this.id,
            },
        })
    else throw new Error("You can't accept friendship with yourself");
}
User.prototype.denyFriendshipRequest = async function (userId) {
    if (userId !== this.id)
        await Friends.update({
        denied: true, accepted: false,
        }, {
            where: {
                follower_user_id: userId,
                followed_user_id: this.id,
            },
        })
    else throw new Error("You can't deny friendship with yourself");
}
User.prototype.unfollowUser = async function (userId) {
    if (userId !== this.id)
        await Friends.destroy({
        where: {
            follower_user_id: this.id,
            followed_user_id: userId,
        },
    })
    else throw new Error("You can't unfollow yourself");
}
User.prototype.isFollowing = async function (userId) {
    const friend = await Friends.findOne({
        where: {
            follower_user_id: this.id,
            followed_user_id: userId,
        },
    });
    return !!friend;
}
User.prototype.isFriendsWith = async function (userId) {
    const friend = await Friends.findOne({
        where: {
            [Op.or]: [
                {
                    follower_user_id: this.id,
                    followed_user_id: userId,
                    accepted: true,
                },
                {
                    follower_user_id: userId,
                    followed_user_id: this.id,
                    accepted: true,
                }
            ]
        },
    });
    return !!friend;
}
User.prototype.getFollowers = async function () {
    const followers = await Friends.findAll({
        where: {
            followed_user_id: this.id,
        },
    });
    return followers.map(follower => follower.follower_user_id);
}
User.prototype.getFollowed = async function () {
    const followed = await Friends.findAll({
        where: {
            follower_user_id: this.id,
        },
    });
    return followed.map(followed => followed.followed_user_id);
}
User.prototype.getFriends = async function () {
    const friends = await Friends.findAll({
        where: {
            follower_user_id: this.id,
            accepted: true,
        },
    });
    return friends.map(friend => friend.followed_user_id);
}
User.prototype.getFriendshipRequests = async function () {
    const requests = await Friends.findAll({
        where: {
            followed_user_id: this.id,
            accepted: false,
            denied: false,
        },
    });
    return requests.map(request => request.follower_user_id);
}

User.addHook("beforeCreate", async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

module.exports = User;
