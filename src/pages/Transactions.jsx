import { useState } from "react";
import Usestore from "../store/Usestore";
import { Trash2, Plus, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Transactions() {
  const { transactions, addTransaction, deleteTransaction, role } = Usestore();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    type: "expense",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");

  const [deleteId, setDeleteId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const isAdmin = role === "admin";

  const formatCategory = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const years = ["All", ...new Set(transactions.map((t) => t.date.slice(0, 4)))];
  const months = ["All", ...new Set(transactions.map((t) => t.date.slice(5, 7)))];

  const filteredTransactions = transactions
    .filter((t) => {
      return (
        t.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "All" || t.category === filter) &&
        (year === "All" || t.date.slice(0, 4) === year) &&
        (month === "All" || t.date.slice(5, 7) === month)
      );
    })
    .sort((a, b) => {
      if (sort === "latest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "high") return b.amount - a.amount;
      if (sort === "low") return a.amount - b.amount;
      return 0;
    });

  const categories = ["All", ...new Set(transactions.map((t) => t.category))];

  const handleAdd = () => {
    if (!form.title || !form.amount || !form.category || !form.date) return;

    let finalAmount = Number(form.amount);

    if (form.type === "expense") {
      finalAmount = -Math.abs(finalAmount);
    } else {
      finalAmount = Math.abs(finalAmount);
    }

    addTransaction({
      id: Date.now(),
      title: form.title,
      amount: finalAmount,
      category: formatCategory(form.category),
      date: form.date,
    });

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      type: "expense",
    });

    showFeedback("Transaction Added ✅");
  };

  // ✅ DELETE
  const confirmDelete = () => {
    deleteTransaction(deleteId);
    setDeleteId(null);
    showFeedback("Transaction Deleted ❌");
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 1500);
  };

  // ✅ EXPORT CSV
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;

    const headers = ["Title", "Amount", "Category", "Date"];
    const rows = filteredTransactions.map((t) => [
      t.title,
      t.amount,
      t.category,
      t.date,
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">All Transactions</h1>

      <div className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Search..."
          className="bg-[#111827] px-4 py-2 rounded-xl text-sm outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">

          <select className="bg-[#111827] px-3 py-2 rounded-xl text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {categories.map((c, i) => <option key={i}>{c}</option>)}
          </select>

          <select className="bg-[#111827] px-3 py-2 rounded-xl text-sm" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y, i) => <option key={i}>{y}</option>)}
          </select>

          <select className="bg-[#111827] px-3 py-2 rounded-xl text-sm" value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((m, i) => <option key={i}>{m}</option>)}
          </select>

          <select className="bg-[#111827] px-3 py-2 rounded-xl text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">High → Low</option>
            <option value="low">Low → High</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="bg-green-500 px-4 py-2 rounded-xl text-sm"
          >
            Export to CSV
          </button>

        </div>
      </div>

      {isAdmin && (
        <div className="bg-[#111827] p-4 rounded-2xl flex flex-wrap gap-2">

          <input
            placeholder="Title"
            className="bg-[#0B0F17] px-3 py-2 rounded-lg text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <select
            className="bg-[#0B0F17] px-3 py-2 rounded-lg text-sm"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="bg-[#0B0F17] px-3 py-2 rounded-lg text-sm"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            placeholder="Category"
            className="bg-[#0B0F17] px-3 py-2 rounded-lg text-sm"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="date"
            className="bg-[#0B0F17] px-3 py-2 rounded-lg text-sm"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 px-4 py-2 rounded-lg text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>

        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto bg-[#111827] rounded-2xl border border-white/5">

        <table className="w-full text-sm min-w-[600px]">
          <tbody>
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.01]"
              >
                <td className="p-4">{t.title}</td>

                <td className={`p-4 ${t.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                  ₹{t.amount}
                </td>

                <td className="p-4">{t.category}</td>
                <td className="p-4">{t.date}</td>

                {isAdmin && (
                  <td className="p-4 text-center">
                    <button onClick={() => setDeleteId(t.id)}>
                      <Trash2 size={16} className="text-red-400 hover:text-red-600" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111827] p-6 rounded-2xl border border-white/10 w-[90%] max-w-sm"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <p className="text-sm mb-5 text-center">
                Delete this transaction?
              </p>

              <div className="flex justify-center gap-4">

                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm"
                >
                  Delete
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              className="bg-[#111827] px-6 py-4 md:px-8 md:py-5 rounded-2xl border border-white/10 text-sm md:text-base shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {feedback}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Transactions;