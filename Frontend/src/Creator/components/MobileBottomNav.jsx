import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Compass, Send, Wallet, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/creator", end: true, icon: Home },
  { label: "Explore", path: "/creator/campaigns", icon: Compass },
  { label: "Applied", path: "/creator/applications", icon: Send },
  { label: "Earnings", path: "/creator/earnings", icon: Wallet },
  { label: "Profile", path: "/creator/profile", icon: User },
];

// iOS jaisa spring (thoda overshoot karke settle hota hai)
const SPRING = "cubic-bezier(0.32, 1.45, 0.5, 1)";

export default function MobileBottomNav() {
  const { pathname } = useLocation();

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) =>
      item.end ? pathname === item.path : pathname.startsWith(item.path)
    )
  );

  // Pill move hote waqt thoda stretch hota hai (liquid feel)
  const [stretching, setStretching] = useState(false);
  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    prevIndex.current = activeIndex;
    setStretching(true);
    const t = setTimeout(() => setStretching(false), 220);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const haptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(8);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full px-4 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden">
      <div
        className="relative mx-auto max-w-md overflow-hidden rounded-full border border-white/10 bg-[#242624]/70 p-1.5 backdrop-blur-2xl"
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backdropFilter: "blur(24px) saturate(180%)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Sliding pill */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 left-1.5 top-1.5"
          style={{
            width: `calc((100% - 12px) / ${navItems.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
            transition: `transform 520ms ${SPRING}`,
            willChange: "transform",
          }}
        >
          <div
            className="h-full w-full rounded-full bg-[#D0FF71]"
            style={{
              transform: stretching ? "scaleX(1.14) scaleY(0.94)" : "scale(1)",
              transition: `transform 260ms ${SPRING}`,
              boxShadow:
                "0 4px 18px rgba(208,255,113,0.28), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          />
        </div>

        {/* Items */}
        <div className="relative grid grid-cols-5">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeIndex;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={haptic}
                className="group relative flex select-none flex-col items-center justify-center gap-0.5 rounded-full py-2.5 outline-none [-webkit-tap-highlight-color:transparent]"
              >
                <span
                  className="flex flex-col items-center gap-0.5 transition-transform duration-200 ease-out group-active:scale-[0.86]"
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "-translate-y-px scale-110 text-black"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`text-[10.5px] font-semibold leading-none tracking-tight transition-colors duration-300 ${
                      isActive
                        ? "text-black"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}