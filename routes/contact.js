const router = require("express").Router();
const ContactController = require("../controllers/ContactController");

router.post("/create", ContactController.create);

module.exports = router;
