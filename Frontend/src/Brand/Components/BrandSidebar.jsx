import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  Megaphone,
  PlusCircle,
  FileText,
  Users,
  Video,
  Wallet,
  ChartNoAxesCombined,
  UserRound,
  Settings,
  X,
  BriefcaseBusiness,
} from "lucide-react";

const menuGroups = [
  {
    title: "MAIN MENU",
    items: [
      { title: "Overview", path: "/brand", icon: LayoutDashboard },
      { title: "Explore Creators", path: "/brand/creators", icon: Search },
      { title: "My Campaigns", path: "/brand/campaigns", icon: Megaphone },
      {
        title: "Create Campaign",
        path: "/brand/create-campaign",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "CAMPAIGN MANAGEMENT",
    icon: BriefcaseBusiness,
    items: [
      { title: "Applications", path: "/brand/applications", icon: FileText },
      {
        title: "Active Collaborations",
        path: "/brand/collaborations",
        icon: Users,
      },
      { title: "Content Submissions", path: "/brand/content", icon: Video },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      {
        title: "Analytics",
        path: "/brand/analytics",
        icon: ChartNoAxesCombined,
      },
      { title: "Wallet & Billing", path: "/brand/wallet", icon: Wallet },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { title: "My Profile", path: "/brand/profile", icon: UserRound },
      { title: "Settings", path: "/brand/settings", icon: Settings },
    ],
  },
];

const BrandSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-[2px] transition-all duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`
    fixed left-0 top-16 z-50
    flex h-[calc(100dvh-64px)] w-[280px] flex-col
    border-r border-white/[0.07]
    bg-[#101110] px-3 py-5
    transition-transform duration-300 ease-out

    lg:static lg:z-30 lg:h-full lg:w-[250px] lg:shrink-0
    lg:translate-x-0

    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* MOBILE HEADER */}
        <div className="mb-5 flex items-center justify-between px-3 lg:hidden">
          <div>
            <p className="text-xs font-bold tracking-[1.8px] text-gray-400">
              BRAND WORKSPACE
            </p>
            <p className="mt-1 text-[11px] text-gray-600">
              Manage your business
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto">
          {menuGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <div key={group.title}>
                {/* SECTION TITLE */}
                <div className="mb-2 flex items-center gap-2 px-3">
                  {GroupIcon && (
                    <GroupIcon size={12} className="text-[#D0FF71]" />
                  )}

                  <p className="text-[9px] font-bold tracking-[1.7px] text-gray-600">
                    {group.title}
                  </p>
                </div>

                {/* MENU ITEMS */}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/brand"}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-xl px-3 py-[10px] transition-all duration-200 ${
                            isActive
                              ? "bg-[#D0FF71] text-[#101110] shadow-[0_3px_14px_rgba(208,255,113,0.10)]"
                              : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              size={17}
                              strokeWidth={isActive ? 2.3 : 1.8}
                              className={`shrink-0 transition-colors ${
                                isActive
                                  ? "text-[#101110]"
                                  : "text-gray-500 group-hover:text-[#D0FF71]"
                              }`}
                            />

                            <span className="text-[12px] font-medium">
                              {item.title}
                            </span>

                            {isActive && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#101110]" />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="mt-4 border-t border-white/[0.07] px-3 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D0FF71]/10 text-sm font-bold text-[#D0FF71]">
              I
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-300">Infule</p>
              <p className="text-[9px] text-gray-600">Brand Dashboard</p>
            </div>

            <span className="ml-auto rounded-md border border-white/[0.08] px-1.5 py-1 text-[8px] font-semibold text-gray-500">
              V1.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BrandSidebar;
