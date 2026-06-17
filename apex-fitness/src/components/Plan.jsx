import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Plan() {
  const { planData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Workout Program', 'Nutrition Plan', 'Supplement Protocol', 'Recovery Plan', 'Progression Strategy'];
  const keys = ['workoutProgram', 'nutritionPlan', 'supplementProtocol', 'recoveryPlan', 'progressionStrategy'];

  const content = planData[keys[activeTab]] || 'Content generating...';

  return (
    <div style={{
      padding: '28px',
      overflowY: 'auto',
      flex: 1
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '28px',
        marginBottom: '6px',
        letterSpacing: '0.05em'
      }}>
        YOUR <span style={{ color: 'var(--accent)' }}>APEX PROGRAM</span>
      </div>
      <p style={{
        color: 'var(--text2)',
        fontSize: '13px',
        marginBottom: '24px'
      }}>
        Generated specifically for your goals and body.
      </p>

      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              background: activeTab === i ? 'var(--accent)' : 'var(--bg3)',
              color: activeTab === i ? '#0a0a0f' : 'var(--text2)',
              padding: '8px 18px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '500',
              transition: '0.2s',
              border: `1px solid ${activeTab === i ? 'var(--accent)' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px'
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          fontFamily: "'DM Mono', monospace",
          fontSize: '12.5px',
          lineHeight: 1.9,
          color: 'var(--text2)',
          margin: 0
        }}>
          {content}
        </pre>
      </div>
    </div>
  );
}
