const { body, query } = require("express-validator");

exports.createRecordValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("date")
    .isISO8601()
    .withMessage("Date must be valid"),

  body("description")
    .optional()
    .isString(),
];

exports.updateRecordValidation = [
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be positive"),

  body("type")
    .optional()
    .isIn(["income", "expense"]),

  body("date")
    .optional()
    .isISO8601(),
];

exports.queryValidation = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1 }),
];