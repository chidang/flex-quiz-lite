import React, { useContext, createContext, useState } from 'react';

const AppContext = createContext();

const defaultPersonalData = {
  fullName: '',
  phone: '',
  email: '',
  dateOfBirth: null,
  address: '',
  subscribeNewsletter: false
};

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalData);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const resetData = () => {
    setPersonalInfo(defaultPersonalData);
    setAnswers({});
    setResults(null);
    setTotalCorrectAnswers(0);
    setCurrentStep(0);
    setSubmitted(false);
  }

  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      currentStep,
      setCurrentStep,
      submitted,
      setSubmitted,
      personalInfo,
      setPersonalInfo,
      answers,
      setAnswers,
      results,
      setResults,
      totalCorrectAnswers,
      setTotalCorrectAnswers,
      resetData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);