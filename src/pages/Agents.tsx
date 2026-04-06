import { agents } from "@/lib/mockData";
import ScoreRing from "@/components/ScoreRing";
import { Phone, Clock, TrendingUp } from "lucide-react";

const statusStyles = {
  active: "bg-success/15 text-success",
  review: "bg-warning/15 text-warning",
  flagged: "bg-destructive/15 text-destructive",
};

const Agents = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agent Performance</h1>
        <p className="text-muted-foreground mt-1">Individual agent scores and analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {agents.map((agent, i) => (
          <div
            key={agent.id}
            className="glass-card p-6 animate-fade-in hover:border-primary/30 transition-colors"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                {agent.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${statusStyles[agent.status]}`}>
                  {agent.status}
                </span>
              </div>
            </div>

            {/* Score Ring */}
            <div className="flex justify-center mb-5 relative">
              <ScoreRing score={agent.overallScore} size={110} strokeWidth={10} />
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              {[
                { label: "Accuracy", value: agent.accuracy },
                { label: "Sentiment", value: agent.sentiment },
                { label: "Responsiveness", value: agent.responsiveness },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="text-foreground font-medium">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        metric.value >= 80 ? "bg-success" : metric.value >= 60 ? "bg-warning" : "bg-destructive"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" /> {agent.totalCalls} calls
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> Avg {agent.avgDuration}
              </div>
              <div className="flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="w-3 h-3" /> Details
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
