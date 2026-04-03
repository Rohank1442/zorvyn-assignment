const express = require("express");
const router = express.Router();
const recordController = require("../controllers/record.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const {
  createRecordValidation,
  updateRecordValidation,
  queryValidation,
} = require("../validators/record.validator");

const { validate } = require("../middleware/validation.middleware");


router.use(authenticate);

router.get(
  "/",
  authorize("admin", "analyst"),
  queryValidation,
  validate,
  recordController.getAllRecords
);

router.get(
  "/:id",
  authorize("admin", "analyst"),
  recordController.getRecordById
);

router.post(
  "/",
  authorize("admin"),
  createRecordValidation,
  validate,
  recordController.createRecord
);

router.put(
  "/:id",
  authorize("admin"),
  updateRecordValidation,
  validate,
  recordController.updateRecord
);

router.delete(
  "/:id",
  authorize("admin"),
  recordController.deleteRecord
);

module.exports = router;