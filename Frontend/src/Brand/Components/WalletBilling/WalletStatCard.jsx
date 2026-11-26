
const WalletStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  highlight = false,
}) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{title}</p>

        <div
          className={`rounded-xl p-2.5 ${
            highlight ? "bg-[#D0FF71]/10" : "bg-white/[0.06]"
          }`}
        >
          <Icon
            size={19}
            className={highlight ? "text-[#D0FF71]" : "text-gray-300"}
          />
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-white">
        ₹{Number(value).toLocaleString("en-IN")}
      </h3>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default WalletStatCard;
