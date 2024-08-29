import React, { useContext, createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('all-templates');
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      activeMenuItem,
      setActiveMenuItem,
      openMobileMenu,
      setOpenMobileMenu
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);