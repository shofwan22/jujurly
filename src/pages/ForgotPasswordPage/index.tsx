import { Link } from 'react-router-dom';

import AuthLayout from '../../components/layouts/AuthLayout';
import useSubmitReset from './hooks/useSubmitReset';

const ForgotPasswordPage: React.FC = () => {
  const { email, setEmail, message, error, loading, handleSubmit } =
    useSubmitReset();

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Lupa Password?
      </h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Gak apa-apa, kita bantu reset password kamu.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}
        <div>
          <label
            htmlFor="emailOrUsername"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
          disabled={loading}
        >
          {loading ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Inget passwordnya?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Balik ke Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
