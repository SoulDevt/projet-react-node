const Sequelize = require("sequelize");

const connection = new Sequelize("app", "root", "password", {
    host: 'db',
    dialect: 'postgres'
});
connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = connection;