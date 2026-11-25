import { useState } from "react";
import { Outlet } from "react-router-dom";

import BrandNavbar from "../../Brand/Components/BrandNavbar";
import BrandSidebar from "../../Brand/Components/BrandSidebar";
import MobileBottomNav from "../../Brand/Components/MobileBottomNav";

const BrandLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#101110] text-white">
      <BrandNavbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="relative flex min-h-0 flex-1">
        <BrandSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main
          data-scroll-container
          className="no-scrollbar min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-7 lg:pb-7"
        >
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default BrandLayout;
