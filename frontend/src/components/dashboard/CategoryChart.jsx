import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ categoryData = [], totalExpenses = 0 }) => {
  if (categoryData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
        <p>No data available</p>
      </div>
    );
  }

  const data = {
    labels: categoryData.map(item => item._id),
    datasets: [
      {
        data: categoryData.map(item => item.totalAmount),
        backgroundColor: [
          "#3B82F6", 
          "#10B981", 
          "#F59E0B", 
          "#EF4444", 
          "#8B5CF6"  
        ],
        borderColor: "#1F2937",
        borderWidth: 2,
        cutout: "65%" 
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false 
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `₹${value}`;
          }
        }
      }
    }
  };

  // ✅ Custom plugin for center text
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      ctx.font = "bold 16px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";

      const text = `₹${totalExpenses}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 h-80 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      
      <div className="flex flex-1 items-center justify-between pb-6">
        <div className="w-2/3 h-56"> 
          <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
        </div>
        <div className="w-1/3 pl-4">
          <ul className="space-y-3 text-white">
            {categoryData.map((item, idx) => (
              <li key={item._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className="inline-block w-4 h-4 mr-2 rounded"
                    style={{ backgroundColor: data.datasets[0].backgroundColor[idx] }}
                  ></span>
                  <span className="font-semibold">{item._id}</span>
                </div>
                <span className="text-gray-300">₹{item.totalAmount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;