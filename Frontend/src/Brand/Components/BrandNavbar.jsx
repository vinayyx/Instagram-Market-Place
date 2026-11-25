import { useState } from "react";

import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  Wallet,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const BrandNavbar = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="relative z-[60] h-16 shrink-0 border-b border-white/[0.07] bg-[#101110]/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5 lg:px-7">
        {/* LEFT */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#D0FF71] lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* LOGO */}
          <Link to="/brand" className="flex items-center gap-2">
            <span className="text-[23px] font-extrabold tracking-tight text-white">
              Infule<span className="text-[#D0FF71]">.</span>
            </span>
          </Link>

          <div className="hidden h-6 w-px bg-white/10 sm:block" />

          <span className="hidden text-xs font-medium text-gray-500 sm:block">
            Brand Panel
          </span>
        </div>

        {/* SEARCH */}
        <div className="mx-4 hidden max-w-[420px] flex-1 md:block">
          <div className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#191B19] px-4 py-2.5 transition focus-within:border-[#D0FF71]/40 focus-within:bg-[#1C1F1C]">
            <Search
              size={17}
              className="shrink-0 text-gray-500 transition group-focus-within:text-[#D0FF71]"
            />

            <input
              type="text"
              placeholder="Search creators, campaigns..."
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-600"
            />

            <span className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-gray-600 lg:block">
              /
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* WALLET */}
          <Link
            to="/brand/wallet"
            className="hidden items-center gap-2 rounded-xl border border-[#D0FF71]/15 bg-[#D0FF71]/[0.07] px-3 py-2 transition hover:border-[#D0FF71]/30 hover:bg-[#D0FF71]/[0.12] sm:flex"
          >
            <Wallet size={16} className="text-[#D0FF71]" />

            <span className="text-xs font-semibold text-[#D0FF71]">₹0.00</span>
          </Link>

          {/* NOTIFICATIONS */}
          <button
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Bell size={19} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D0FF71] ring-2 ring-[#101110]" />
          </button>

          <div className="mx-1 hidden h-7 w-px bg-white/10 sm:block" />

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
              className={`flex items-center gap-2 rounded-xl p-1.5 transition ${
                profileOpen ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D0FF71]/20 bg-[#D0FF71]/10 text-sm font-bold text-[#D0FF71]">
                B
              </div>

              <div className="hidden text-left md:block">
                <p className="text-xs font-semibold text-gray-200">
                  Brand Name
                </p>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  Business Account
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-gray-500 transition-transform md:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />

                <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#191B19] p-2 shadow-2xl shadow-black/40">
                  {/* PROFILE INFO */}
                  <div className="border-b border-white/[0.07] px-3 py-3">
                    <p className="text-sm font-semibold text-white">
                      Brand Name
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500">
                      Business Account
                    </p>
                  </div>

                  <div className="space-y-1 py-2">
                    <Link
                      to="/brand/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <UserRound size={16} />
                      My Profile
                    </Link>

                    <Link
                      to="/brand/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>

                    <Link
                      to="/brand/wallet"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Wallet size={16} />
                      Wallet & Billing
                    </Link>
                  </div>

                  <div className="border-t border-white/[0.07] pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandNavbar;
