const router = require("express").Router();
const ClientController = require("../controllers/ClientController");

router.post("/create", ClientController.create);
router.get("/", ClientController.read);
router.get("/:id", ClientController.readOne);
router.put("/:id", ClientController.update);
router.delete("/:id", ClientController.destroy);

module.exports = router;
