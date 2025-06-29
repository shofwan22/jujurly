import { Navigate } from 'react-router-dom';

import LandingPageLayout from '../../components/layouts/LandingPageLayout';
import FeedbackForm from '../../components/pages/FeedbackPage/FeedbackForm';

import useFeedback from './hooks/useFeedback';

const FeedbackPage: React.FC = () => {
  const { userId, userExists, checking } = useFeedback();

  if (!userId) {
    console.warn('No userId found in URL, redirecting to landing page.');
    return <Navigate to="/" replace />;
  }
  if (checking) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Mengecek pengguna...
      </div>
    );
  }
  if (userExists === false) {
    return null; // Will redirect
  }

  return (
    <LandingPageLayout>
      <FeedbackForm userId={userId} />
    </LandingPageLayout>
  );
};

export default FeedbackPage;
