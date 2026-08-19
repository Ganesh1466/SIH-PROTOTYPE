import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import studentRoutes from './routes/studentRoutes.js';
import studentProfileRoutes from './routes/studentProfileRoutes.js';
import employerRoutes from './routes/employerRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import governmentRoutes from './routes/governmentRoutes.js';
import { isSupabaseConfigured, supabase } from './config/supabase.js';

dotenv.config();

const app = express();

// 1. Completely disable HTTP ETag generation to prevent 304 responses
app.disable('etag');

// 2. Global No-Cache Middleware (Ensure fresh HTTP 200 data for all clients/proxies)
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// 3. Security & CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://sih-prototype-pktr.vercel.app",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-user-email"],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🌟 Real-Time API Terminal Console Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
  const method = req.method.padEnd(6);
  const userHeader = req.headers['x-user-email'] || req.headers.authorization ? 'Authenticated' : 'Public';

  res.on('finish', () => {
    const duration = `${Date.now() - start}ms`.padStart(6);
    const status = res.statusCode;
    const statusColor = status >= 500 ? '❌ 500' : status >= 400 ? '⚠️ 400+' : '✅ 200';

    console.log(
      `[${timestamp}] 📡 [API] ${method} ${req.originalUrl} | Status: ${status} (${statusColor}) | Time: ${duration} | Caller: ${userHeader}`
    );

    if (req.method === 'POST' || req.method === 'PUT') {
      if (req.originalUrl.includes('profile')) {
        const name = req.body?.personal?.full_name || 'Profile';
        const skillsCount = req.body?.skills?.length || 0;
        console.log(`   └── 📦 Payload Saved: ${name} (${skillsCount} skills)`);
      } else if (req.originalUrl.includes('opportunities')) {
        const title = req.body?.title || 'Opportunity';
        const type = req.body?.opportunity_type || 'JOB';
        console.log(`   └── 💼 Opportunity ${type}: ${title} (${req.body?.district || 'Rajasthan'})`);
      }
    }
  });

  next();
});

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'SIH1632 — Rajasthan Career-to-Employment Intelligence Platform',
    supabaseConnected: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Direct Root & /api Prefix Routing (Order is important)
// 1. Profile / Passport Routes (Must be before /student wildcard :id)
app.use('/student/profile', studentProfileRoutes);
app.use('/api/student/profile', studentProfileRoutes);
app.use('/passport', studentProfileRoutes);
app.use('/api/passport', studentProfileRoutes);

// 2. Student Routes
app.use('/student', studentRoutes);
app.use('/students', studentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/students', studentRoutes);

// 3. Jobs & Opportunities Routes
app.use('/jobs', jobRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/employer/opportunities', opportunityRoutes);
app.use('/api/employer/opportunities', opportunityRoutes);
app.use('/employers', employerRoutes);
app.use('/api/employers', employerRoutes);

// 4. Applications Routes
app.use('/applications', applicationRoutes);
app.use('/api/applications', applicationRoutes);

// 5. Notifications Routes
app.use('/notifications', notificationRoutes);
app.use('/api/notifications', notificationRoutes);

// 6. Matching, Learning, Interviews & Government Routes
app.use('/matching', matchingRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/learning', learningRoutes);
app.use('/api/learning', learningRoutes);
app.use('/interviews', interviewRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/government', governmentRoutes);
app.use('/api/government', governmentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found on this server.`
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Backend Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚀 SIH1632 Backend running on http://localhost:${PORT}`);
  if (isSupabaseConfigured()) {
    console.log(`⚡ Supabase Database: CONNECTED (${process.env.SUPABASE_URL})`);
  } else {
    console.log(`⚡ Supabase Database: In-Memory / Synchronized Store Active`);
    console.log(`   (Tip: Add SUPABASE_URL & SUPABASE_ANON_KEY to Backend/.env)`);
  }
  console.log(`📡 Real-Time Terminal Request Logger: ACTIVE`);
  console.log(`=======================================================`);
});
