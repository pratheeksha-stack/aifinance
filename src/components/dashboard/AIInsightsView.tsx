import { Brain, TrendingUp, Target, Lightbulb, FileText, Zap, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockInsights } from "@/lib/mockData";

const detailedInsights = [
  {
    id: "1",
    type: "optimization",
    title: "Subscription Optimization",
    description: "You have 5 active subscriptions totaling $89/month. Consider canceling unused Netflix and Spotify Premium to save $25/month.",
    impact: "$300/year",
    confidence: 92,
    category: "subscriptions",
    icon: Target,
    color: "text-warning"
  },
  {
    id: "2", 
    type: "spending_pattern",
    title: "Impulse Purchase Pattern",
    description: "Analysis shows you tend to make unplanned purchases on Friday evenings, averaging $75 per week. Consider setting a weekly discretionary budget.",
    impact: "Reduce by $150/month",
    confidence: 87,
    category: "behavior",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    id: "3",
    type: "goal_tracking",
    title: "Emergency Fund Progress",
    description: "You're making excellent progress on your emergency fund! At your current savings rate, you'll reach your $10,000 goal in 8 months.",
    impact: "On track",
    confidence: 95,
    category: "goals",
    icon: Zap,
    color: "text-success"
  },
  {
    id: "4",
    type: "risk_alert",
    title: "Budget Variance Alert",
    description: "Your food spending is 40% above normal this month. Mostly from delivery apps during late hours. Consider meal prepping.",
    impact: "Save $120/month",
    confidence: 89,
    category: "budget",
    icon: AlertTriangle,
    color: "text-expense"
  }
];

const financialScore = {
  overall: 78,
  budgeting: 85,
  saving: 72,
  investing: 65,
  debt: 90
};

export default function AIInsightsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">AI Financial Insights</h2>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <p className="text-muted-foreground">Personalized recommendations powered by AI</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Financial Health Score */}
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Financial Health Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {financialScore.overall}/100
              </div>
              <p className="text-sm text-muted-foreground mb-4">Overall Financial Health</p>
              <Progress value={financialScore.overall} className="h-3 mx-auto max-w-md" />
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(financialScore).filter(([key]) => key !== 'overall').map(([category, score]) => (
                <div key={category} className="text-center p-4 rounded-lg bg-accent/50">
                  <div className="text-2xl font-bold mb-1">{score}</div>
                  <div className="text-sm text-muted-foreground capitalize mb-2">{category}</div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {detailedInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className="shadow-soft border-border/50 hover:shadow-medium transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      insight.type === 'risk_alert' ? 'bg-expense/10 text-expense' :
                      insight.type === 'goal_tracking' ? 'bg-success/10 text-success' :
                      'bg-primary/10 text-primary'
                    }`}
                  >
                    {insight.impact}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {insight.category}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <span>Recommended Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium">Set Food Budget</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Reduce food expenses by 25% with a $400 monthly limit
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <h4 className="font-medium">Automate Savings</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Save $200 monthly automatically to reach your goals faster
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <h4 className="font-medium">Review Subscriptions</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Cancel unused subscriptions to save $300 annually
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}