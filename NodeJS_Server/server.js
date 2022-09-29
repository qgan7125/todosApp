const express = require('express');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: "*"
}))

app.use(express.json());

const todoRouter = require("./routes/todos.routes");

app.use("/todo", todoRouter(express));


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})