import { Download, FileText } from "lucide-react";

const InvoiceTable = ({ invoices }) => {
  const handleDownload = (invoice) => {
    // Demo invoice record. Replace with backend-generated PDF URL.
    const content = [
      "INVOICE",
      `Invoice ID: ${invoice.id}`,
      `Description: ${invoice.description}`,
      `Date: ${invoice.date}`,
      `Amount: INR ${invoice.amount}`,
      `Transaction ID: ${invoice.transactionId}`,
      `Status: ${invoice.status}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${invoice.id}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191B19]">
      <div className="p-5">
        <h2 className="font-semibold text-white">Invoices & Billing</h2>
        <p className="mt-1 text-xs text-gray-500">
          View your payment invoices and billing records
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-[#202220] text-xs text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.06]">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <FileText size={17} className="text-[#D0FF71]" />
                    {invoice.id}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {invoice.description}
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {invoice.date}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-white">
                  ₹{invoice.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-[#D0FF71]/10 px-3 py-1 text-xs capitalize text-[#D0FF71]">
                    {invoice.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => handleDownload(invoice)}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;