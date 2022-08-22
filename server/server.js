const express = require('express')
const db = require("./database");
const cors = require("cors")
const app = express()
const port = 4000

app.use(cors({
    origin: "*"
}))

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/todos", (req, res) => {
    db.query("SELECT * FROM todos", (err, data, fields) => {
        if (err) return err;
        res.status(200).json({
            status: "success",
            data: data,
        });
    })
})

app.post("/todos", (req, res) => {
    const newContent = req.body.content;
    db.query(`INSERT INTO todos (content) VALUES ("${newContent}")`, (err, data, fields) => {
        if (err) return err;
        res.status(200).json({
            message: "Add new Content Successfull!",
            id: data.insertId,
            content: newContent
        })
    })
})

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM todos WHERE id = ${id}`, (err, data, fields) => {
        if (err) return err;
        res.status(200).json({
            message: "Delete content Successfully",
            id: id
        })
    })
})

app.patch("/todos", (req, res) => {
    const newData = req.body;
    db.query(`UPDATE todos set content="${newData.content}", isCompleted=${newData.isCompleted}, isEdit=${newData.isEdit} WHERE id=${newData.id}`, (err, data, fields) => {
        res.status(200).json({
            message: `Modidy content ${newData.id}`
        })
    })
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})