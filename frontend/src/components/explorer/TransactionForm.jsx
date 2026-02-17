import { useState, useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";

const TransactionForm = ({ existing, onSuccess }) => {
  const { addTransaction, updateTransaction } = useTransactions();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    if (existing) {
      setForm(existing);
    }
  }, [existing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existing) {
      await updateTransaction(existing._id, form);
    } else {
      await addTransaction(form);
    }

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });

    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={form.title}
        className="w-3/4 p-2 text-sm bg-gray-700 rounded mx-auto block"
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        value={form.amount}
        className="w-3/4 p-2 text-sm bg-gray-700 rounded mx-auto block"
        required
      />

      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        value={form.category}
        className="w-3/4 p-2 text-sm bg-gray-700 rounded mx-auto block"
        required
      />

      <input
        name="date"
        type="date"
        onChange={handleChange}
        value={form.date}
        className="w-3/4 p-2 text-sm bg-gray-700 rounded mx-auto block"
        required
      />

      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleChange}
        value={form.notes}
        className="w-3/4 p-2 text-sm bg-gray-700 rounded mx-auto block"
      />

      <button
        className="bg-green-600 text-sm px-4 py-2 rounded mx-auto block w-1/2 hover:bg-green-700"
      >
        {existing ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
};

export default TransactionForm;

