export interface Agent {
  id: string;
  name: string;
  avatar: string;
  overallScore: number;
  accuracy: number;
  sentiment: number;
  responsiveness: number;
  totalCalls: number;
  avgDuration: string;
  status: "active" | "review" | "flagged";
}

export interface CallRecord {
  id: string;
  agentId: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  overallScore: number;
  sentiment: "positive" | "neutral" | "negative";
  keywords: string[];
  alerts: string[];
}

export interface TrendingQuestion {
  id: string;
  question: string;
  count: number;
  trend: "up" | "down" | "stable";
  category: string;
  lastAsked: string;
}

export const agents: Agent[] = [
  { id: "1", name: "Sarah Johnson", avatar: "SJ", overallScore: 92, accuracy: 94, sentiment: 88, responsiveness: 95, totalCalls: 234, avgDuration: "4:32", status: "active" },
  { id: "2", name: "Mike Chen", avatar: "MC", overallScore: 85, accuracy: 82, sentiment: 90, responsiveness: 83, totalCalls: 198, avgDuration: "5:15", status: "active" },
  { id: "3", name: "Priya Patel", avatar: "PP", overallScore: 78, accuracy: 75, sentiment: 82, responsiveness: 77, totalCalls: 156, avgDuration: "6:01", status: "review" },
  { id: "4", name: "James Wilson", avatar: "JW", overallScore: 56, accuracy: 52, sentiment: 60, responsiveness: 55, totalCalls: 89, avgDuration: "7:22", status: "flagged" },
  { id: "5", name: "Lisa Torres", avatar: "LT", overallScore: 88, accuracy: 91, sentiment: 85, responsiveness: 89, totalCalls: 212, avgDuration: "4:45", status: "active" },
];

export const recentCalls: CallRecord[] = [
  { id: "c1", agentId: "1", agentName: "Sarah Johnson", customerName: "John D.", duration: "3:42", date: "2026-04-06 10:30", overallScore: 95, sentiment: "positive", keywords: ["claim status", "coverage"], alerts: [] },
  { id: "c2", agentId: "4", agentName: "James Wilson", customerName: "Maria G.", duration: "8:15", date: "2026-04-06 09:15", overallScore: 42, sentiment: "negative", keywords: ["billing", "complaint"], alerts: ["Long hold time", "Negative sentiment detected"] },
  { id: "c3", agentId: "2", agentName: "Mike Chen", customerName: "Robert K.", duration: "5:10", date: "2026-04-06 08:45", overallScore: 88, sentiment: "positive", keywords: ["prescription", "pharmacy"], alerts: [] },
  { id: "c4", agentId: "3", agentName: "Priya Patel", customerName: "Susan L.", duration: "6:30", date: "2026-04-05 16:20", overallScore: 71, sentiment: "neutral", keywords: ["deductible", "copay"], alerts: ["Accuracy concern"] },
  { id: "c5", agentId: "5", agentName: "Lisa Torres", customerName: "David M.", duration: "4:05", date: "2026-04-05 15:00", overallScore: 90, sentiment: "positive", keywords: ["enrollment", "benefits"], alerts: [] },
];

export const trendingQuestions: TrendingQuestion[] = [
  { id: "t1", question: "How do I check my claim status?", count: 342, trend: "up", category: "Claims", lastAsked: "2 hours ago" },
  { id: "t2", question: "What is my copay for specialist visits?", count: 289, trend: "up", category: "Coverage", lastAsked: "1 hour ago" },
  { id: "t3", question: "How to add a dependent to my plan?", count: 256, trend: "stable", category: "Enrollment", lastAsked: "3 hours ago" },
  { id: "t4", question: "Why was my prescription denied?", count: 234, trend: "up", category: "Pharmacy", lastAsked: "30 min ago" },
  { id: "t5", question: "When does open enrollment start?", count: 198, trend: "down", category: "Enrollment", lastAsked: "5 hours ago" },
  { id: "t6", question: "Is my doctor in-network?", count: 187, trend: "stable", category: "Network", lastAsked: "1 hour ago" },
  { id: "t7", question: "How do I appeal a denied claim?", count: 165, trend: "up", category: "Claims", lastAsked: "4 hours ago" },
  { id: "t8", question: "What is my deductible balance?", count: 143, trend: "down", category: "Billing", lastAsked: "2 hours ago" },
];

export const sentimentOverTime = [
  { day: "Mon", positive: 65, neutral: 25, negative: 10 },
  { day: "Tue", positive: 60, neutral: 28, negative: 12 },
  { day: "Wed", positive: 70, neutral: 20, negative: 10 },
  { day: "Thu", positive: 55, neutral: 30, negative: 15 },
  { day: "Fri", positive: 68, neutral: 22, negative: 10 },
  { day: "Sat", positive: 72, neutral: 20, negative: 8 },
  { day: "Sun", positive: 75, neutral: 18, negative: 7 },
];

export const callVolumeData = [
  { hour: "8AM", calls: 12 },
  { hour: "9AM", calls: 28 },
  { hour: "10AM", calls: 45 },
  { hour: "11AM", calls: 38 },
  { hour: "12PM", calls: 22 },
  { hour: "1PM", calls: 35 },
  { hour: "2PM", calls: 42 },
  { hour: "3PM", calls: 40 },
  { hour: "4PM", calls: 30 },
  { hour: "5PM", calls: 18 },
];
