import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeedbackPage from './pages/FeedbackPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Route for giving feedback, potentially with a user identifier */}
        <Route path="/beri-feedback" element={<FeedbackPage />} />
        <Route path="/beri-feedback/:userId" element={<FeedbackPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Add a redirect for any other path to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
