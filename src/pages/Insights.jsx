import { useState } from "react";
import Usestore from "../store/Usestore";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  LabelList,
} from "recharts";

function Insights() {
  const transactions = Usestore((state) => state.transactions);

  const months = [
    ...new Set(transactions.map((t) => t.date.slice(0, 7))),
  ].sort((a, b) => new Date(b) - new Date(a));

  const [selectedMonth, setSelectedMonth] = useState("All");

  // Filter Transactions based on months:
  const filteredTxns =
    selectedMonth === "All"
      ? transactions
      : transactions.filter((t) => t.date.startsWith(selectedMonth));

  const expenses = filteredTxns.filter((t) => t.amount < 0);
  const income = filteredTxns.filter((t) => t.amount > 0);

  const totalExpense = expenses.reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome === 0 ? 0 : Math.round((netBalance / totalIncome) * 100);

  let largestExpense = { amount: 0, title: "N/A" };

  expenses.forEach((t) => {
    if (Math.abs(t.amount) > largestExpense.amount) {
      largestExpense = {
        amount: Math.abs(t.amount),
        title: t.title,
      };
    }
  });

  const expenseMap = {};
  const incomeMap = {};

  expenses.forEach((t) => {
    if (!expenseMap[t.category]) expenseMap[t.category] = 0;
    expenseMap[t.category] += Math.abs(t.amount);
  });

  income.forEach((t) => {
    if (!incomeMap[t.category]) incomeMap[t.category] = 0;
    incomeMap[t.category] += t.amount;
  });

  // sorted Top 5:
  const expenseData = Object.entries(expenseMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const incomeData = Object.entries(incomeMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const topCategory = expenseData[0]?.category || "N/A";

  // Avg daily Expense
  const uniqueDays = new Set(expenses.map((t) => t.date)).size;
  const avgDailyExpense =
    uniqueDays === 0 ? 0 : Math.round(totalExpense / uniqueDays);

  // monthly Table Data
  const monthlyMap = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthlyMap[month]) {
      monthlyMap[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (t.amount > 0) {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += Math.abs(t.amount);
    }
  });

  const monthlyData = Object.values(monthlyMap).sort(
    (a, b) => new Date(b.month) - new Date(a.month)
  );

  let insightText = "";

  if (filteredTxns.length === 0) {
    insightText = "No data for selected period.";
  } else if (totalExpense > totalIncome) {
    insightText =
      "⚠️ You're overspending this period. Fix this before it compounds.";
  } else {
    insightText = `You're saving ${savingsRate}% this period. Biggest hit: ₹${largestExpense.amount} on "${largestExpense.title}".`;

    if (topCategory !== "N/A") {
      insightText += ` Major drain: ${topCategory}.`;
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Insights</h1>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setSelectedMonth("All")}
          className={`px-4 py-2 rounded-xl text-sm ${
            selectedMonth === "All"
              ? "bg-blue-500 text-white"
              : "bg-[#111827] text-gray-400"
          }`}
        >
          All
        </button>

        {months.map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m)}
            className={`px-4 py-2 rounded-xl text-sm ${
              selectedMonth === m
                ? "bg-blue-500 text-white"
                : "bg-[#111827] text-gray-400"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Net Balance</p>
          <h2 className="text-2xl font-semibold mt-2">
            ₹{netBalance.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Savings Rate</p>
          <h2 className="text-2xl font-semibold mt-2">
            {savingsRate}%
          </h2>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Transactions</p>
          <h2 className="text-2xl font-semibold mt-2">
            {filteredTxns.length}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Top Category</p>
          <h2 className="text-xl font-semibold mt-2">
            {topCategory}
          </h2>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Avg Daily Spend</p>
          <h2 className="text-xl font-semibold mt-2">
            ₹{avgDailyExpense.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">Largest Expense</p>
          <h2 className="text-xl font-semibold mt-2">
            ₹{largestExpense.amount}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {largestExpense.title}
          </p>
        </div>

      </div>

      {/* EXPENSE GRAPH */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-semibold mb-4">Top Expenses</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseData}>
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="amount" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* INCOME GRAPH */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-semibold mb-4">Top Income Sources</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeData}>
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="amount" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-semibold mb-2">Insight</h2>
        <p className="text-gray-300">{insightText}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold mb-4">All Months Earnings</h2>
          {monthlyData.map((m) => (
            <div key={m.month} className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">{m.month}</span>
              <span className="text-green-400">₹{m.income.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold mb-4">All Months Expenses</h2>
          {monthlyData.map((m) => (
            <div key={m.month} className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">{m.month}</span>
              <span className="text-red-400">₹{m.expense.toLocaleString()}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Insights;
