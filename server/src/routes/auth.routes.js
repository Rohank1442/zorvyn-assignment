const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const registerValidation = require("../validators/user.validator").registerValidation;
const { validate } = require("../middleware/validation.middleware");

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", authLimiter, authController.login);

module.exports = router;