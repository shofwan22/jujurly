import { useEffect, useState } from 'react';

import type { FeedbackItem } from '../types';

const useDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = true; 
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // Updated API function to fetch data from the backend
  const fetchFeedbacksForUser = async (
    user: string
  ): Promise<FeedbackItem[]> => {
    console.log(`Fetching feedback for ${user} from backend...`);
    const response = await fetch(`${API_URL}/api/users/${user}/feedbacks`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Failed to fetch feedbacks and parse error',
      }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    const data: FeedbackItem[] = await response.json();
    return data;
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      setError(null);
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const username = userData.username;
      if (username) {
        fetchFeedbacksForUser(username)
          .then((data) => {
            setFeedbacks(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error('Failed to fetch feedbacks:', err);
            setError(
              err.message ||
                'Duh, gagal ngambil feedback nih. Coba lagi nanti ya.'
            );
            setIsLoading(false);
          });
      } else {
        setError('Username tidak ditemukan. Silakan login kembali.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // Not authenticated
    }
  }, []); // Refetch if username changes

  return {
    isAuthenticated,
    feedbacks,
    isLoading,
    error,
  };
};

export default useDashboard;
