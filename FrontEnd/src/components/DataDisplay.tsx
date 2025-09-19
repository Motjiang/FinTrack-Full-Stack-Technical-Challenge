import React from "react";
import type { FinancialRecord } from "../types/financialRecord";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataDisplayProps {
  records: FinancialRecord[];
}

const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
  "#9966FF", "#FF9F40", "#C9CBCF", "#8BC34A",
  "#E91E63", "#00BCD4", "#FFC107", "#9C27B0"
];

const DataDisplay: React.FC<DataDisplayProps> = ({ records }) => {
  if (!records.length)
  return (
    <div className="alert alert-warning text-center" role="alert">
      No financial records found.
    </div>
  );


  const labels = records.map((r) => r.month);
  const data = records.map((r) => r.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount Per Month",
        data,
        backgroundColor: COLORS.slice(0, data.length), // map first N colors
      },
    ],
  };

  return (
    <div>
      <h4>Financial Records</h4>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.record_id}>
              <td>{r.month}</td>
              <td>R {r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Bar data={chartData} />
    </div>
  );
};

export default DataDisplay;
