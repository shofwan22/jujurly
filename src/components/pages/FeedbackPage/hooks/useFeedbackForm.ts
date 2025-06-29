import { useState, useEffect } from 'react';

const useFeedbackForm = ({ userId }: { userId: string }) => {
  const [step, setStep] = useState(1);
  const [anonIdentifier, setAnonIdentifier] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackContext, setFeedbackContext] = useState('');
  const [emailOptIn, setEmailOptIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [targetUserName, setTargetUserName] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you might fetch user details here based on userId
    // to display something like "You are giving feedback to [UserName]"
    // For now, we'll just use the userId itself.
    if (userId) {
      setTargetUserName(userId); // Replace with actual name fetching if API exists
    } else {
      setTargetUserName(null);
    }
  }, [userId]);

  const nextStep = () => setStep(step + 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageError('');
    setMessageSuccess('');

    if (!userId) {
      // This check might be redundant if FeedbackPage ensures userId is always passed
      setMessageError(
        'Error: User ID tidak ditemukan. Pastikan URLnya benar, contoh: jujurly.space/ke/namauser'
      );
      setIsLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    try {
      const response = await fetch(`${API_URL}/api/feedback/${userId}`, {
        // Use userId from prop
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anon_identifier: anonIdentifier,
          feedback_text: feedbackText,
          context_text: feedbackContext,
          anon_email: emailOptIn,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessageSuccess(
          result.message || 'Makasih ya feedbacknya! Udah kesimpen nih.'
        );
        setStep(1);
        setAnonIdentifier('');
        setFeedbackText('');
        setFeedbackContext('');
        setEmailOptIn('');
      } else {
        setMessageError(
          result.message || 'Gagal mengirim feedback. Coba lagi ya.'
        );
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessageError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    anonIdentifier,
    setAnonIdentifier,
    feedbackText,
    setFeedbackText,
    feedbackContext,
    setFeedbackContext,
    emailOptIn,
    setEmailOptIn,
    isLoading,
    messageError,
    messageSuccess,
    targetUserName,
    nextStep,
    handleSubmit,
  };
};

export default useFeedbackForm;
