const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const todoRouter = require("./routes/todos.routes");
const UsersRouter = require("./routes/users.router");

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use("/todo", todoRouter(express));
app.use("/user", UsersRouter(express));

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})