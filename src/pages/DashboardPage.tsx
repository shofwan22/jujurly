// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import './DashboardPage.css'; // We'll create this CSS file

// Placeholder for actual authentication and data fetching logic
const isAuthenticated = true; // Assume user is logged in for now
const username = "iganarendra"; // Placeholder username
const API_BASE_URL = 'http://localhost:5001'; // Backend API base URL

interface FeedbackItem {
  id: number;
  timestamp: string; // ISO 8601 string from backend
  context: string;
  sentiment: string; // Includes emoji from backend
  summary: string;
  constructiveCriticism: string;
}

// Function to format ISO date string to a more readable format
const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

// Function to get a CSS class based on sentiment string
const getSentimentClass = (sentimentString: string): string => {
  const lowerSentiment = sentimentString.toLowerCase();
  if (lowerSentiment.includes('positif')) return 'sentiment-positif';
  if (lowerSentiment.includes('negatif')) return 'sentiment-negatif';
  // Default to neutral if no specific keyword found or if it's explicitly neutral
  return 'sentiment-netral';
};


// Updated API function to fetch data from the backend
const fetchFeedbacksForUser = async (user: string): Promise<FeedbackItem[]> => {
  console.log(`Fetching feedback for ${user} from backend...`);
  const response = await fetch(`${API_BASE_URL}/api/users/${user}/feedbacks`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch feedbacks and parse error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: FeedbackItem[] = await response.json();
  return data;
};

const DashboardPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && username) {
      setIsLoading(true);
      setError(null);
      fetchFeedbacksForUser(username)
        .then(data => {
          setFeedbacks(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch feedbacks:", err);
          setError(err.message || "Duh, gagal ngambil feedback nih. Coba lagi nanti ya.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // Not authenticated or no username
    }
  }, [username]); // Refetch if username changes

  if (!isAuthenticated) {
    // Later, this could redirect to a login/signup page
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Jujurly Dashboard</h1>
        </header>
        <main>
          <p>Waduh, kayaknya kamu belum login nih. Login dulu ya!</p>
          {/* <Link to="/login">Login/Signup</Link> */}
        </main>
      </div>
    );
  }

  const feedbackLink = `https://jujur.ly/ke/${username}`;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Punya {username}</h1>
        <p>Link spesial buat kamu bagiin: <a href={feedbackLink} target="_blank" rel="noopener noreferrer">{feedbackLink}</a></p>
      </header>
      <main className="dashboard-main">
        <h2>Ini Dia Feedback Buat Kamu:</h2>
        {isLoading && <p>Lagi ngambil feedback, sabar ya...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && feedbacks.length === 0 && (
          <p>Belum ada feedback nih. Coba sebarin link kamu gih!</p>
        )}
        {!isLoading && !error && feedbacks.length > 0 && (
          <div className="feedback-list">
            {feedbacks.map(fb => (
              <div key={fb.id} className="feedback-item">
                <h3>Feedback dari: Anonim</h3>
                <p><strong>Waktu:</strong> {formatTimestamp(fb.timestamp)}</p>
                {fb.context && fb.context !== '-' && <p><strong>Konteks:</strong> {fb.context}</p>}
                <p><strong>Sentimen:</strong> <span className={`sentiment ${getSentimentClass(fb.sentiment)}`}>{fb.sentiment}</span></p>
                <div className="feedback-content">
                  <h4>Ringkasan (dari LLM):</h4>
                  <p>{fb.summary}</p>
                  <h4>Saran Konstruktif (dari LLM):</h4>
                  <p>{fb.constructiveCriticism}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Jujurly</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
