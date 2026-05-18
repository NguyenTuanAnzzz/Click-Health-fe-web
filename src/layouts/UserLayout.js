import React from 'react';
import UserHeader from '../components/ui/UserHeader';
import AppFooter from '../components/ui/AppFooter';

const UserLayout = ({ children, noPaddingTop = false }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans transition-colors duration-300">
      <UserHeader />
      <div className={`flex-1 flex flex-col ${noPaddingTop ? '' : 'pt-24'}`}>
        {children}
      </div>
      <AppFooter />
    </div>
  );
};

export default UserLayout;
