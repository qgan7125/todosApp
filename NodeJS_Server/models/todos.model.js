module.exports = (sequelize, Sequelize) => {
    const Todos = sequelize.define("Todos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: Sequelize.STRING
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isEdit: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: false
        })

    return Todos;
}