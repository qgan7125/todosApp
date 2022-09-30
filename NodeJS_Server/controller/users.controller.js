require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.Users;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ error: "Must provide username and password" });
        return;
    }

    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);

        const token = jwt.sign({ userID: user.id, username: user.username },
            process.env.JWT_ACCESS_TOKEN,
            {
                expiresIn: "1h"
            })
        if (validPassword) {
            res.status(200).json({
                message: "Login Successfully!",
                jwt: token
            })
        } else {
            res.status(401).send("Worng Password");
        }
    } else {
        res.status(401).send("Not register");
    }
};

exports.verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).send("Access Denied");

    try {
        token = token.split(" ")[1];

        if (token === null || !token) return res.status(401).send('Unauthorized request');

        const verifiedUser = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; 
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Body cannot be empty!" });
        return;
    }

    const { username, password } = req.body;

    const User = {
        username: username,
        password: await hashPassword(password)
    }

    Users.create(User)
        .then(data => {
            res.send({
                message: `User(${data.username}) register successfully!`,
                userInfo: data.id
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Cannot register"
            })
        })
};

exports.update = async (req, res) => {
    const { userID } = req.user;

    if (!req.body.password) {
        res.status(400).send({ message: "Must have new password" });
        return;
    }

    const newUser = { password: await hashPassword(req.body.password) };

    Users.update(newUser, {
        where: { id: userID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully!"
                })
            } else {
                res.status(400).send({
                    message: `Cannot update Users with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error ${err.message}`
            })
        })
}

exports.delete = (req, res) => {
    const { userID } = req.user;

    Users.destroy({ where: { id: userID } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error: ${err.message}. Could not delete User with id=${id}`
            })
        })
};