const dashboardService = require("../services/dashboard.service");

exports.getSummary = async (req, res) => {
  try {
    const result = await dashboardService.getSummary(req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const result = await dashboardService.getRecentActivity(limit);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};