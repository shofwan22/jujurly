import { useNavigate } from 'react-router-dom'; // Import useNavigate

const useCollectFeedback = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const isAuthenticated = () => {
    // For now, let's assume the user is not logged in by default.
    // You can change this to true to test the logged-in scenario.
    // e.g., return localStorage.getItem('userToken') !== null;
    return false;
  };

  const handleCollectFeedbackClick = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  return {
    handleCollectFeedbackClick,
  };
};

export default useCollectFeedback;
