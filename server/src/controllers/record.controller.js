const recordService = require("../services/record.service");

exports.getAllRecords = async (req, res) => {
  try {
    const result = await recordService.getAllRecords(req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    res.json(record);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const record = await recordService.createRecord(
      req.body,
      req.user.id
    );
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body,
      req.user
    );
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const result = await recordService.deleteRecord(
      req.params.id,
      req.user
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};