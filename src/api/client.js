/**
 * API Client for APEX Backend
 * Handles all communication with the Express backend
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  // Health check
  async health() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (err) {
      console.error('Health check failed:', err);
      throw err;
    }
  },

  // Chat endpoint
  async chat(messages, system = '', max_tokens = 500) {
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          system,
          max_tokens,
          model: 'claude-sonnet-4-20250514'
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Chat request failed');
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Chat request failed');
      }

      return data.data;
    } catch (err) {
      console.error('Chat API error:', err);
      throw err;
    }
  },

  // Plan generation endpoint
  async generatePlan(prompt) {
    try {
      const res = await fetch(`${API_BASE}/api/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Plan generation failed');
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Plan generation failed');
      }

      return data.data;
    } catch (err) {
      console.error('Plan API error:', err);
      throw err;
    }
  }
};
