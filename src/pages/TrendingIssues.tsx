import { trendingQuestions } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Minus, MessageSquare, Clock } from "lucide-react";

const trendIcons = {
  up: <TrendingUp className="w-4 h-4 text-destructive" />,
  down: <TrendingDown className="w-4 h-4 text-success" />,
  stable: <Minus className="w-4 h-4 text-muted-foreground" />,
};

const categoryColors: Record<string, string> = {
  Claims: "bg-info/15 text-info",
  Coverage: "bg-primary/15 text-primary",
  Enrollment: "bg-success/15 text-success",
  Pharmacy: "bg-warning/15 text-warning",
  Network: "bg-accent/30 text-accent-foreground",
  Billing: "bg-destructive/15 text-destructive",
};

const TrendingIssues = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trending Issues</h1>
        <p className="text-muted-foreground mt-1">Most frequently asked questions in the past 7 days</p>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {trendingQuestions.slice(0, 3).map((q, i) => (
          <div key={q.id} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[q.category] || "bg-muted text-muted-foreground"}`}>
                {q.category}
              </span>
              {trendIcons[q.trend]}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-3 leading-relaxed">{q.question}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-2xl font-bold text-foreground">
                <MessageSquare className="w-4 h-4 text-primary mr-1" />
                {q.count}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {q.lastAsked}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full List */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">All Trending Questions</h3>
        <div className="space-y-2">
          {trendingQuestions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-lg font-bold text-muted-foreground w-6 text-center">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{q.question}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${categoryColors[q.category] || "bg-muted text-muted-foreground"}`}>
                    {q.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{q.lastAsked}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-foreground">{q.count}</span>
                {trendIcons[q.trend]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingIssues;
