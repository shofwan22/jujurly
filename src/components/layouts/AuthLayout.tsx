import type { ReactNode } from 'react';
import Card from '../ui/Card';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <Card>{children}</Card>
    </div>
  );
};

export default AuthLayout;
