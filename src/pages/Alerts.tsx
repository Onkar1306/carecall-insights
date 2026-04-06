import { recentCalls } from "@/lib/mockData";
import { AlertTriangle, Clock, User, Volume2 } from "lucide-react";

const alertCalls = recentCalls.filter((c) => c.alerts.length > 0);

const severityConfig: Record<string, { color: string; bg: string }> = {
  "Negative sentiment detected": { color: "text-destructive", bg: "bg-destructive/10" },
  "Long hold time": { color: "text-warning", bg: "bg-warning/10" },
  "Accuracy concern": { color: "text-warning", bg: "bg-warning/10" },
};

const Alerts = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
        <p className="text-muted-foreground mt-1">Critical issues requiring immediate attention</p>
      </div>

      {/* Summary */}
      <div className="glass-card p-6 border-destructive/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {alertCalls.reduce((a, c) => a + c.alerts.length, 0)} Active Alerts
            </h3>
            <p className="text-sm text-muted-foreground">From {alertCalls.length} calls today</p>
          </div>
        </div>
      </div>

      {/* Alert cards */}
      <div className="space-y-4">
        {alertCalls.map((call) =>
          call.alerts.map((alert, i) => {
            const config = severityConfig[alert] || { color: "text-warning", bg: "bg-warning/10" };
            return (
              <div key={`${call.id}-${i}`} className="glass-card p-5 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${config.color}`}>{alert}</h4>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {call.agentName}</span>
                      <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> {call.customerName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {call.duration}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {call.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    call.overallScore < 60 ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                  }`}>
                    Score: {call.overallScore}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alerts;
