
import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Wallet
} from "lucide-react";

import { Link } from "react-router-dom";

const CreatorNavbar = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-[#101110] border-b border-white/10 sticky top-0 z-50">

      <div className="h-full px-4 md:px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Hamburger */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-[#D0FF71] transition"
          >
            <Menu size={24} />
          </button>

          <Link
            to="/creator"
            className="text-xl font-bold tracking-tight"
          >
            <span className="text-white">Creator</span>
            <span className="text-[#D0FF71]">Hub.</span>
          </Link>

          <span className="hidden md:block text-xs text-gray-500 border border-white/10 rounded-full px-3 py-1">
            Creator Panel
          </span>

        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center w-full max-w-md mx-8">
          <div className="flex items-center gap-3 bg-[#1A1C1A] border border-white/10 rounded-xl px-4 py-2.5 w-full">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search campaigns..."
              className="bg-transparent outline-none text-sm text-white w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5">

          <Link
            to="/creator/earnings"
            className="hidden sm:flex items-center gap-2 bg-[#D0FF71]/10 border border-[#D0FF71]/20 rounded-xl px-3 py-2 hover:bg-[#D0FF71]/20 transition"
          >
            <Wallet size={17} className="text-[#D0FF71]" />
            <span className="text-sm font-semibold text-[#D0FF71]">
              ₹0.00
            </span>
          </Link>

          <button className="relative p-2 text-gray-400 hover:text-white transition">
            <Bell size={21} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D0FF71] rounded-full border-2 border-[#101110]" />
          </button>

          {/* PROFILE */}
          <div className="relative">

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:bg-white/5 rounded-xl p-1.5 transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#D0FF71] flex items-center justify-center text-black font-bold">
                V
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm text-white font-medium">
                  Creator Name
                </p>
                <p className="text-xs text-gray-500">
                  Creator Account
                </p>
              </div>

              <ChevronDown size={16} className="hidden md:block text-gray-500" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-52 bg-[#1A1C1A] border border-white/10 rounded-xl shadow-xl p-2">

                <Link
                  to="/creator/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-lg"
                >
                  <User size={17} />
                  My Profile
                </Link>

                <Link
                  to="/creator/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-lg"
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <div className="h-px bg-white/10 my-2" />

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg w-full"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default CreatorNavbar;
