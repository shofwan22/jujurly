import React from 'react';
import { Link } from 'react-router-dom';

import LandingPageLayout from '../../components/layouts/LandingPageLayout';

import useCollectFeedback from './hooks/useCollectFeedback';

const LandingPage: React.FC = () => {
  const { handleCollectFeedbackClick } = useCollectFeedback();

  return (
    <LandingPageLayout>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 max-w-3xl">
        Kumpulkan Feedback Jujur dengan Satu Link
      </h1>
      <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-xl">
        Bikin link unik kamu, bagikan ke teman atau rekan kerja, dan dapatkan
        feedback anonim yang membangun.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCollectFeedbackClick}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full text-sm font-medium shadow transition"
        >
          Kumpulin Feedback
        </button>
        <Link
          to="/ke"
          className="py-3 px-6 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full text-sm font-medium transition"
        >
          Kasih Feedback
        </Link>
      </div>
    </LandingPageLayout>
  );
};

export default LandingPage;
