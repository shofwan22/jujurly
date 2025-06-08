// src/pages/FeedbackPage.tsx
import React from 'react';
// We will rename App.tsx to FeedbackForm.tsx and import it here
import FeedbackForm from '../components/FeedbackForm'; 

const FeedbackPage: React.FC = () => {
  return (
    <FeedbackForm />
  );
};

export default FeedbackPage;
