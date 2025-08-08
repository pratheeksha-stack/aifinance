import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Car, Home, Coffee, Briefcase, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: "income" | "expense";
  merchant?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  showActions?: boolean;
}

const categoryIcons: Record<string, any> = {
  food: Coffee,
  shopping: ShoppingCart,
  transport: Car,
  housing: Home,
  business: Briefcase,
  default: ShoppingCart,
};

const categoryColors: Record<string, string> = {
  food: "bg-orange-100 text-orange-700",
  shopping: "bg-blue-100 text-blue-700",
  transport: "bg-green-100 text-green-700",
  housing: "bg-purple-100 text-purple-700",
  business: "bg-gray-100 text-gray-700",
};

export default function TransactionCard({ transaction, showActions = false }: TransactionCardProps) {
  const Icon = categoryIcons[transaction.category] || categoryIcons.default;
  const isIncome = transaction.type === "income";
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(transaction.amount));

  return (
    <Card className="p-4 shadow-soft border-border/50 hover:shadow-medium transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Category icon */}
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            categoryColors[transaction.category] || "bg-gray-100 text-gray-700"
          )}>
            <Icon className="h-5 w-5" />
          </div>

          {/* Transaction details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {transaction.description}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-muted-foreground">
                {transaction.merchant || transaction.category}
              </p>
              <Badge variant="secondary" className="text-xs">
                {transaction.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Amount and actions */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="flex items-center space-x-1">
              {isIncome ? (
                <ArrowUpRight className="h-4 w-4 text-income" />
              ) : (
                <ArrowDownLeft className="h-4 w-4 text-expense" />
              )}
              <span className={cn(
                "font-semibold",
                isIncome ? "text-income" : "text-expense"
              )}>
                {isIncome ? "+" : "-"}{formattedAmount}
              </span>
            </div>
          </div>

          {showActions && (
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}