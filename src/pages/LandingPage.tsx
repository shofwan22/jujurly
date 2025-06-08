// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // We'll create this CSS file

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Jujurly</h1>
        <p>Feedback jujur, biar makin mujur.</p>
      </header>
      <main className="landing-main">
        <h2>Mau ngapain nih?</h2>
        <div className="landing-actions">
          <Link to="/dashboard" className="landing-button">
            Mau Kumpulin Feedback
          </Link>
          <Link to="/beri-feedback" className="landing-button landing-button-secondary">
            Mau Kasih Feedback
          </Link>
        </div>
        <p className="landing-info">
          Kalau mau kasih feedback, pastiin kamu punya link unik dari orangnya ya!
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
