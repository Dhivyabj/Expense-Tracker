import { formatCurrency } from "../../utils/formatCurrency";

const SummaryCard = ({ totalExpenses = 0 }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
      <p className="text-2xl font-bold text-green-400">
        {formatCurrency(totalExpenses)}
      </p>
    </div>
  );
};

export default SummaryCard;