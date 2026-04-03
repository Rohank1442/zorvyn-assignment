const { Op, fn, col, literal } = require("sequelize");
const Record = require("../models/record.model");

exports.getSummary = async ({ startDate, endDate }) => {
  const where = {};

  if (startDate && endDate) {
    where.date = {
      [Op.between]: [startDate, endDate],
    };
  }

  // TOTAL INCOME & EXPENSE
  const totals = await Record.findAll({
    where,
    attributes: [
      "type",
      [fn("SUM", col("amount")), "total"],
    ],
    group: ["type"],
    raw: true,
  });

  let income = 0;
  let expense = 0;

  totals.forEach((row) => {
    if (row.type === "income") income = parseFloat(row.total);
    if (row.type === "expense") expense = parseFloat(row.total);
  });

  // CATEGORY BREAKDOWN
  const categoryBreakdown = await Record.findAll({
    where,
    attributes: [
      "type",
      "category",
      [fn("SUM", col("amount")), "total"],
    ],
    group: ["type", "category"],
    raw: true,
  });

  const incomeCategories = [];
  const expenseCategories = [];

  categoryBreakdown.forEach((row) => {
    const entry = {
      category: row.category,
      total: parseFloat(row.total),
    };

    if (row.type === "income") incomeCategories.push(entry);
    else expenseCategories.push(entry);
  });

  // MONTHLY TREND
  const monthlyTrendRaw = await Record.findAll({
    where,
    attributes: [
      [literal("strftime('%Y-%m', date)"), "month"],
      "type",
      [fn("SUM", col("amount")), "total"],
    ],
    group: ["month", "type"],
    raw: true,
  });

  const monthlyMap = {};

  monthlyTrendRaw.forEach((row) => {
    if (!monthlyMap[row.month]) {
      monthlyMap[row.month] = { month: row.month, income: 0, expense: 0 };
    }

    if (row.type === "income") {
      monthlyMap[row.month].income = parseFloat(row.total);
    } else {
      monthlyMap[row.month].expense = parseFloat(row.total);
    }
  });

  const monthlyTrend = Object.values(monthlyMap);

  return {
    totals: {
      income,
      expense,
      net: income - expense,
    },
    categoryBreakdown: {
      income: incomeCategories,
      expense: expenseCategories,
    },
    monthlyTrend,
  };
};

exports.getRecentActivity = async (limit = 5) => {
  const records = await Record.findAll({
    order: [["date", "DESC"]],
    limit: parseInt(limit),
  });

  return records;
};