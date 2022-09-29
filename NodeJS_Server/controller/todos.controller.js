const db = require("../models");
const Todos = db.Todos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Body cannot be empty!" });
        return;
    }

    const { content, isCompleted, isEdit } = req.body;

    const Todo = {
        content,
        isCompleted,
        isEdit
    };

    Todos.create(Todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Cannot create data"
            })
        });
}

exports.findAll = (req, res) => {
    Todos.findAll()
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Cannot get all data"
            })
        })

};

exports.update = (req, res) => {
    const { id } = req.params;

    Todos.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo was updated successfully!"
                })
            } else {
                res.send({
                    message: `Cannot update Todos with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error ${err.message}. Cannot updating Todo with id=${id}`
            })
        })
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Todos.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Todo with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error: ${err.message}. Could not delete Todo with id=${id}`
            })
        })
};
