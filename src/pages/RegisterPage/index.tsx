import { Link } from 'react-router-dom';

import AuthLayout from '../../components/layouts/AuthLayout';

import useSubmitRegister from './hooks/useSubmitRegister';

const RegisterPage: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    handleSubmitRegister,
  } = useSubmitRegister();

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Daftar Jujurly
      </h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Bikin akun buat ngumpulin feedback jujur!
      </p>
      <form onSubmit={handleSubmitRegister} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username unik ini bakal keliatan"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
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
            placeholder="email@kamu.com"
            required
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
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            required
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Udah punya akun?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login di sini
          </Link>
        </p>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
        >
          Daftar dengan Email
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
