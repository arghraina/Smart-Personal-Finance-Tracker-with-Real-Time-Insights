import { useState } from "react";
import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`h-full bg-[#111827] border-r border-white/5 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            FinSight
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-gray-400 hover:text-white"
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-6 space-y-2 px-2">

        <SidebarItem
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          collapsed={collapsed}
          active={location.pathname === "/"}
        />

        <SidebarItem
          to="/transactions"
          icon={<Receipt size={20} />}
          label="Transactions"
          collapsed={collapsed}
          active={location.pathname === "/transactions"}
        />

        <SidebarItem
          to="/insights"
          icon={<BarChart3 size={20} />}
          label="Insights"
          collapsed={collapsed}
          active={location.pathname === "/insights"}
        />

      </div>
    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, collapsed, active, to }) {
  return (
    <Link to={to}>
      <div
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
            : "text-gray-400 hover:bg-white/5 hover:scale-[1.02]"
        }
        `}
      >
        <div>{icon}</div>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
}

export default Sidebar;