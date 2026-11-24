
import { useState } from "react";
import { Outlet } from "react-router-dom";

import CreatorNavbar from "../components/CreatorNavbar";
import CreatorSidebar from "../components/CreatorSidebar";
import MobileBottomNav from "../components/MobileBottomNav";

const CreatorLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSidebar = () => setMobileMenuOpen(true);
  const closeSidebar = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#101110] text-white">

      <CreatorNavbar onMenuClick={openSidebar} />

      <div className="flex">

        <CreatorSidebar
          isOpen={mobileMenuOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1 min-w-0 p-4 md:p-6">
          <Outlet />
          <MobileBottomNav />
        </main>

      </div>

    </div>
  );
};

export default CreatorLayout;
