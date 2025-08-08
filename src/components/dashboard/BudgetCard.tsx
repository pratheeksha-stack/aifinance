import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Budget {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  period: "monthly" | "weekly";
  color: string;
}

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const spentPercentage = (budget.spent / budget.budgeted) * 100;
  const remaining = budget.budgeted - budget.spent;
  const isOverBudget = spentPercentage > 100;
  const isNearLimit = spentPercentage > 80 && !isOverBudget;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <Card className="shadow-soft border-border/50 hover:shadow-medium transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold capitalize">
            {budget.category}
          </CardTitle>
          <Badge 
            variant={isOverBudget ? "destructive" : isNearLimit ? "secondary" : "default"}
            className="text-xs"
          >
            {budget.period}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {formatCurrency(budget.spent)} spent
            </span>
            <span className="font-medium">
              {formatCurrency(budget.budgeted)} budgeted
            </span>
          </div>
          
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className={cn(
              "h-2",
              isOverBudget && "[&>div]:bg-expense",
              isNearLimit && "[&>div]:bg-warning"
            )}
          />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isOverBudget ? (
              <>
                <AlertTriangle className="h-4 w-4 text-expense" />
                <span className="text-sm font-medium text-expense">
                  Over by {formatCurrency(Math.abs(remaining))}
                </span>
              </>
            ) : isNearLimit ? (
              <>
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">
                  {formatCurrency(remaining)} remaining
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">
                  {formatCurrency(remaining)} remaining
                </span>
              </>
            )}
          </div>
          
          <span className={cn(
            "text-sm font-bold",
            isOverBudget ? "text-expense" : "text-muted-foreground"
          )}>
            {spentPercentage.toFixed(0)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}