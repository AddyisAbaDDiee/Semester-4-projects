import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [planData, setPlanData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [progressLog, setProgressLog] = useState([]);

  return (
    <AppContext.Provider value={{
      currentScreen, setCurrentScreen,
      currentStep, setCurrentStep,
      userData, setUserData,
      planData, setPlanData,
      tasks, setTasks,
      chatHistory, setChatHistory,
      progressLog, setProgressLog,
    }}>
      {children}
    </AppContext.Provider>
  );
}
