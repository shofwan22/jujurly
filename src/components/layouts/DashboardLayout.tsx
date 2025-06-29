import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const DashboardLayout = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-purple-700 text-center md:text-left">
          Jujurly
        </h1>

        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-700">
          Link kamu:{' '}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline break-all"
          >
            {link}
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="block md:hidden text-left px-4 text-sm text-gray-700 mt-2">
        Link kamu:{' '}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline break-all"
        >
          {link}
        </a>
      </div>
      {children}

      <footer className="text-center py-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Jujurly
      </footer>
    </div>
  );
};

export default DashboardLayout;
