// src/pages/LandingPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Placeholder for authentication check. 
  // In a real app, this would check a token, context, or an auth service.
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

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Jujurly</h1>
        <p>Feedback jujur, biar makin mujur.</p>
      </header>
      <main className="landing-main">
        <h2>Mau ngapain nih?</h2>
        <div className="landing-actions">
          {/* Changed Link to button with onClick handler */}
          <button onClick={handleCollectFeedbackClick} className="landing-button">
            Mau Kumpulin Feedback
          </button>
          <Link to="/ke" className="landing-button-secondary">
            Mau Kasih Feedback
          </Link>
        </div>
        <p className="landing-footer">Platform Honesty as a Service (HaaS) pertama di Indonesia!</p>
        <p className="landing-info">
          Kalau mau kasih feedback, pastiin kamu punya link unik dari orangnya, atau tau usernamenya ya!
        </p>

        <p className="landing-info">
          Format:  <a href="https://jujur.ly/ke/iganarendra" target="_blank" rel="noopener noreferrer">https://jujur.ly/ke/username</a>    
        </p>
      </main>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Jujurly, maap frontendnya jele...</p>
      </footer>
    </div>
  );
};

export default LandingPage;
