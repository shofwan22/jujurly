import type { ReactNode } from "react"

const LandingPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center text-center">
        <div className="mb-6 text-indigo-600 font-bold text-lg tracking-wide">
          Jujurly
        </div>
        {children}
      </div>
      <footer className="text-xs text-gray-400 text-center py-6">
        &copy; {new Date().getFullYear()} Jujurly — Dibuat dengan kejujuran
      </footer>
    </section>
  );
};

export default LandingPageLayout;