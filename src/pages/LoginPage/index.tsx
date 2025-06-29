import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import useSubmitLogin from './hooks/useSubmitLogin';

const LoginPage: React.FC = () => {
  const {
    emailOrUsername,
    setEmailOrUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useSubmitLogin();

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Masuk ke Jujurly
      </h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline font-medium"
        >
          Daftar di sini
        </Link>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label
            htmlFor="emailOrUsername"
            className="block text-sm font-medium text-gray-700"
          >
            Email atau Username
          </label>
          <input
            type="text"
            id="emailOrUsername"
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            placeholder="Masukkan email atau username kamu"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            placeholder="Masukkan password kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-left text-sm text-gray-600 mt-2">
            Lupa password?{' '}
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline font-medium"
            >
              Reset di sini
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
          disabled={loading}
        >
          {loading ? 'Lagi diproses...' : 'Masuk'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
