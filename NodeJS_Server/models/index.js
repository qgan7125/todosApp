const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Todos = require("./todos.model")(sequelize, Sequelize);
db.Users = require("./users.model")(sequelize, Sequelize);

db.Users.hasMany(db.Todos);

const main = async () => {
    try {
        await db.sequelize.authenticate()
        console.log('Connection has been established successfully.');
        await db.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

main();


module.exports = db;