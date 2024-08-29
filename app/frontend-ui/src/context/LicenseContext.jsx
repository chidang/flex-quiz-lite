import React, { createContext, useState, useContext, useEffect } from 'react';
import GlobaData from '../util/globalData';
const LicenseContext = createContext();

export const LicenseProvider = ({ children }) => {
  const [isLicensed, setIsLicensed] = useState(false);

  useEffect(() => {
    // Check the global variable and set the license state accordingly
    let license = GlobaData.dataLocalizer ? GlobaData.dataLocalizer && GlobaData.dataLocalizer.license : false;
    if (license && license.activated === 'true' || license && license.activated === true) {
      setIsLicensed(true);
    }
  }, []);

  const submitLicense = (value) => {
    // Simulate a license submission
    setIsLicensed(value);
  };

  return (
    <LicenseContext.Provider value={{ isLicensed, submitLicense }}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => useContext(LicenseContext);
