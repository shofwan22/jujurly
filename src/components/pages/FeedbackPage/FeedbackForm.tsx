import Card from '../../ui/Card';

import useFeedbackForm from './hooks/useFeedbackForm';

interface FeedbackFormProps {
  userId: string;
}

function FeedbackForm({ userId }: FeedbackFormProps) {
  const {
    step,
    anonIdentifier,
    setAnonIdentifier,
    feedbackText,
    setFeedbackText,
    feedbackContext,
    setFeedbackContext,
    emailOptIn,
    setEmailOptIn,
    isLoading,
    messageError,
    messageSuccess,
    targetUserName,
    nextStep,
    handleSubmit,
  } = useFeedbackForm({ userId });

  // Fallback if userId is somehow not provided, though FeedbackPage should handle this.
  if (!userId) {
    return (
      <main>
        <section className="feedback-form-container">
          <h2>Error</h2>
          <p>
            Waduh, kayaknya ada yang salah sama linknya atau user ID tidak
            ditemukan.
          </p>
        </section>
      </main>
    );
  }

  return (
    <Card>
      <main>
        <section className="feedback-form-container">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Kasih Feedback Anonim Dong{' '}
            {targetUserName ? `buat ${targetUserName}` : ''}
          </h2>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <label
                  htmlFor="anonIdentifier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kenal doi darimana? atau siapa nih?
                </label>
                <small className="text-center text-sm text-gray-600 mb-4">
                  lo boleh kasih tau nama, atau stay anon, tapi kabarin elu
                  kenal dia dimana. Biar apa? Biar AI kita bisa paham, terus dia
                  kita kasih paham LOL
                </small>
                <input
                  className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  type="text"
                  id="anonIdentifier"
                  placeholder="cth: temen sekelas, rekan kerja proyek X"
                  value={anonIdentifier}
                  onChange={(e) => setAnonIdentifier(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="mt-4 w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                  onClick={nextStep}
                >
                  Lanjut
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <label
                  htmlFor="feedbackText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Yang pengen lo sampein
                </label>
                <small className="text-center text-sm text-gray-600 mb-4">
                  santai sih, doi ga bisa liat langsung, tunjukkin aja semua
                  yang lo rasain ke dia, mengumpat bila perlu
                </small>
                <textarea
                  className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  id="feedbackText"
                  rows={5}
                  placeholder="'Gue suka cara lo presentasi' atau 'parah banget, kerjaan kacau babiii'"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                ></textarea>
                <button
                  type="button"
                  className="mt-4 w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                  onClick={nextStep}
                >
                  Lanjut
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <label
                  htmlFor="feedbackContext"
                  className="block text-sm font-medium text-gray-700"
                >
                  Konteks feedbacknya apa nih? (opsional, karena kita pake AI,
                  biar makin kena nih ke doi)
                </label>
                <input
                  className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  type="text"
                  id="feedbackContext"
                  placeholder="cth: pas proyek X, abis presentasi"
                  value={feedbackContext}
                  onChange={(e) => setFeedbackContext(e.target.value)}
                />
                <button
                  type="button"
                  className="mt-4 w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                  onClick={nextStep}
                >
                  Lanjut
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <label
                  htmlFor="emailOptIn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email lo (opsional):
                </label>
                <small className="text-center text-sm text-gray-600 mb-4">
                  doi ga bisa liat email lo, ini buat persiapan future feature:
                  kita bisa email ke lo buat ngasih tau pas feedback lo dibaca
                  sama orangnya
                </small>
                <input
                  className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  type="email"
                  id="emailOptIn"
                  placeholder="email.lo@example.com"
                  value={emailOptIn}
                  onChange={(e) => setEmailOptIn(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-4 w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Mengirim...' : 'Kirim Feedback'}
                </button>
              </div>
            )}
          </form>
          {messageError && (
            <p className="text-red-500 text-sm text-center mt-4">
              {messageError}
            </p>
          )}
          {messageSuccess && (
            <p className="text-green-500 text-sm text-center mt-4">
              {messageSuccess}
            </p>
          )}
        </section>
      </main>
    </Card>
  );
}

export default FeedbackForm;
