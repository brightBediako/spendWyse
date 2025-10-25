import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsAPI } from "../../services/transactions/transactionService";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  // fetch transactions data from API or state management
  // no filters by default (fetch all transactions); component can be extended to accept props
  const filters = {};
  const { data: transactions = [], isLoading, isError } = useQuery({
    queryFn: () => getTransactionsAPI(filters),
    queryKey: ["transactions-data", filters],
  });

  // Pcalculate totals for income and expenses
  const totals = transactions.reduce((acc, transaction) => {
    if (transaction?.type === "income") {
      acc.income += transaction?.amount;
    } else if (transaction?.type === "expense") {
      acc.expense += transaction?.amount;
    }
    return acc;
  }, { income: 0, expense: 0 });

  const incomeTotal = totals.income;
  const expenseTotal = totals.expense;

  // Prepare data for Doughnut chart
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Transactions",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
        hoverOffset: 10,
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Income vs Expenses",
        font: { size: 18 },
        weight: "bold",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        enabled: true,
      },
    },
    cutOut: "70%",
  };



  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200" >
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options}/>
      </div>
    </div >
  );
};

export default TransactionChart;
