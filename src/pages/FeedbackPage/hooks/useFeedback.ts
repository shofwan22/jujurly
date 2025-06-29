import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const useFeedback = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setUserExists(false);
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    setChecking(true);
    fetch(`${API_URL}/api/user/lookup/${userId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('User not found');
      })
      .then((data) => {
        if (data && data.user_identifier) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      })
      .catch(() => setUserExists(false))
      .finally(() => setChecking(false));
  }, [userId]);

  useEffect(() => {
    if (userExists === false) {
      navigate('/ke', { state: { userNotFound: true } });
    }
  }, [userExists, navigate]);

  return {
    userId,
    userExists,
    checking,
  };
};

export default useFeedback;
