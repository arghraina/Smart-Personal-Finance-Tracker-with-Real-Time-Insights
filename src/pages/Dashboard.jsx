import useStore from "../store/useStore";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const transactions = useStore((state) => state.transactions);

  // 💰 Totals
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expenses;

  // 🔥 GROUP BY MONTH (FIXED)
  const groupedByMonth = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM

    if (!groupedByMonth[month]) {
      groupedByMonth[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (t.amount > 0) {
      groupedByMonth[month].income += t.amount;
    } else {
      groupedByMonth[month].expense += Math.abs(t.amount);
    }
  });

  // Convert → sort chronologically
  const lineData = Object.values(groupedByMonth).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  // 🥧 Expense Category Pie
  const groupedByCategory = {};

  transactions.forEach((t) => {
    if (t.amount < 0) {
      if (!groupedByCategory[t.category]) {
        groupedByCategory[t.category] = 0;
      }
      groupedByCategory[t.category] += Math.abs(t.amount);
    }
  });

  const pieData = Object.keys(groupedByCategory).map((key) => ({
    name: key,
    value: groupedByCategory[key],
  }));

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
  ];

  return (
    <div className="space-y-6">
      
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-white/5 relative overflow-hidden hover:scale-[1.02] transition-all duration-300">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <h2 className="text-3xl font-semibold mt-2">
            ₹{balance.toLocaleString()}
          </h2>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 hover:scale-[1.02] transition-all duration-300">
          <p className="text-gray-400 text-sm">Total Income</p>
          <h2 className="text-2xl font-semibold mt-2 text-green-400">
            ₹{income.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 hover:scale-[1.02] transition-all duration-300">
          <p className="text-gray-400 text-sm">Total Expenses</p>
          <h2 className="text-2xl font-semibold mt-2 text-red-400">
            ₹{Math.abs(expenses).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ✅ CLEAN MONTHLY LINE CHART */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Income vs Expenses
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22C55E"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-semibold mb-4">
            All Expenses by Category
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-6">

            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {entry.name} — ₹{entry.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;