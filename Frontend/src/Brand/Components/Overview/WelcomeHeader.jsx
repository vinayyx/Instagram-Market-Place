
import { Plus, CalendarDays, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeHeader = ({ dateRange, onDateChange }) => {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-xs font-medium text-[#D0FF71]">
          BRAND WORKSPACE
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, Brand Name
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening with your campaigns today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <CalendarDays
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <select
            value={dateRange}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-white/10 bg-[#191B19] pl-9 pr-9 text-xs font-medium text-gray-300 outline-none transition focus:border-[#D0FF71]/40"
          >
            <option value="7 Days">Last 7 days</option>
            <option value="30 Days">Last 30 days</option>
            <option value="90 Days">Last 90 days</option>
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        <Link
          to="/brand/create-campaign"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-4 text-xs font-bold text-[#101110] transition hover:bg-[#c2f45f] active:scale-[0.98]"
        >
          <Plus size={16} />
          Create Campaign
        </Link>
      </div>
    </div>
  );
};

export default WelcomeHeader;
