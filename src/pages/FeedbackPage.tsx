// src/pages/FeedbackPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!userId) {
      setUserExists(false);
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    setChecking(true);
    fetch(`${API_URL}/api/user/lookup/${userId}`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
      })
      .then(data => {
        if (data && data.link_id) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      })
      .catch(() => setUserExists(false))
      .finally(() => setChecking(false));
  }, [userId]);

  if (!userId) {
    console.warn("No userId found in URL, redirecting to landing page.");
    return <Navigate to="/" replace />;
  }
  if (checking) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Mengecek pengguna...</div>;
  }
  if (userExists === false) {
    return <Navigate to="/user-lookup" replace />;
  }
  return (
    <FeedbackForm userId={userId} />
  );
};

export default FeedbackPage;
