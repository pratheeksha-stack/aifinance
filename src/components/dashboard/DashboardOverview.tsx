import { DollarSign, TrendingUp, CreditCard, Wallet, Brain, FileText } from "lucide-react";
import StatCard from "./StatCard";
import TransactionCard from "./TransactionCard";
import BudgetCard from "./BudgetCard";
import SpendingChart from "./SpendingChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTransactions, mockBudgets, mockInsights, calculateStats } from "@/lib/mockData";

export default function DashboardOverview() {
  const stats = calculateStats(mockTransactions);
  const recentTransactions = mockTransactions.slice(0, 5);
  const topBudgets = mockBudgets.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={`$${(stats.totalIncome - stats.totalExpenses).toLocaleString()}`}
          change={`+${stats.savingsRate}% this month`}
          changeType="positive"
          icon={Wallet}
          gradient="bg-gradient-primary"
        />
        <StatCard
          title="Monthly Income"
          value={`$${stats.totalIncome.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-income"
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${stats.totalExpenses.toLocaleString()}`}
          change="-5% from last month"
          changeType="positive"
          icon={CreditCard}
          gradient="bg-gradient-expense"
        />
        <StatCard
          title="Savings Rate"
          value={`${stats.savingsRate}%`}
          change="Above target"
          changeType="positive"
          icon={DollarSign}
          gradient="bg-gradient-primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Transactions & AI Insights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Transactions */}
          <Card className="shadow-soft border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </CardContent>
          </Card>

          {/* Spending Chart */}
          <SpendingChart />
        </div>

        {/* Right Column - Budgets & AI Insights */}
        <div className="space-y-8">
          {/* Budgets Overview */}
          <Card className="shadow-soft border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Budget Status</CardTitle>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {topBudgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="shadow-soft border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-semibold">AI Insights</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-4 rounded-lg bg-accent/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Full Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}