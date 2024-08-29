import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description = '') => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotificationWithIcon, contextHolder }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
