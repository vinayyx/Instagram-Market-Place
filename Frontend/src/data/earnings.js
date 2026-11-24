
export const earningStats = {
  availableBalance: 8500,
  totalEarnings: 24500,
  pendingEarnings: 3200,
  totalWithdrawn: 16000,
};

export const earningsChart = {
  "7days": [
    { day: "Mon", amount: 500 },
    { day: "Tue", amount: 900 },
    { day: "Wed", amount: 400 },
    { day: "Thu", amount: 1200 },
    { day: "Fri", amount: 700 },
    { day: "Sat", amount: 1600 },
    { day: "Sun", amount: 1100 },
  ],
  "30days": [
    { day: "Week 1", amount: 2500 },
    { day: "Week 2", amount: 4200 },
    { day: "Week 3", amount: 3100 },
    { day: "Week 4", amount: 5700 },
  ],
  "6months": [
    { day: "Jun", amount: 3200 },
    { day: "Jul", amount: 4500 },
    { day: "Aug", amount: 3800 },
    { day: "Sep", amount: 6200 },
    { day: "Oct", amount: 5100 },
    { day: "Nov", amount: 7800 },
  ],
};

export const transactions = [
  {
    id: "TXN-1001",
    title: "Instagram Reel Campaign",
    subtitle: "Nike Fitness Campaign",
    type: "earning",
    amount: 2500,
    status: "completed",
    date: "24 Nov 2026",
  },
  {
    id: "TXN-1002",
    title: "Withdrawal to UPI",
    subtitle: "vinay@upi",
    type: "withdrawal",
    amount: 3000,
    status: "completed",
    date: "22 Nov 2026",
  },
  {
    id: "TXN-1003",
    title: "Instagram Reel Campaign",
    subtitle: "Urban Clothing Campaign",
    type: "earning",
    amount: 1800,
    status: "completed",
    date: "20 Nov 2026",
  },
  {
    id: "TXN-1004",
    title: "Withdrawal Request",
    subtitle: "vinay@upi",
    type: "withdrawal",
    amount: 2000,
    status: "pending",
    date: "19 Nov 2026",
  },
  {
    id: "TXN-1005",
    title: "Campaign Earnings",
    subtitle: "Tech Product Promotion",
    type: "earning",
    amount: 1200,
    status: "completed",
    date: "17 Nov 2026",
  },
  {
    id: "TXN-1006",
    title: "Campaign Earnings",
    subtitle: "Lifestyle Reel Campaign",
    type: "earning",
    amount: 900,
    status: "under_review",
    date: "15 Nov 2026",
  },
];
