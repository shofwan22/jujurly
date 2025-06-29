import DashboardLayout from '../../components/layouts/DashboardLayout';

import useDashboard from './hooks/useDashboard';

import { formatTimestamp } from '../../utils/formatData';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, feedbacks, isLoading, error } = useDashboard();
  const domain = window.location.origin;

  if (!isAuthenticated) {
    window.location.href = '/login';
  }

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const username = userData.username;
  const feedbackLink = `${domain}/ke/${username}`;

  return (
    <DashboardLayout link={feedbackLink}>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 border-l-4 border-purple-500 pl-3">
          Ini Dia Feedback Buat Kamu:
        </h2>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && feedbacks.length === 0 && (
          <p className="text-gray-500">
            Belum ada feedback nih. Yuk sebarkan link kamu!
          </p>
        )}

        {!isLoading && feedbacks.length > 0 && (
          <div className="space-y-6">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-purple-600">
                  Feedback #{fb.id}
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Pengirim:</span>{' '}
                  {fb.sender || 'Anonim'}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Waktu:</span>{' '}
                  {formatTimestamp(fb.timestamp)}
                </p>
                {fb.context && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Konteks:</span>{' '}
                    {fb.context}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Sentimen:</span>{' '}
                  <span className="inline-block bg-gray-100 px-2 py-0.5 rounded-full text-sm">
                    {fb.sentiment}
                  </span>
                </p>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-700">
                    Ringkasan (dari LLM):
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {fb.summary}
                  </p>

                  <h4 className="font-medium text-gray-700 mt-3">
                    Saran Konstruktif (dari LLM):
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {fb.constructiveCriticism}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export default DashboardPage;
