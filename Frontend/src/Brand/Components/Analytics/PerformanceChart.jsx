
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">Performance Overview</h2>
          <p className="mt-1 text-xs text-gray-500">
            Views and engagement over time
          </p>
        </div>

        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-2 text-gray-400">
            <span className="h-2 w-2 rounded-full bg-[#D0FF71]" />
            Views
          </span>
          <span className="flex items-center gap-2 text-gray-400">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Engagement
          </span>
        </div>
      </div>

      <div className="mt-6 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D0FF71" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#D0FF71" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#ffffff10" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#777"
              tick={{ fill: "#888", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#777"
              tick={{ fill: "#888", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
            />

            <Tooltip
              contentStyle={{
                background: "#202220",
                border: "1px solid #ffffff15",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value, name) => [
                Number(value).toLocaleString("en-IN"),
                name === "views" ? "Views" : "Engagement",
              ]}
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#D0FF71"
              strokeWidth={2}
              fill="url(#viewsGradient)"
            />

            <Area
              type="monotone"
              dataKey="engagement"
              stroke="#60A5FA"
              strokeWidth={2}
              fill="url(#engagementGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
