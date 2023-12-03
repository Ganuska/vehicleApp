import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar title="Mono test app" />
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
};

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <nav className="bg-gray-800 p-4 text-center text-white">
      <h1 className="text-2xl">{title}</h1>
    </nav>
  );
};

export default MainLayout;
