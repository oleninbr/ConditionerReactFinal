import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastContainer } from '../ui/Toast';


const Layout = memo(() => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;