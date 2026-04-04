import { Bell } from "lucide-react";
import { useState } from "react";
import Usestore from "../store/Usestore";

function Header() {
  const role = Usestore((state) => state.role);
  const toggleRole = Usestore((state) => state.toggleRole);
  const notifications = Usestore((state) => state.notifications);
  const clearNotifications = Usestore((state) => state.clearNotifications);
  const markAllAsRead = Usestore((state) => state.markAllAsRead);

  const [open, setOpen] = useState(false);

  const isAdmin = role === "admin";
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 relative">
      <div className="flex flex-col">
        <h1 className="text-base md:text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Track. Analyze. Optimize.
        </h1>

        <p className="text-[10px] md:text-xs text-gray-400 mt-1">
          Your finances, simplified.
        </p>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-3">

        <div
          onClick={toggleRole}
          className={`relative w-12 h-6 md:w-16 md:h-8 flex items-center rounded-full cursor-pointer transition-all duration-300
          ${isAdmin ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-600"}
          `}
        >
          <div
            className={`w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-md transform transition-all duration-300
            ${isAdmin ? "translate-x-6 md:translate-x-8" : "translate-x-1"}
            `}
          />
        </div>
        <span className="text-xs md:text-sm text-gray-300 hidden sm:block">
          {isAdmin ? "Admin" : "Viewer"}
        </span>

        {/* Notifications */}
        <div className="relative">
          <div
            onClick={() => {
              setOpen(!open);
              if (!open) markAllAsRead();
            }}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/5 cursor-pointer relative"
          >
            <Bell size={18} className="text-gray-300" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 px-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {open && (
            <div className="
    absolute mt-2 z-50
    right-0 md:right-0
    left-1/2 md:left-auto
    -translate-x-1/2 md:translate-x-0
    w-[90vw] max-w-[260px] md:w-72
    bg-[#111827] border border-white/5 rounded-xl shadow-lg
  ">

              <div className="p-2 md:p-3 border-b border-white/5 flex justify-between">
                <span className="text-xs md:text-sm font-semibold">
                  Notifications
                </span>
                <button
                  onClick={clearNotifications}
                  className="text-[10px] md:text-xs text-red-400"
                >
                  Clear
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-xs md:text-sm p-3">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 md:p-3 border-b border-white/5 text-xs md:text-sm ${!n.read ? "bg-white/5" : ""
                        }`}
                    >
                      <p className="break-words">{n.message}</p>
                      <span className="text-[10px] text-gray-500">
                        {n.time}
                      </span>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-1 md:gap-2 cursor-pointer">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs md:text-sm font-semibold">
            U
          </div>
          <span className="hidden md:block text-sm text-gray-300">
            User
          </span>
        </div>

      </div>
    </div>
  );
}

export default Header;