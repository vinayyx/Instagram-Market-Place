import { ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";

const statusStyles = {
  completed: "bg-[#D0FF71]/10 text-[#D0FF71]",
  pending: "bg-amber-400/10 text-amber-400",
  failed: "bg-red-400/10 text-red-400",
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191B19]">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h2 className="font-semibold text-white">Recent Transactions</h2>
          <p className="mt-1 text-xs text-gray-500">
            Your latest wallet activities
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-[#202220] text-xs text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Transaction</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Payment Method</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.06]">
            {transactions.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-2 ${
                        item.type === "credit"
                          ? "bg-[#D0FF71]/10 text-[#D0FF71]"
                          : "bg-blue-400/10 text-blue-400"
                      }`}
                    >
                      {item.type === "credit" ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.id} · {item.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {item.date}
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {item.paymentMethod}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs capitalize ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td
                  className={`px-5 py-4 text-right text-sm font-semibold ${
                    item.type === "credit"
                      ? "text-[#D0FF71]"
                      : "text-white"
                  }`}
                >
                  {item.type === "credit" ? "+" : "-"}₹
                  {item.amount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-sm text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;