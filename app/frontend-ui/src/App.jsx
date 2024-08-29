import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './Layouts/AppLayout';
import { AppProvider } from './context/AppContext';
import { LicenseProvider } from './context/LicenseContext';
import ErrorBoundary from './context/ErrorBoundary';
import { loadTranslations } from './util/i18n';
import './main.css';

const htmlLang = document.documentElement.lang || 'en';

const initializeApp = () => {
  loadTranslations(htmlLang);
  ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary>
          <AppProvider>
            <LicenseProvider>
              <AppLayout />
            </LicenseProvider>
          </AppProvider>
      </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('flex-quiz-app')
  );
};

initializeApp();
