import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Home() {
  const { setCurrentScreen } = useContext(AppContext);

  const goOnboard = () => {
    setCurrentScreen('onboard');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '40px 20px',
      textAlign: 'center',
      background: 'radial-gradient(ellipse 800px 500px at 50% 0%, #c8f53a08 0%, transparent 70%)'
    }}>
      <div style={{ marginBottom: '20px' }} className="pill-accent">
        AI-POWERED FITNESS
      </div>
      <h1 style={{
        fontSize: 'clamp(52px, 10vw, 96px)',
        lineHeight: 0.95,
        color: 'var(--text)',
        marginBottom: '8px'
      }}>
        YOUR BODY.<br />
        <span style={{ color: 'var(--accent)' }}>YOUR PLAN.</span>
      </h1>
      <p style={{
        color: 'var(--text2)',
        fontSize: '16px',
        maxWidth: '420px',
        margin: '16px auto 36px'
      }}>
        A fully personalized fitness OS that learns you, trains you, and tracks every rep — powered by Claude AI.
      </p>
      <button className="btn-primary" onClick={goOnboard}>
        BUILD MY PLAN →
      </button>
      <p style={{
        marginTop: '14px',
        fontSize: '13px',
        color: 'var(--text3)'
      }}>
        Takes about 3 minutes
      </p>
    </div>
  );
}
