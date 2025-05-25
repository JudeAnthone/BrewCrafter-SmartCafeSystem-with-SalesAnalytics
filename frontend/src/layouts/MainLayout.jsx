import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />     {/* HEADER */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/*FOOTER SHOULD BE HERE */}
      <Footer/>
    </div>
  );
};

export default MainLayout;
