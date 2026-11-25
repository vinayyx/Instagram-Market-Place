
import {
  Megaphone,
  Users,
  Eye,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  campaigns: Megaphone,
  creators: Users,
  views: Eye,
  spent: Wallet,
};

const StatCard = ({ stat }) => {
  const Icon = iconMap[stat.icon] || Wallet;

  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#171917] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D0FF71]/20">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D0FF71]/[0.08] text-[#D0FF71]">
          <Icon size={19} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-gray-600 transition group-hover:text-[#D0FF71]"
        />
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-gray-500">
          {stat.title}
        </p>

        <div className="mt-2 flex flex-wrap items-end gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {stat.value}
          </h3>

          <span
            className={`mb-1 flex items-center gap-1 text-[10px] font-semibold ${
              stat.positive ? "text-[#D0FF71]" : "text-red-400"
            }`}
          >
            {stat.positive ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {stat.change}
          </span>
        </div>

        <p className="mt-2 text-[10px] text-gray-600">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
