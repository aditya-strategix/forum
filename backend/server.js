import express from 'express';
import http from 'http';
// replace default import with named Server
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import postRoutes from './routes/posts.js';
import { setupSocket } from './utils/socket.js';

// Load env vars
dotenv.config();

const app = express();
const server = http.createServer(app);
// use the named Server class
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
setupSocket(app,io);
// Inject io into app
app.set('io', io);

// Routes
app.use('/api/posts', postRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Discussion Forum API is running',
    timestamp: new Date().toISOString()
  });
});

// Setup Socket.io

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});