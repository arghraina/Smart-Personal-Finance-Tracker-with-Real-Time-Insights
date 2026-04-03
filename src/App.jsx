import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <Routes>

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;