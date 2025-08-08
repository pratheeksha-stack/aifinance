import { useState } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardOverview from "./dashboard/DashboardOverview";
import TransactionsView from "./dashboard/TransactionsView";
import BudgetsView from "./dashboard/BudgetsView";
import AIInsightsView from "./dashboard/AIInsightsView";
import SpendingChart from "./dashboard/SpendingChart";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return <TransactionsView />;
      case "budgets":
        return <BudgetsView />;
      case "analytics":
        return <SpendingChart />;
      case "insights":
        return <AIInsightsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}