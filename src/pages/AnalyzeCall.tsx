import { useState, useCallback } from "react";
import { Upload, FileAudio, X, Loader2, CheckCircle2, BarChart3, MessageSquare, Clock, ThumbsUp, ThumbsDown, Minus, AlertTriangle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreRing from "@/components/ScoreRing";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalysisResult {
  overallScore: number;
  accuracy: number;
  sentiment: number;
  responsiveness: number;
  tone: number;
  duration: string;
  totalWords: number;
  agentTalkTime: string;
  customerTalkTime: string;
  silencePercentage: number;
  sentimentLabel: "positive" | "neutral" | "negative";
  keywords: string[];
  alerts: string[];
  transcript: { speaker: string; text: string; timestamp: string }[];
  sentimentTimeline: { time: string; score: number }[];
}

const mockAnalysis: AnalysisResult = {
  overallScore: 78,
  accuracy: 82,
  sentiment: 71,
  responsiveness: 85,
  tone: 74,
  duration: "6:42",
  totalWords: 847,
  agentTalkTime: "3:15",
  customerTalkTime: "2:48",
  silencePercentage: 9.7,
  sentimentLabel: "neutral",
  keywords: ["claim status", "deductible", "copay", "prior authorization", "network provider", "appeal process"],
  alerts: ["Long pause detected at 2:15", "Customer expressed frustration at 4:30"],
  transcript: [
    { speaker: "Agent", text: "Thank you for calling HealthFirst Insurance. How can I help you today?", timestamp: "0:00" },
    { speaker: "Customer", text: "Hi, I need to check the status of my claim. I submitted it two weeks ago and haven't heard anything.", timestamp: "0:08" },
    { speaker: "Agent", text: "I'd be happy to help you with that. Can you provide me your member ID and the claim number?", timestamp: "0:18" },
    { speaker: "Customer", text: "Sure, my member ID is HF-4429 and the claim number is CLM-88712.", timestamp: "0:26" },
    { speaker: "Agent", text: "Thank you. Let me pull that up for you... I can see your claim was received on March 25th. It's currently under review by our medical team for prior authorization.", timestamp: "0:35" },
    { speaker: "Customer", text: "Why does it need prior authorization? My doctor said this was a standard procedure.", timestamp: "0:52" },
    { speaker: "Agent", text: "I understand your concern. The prior authorization is required for procedures above a certain cost threshold under your plan. This is standard process and should be resolved within 5-7 business days.", timestamp: "1:02" },
    { speaker: "Customer", text: "That's frustrating. I was told it would be processed within a week.", timestamp: "1:20" },
  ],
  sentimentTimeline: [
    { time: "0:00", score: 70 },
    { time: "1:00", score: 65 },
    { time: "2:00", score: 55 },
    { time: "3:00", score: 50 },
    { time: "4:00", score: 40 },
    { time: "5:00", score: 55 },
    { time: "6:00", score: 65 },
  ],
};

const sentimentIcon = {
  positive: <ThumbsUp className="w-4 h-4 text-success" />,
  neutral: <Minus className="w-4 h-4 text-warning" />,
  negative: <ThumbsDown className="w-4 h-4 text-destructive" />,
};

const sentimentColor = {
  positive: "text-success",
  neutral: "text-warning",
  negative: "text-destructive",
};

const COLORS = ["hsl(174, 72%, 46%)", "hsl(210, 80%, 58%)", "hsl(220, 18%, 30%)"];

const AnalyzeCall = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const startAnalysis = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("uploading");
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setStatus("analyzing");

        setTimeout(() => {
          setStatus("done");
          setAnalysis(mockAnalysis);
        }, 2500);
      } else {
        setProgress(Math.min(p, 100));
      }
    }, 400);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) startAnalysis(droppedFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) startAnalysis(e.target.files[0]);
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setAnalysis(null);
  };

  const talkTimeData = analysis ? [
    { name: "Agent", value: 195 },
    { name: "Customer", value: 168 },
    { name: "Silence", value: 39 },
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analyze Call</h1>
        <p className="text-muted-foreground mt-1">Upload an audio file to get AI-powered performance analysis</p>
      </div>

      {/* Upload / Status Section */}
      {status === "idle" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative glass-card p-16 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${
            isDragging ? "border-primary/60 glow-primary" : ""
          }`}
        >
          {isDragging && <div className="absolute inset-0 rounded-xl gradient-border" />}
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Upload className="w-9 h-9 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Drop your audio file here</h3>
          <p className="text-sm text-muted-foreground mb-6">Supports MP3, WAV, M4A, FLAC • Max 200MB</p>
          <label>
            <input type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />
            <Button variant="outline" size="lg" className="cursor-pointer" asChild>
              <span>Browse Files</span>
            </Button>
          </label>
        </div>
      )}

      {(status === "uploading" || status === "analyzing") && file && (
        <div className="glass-card p-8 flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            {status === "uploading" ? <FileAudio className="w-7 h-7 text-primary" /> : <Loader2 className="w-7 h-7 text-primary animate-spin" />}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {status === "uploading" ? `Uploading... ${Math.round(progress)}%` : "Analyzing audio with AI..."}
            </p>
          </div>
          {status === "uploading" && (
            <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}
          {status === "analyzing" && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              Processing transcript, sentiment & scoring...
            </div>
          )}
        </div>
      )}

      {/* Analysis Results */}
      {status === "done" && analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* File info + reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{file?.name}</p>
                <p className="text-xs text-muted-foreground">Analysis complete</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <Upload className="w-4 h-4 mr-2" /> Analyze Another
            </Button>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="glass-card p-6 flex flex-col items-center justify-center lg:col-span-1">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Overall Score</h3>
              <ScoreRing score={analysis.overallScore} size={140} strokeWidth={10} />
              <div className={`flex items-center gap-2 mt-4 text-sm font-medium ${sentimentColor[analysis.sentimentLabel]}`}>
                {sentimentIcon[analysis.sentimentLabel]}
                <span className="capitalize">{analysis.sentimentLabel} Sentiment</span>
              </div>
            </div>

            <div className="glass-card p-6 lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">Score Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Accuracy", value: analysis.accuracy, desc: "Correctness of information provided" },
                  { label: "Sentiment", value: analysis.sentiment, desc: "Emotional tone of the conversation" },
                  { label: "Responsiveness", value: analysis.responsiveness, desc: "Speed & relevance of responses" },
                  { label: "Tone", value: analysis.tone, desc: "Professionalism & empathy" },
                ].map((metric) => (
                  <div key={metric.label} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className={`text-lg font-bold ${
                        metric.value >= 80 ? "text-success" : metric.value >= 60 ? "text-warning" : "text-destructive"
                      }`}>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          metric.value >= 80 ? "bg-success" : metric.value >= 60 ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{metric.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call Stats + Sentiment Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Call Statistics</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-semibold text-foreground">{analysis.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Words</p>
                    <p className="text-sm font-semibold text-foreground">{analysis.totalWords}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-info" />
                  <div>
                    <p className="text-xs text-muted-foreground">Agent Talk</p>
                    <p className="text-sm font-semibold text-foreground">{analysis.agentTalkTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-warning" />
                  <div>
                    <p className="text-xs text-muted-foreground">Silence</p>
                    <p className="text-sm font-semibold text-foreground">{analysis.silencePercentage}%</p>
                  </div>
                </div>
              </div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">Talk Time Distribution</h4>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={talkTimeData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {talkTimeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {talkTimeData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Sentiment Over Time</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analysis.sentimentTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {analysis.sentimentTimeline.map((entry, i) => (
                      <Cell key={i} fill={entry.score >= 60 ? "hsl(var(--success))" : entry.score >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Alerts */}
              {analysis.alerts.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Alerts
                  </h4>
                  {analysis.alerts.map((alert, i) => (
                    <div key={i} className="text-xs text-destructive/80 bg-destructive/10 px-3 py-2 rounded-lg">
                      {alert}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Keywords */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              <BarChart3 className="w-4 h-4 inline mr-2 text-primary" />
              Key Topics Detected
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((kw) => (
                <span key={kw} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Transcript */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Call Transcript</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {analysis.transcript.map((line, i) => (
                <div key={i} className={`flex gap-3 ${line.speaker === "Agent" ? "" : "flex-row-reverse"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                    line.speaker === "Agent" ? "bg-primary/20 text-primary" : "bg-info/20 text-info"
                  }`}>
                    {line.speaker === "Agent" ? "A" : "C"}
                  </div>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    line.speaker === "Agent"
                      ? "bg-muted/50 text-foreground rounded-tl-sm"
                      : "bg-primary/10 text-foreground rounded-tr-sm"
                  }`}>
                    <p>{line.text}</p>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{line.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeCall;
