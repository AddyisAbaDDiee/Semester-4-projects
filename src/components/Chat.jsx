import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { api } from '../api/client';

export default function Chat() {
  const { userData, planData, tasks } = useContext(AppContext);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hey ${userData.name || 'Athlete'}! 💪 Your APEX program is live. You're going for ${userData.specificGoal || 'peak performance'} — I've built everything around that. Ask me anything about your workouts, nutrition, or progress!`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    const doneTasks = tasks.filter(t => t.done).map(t => t.name).join(', ');

    try {
      const response = await api.chat(
        [
          ...messages.map(m => ({
            role: m.role === 'ai' ? 'assistant' : m.role,
            content: m.content
          })),
          {
            role: 'user',
            content: `Completed tasks today: ${doneTasks || 'none yet'}. Question: ${text}`
          }
        ].slice(-10),
        `You are APEX fitness coach for ${userData.name || 'athlete'} whose goal is ${userData.specificGoal || userData.primaryGoal}. Calories: ${planData.calories}, Protein: ${planData.protein}g. Be concise (2-3 sentences), specific, motivating.`,
        500
      );

      const reply = response.content[0].text;
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch (e) {
      console.error('Chat error:', e);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `Keep pushing toward ${userData.specificGoal || 'your goal'}! Check your plan tab for today's details. You've got this! 💪`
      }]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      flex: 1
    }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          color: 'var(--accent)',
          fontSize: '13px'
        }}>
          AI
        </div>
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: '600'
          }}>
            APEX Coach
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text3)'
          }}>
            Always here for you
          </div>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: 0
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: '14px',
              fontSize: '13px',
              lineHeight: 1.55,
              background: msg.role === 'ai' ? 'var(--bg3)' : 'var(--accent)',
              border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
              color: msg.role === 'ai' ? 'var(--text)' : '#0a0a0f',
              alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
              fontWeight: msg.role === 'user' ? '500' : '400',
              borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '14px',
              borderBottomRightRadius: msg.role === 'ai' ? '14px' : '4px'
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div style={{
            maxWidth: '85%',
            padding: '14px 18px',
            borderRadius: '14px',
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            alignSelf: 'flex-start',
            borderBottomLeftRadius: '4px'
          }}>
            {[0, 1, 2].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--text3)',
                  animation: `bounce 0.9s infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSendMessage} disabled={loading} />

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: '8px',
      alignItems: 'flex-end'
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask your coach anything..."
        rows="1"
        disabled={disabled}
        style={{
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '13px',
          resize: 'none',
          minHeight: '40px',
          maxHeight: '120px',
          overflowY: 'auto',
          fontFamily: "'DM Sans', sans-serif",
          background: 'var(--bg3)',
          border: '1px solid var(--border2)',
          color: 'var(--text)',
          outline: 'none'
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="send-btn"
        style={{
          background: 'var(--accent)',
          color: '#0a0a0f',
          borderRadius: '10px',
          padding: '10px 16px',
          fontSize: '13px',
          fontWeight: '700',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          transition: '0.2s',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
        }}
      >
        Send
      </button>
    </div>
  );
}
