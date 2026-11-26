
import { useState } from "react";
import { X, Wallet, ShieldCheck } from "lucide-react";

const AddMoneyModal = ({ onClose, onAddMoney }) => {
  const [amount, setAmount] = useState("5000");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const presets = [1000, 5000, 10000, 25000];

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 100) return;

    onAddMoney(numericAmount, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#191B19]">
        <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Add Money</h2>
            <p className="mt-1 text-xs text-gray-500">
              Recharge your brand wallet
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="text-sm text-gray-300">Enter Amount</label>

            <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#202220] px-4">
              <span className="text-xl text-gray-400">₹</span>
              <input
                type="number"
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent px-3 py-4 text-xl font-semibold text-white outline-none"
                placeholder="Enter amount"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Minimum recharge amount: ₹100
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-300">Quick Select</label>

            <div className="mt-2 grid grid-cols-4 gap-2">
              {presets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  className={`rounded-lg border py-2 text-xs transition ${
                    Number(amount) === value
                      ? "border-[#D0FF71] bg-[#D0FF71]/10 text-[#D0FF71]"
                      : "border-white/10 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  ₹{value.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Payment Method</label>

            <div className="mt-2 space-y-2">
              {["UPI", "Credit / Debit Card", "Net Banking"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-sm transition ${
                    paymentMethod === method
                      ? "border-[#D0FF71]/50 bg-[#D0FF71]/5 text-white"
                      : "border-white/10 text-gray-400"
                  }`}
                >
                  {method}
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      paymentMethod === method
                        ? "border-[#D0FF71] bg-[#D0FF71]"
                        : "border-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#202220] p-3 text-xs text-gray-400">
            <ShieldCheck size={17} className="shrink-0 text-[#D0FF71]" />
            Payments are processed securely through the payment gateway.
          </div>

          <button
            type="submit"
            disabled={!Number(amount) || Number(amount) < 100}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] py-3 font-semibold text-black transition hover:bg-[#c1f45e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Wallet size={17} />
            Continue to Payment · ₹{Number(amount || 0).toLocaleString("en-IN")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyModal;
