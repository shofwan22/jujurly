// src/components/FeedbackForm.tsx
import { useState } from 'react';
import '../App.css' // Assuming App.css contains the relevant styles

// This is the refactored App.tsx content, now as a component
function FeedbackForm() {
  const [step, setStep] = useState(1);
  const [anonIdentifier, setAnonIdentifier] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackContext, setFeedbackContext] = useState('');
  const [emailOptIn, setEmailOptIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const nextStep = () => setStep(step + 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Attempt to get link_id from the URL path, e.g., /f/your-link-id
    // This is a simple extraction, adjust if your routing is different
    const pathParts = window.location.pathname.split('/');
    const linkId = pathParts[pathParts.length - 1]; // Assumes link_id is the last part

    if (!linkId || pathParts[pathParts.length - 2] !== 'ke') { // Example check: URL should be like /f/linkid
        setMessage("Error: Link ID tidak ditemukan di URL. Pastikan URLnya benar, contoh: jujur.ly/ke/abcdef12");
        setIsLoading(false);
        return;
    }

    // For Vite, use import.meta.env
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'; 

    try {
      const response = await fetch(`${API_URL}/api/feedback/${linkId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anon_identifier: anonIdentifier,
          feedback_text: feedbackText,
          context_text: feedbackContext, // Ensure backend expects context_text
          anon_email: emailOptIn,         // Ensure backend expects anon_email
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Makasih ya feedbacknya! Udah kesimpen nih.");
        // Reset form
        setStep(1);
        setAnonIdentifier('');
        setFeedbackText('');
        setFeedbackContext('');
        setEmailOptIn('');
      } else {
        setMessage(result.message || "Gagal mengirim feedback. Coba lagi ya.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>Jujurly</h1>
      </header>
      <main>
        <section className="feedback-form-container">
          <h2>Kasih Feedback Anonim Dong</h2>
          {/* Example of how the link might be displayed if needed, though the form uses the URL's link_id */}
          {/* <p>Memberi feedback untuk link: /f/{window.location.pathname.split('/').pop()}</p> */}
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <label htmlFor="anonIdentifier">Kenal gue darimana? atau siapa nih?</label>
                <small className="label-subtitle">lo boleh kasih tau nama, atau stay anon, tapi kabarin elu kenal dia dimana. Biar apa? Biar AI kita bisa paham, terus dia kita kasih paham LOL</small>
                <input 
                  type="text" 
                  id="anonIdentifier" 
                  placeholder="cth: temen sekelas, rekan kerja proyek X" 
                  value={anonIdentifier}
                  onChange={(e) => setAnonIdentifier(e.target.value)}
                  required 
                />
                <button type="button" onClick={nextStep}>Lanjut</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <label htmlFor="feedbackText">yang pengen lo sampein</label>
                <small className="label-subtitle">santai sih, doi ga bisa liat langsung, tunjukkin aja semua yang lo rasain ke dia</small>
                <textarea 
                  id="feedbackText" 
                  rows={5} 
                  placeholder="'Jujurly... Gue suka cara lo presentasi' atau 'Jujurly... parah banget, kerjaan kacau babiii'" 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                ></textarea>
                <button type="button" onClick={nextStep}>Lanjut</button>
              </div>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="feedbackContext">Konteks feedbacknya apa nih? (opsional, karena kita pake AI, biar makin kena nih ke doi)</label>
                <input 
                  type="text" 
                  id="feedbackContext" 
                  placeholder="cth: pas proyek X, abis presentasi" 
                  value={feedbackContext}
                  onChange={(e) => setFeedbackContext(e.target.value)}
                />
                <button type="button" onClick={nextStep}>Lanjut</button>
              </div>
            )}

            {step === 4 && (
              <div>
                <label htmlFor="emailOptIn">Email lo (opsional, biar dikabarin kalo feedback lo dibaca):</label>
                <input 
                  type="email" 
                  id="emailOptIn" 
                  placeholder="email.lo@example.com"
                  value={emailOptIn}
                  onChange={(e) => setEmailOptIn(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Mengirim...' : 'Kirim Feedback'}
                </button>
              </div>
            )}
          </form>
          {message && <p className="form-message">{message}</p>}
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Jujurly... maap frontend masi jele</p>
      </footer>
    </>
  )
}

export default FeedbackForm;
