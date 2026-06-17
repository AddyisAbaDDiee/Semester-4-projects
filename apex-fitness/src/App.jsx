import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Home from './components/Home';
import Onboard from './components/Onboard';
import Generation from './components/Generation';
import AppComponent from './components/App';
import './styles/variables.css';
import './styles/components.css';

function MainApp() {
  const { currentScreen } = useContext(AppContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {currentScreen === 'home' && <Home />}
      {currentScreen === 'onboard' && <Onboard />}
      {currentScreen === 'generation' && <Generation />}
      {currentScreen === 'app' && <AppComponent />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
