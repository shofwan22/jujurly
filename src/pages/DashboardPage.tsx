// src/pages/DashboardPage.tsx
import React from 'react';
import './DashboardPage.css'; // We'll create this CSS file

// Placeholder for actual authentication and data fetching logic
const isAuthenticated = true; // Assume user is logged in for now
const username = "iganarendra"; // Placeholder username

const DashboardPage: React.FC = () => {
  if (!isAuthenticated) {
    // Later, this could redirect to a login/signup page
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Jujurly Dashboard</h1>
        </header>
        <main>
          <p>Waduh, kayaknya kamu belum login nih. Login dulu ya!</p>
          {/* <Link to="/login">Login/Signup</Link> */}
        </main>
      </div>
    );
  }

  const feedbackLink = `https://jujur.ly/ke/${username}`;

  // Placeholder feedback data
  const feedbacks = [
    {
      id: 1,
      timestamp: 'Kemarin, 10:30 WIB',
      context: 'Pas presentasi proyek Z',
      sentiment: 'Positif Banget 👍',
      summary: 'Katanya sih presentasinya keren, jelas, dan bikin semangat.',
      constructiveCriticism: 'Mungkin slide bisa ditambahin gambar biar makin asik.'
    },
    {
      id: 2,
      timestamp: '2 hari lalu, 15:00 WIB',
      context: 'Lagi nongkrong di kafe X',
      sentiment: 'Agak Negatif 😟',
      summary: 'Kayaknya kamu keliatan capek banget dan kurang fokus pas diajak ngobrol.',
      constructiveCriticism: 'Coba istirahat yang cukup ya, biar energinya balik lagi.'
    },
    {
      id: 3,
      timestamp: 'Minggu lalu',
      context: '-',
      sentiment: 'Netral Aja 😐',
      summary: 'Overall oke sih, tapi ada beberapa hal kecil yang bisa ditingkatin.',
      constructiveCriticism: 'Detailnya kurang spesifik, mungkin bisa lebih jelas lagi lain kali.'
    }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Punya {username}</h1>
        <p>Link spesial buat kamu bagiin: <a href={feedbackLink} target="_blank" rel="noopener noreferrer">{feedbackLink}</a></p>
      </header>
      <main className="dashboard-main">
        <h2>Ini Dia Feedback Buat Kamu:</h2>
        {feedbacks.length === 0 ? (
          <p>Belum ada feedback nih. Coba sebarin link kamu gih!</p>
        ) : (
          <div className="feedback-list">
            {feedbacks.map(fb => (
              <div key={fb.id} className="feedback-item">
                <h3>Feedback dari: Anonim</h3>
                <p><strong>Waktu:</strong> {fb.timestamp}</p>
                {fb.context !== '-' && <p><strong>Konteks:</strong> {fb.context}</p>}
                <p><strong>Sentimen:</strong> <span className={`sentiment sentiment-${fb.sentiment.split(' ')[1].toLowerCase()}`}>{fb.sentiment}</span></p>
                <div className="feedback-content">
                  <h4>Ringkasan (dari LLM):</h4>
                  <p>{fb.summary}</p>
                  <h4>Saran Konstruktif (dari LLM):</h4>
                  <p>{fb.constructiveCriticism}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Jujurly</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
