 const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTotalExpenses,
  getCategoryBreakdown,
  getRecentTransactions
} = require("../controllers/transactionController");

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);

router.get("/summary/total", authMiddleware, getTotalExpenses);
router.get("/summary/category", authMiddleware, getCategoryBreakdown);
router.get("/summary/recent", authMiddleware, getRecentTransactions);

router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);


module.exports = router;