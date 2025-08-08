import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "FinanceAI - Personal Finance Dashboard";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AI-powered personal finance dashboard for tracking expenses, budgets, and financial insights');
    }
  }, []);

  return <Dashboard />;
};

export default Index;
