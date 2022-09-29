module.exports = express => {
    const TodosController = require("../controller/todos.controller");

    const router = express.Router();

    router.get("/", TodosController.findAll);

    router.post("/", TodosController.create);

    router.patch("/:id", TodosController.update);

    router.delete("/:id", TodosController.delete);

    return router;
}