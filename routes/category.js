const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/create", CategoryController.create);
router.get("/", CategoryController.read);
router.get("/:id", CategoryController.readOne);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

module.exports = router;
