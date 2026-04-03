import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen bg-[#0B0F17] text-white">
      
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Header />
        <Outlet /> {/* 🔥 THIS IS REQUIRED */}
      </div>

    </div>
  );
}

export default MainLayout;