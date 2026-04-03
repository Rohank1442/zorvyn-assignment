const { body } = require("express-validator");

exports.createUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["viewer", "analyst"])
    .withMessage("Role must be viewer or analyst"),
];

exports.updateUserValidation = [
  body("name").optional().notEmpty(),
  body("role").optional().isIn(["viewer", "analyst"]),
  body("isActive").optional().isBoolean(),
];