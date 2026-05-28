import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat endpoint - proxies to Anthropic API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system, max_tokens = 500, model = 'claude-sonnet-4-20250514' } = req.body;

    // Validation
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'messages must be an array'
      });
    }

    if (messages.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'messages array cannot be empty'
      });
    }

    if (!API_KEY) {
      console.error('ANTHROPIC_API_KEY not set');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured'
      });
    }

    // Validate message structure
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({
          error: 'Invalid request',
          message: 'Each message must have role and content'
        });
      }
      if (!['user', 'assistant'].includes(msg.role)) {
        return res.status(400).json({
          error: 'Invalid request',
          message: 'Message role must be "user" or "assistant"'
        });
      }
    }

    // Call Anthropic API
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        max_tokens: Math.min(max_tokens, 4000), // Cap at 4000
        messages,
        ...(system && { system })
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the response
    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Chat endpoint error:', error.response?.data || error.message);

    // Handle Anthropic API errors
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid API key'
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Bad request',
        message: error.response.data?.error?.message || 'Invalid request to Anthropic API'
      });
    }

    // Generic error
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to process request'
    });
  }
});

// Plan generation endpoint - special handling for longer responses
app.post('/api/plan', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'prompt is required'
      });
    }

    if (!API_KEY) {
      console.error('ANTHROPIC_API_KEY not set');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured'
      });
    }

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Plan endpoint error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid API key'
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Server error',
      message: 'Failed to generate plan'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Endpoint ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ APEX Backend Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\nEndpoints:`);
  console.log(`  • GET  /health      - Health check`);
  console.log(`  • POST /api/chat    - Chat with AI coach`);
  console.log(`  • POST /api/plan    - Generate fitness plan\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down gracefully...');
  process.exit(0);
});
