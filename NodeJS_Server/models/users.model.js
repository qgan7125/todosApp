module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
        {
            timestamps: false
        })

    return Users;
}