import { Transaction } from "@/components/dashboard/TransactionCard";
import { Budget } from "@/components/dashboard/BudgetCard";

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: -89.99,
    description: "Grocery Shopping",
    category: "food",
    date: "2024-01-15",
    type: "expense",
    merchant: "Whole Foods Market"
  },
  {
    id: "2", 
    amount: 3500.00,
    description: "Salary Deposit",
    category: "business",
    date: "2024-01-15",
    type: "income",
    merchant: "TechCorp Inc."
  },
  {
    id: "3",
    amount: -45.20,
    description: "Gas Station",
    category: "transport",
    date: "2024-01-14",
    type: "expense",
    merchant: "Shell"
  },
  {
    id: "4",
    amount: -1250.00,
    description: "Monthly Rent",
    category: "housing",
    date: "2024-01-01",
    type: "expense",
    merchant: "Property Management Co."
  },
  {
    id: "5",
    amount: -129.99,
    description: "New Headphones",
    category: "shopping",
    date: "2024-01-13",
    type: "expense",
    merchant: "Amazon"
  },
  {
    id: "6",
    amount: -67.50,
    description: "Restaurant Dinner",
    category: "food",
    date: "2024-01-12",
    type: "expense",
    merchant: "The Italian Place"
  },
  {
    id: "7",
    amount: 150.00,
    description: "Freelance Work",
    category: "business",
    date: "2024-01-10",
    type: "income",
    merchant: "Client ABC"
  },
  {
    id: "8",
    amount: -35.00,
    description: "Coffee Subscription",
    category: "food",
    date: "2024-01-09",
    type: "expense",
    merchant: "Blue Bottle Coffee"
  }
];

// Mock budgets data
export const mockBudgets: Budget[] = [
  {
    id: "1",
    category: "food",
    budgeted: 600,
    spent: 487.50,
    period: "monthly",
    color: "#e74c3c"
  },
  {
    id: "2",
    category: "shopping",
    budgeted: 400,
    spent: 320.00,
    period: "monthly",
    color: "#3498db"
  },
  {
    id: "3",
    category: "transport",
    budgeted: 200,
    spent: 180.75,
    period: "monthly",
    color: "#2ecc71"
  },
  {
    id: "4",
    category: "housing",
    budgeted: 1300,
    spent: 1250.00,
    period: "monthly",
    color: "#9b59b6"
  },
  {
    id: "5",
    category: "entertainment",
    budgeted: 300,
    spent: 125.00,
    period: "monthly",
    color: "#f39c12"
  }
];

// Mock AI insights
export const mockInsights = [
  {
    id: "1",
    type: "saving_tip",
    title: "Food Budget Optimization",
    description: "You've spent 81% of your food budget this month. Consider meal planning to save $120 monthly.",
    impact: "$120/month",
    category: "food"
  },
  {
    id: "2",
    type: "spending_pattern",
    title: "Weekend Spending Spike",
    description: "Your spending increases by 40% on weekends. Most expenses are dining out.",
    impact: "40% increase",
    category: "pattern"
  },
  {
    id: "3",
    type: "goal_progress",
    title: "Emergency Fund Goal",
    description: "Great progress! You're 60% towards your $5,000 emergency fund goal.",
    impact: "60% complete",
    category: "goal"
  }
];

// Calculate financial stats
export const calculateStats = (transactions: Transaction[]) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const totalIncome = monthlyTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0));

  const netIncome = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalExpenses,
    netIncome,
    savingsRate: savingsRate.toFixed(1),
    transactionCount: monthlyTransactions.length
  };
};