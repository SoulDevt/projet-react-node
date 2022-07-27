// Create Friends model, which is a result of a Many-to-Many relationship between User and User
const {Model, DataTypes} = require("sequelize");
const connection = require("./db");
const User = require("./User");

class Friends extends Model {
}

Friends.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        follower_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:
                {
                    model: User,
                    key: "id"
                }

        },
        followed_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:
                {
                    model: User,
                    key: "id"
                }
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        denied: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize: connection,
        modelName: "friends",
        paranoid: true,
    }
);

module.exports = Friends;
