import React from 'react'
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />     {/* HEADER */}
      <main className="flex-grow">
        {children}
      </main>
      {/*FOOTER SHOULD BE HERE */}
    </div>
  );
};

export default MainLayout;
