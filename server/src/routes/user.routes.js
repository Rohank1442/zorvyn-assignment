const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const {
  createUserValidation,
  updateUserValidation,
} = require("../validators/user.validator");

const { validate } = require("../middleware/validation.middleware");

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", createUserValidation, validate, userController.createUser);
router.put("/:id", updateUserValidation, validate, userController.updateUser);
router.patch("/:id/status", userController.updateUserStatus);
router.patch("/:id/password", userController.resetPassword);

module.exports = router;