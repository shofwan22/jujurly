import AuthLayout from '../../components/layouts/AuthLayout';

import useLookup from './hooks/useLookup';

const UserLookupPage: React.FC = () => {
  const {
    targetUser,
    setTargetUser,
    error,
    isLoading,
    userData,
    handleSubmit,
  } = useLookup();

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Mau Kasih Feedback ke Siapa?
      </h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Tulis username atau ID unik orang yang mau kamu kasih feedback.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {userData && (
          <div className="text-sm text-center">
            <h2>User Data:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}

        <div>
          <label
            htmlFor="emailOrUsername"
            className="block text-sm font-medium text-gray-700"
          >
            Username atau ID Pengguna
          </label>
          <input
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            type="text"
            id="targetUser"
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            placeholder="cth:iganarendra atau user123abc"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Mencari...' : 'Lanjut Kasih Feedback'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default UserLookupPage;
