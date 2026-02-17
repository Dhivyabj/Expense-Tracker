const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// Add 
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      category,
      date: date || Date.now(),
      notes,
      user: req.user.id,
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get 
exports.getTransactions = async (req, res) => {
  try {
    const {
      search,
      category,
      minAmount,
      maxAmount,
      from,
      to,
      page = 1,
      limit = 10,
    } = req.query;

    let query = { user: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalTransactions: total,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update 
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete 
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Transaction deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Total Expenses
exports.getTotalExpenses = async (req, res) => {
  try {
    const total = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    res.json({ total: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Category Breakdown
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const breakdown = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
    ]);
    res.json(breakdown);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Recent Transactions
exports.getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(5);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};