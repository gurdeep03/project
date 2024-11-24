const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middlewares/jwtAuthMiddleware");  // <-- Use require() instead of import
const { Register, Login } = require("../controllers/userController");

// Route to register a new user
router.post("/register", Register);

// Route to login an existing user
router.post("/login", Login);


module.exports = router;