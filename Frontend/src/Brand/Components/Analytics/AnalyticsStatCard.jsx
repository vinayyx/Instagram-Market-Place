
const AnalyticsStatCard = ({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
}) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{title}</p>

        <div className="rounded-xl bg-[#D0FF71]/10 p-2.5">
          <Icon size={19} className="text-[#D0FF71]" />
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
        {prefix}{value}{suffix}
      </h3>

      <p className="mt-2 text-xs text-gray-500">
        <span className="font-medium text-[#D0FF71]">{change}</span>
        {" "}compared to previous period
      </p>
    </div>
  );
};

export default AnalyticsStatCard;
