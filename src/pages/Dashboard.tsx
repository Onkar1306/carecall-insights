import { Phone, Users, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import MetricCard from "@/components/MetricCard";
import { agents, recentCalls, sentimentOverTime, callVolumeData } from "@/lib/mockData";

const Dashboard = () => {
  const avgScore = Math.round(agents.reduce((a, b) => a + b.overallScore, 0) / agents.length);
  const alertCount = recentCalls.filter((c) => c.alerts.length > 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Healthcare call center performance overview</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Total Calls Today" value="187" change="+12% from yesterday" changeType="positive" icon={Phone} />
        <MetricCard title="Active Agents" value={agents.filter(a => a.status === "active").length} change={`${agents.length} total`} changeType="neutral" icon={Users} />
        <MetricCard title="Avg. Score" value={`${avgScore}%`} change="+3% this week" changeType="positive" icon={TrendingUp} />
        <MetricCard title="Active Alerts" value={alertCount} change="2 critical" changeType="negative" icon={AlertTriangle} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Call Volume */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Call Volume Today</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Trend */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Sentiment Trend (7 days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={sentimentOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="positive" stackId="1" fill="hsl(var(--success))" stroke="hsl(var(--success))" fillOpacity={0.3} />
              <Area type="monotone" dataKey="neutral" stackId="1" fill="hsl(var(--warning))" stroke="hsl(var(--warning))" fillOpacity={0.3} />
              <Area type="monotone" dataKey="negative" stackId="1" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Calls</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-3 text-muted-foreground font-medium">Agent</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Customer</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Duration</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Score</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Sentiment</th>
                <th className="text-left pb-3 text-muted-foreground font-medium">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr key={call.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{call.agentName}</td>
                  <td className="py-3 text-muted-foreground">{call.customerName}</td>
                  <td className="py-3 text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {call.duration}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      call.overallScore >= 80 ? "bg-success/15 text-success" :
                      call.overallScore >= 60 ? "bg-warning/15 text-warning" :
                      "bg-destructive/15 text-destructive"
                    }`}>
                      {call.overallScore}%
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 text-xs capitalize ${
                      call.sentiment === "positive" ? "text-success" :
                      call.sentiment === "neutral" ? "text-warning" :
                      "text-destructive"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {call.sentiment}
                    </span>
                  </td>
                  <td className="py-3">
                    {call.alerts.length > 0 ? (
                      <span className="text-xs text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {call.alerts.length}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
