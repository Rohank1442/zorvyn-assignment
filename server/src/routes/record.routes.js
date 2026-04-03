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

router.get("/", queryValidation, validate, recordController.getAllRecords);
router.get("/", recordController.getAllRecords);
router.get("/:id", recordController.getRecordById);

router.post(
  "/",
  authorize("admin", "analyst"),
  createRecordValidation,
  validate,
  recordController.createRecord
);

router.put(
  "/:id",
  authorize("admin", "analyst"),
  updateRecordValidation,
  validate,
  recordController.updateRecord
);

router.delete(
  "/:id",
  authorize("admin", "analyst"),
  recordController.deleteRecord
);

module.exports = router;