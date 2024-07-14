const router = require("express").Router();
const ContactController = require("../controllers/ContactController");

router.post("/create", ContactController.create);
router.get("/", ContactController.read);
router.get("/:id", ContactController.readOne);
router.put("/:id", ContactController.update);
router.delete("/:id", ContactController.destroy);

module.exports = router;
