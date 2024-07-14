const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/create", UserController.create);
router.get("/", UserController.read);
router.get("/:id", UserController.readOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;