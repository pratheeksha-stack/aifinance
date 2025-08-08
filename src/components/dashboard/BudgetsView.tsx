import { useState } from "react";
import { Plus, Edit, Target, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BudgetCard from "./BudgetCard";
import { mockBudgets } from "@/lib/mockData";

export default function BudgetsView() {
  const totalBudgeted = mockBudgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = mockBudgets.filter(budget => budget.spent > budget.budgeted).length;
  const nearLimitCount = mockBudgets.filter(budget => 
    (budget.spent / budget.budgeted) > 0.8 && budget.spent <= budget.budgeted
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget Management</h2>
          <p className="text-muted-foreground">Track and manage your spending limits</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budgeted</p>
                <p className="text-xl font-bold">${totalBudgeted.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-expense/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-expense" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Near Limit</p>
                <p className="text-xl font-bold">{nearLimitCount}</p>
                <p className="text-xs text-muted-foreground">budgets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-expense/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-expense" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Over Budget</p>
                <p className="text-xl font-bold">{overBudgetCount}</p>
                <p className="text-xs text-muted-foreground">budgets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Budget Progress */}
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Budget Progress</span>
            <Badge variant="secondary">
              {((totalSpent / totalBudgeted) * 100).toFixed(1)}% used
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${totalSpent.toLocaleString()} spent
              </span>
              <span className="font-medium">
                ${totalBudgeted.toLocaleString()} budgeted
              </span>
            </div>
            <Progress 
              value={(totalSpent / totalBudgeted) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-sm">
              <span className="text-success font-medium">
                ${(totalBudgeted - totalSpent).toLocaleString()} remaining
              </span>
              <span className="text-muted-foreground">
                {mockBudgets.length} active budgets
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBudgets.map((budget) => (
          <div key={budget.id} className="relative group">
            <BudgetCard budget={budget} />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Tips */}
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Budget Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Smart Budgeting</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span>Review and adjust budgets monthly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span>Set up alerts when you reach 80% of any budget</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Saving Strategies</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span>Automate savings to reach goals faster</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span>Track small expenses - they add up quickly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span>Use cash for discretionary spending</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}