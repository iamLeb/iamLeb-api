const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/login", AuthController.login);  // Fixed: added a slash before "login"
router.post("/register", AuthController.register);
router.get("/check", verifyToken, AuthController.checkAuth);
router.get("/logout", AuthController.logout);

module.exports = router; // export module
