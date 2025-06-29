import { useState } from 'react';

const useSubmitLogin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!emailOrUsername || !password) {
      setError('Email/Username dan password tidak boleh kosong.');
      setLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send 'identifier' instead of 'emailOrUsername' to match backend
        body: JSON.stringify({ identifier: emailOrUsername, password }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // In a real app, you would store a token and user info in a global state/context
        // For example, using localStorage (ensure to handle security implications):
        localStorage.setItem('userData', JSON.stringify(data));
        // localStorage.setItem('userToken', data.token); // If backend returns a token
        window.location.href = 'dashboard';
      } else {
        let errorDisplayMessage =
          'Login gagal. Periksa kembali email/username dan password kamu.';
        // Log the raw response status
        console.error(
          `Login API request failed with status: ${response.status}`
        );
        try {
          const errorData = await response.json();
          // Log the detailed error from the backend if available
          console.error('Backend error details:', errorData);
          if (errorData && errorData.message) {
            errorDisplayMessage = errorData.message;
          }
        } catch (jsonParseError) {
          // This catch block handles errors if response.json() fails (e.g., empty response or not JSON)
          console.error(
            'Failed to parse backend error response as JSON:',
            jsonParseError
          );
          // You could try to get text from the response if JSON parsing fails:
          // try {
          //   const textError = await response.text();
          //   console.error('Backend error response text:', textError);
          //   if (textError) errorDisplayMessage = textError;
          // } catch (textParseError) {
          //   console.error('Failed to get text from backend error response:', textParseError);
          // }
        }
        setError(errorDisplayMessage);
      }
    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan. Coba lagi nanti ya.');
      console.error('Login error:', err);
    }
  };

  return {
    emailOrUsername,
    setEmailOrUsername,
    password,
    setPassword,
    error,
    setError,
    loading,
    setLoading,
    handleSubmit,
  };
};

export default useSubmitLogin;
