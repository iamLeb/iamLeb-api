const router = require("express").Router();
const PortfolioController = require("../controllers/PortfolioController");

router.post("/create", PortfolioController.create);
router.get("/", PortfolioController.read);
router.get("/:id", PortfolioController.readOne);
router.put("/:id", PortfolioController.update);
router.delete("/:id", PortfolioController.destroy);

module.exports = router;
