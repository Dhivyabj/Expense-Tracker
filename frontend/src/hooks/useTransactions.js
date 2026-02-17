import { useState } from "react";
import API from "../utils/api"; // adjust import if your API file is elsewhere
import { toast } from "react-toastify";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const res = await API.get("/transaction", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API raw response:", res.data);

      if (res.data.transactions) {
        setTransactions(res.data.transactions); 
      } else if (Array.isArray(res.data)) {
        setTransactions(res.data);
      } else {
        setTransactions([]);
      }

      console.log("Fetched transactions:", res.data.transactions);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch transactions");
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false); 
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/transaction", transaction, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
      toast.success("Transaction added successfully");
    } catch (err) {
      console.error("Add error:", err);
      toast.error("Failed to add transaction");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/transaction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
      toast.success("Transaction deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete transaction");
    }
  };

  return {
    transactions,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    loading,
    error,
  };
};