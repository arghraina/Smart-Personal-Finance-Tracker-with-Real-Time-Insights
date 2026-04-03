import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({

      // ROLE
      role: "admin",

      toggleRole: () =>
        set((state) => ({
          role: state.role === "admin" ? "viewer" : "admin",
        })),

      // 🔔 NOTIFICATIONS
      notifications: [],

      addNotification: (message) =>
        set((state) => ({
          notifications: [
            {
              id: Date.now(),
              message,
              time: new Date().toLocaleTimeString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        })),

      clearNotifications: () =>
        set(() => ({ notifications: [] })),

      // 💰 TRANSACTIONS (MULTI-MONTH REALISTIC DATA)
      transactions: [

        // ===== JAN =====
        { id: 1, title: "Salary", amount: 50000, category: "Income", date: "2026-01-01" },
        { id: 2, title: "Freelance", amount: 8000, category: "Income", date: "2026-01-10" },
        { id: 3, title: "Rent", amount: -15000, category: "Bills", date: "2026-01-02" },
        { id: 4, title: "Groceries", amount: -3000, category: "Shopping", date: "2026-01-05" },
        { id: 5, title: "Swiggy", amount: -800, category: "Food", date: "2026-01-07" },
        { id: 6, title: "Petrol", amount: -2000, category: "Transport", date: "2026-01-12" },
        { id: 7, title: "Gym", amount: -1200, category: "Health", date: "2026-01-15" },

        // ===== FEB =====
        { id: 8, title: "Salary", amount: 50000, category: "Income", date: "2026-02-01" },
        { id: 9, title: "Stocks Profit", amount: 4000, category: "Investment", date: "2026-02-08" },
        { id: 10, title: "Rent", amount: -15000, category: "Bills", date: "2026-02-02" },
        { id: 11, title: "Amazon Shopping", amount: -4500, category: "Shopping", date: "2026-02-06" },
        { id: 12, title: "Dining", amount: -2200, category: "Food", date: "2026-02-09" },
        { id: 13, title: "Uber", amount: -900, category: "Transport", date: "2026-02-12" },
        { id: 14, title: "Doctor", amount: -1500, category: "Health", date: "2026-02-18" },

        // ===== MARCH =====
        { id: 15, title: "Salary", amount: 50000, category: "Income", date: "2026-03-01" },
        { id: 16, title: "Freelance", amount: 10000, category: "Income", date: "2026-03-11" },
        { id: 17, title: "Rent", amount: -15000, category: "Bills", date: "2026-03-02" },
        { id: 18, title: "Groceries", amount: -3500, category: "Shopping", date: "2026-03-05" },
        { id: 19, title: "Zomato", amount: -1800, category: "Food", date: "2026-03-08" },
        { id: 20, title: "Fuel", amount: -2500, category: "Transport", date: "2026-03-14" },
        { id: 21, title: "Medicines", amount: -1000, category: "Health", date: "2026-03-17" },
        { id: 22, title: "Mutual Fund", amount: -5000, category: "Investment", date: "2026-03-20" },

        // ===== APRIL =====
        { id: 23, title: "Salary", amount: 50000, category: "Income", date: "2026-04-01" },
        { id: 24, title: "Freelance Project", amount: 12000, category: "Income", date: "2026-04-03" },
        { id: 25, title: "Netflix", amount: -499, category: "Entertainment", date: "2026-04-02" },
        { id: 26, title: "Spotify", amount: -199, category: "Entertainment", date: "2026-04-04" },
        { id: 27, title: "Swiggy Order", amount: -350, category: "Food", date: "2026-04-02" },
        { id: 28, title: "Restaurant", amount: -1200, category: "Food", date: "2026-04-05" },
        { id: 29, title: "Uber Ride", amount: -220, category: "Transport", date: "2026-04-03" },
        { id: 30, title: "Petrol", amount: -1500, category: "Transport", date: "2026-04-06" },
        { id: 31, title: "Groceries", amount: -2500, category: "Shopping", date: "2026-04-04" },
        { id: 32, title: "Amazon", amount: -3200, category: "Shopping", date: "2026-04-07" },
        { id: 33, title: "Electricity", amount: -1800, category: "Bills", date: "2026-04-05" },
        { id: 34, title: "Internet", amount: -999, category: "Bills", date: "2026-04-06" },
        { id: 35, title: "Gym", amount: -1500, category: "Health", date: "2026-04-07" },
        { id: 36, title: "Doctor", amount: -800, category: "Health", date: "2026-04-08" },
        { id: 37, title: "Stock Investment", amount: -5000, category: "Investment", date: "2026-04-08" },
        { id: 38, title: "Dividend", amount: 2000, category: "Investment", date: "2026-04-09" },

      ],

      addTransaction: (txn) =>
        set((state) => {
          const newTxn = { ...txn };

          return {
            transactions: [...state.transactions, newTxn],
            notifications: [
              {
                id: Date.now(),
                message: `Added "${newTxn.title}" (₹${newTxn.amount})`,
                time: new Date().toLocaleTimeString(),
                read: false,
              },
              ...state.notifications,
            ],
          };
        }),

      deleteTransaction: (id) =>
        set((state) => {
          const txn = state.transactions.find((t) => t.id === id);

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            notifications: [
              {
                id: Date.now(),
                message: txn
                  ? `Deleted "${txn.title}"`
                  : "Transaction deleted",
                time: new Date().toLocaleTimeString(),
                read: false,
              },
              ...state.notifications,
            ],
          };
        }),

    }),
    {
      name: "finance-storage",
    }
  )
);

export default useStore;