
import { ArrowUpRight } from "lucide-react";

export default function EarningStatCard({
  title,
  amount,
  description,
  icon: Icon,
  highlight = false,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition hover:-translate-y-1 ${
        highlight
          ? "border-[#D0FF71]/30 bg-[#D0FF71]/[0.06]"
          : "border-white/[0.07] bg-[#191A1C]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            highlight
              ? "bg-[#D0FF71]/10 text-[#D0FF71]"
              : "bg-white/[0.06] text-gray-300"
          }`}
        >
          <Icon size={21} />
        </div>

        <ArrowUpRight size={17} className="text-gray-500" />
      </div>

      <p className="mt-5 text-sm text-gray-400">{title}</p>

      <h3
        className={`mt-1 text-2xl font-semibold ${
          highlight ? "text-[#D0FF71]" : "text-white"
        }`}
      >
        ₹{amount.toLocaleString("en-IN")}
      </h3>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}
