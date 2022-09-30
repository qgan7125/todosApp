module.exports = express => {
    const TodosController = require("../controller/todos.controller");

    const router = express.Router();

    router.get("/", TodosController.verifyToken, TodosController.findAll);

    router.post("/", TodosController.verifyToken, TodosController.create);

    router.patch("/:id", TodosController.verifyToken, TodosController.update);

    router.delete("/:id", TodosController.verifyToken, TodosController.delete);

    return router;
}