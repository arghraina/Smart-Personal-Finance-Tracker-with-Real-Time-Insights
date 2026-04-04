import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagewrapper from "./components/Pagewrapper";

function App() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              <Route
                path="/"
                element={
                  <Pagewrapper>
                    <Dashboard />
                  </Pagewrapper>
                }
              />

              <Route
                path="/transactions"
                element={
                  <Pagewrapper>
                    <Transactions />
                  </Pagewrapper>
                }
              />

              <Route
                path="/insights"
                element={
                  <Pagewrapper>
                    <Insights />
                  </Pagewrapper>
                }
              />

            </Routes>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default App;