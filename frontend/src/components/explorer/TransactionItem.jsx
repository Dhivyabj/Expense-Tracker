import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import Swal from "sweetalert2";

const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-300 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const TransactionItem = ({
  transaction,
  query,
  onView,
  onEdit,
  onDelete,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}  
    className="bg-gray-800 p-3 rounded-lg shadow flex justify-between items-center">
    <div>
      <h4 className="text-sm font-semibold">
        {highlightText(transaction.title, query)}
      </h4>

      <p className="text-xs text-gray-400">
        {highlightText(transaction.category, query)}
      </p>

      <small className="text-xs text-gray-500">
        {formatDate(transaction.date)}
      </small>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-green-400 text-sm font-bold">
        {formatCurrency(transaction.amount)}
      </span>

      <button
        onClick={() => onView(transaction)}
        className="text-xs bg-gray-600 px-2 py-1 rounded"
      >
        View
      </button>

      <button
        onClick={() => onEdit(transaction)}
        className="text-xs bg-blue-600 px-2 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={() => {
        Swal.fire({
        title: "Are you sure?",
        text: "This transaction will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e3342f",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            onDelete(transaction._id);
         }
       });
    }}
    className="text-xs bg-red-600 px-2 py-1 rounded"
   >
    Delete
     </button>

    </div>
  </motion.div>
);

export default TransactionItem;
