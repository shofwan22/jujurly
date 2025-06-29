import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useLookup = () => {
  const [targetUser, setTargetUser] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    if (location.state && location.state.userNotFound) {
      setError('Username atau ID pengguna tidak ditemukan.');
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!targetUser.trim()) {
      setError('Username atau ID pengguna jangan lupa diisi ya.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/user/lookup/${targetUser.trim()}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.user_identifier) {
          setUserData(data);
          navigate(`/ke/${data.user_identifier}`);
        } else {
          setError('Gagal mendapatkan link feedback untuk pengguna ini.');
        }
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            'Pengguna tidak ditemukan atau terjadi kesalahan.'
        );
      }
    } catch (err) {
      console.error('User lookup error:', err);
      setError('Terjadi kesalahan saat menghubungi server. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userData,
    targetUser,
    setTargetUser,
    error,
    isLoading,
    handleSubmit,
  };
};

export default useLookup;
