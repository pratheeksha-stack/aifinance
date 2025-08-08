import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: string;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  gradient = "bg-gradient-primary"
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden shadow-soft border-border/50 hover:shadow-medium transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <p className={cn(
                "text-sm font-medium flex items-center",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-expense",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            gradient
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -z-10 opacity-5">
        <div className="h-32 w-32 rounded-full bg-gradient-primary transform translate-x-6 -translate-y-6" />
      </div>
    </Card>
  );
}