export interface FeedbackItem {
  id: number;
  timestamp: string; // ISO 8601 string from backend
  sender: string;
  context: string;
  sentiment: string; // Includes emoji from backend
  summary: string;
  constructiveCriticism: string;
}
