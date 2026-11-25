
import { useState } from "react";
import { Eye, Wallet, TrendingUp } from "lucide-react";

const PerformanceChart = ({ data }) => {
  const [metric, setMetric] = useState("views");

  const values = data.map((item) => item[metric]);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;

  const points = values
    .map((value, index) => {
      const x = 30 + (index * 640) / Math.max(values.length - 1, 1);
      const y = 180 - ((value - minValue) / range) * 145;
      return `${x},${y}`;
    })
    .join(" ");

  const formatValue = (value) => {
    if (metric === "spend") {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `${(value / 1000).toFixed(1)}K`;
  };

  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-white">
            Performance Overview
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Track your campaign performance over time.
          </p>
        </div>

        <div className="flex rounded-xl border border-white/[0.07] bg-[#101210] p-1">
          <button
            onClick={() => setMetric("views")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
              metric === "views"
                ? "bg-[#D0FF71] text-black"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Eye size={13} />
            Views
          </button>

          <button
            onClick={() => setMetric("spend")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
              metric === "spend"
                ? "bg-[#D0FF71] text-black"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Wallet size={13} />
            Spending
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <h3 className="text-2xl font-bold text-white">
          {formatValue(total)}
        </h3>
        <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-[#D0FF71]">
          <TrendingUp size={12} />
          Performance
        </span>
      </div>

      <div className="mt-5 w-full">
        <svg
          viewBox="0 0 700 220"
          className="h-auto w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D0FF71" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D0FF71" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[35, 80, 125, 180].map((y) => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="670"
              y2={y}
              stroke="#ffffff"
              strokeOpacity="0.07"
              strokeDasharray="4 5"
            />
          ))}

          <polygon
            points={`30,180 ${points} 670,180`}
            fill="url(#performanceGradient)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#D0FF71"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {values.map((value, index) => {
            const x = 30 + (index * 640) / Math.max(values.length - 1, 1);
            const y = 180 - ((value - minValue) / range) * 145;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#D0FF71"
                stroke="#171917"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        <div className="mt-3 flex justify-between gap-2">
          {data.map((item) => (
            <span
              key={item.day}
              className="text-[9px] text-gray-600 sm:text-[10px]"
            >
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
