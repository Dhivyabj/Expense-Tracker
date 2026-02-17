import { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionForm from "../components/explorer/TransactionForm";
import TransactionList from "../components/explorer/TransactionList";

const Explorer = () => {
  const {
    transactions = [],
    fetchTransactions,
    deleteTransaction,
    loading,
    error,
  } = useTransactions();

  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  // Search & filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter ? t.category === categoryFilter : true;
    const matchesDate = dateFilter ? t.date.startsWith(dateFilter) : true;
    const matchesAmount = amountFilter ? t.amount <= Number(amountFilter) : true;

    return matchesSearch && matchesCategory && matchesDate && matchesAmount;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-6">
      <h1 className="text-2xl font-semibold mb-6">Transaction Explorer</h1>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">
          Failed to load transactions: {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Add Transaction */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm onSuccess={fetchTransactions} />
        </div>

        {/* Right: Transaction List */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>

          {/* Search + Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white flex-1"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white"
            />

            <input
              type="number"
              placeholder="Max Amount"
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white w-32"
            />
          </div>

          {/* Conditional rendering */}
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-400 text-center">
              Failed to load transactions: {error}
            </p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No transactions found.
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <TransactionList
                transactions={filteredTransactions}
                onDelete={deleteTransaction}
                onEdit={(t) => setEditing(t)}
                onView={(t) => setViewing(t)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <TransactionForm
              existing={editing}
              onSuccess={() => {
                setEditing(null);
                fetchTransactions();
              }}
            />
            <button
              onClick={() => setEditing(null)}
              className="mt-3 text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-3">{viewing.title}</h2>
            <p className="text-sm mb-2">
              <strong>Amount:</strong> ₹{viewing.amount}
            </p>
            <p className="text-sm mb-2">
              <strong>Category:</strong> {viewing.category}
            </p>
            <p className="text-sm mb-2">
              <strong>Date:</strong>{" "}
              {new Date(viewing.date).toLocaleDateString()}
            </p>
            <p className="text-sm mb-4">
              <strong>Notes:</strong> {viewing.notes || "No notes"}
            </p>
            <button
              onClick={() => setViewing(null)}
              className="bg-red-600 px-3 py-1 text-sm rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explorer;



