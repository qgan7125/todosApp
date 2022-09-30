module.exports = express => {
    const UsersController = require("../controller/users.controller");

    const router = express.Router();

    router.post("/login", UsersController.login);

    router.post("/register", UsersController.create);

    router.patch("/", UsersController.verifyUserToken, UsersController.update);

    router.delete("/", UsersController.verifyUserToken, UsersController.delete);

    return router;
}