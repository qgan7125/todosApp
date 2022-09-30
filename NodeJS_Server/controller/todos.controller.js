require("dotenv").config();

const db = require("../models");
const jwt = require("jsonwebtoken");
const Todos = db.Todos;

exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        next();
        return
    }

    try {
        token = token.split(" ")[1];

        if (token === null || !token) return res.status(401).send('Unauthorized request');

        const verifiedUser = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser;
        next();
    } catch (err) {
        next();
    }

}

exports.create = (req, res) => {
    const { user } = req;

    if (!req.body) {
        res.status(400).send({ message: "Body cannot be empty!" });
        return;
    }

    const { content, isCompleted, isEdit } = req.body;

    const Todo = {
        content,
        isCompleted,
        isEdit,
        UserId: user ? user.userID : null,
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
    const { user } = req;

    Todos.findAll({ where:  { UserId: user ? user.userID : null } })
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
    const { user } = req;

    Todos.update(req.body, {
        where: { id: id, UserId: user ? user.userID : null }
    })
        .then(num => {
            if (num == 0) {
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
    const { user } = req;

    Todos.destroy({ where: { id: id, UserId: user ? user.userID : null } })
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
