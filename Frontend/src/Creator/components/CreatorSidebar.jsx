
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Compass,
  FileText,
  Briefcase,
  Wallet,
  ChartNoAxesCombined,
  User,
  Settings,
  Video,
  Banknote,
  X
} from "lucide-react";

const menuItems = [
  {
    title: "Overview",
    path: "/creator",
    icon: LayoutDashboard
  },
  {
    title: "Discover Campaigns",
    path: "/creator/campaigns",
    icon: Compass
  },
  {
    title: "My Applications",
    path: "/creator/applications",
    icon: FileText
  },
  {
    title: "Active Campaigns",
    path: "/creator/active-campaigns",
    icon: Briefcase
  },
  {
    title: "My Content",
    path: "/creator/content",
    icon: Video
  },
  {
    title: "Earnings",
    path: "/creator/earnings",
    icon: Wallet
  },
  {
    title: "Withdrawals",
    path: "/creator/withdrawals",
    icon: Banknote
  },
  {
    title: "My Profile",
    path: "/creator/profile",
    icon: User
  },
  {
    title: "Settings",
    path: "/creator/settings",
    icon: Settings
  }
];

const CreatorSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 top-16 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40
          w-72 bg-[#101110]
          border-r border-white/10
          p-4 overflow-y-auto
          transform transition-transform duration-300 ease-in-out

          lg:sticky lg:top-16 lg:translate-x-0
          lg:w-64 lg:h-[calc(100vh-64px)]
          lg:flex-shrink-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="text-sm font-semibold text-gray-400">
            CREATOR MENU
          </span>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === "/creator"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-[#D0FF71] text-black"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />

                <span className="text-sm font-medium">
                  {item.title}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
};

export default CreatorSidebar;
