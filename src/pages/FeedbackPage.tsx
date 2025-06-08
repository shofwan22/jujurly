// src/pages/FeedbackPage.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    console.warn("No userId found in URL, redirecting to landing page.");
    return <Navigate to="/" replace />;
  }

  return (
    <FeedbackForm userId={userId} />
  );
};

export default FeedbackPage;
