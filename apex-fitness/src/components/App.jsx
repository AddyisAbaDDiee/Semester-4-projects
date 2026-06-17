import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Dashboard from './Dashboard';
import Plan from './Plan';
import Progress from './Progress';

export default function App() {
  const { currentScreen, setCurrentScreen } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { userData, planData } = useContext(AppContext);

  if (currentScreen === 'app') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav style={{
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '26px',
            color: 'var(--accent)',
            letterSpacing: '0.1em'
          }}>
            APEX
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Dashboard', 'My Plan', 'Progress'].map(tab => (
              <button
                key={tab}
                className={`nav-btn ${activeTab === tab.toLowerCase().replace(' ', '') ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                style={{
                  background: activeTab === tab.toLowerCase().replace(' ', '') ? 'var(--bg4)' : 'none',
                  color: activeTab === tab.toLowerCase().replace(' ', '') ? 'var(--accent)' : 'var(--text2)',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius2)',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: '0.2s',
                  letterSpacing: '0.02em'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{
            fontSize: '12px',
            color: 'var(--text3)',
            fontFamily: "'DM Mono', monospace"
          }}>
            🔥 Day 1
          </div>
        </nav>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'myplan' && <Plan />}
        {activeTab === 'progress' && <Progress />}
      </div>
    );
  }

  return null;
}
