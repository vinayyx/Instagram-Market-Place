
import { useMemo, useState } from "react";
import {
  Wallet,
  ArrowDownToLine,
  TrendingUp,
  Clock3,
  Plus,
  Search,
  AlertTriangle,
} from "lucide-react";

import {
  walletStats,
  transactions as initialTransactions,
  spendingData,
  invoices,
} from "../../BrandData/walletBillingData"

import WalletStatCard from "../Components/WalletBilling/WalletStatCard";
import AddMoneyModal from "../Components/WalletBilling/AddMoneyModal";
import TransactionTable from "../Components/WalletBilling/TransactionTable";
import SpendingOverview from "../Components/WalletBilling/SpendingOverview";
import InvoiceTable from "../Components/WalletBilling/InvoiceTable";

const WalletBilling = () => {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase();

    return transactions.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [transactions, search]);

  const stats = [
    {
      title: "Available Balance",
      value: walletStats.availableBalance,
      description: "Available for your campaigns",
      icon: Wallet,
      highlight: true,
    },
    {
      title: "Total Money Added",
      value: walletStats.totalAdded,
      description: "Lifetime wallet recharge",
      icon: ArrowDownToLine,
    },
    {
      title: "Total Amount Spent",
      value: walletStats.totalSpent,
      description: "Campaigns and creator payments",
      icon: TrendingUp,
    },
    {
      title: "Pending Payments",
      value: walletStats.pendingPayments,
      description: "Payments being processed",
      icon: Clock3,
    },
  ];

  const handleAddMoney = (amount, paymentMethod) => {
    // Demo only: integrate your payment gateway here.
    // Do not credit the wallet until the gateway verifies payment.
    setShowAddMoney(false);

    window.alert(
      `Payment gateway integration required.\nAmount: ₹${amount.toLocaleString("en-IN")}\nMethod: ${paymentMethod}`
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#D0FF71]">Brand Workspace</p>

          <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Wallet & Billing
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your wallet, payments, transactions and invoices.
          </p>
        </div>

        <button
          onClick={() => setShowAddMoney(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#c1f45e]"
        >
          <Plus size={18} />
          Add Money
        </button>
      </div>

      {/* Wallet Balance */}
      <div className="relative overflow-hidden rounded-2xl border border-[#D0FF71]/20 bg-gradient-to-br from-[#252c20] to-[#191B19] p-6 sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Wallet size={18} className="text-[#D0FF71]" />
              Available Wallet Balance
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              ₹{walletStats.availableBalance.toLocaleString("en-IN")}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Use your wallet balance to fund campaigns and creator payments.
            </p>
          </div>

          <button
            onClick={() => setShowAddMoney(true)}
            className="flex items-center justify-center gap-2 self-start rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#c1f45e] sm:self-center"
          >
            <Plus size={17} />
            Recharge Wallet
          </button>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-[#D0FF71]/10" />
        <div className="pointer-events-none absolute -right-2 -top-16 h-52 w-52 rounded-full border border-[#D0FF71]/10" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <WalletStatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Low balance notice */}
      {walletStats.availableBalance < 25000 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-medium text-amber-400">
              Low Wallet Balance
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Your wallet balance is running low. Recharge your wallet to
              continue funding campaigns without interruption.
            </p>
          </div>
        </div>
      )}

      {/* Spending */}
      <SpendingOverview campaigns={spendingData} />

      {/* Transactions */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Transaction History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track all wallet credits and debits.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-white/10 bg-[#191B19] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
            />
          </div>
        </div>

        <TransactionTable transactions={filteredTransactions} />
      </div>

      {/* Invoices */}
      <InvoiceTable invoices={invoices} />

      {/* Add Money Modal */}
      {showAddMoney && (
        <AddMoneyModal
          onClose={() => setShowAddMoney(false)}
          onAddMoney={handleAddMoney}
        />
      )}
    </div>
  );
};

export default WalletBilling;
