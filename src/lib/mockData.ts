export interface TrendingQuestion {
  id: string;
  question: string;
  count: number;
  trend: "up" | "down" | "stable";
  category: string;
  lastAsked: string;
}

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
