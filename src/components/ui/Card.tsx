import type { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
      {children}
    </div>
  );
};

export default Card;
