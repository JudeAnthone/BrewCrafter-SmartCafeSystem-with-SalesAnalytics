import React from 'react'


import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />     {/* 👈 Add your header here */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer will be added later */}
    </div>
  );
};

export default MainLayout;
