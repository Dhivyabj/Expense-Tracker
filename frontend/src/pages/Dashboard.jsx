import { useEffect, useState } from "react";
import API from "../utils/api";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import CategoryChart from "../components/dashboard/CategoryChart";

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [totalRes, categoryRes, recentRes] = await Promise.all([
          API.get("/transaction/summary/total"),
          API.get("/transaction/summary/category"),
          API.get("/transaction/summary/recent"),
        ]);

        setTotalExpenses(totalRes.data.total || 0);
        setCategoryData(categoryRes.data || []);
        setRecentTransactions(recentRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard totalExpenses={totalExpenses} />
        
        <CategoryChart categoryData={categoryData} totalExpenses={totalExpenses} />
      </div>

      <div className="mt-8">
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;

