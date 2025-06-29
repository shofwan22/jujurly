import { useState } from 'react';

const useSubmitReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email) {
      setError('Email jangan lupa diisi ya.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format emailnya kayaknya salah deh.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message ||
            'Permintaan reset password telah dikirim. Silakan cek email kamu.'
        );
        setEmail(''); // Clear the input field
      } else {
        // Even if backend always returns 200 for this endpoint for security,
        // handle potential network errors or unexpected backend responses.
        setError(
          data.message ||
            'Gagal mengirim permintaan reset password. Coba lagi ya.'
        );
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    message,
    setMessage,
    error,
    loading,
    handleSubmit,
  };
};

export default useSubmitReset;
