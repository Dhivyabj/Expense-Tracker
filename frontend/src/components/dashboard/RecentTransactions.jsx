import { formatCurrency } from "../../utils/formatCurrency";

const RecentTransactions = ({ transactions = [] }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx._id} className="flex justify-between py-2 border-b border-gray-700">
              <span>{tx.title}</span>
              <span className="text-green-400">{formatCurrency(tx.amount)}</span>
              <span className="text-gray-400 text-sm">
                {new Date(tx.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;