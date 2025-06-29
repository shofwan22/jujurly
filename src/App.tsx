import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeedbackPage from './pages/FeedbackPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import the new page
import UserLookupPage from './pages/UserLookupPage';

function App() {
  // Mock authentication check
  // In a real app, this would involve checking a token, context, or similar
  const isAuthenticated = !!localStorage.getItem('userData');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Route for giving feedback, potentially with a user identifier */}
        <Route path="/ke" element={<UserLookupPage />} />{' '}
        {/* Changed from /beri-feedback */}
        <Route path="/ke/:userId" element={<FeedbackPage />} />{' '}
        {/* Changed from /beri-feedback/:userId */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />{' '}
        {/* Add route for forgot password */}
        {/* Add a redirect for any other path to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
