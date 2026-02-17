
const TransactionList = ({ transactions, onDelete, onEdit, onView }) => {
  return (
    <div className="divide-y divide-gray-700"> 
      {transactions.map((t) => (
        <div
          key={t._id}
          className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-sm font-semibold">{t.title}</h3>
            <p className="text-xs text-gray-300">
              {t.category} • {new Date(t.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-400 text-sm font-medium">
              ₹{t.amount}
            </span>

            <button
              onClick={() => onView(t)}
              className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              View
            </button>

            <button
              onClick={() => onEdit(t)}
              className="text-xs bg-purple-600 px-2 py-1 rounded hover:bg-purple-700"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(t._id)}
              className="text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;