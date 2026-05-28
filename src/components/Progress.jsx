import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Progress() {
  const { planData } = useContext(AppContext);
  const [progressLog, setProgressLog] = useState([]);
  const [toast, setToast] = useState('');

  const handleLogProgress = () => {
    const weight = document.getElementById('log-weight')?.value;
    const pushups = document.getElementById('log-pushup')?.value;
    const waist = document.getElementById('log-waist')?.value;
    const energy = document.getElementById('log-energy')?.value;
    const notes = document.getElementById('log-notes')?.value;

    const entry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      weight,
      pushups,
      waist,
      energy,
      notes
    };

    setProgressLog(prev => [entry, ...prev]);
    showToast('✓ Progress logged!');

    // Reset form
    document.getElementById('log-weight').value = '';
    document.getElementById('log-pushup').value = '';
    document.getElementById('log-waist').value = '';
    document.getElementById('log-energy').value = '';
    document.getElementById('log-notes').value = '';
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

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
        PROGRESS <span style={{ color: 'var(--accent)' }}>TRACKER</span>
      </div>
      <p style={{
        color: 'var(--text2)',
        fontSize: '13px',
        marginBottom: '24px'
      }}>
        Log your numbers to track improvement over time.
      </p>

      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        maxWidth: '540px'
      }}>
        <div className="row2">
          <div className="field">
            <label>Current Weight (kg)</label>
            <input type="number" id="log-weight" placeholder="72" />
          </div>
          <div className="field">
            <label>Max Pushups (consecutive)</label>
            <input type="number" id="log-pushup" placeholder="25" />
          </div>
        </div>

        <div className="row2">
          <div className="field">
            <label>Waist (cm)</label>
            <input type="number" id="log-waist" placeholder="82" />
          </div>
          <div className="field">
            <label>Energy Level (1-10)</label>
            <input type="number" id="log-energy" min="1" max="10" placeholder="7" />
          </div>
        </div>

        <div className="field">
          <label>Notes / How you feel</label>
          <textarea id="log-notes" placeholder="Feeling stronger this week..."></textarea>
        </div>

        <button
          className="btn-primary"
          onClick={handleLogProgress}
          style={{ width: '100%' }}
        >
          LOG TODAY'S PROGRESS
        </button>
      </div>

      <div style={{
        marginTop: '24px',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {progressLog.map((entry, i) => (
          <div
            key={i}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '16px 20px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {entry.date}
              </span>
              <span style={{
                fontSize: '12px',
                color: 'var(--text3)'
              }}>
                {entry.notes}
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px'
            }}>
              {entry.weight && (
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text3)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Weight
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent)'
                  }}>
                    {entry.weight}kg
                  </div>
                </div>
              )}
              {entry.pushups && (
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text3)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Pushups
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent)'
                  }}>
                    {entry.pushups}
                  </div>
                </div>
              )}
              {entry.waist && (
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text3)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Waist
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent)'
                  }}>
                    {entry.waist}cm
                  </div>
                </div>
              )}
              {entry.energy && (
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text3)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Energy
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent)'
                  }}>
                    {entry.energy}/10
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--bg3)',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          padding: '12px 20px',
          borderRadius: 'var(--radius)',
          fontSize: '13px',
          fontWeight: '500',
          zIndex: 999,
          animation: 'slideUp 0.3s ease-in-out'
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
