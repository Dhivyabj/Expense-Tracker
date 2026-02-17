import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transaction");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  const addTransaction = async (data) => {
    const res = await API.post("/transaction", data);
    setTransactions([res.data, ...transactions]);
  };

  const updateTransaction = async (id, data) => {
    const res = await API.put(`/transaction/${id}`, data);
    setTransactions(
      transactions.map((t) => (t._id === id ? res.data : t))
    );
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transaction/${id}`);
    setTransactions(transactions.filter((t) => t._id !== id));
  };


  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
