const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./User');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://amplifirm_db_user:fnMJ6OKKQnvxUXNy@maincluster.elrvwpz.mongodb.net/aspire2025?retryWrites=true&w=majority&appName=MainCluster';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = 'aspire2025-jwt-secret-key';

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, company, jobTitle, phone } = req.body;

    console.log('Registration attempt:', { firstName, lastName, email, company, jobTitle });

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide first name, last name, email, and password' 
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      company: company || '',
      jobTitle: jobTitle || '',
      phone: phone || ''
    });

    await user.save();
    console.log('User saved successfully:', user._id);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: user.company,
      jobTitle: user.jobTitle,
      phone: user.phone
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: user.company,
      jobTitle: user.jobTitle,
      phone: user.phone,
      registeredSessions: user.registeredSessions
    };

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user profile
app.get('/api/auth/profile', auth, async (req, res) => {
  try {
    const userData = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      company: req.user.company,
      jobTitle: req.user.jobTitle,
      phone: req.user.phone,
      registeredSessions: req.user.registeredSessions
    };

    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// Register for session
app.post('/api/auth/register-session', auth, async (req, res) => {
  try {
    const { sessionId, sessionTitle, track, time } = req.body;

    if (!sessionId || !sessionTitle) {
      return res.status(400).json({ message: 'Session ID and title are required' });
    }

    const alreadyRegistered = req.user.registeredSessions.some(
      session => session.sessionId === sessionId
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this session' });
    }

    req.user.registeredSessions.push({
      sessionId,
      sessionTitle,
      track: track || '',
      time: time || ''
    });

    await req.user.save();

    res.json({
      message: 'Successfully registered for session',
      registeredSessions: req.user.registeredSessions
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error registering for session' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'ASPIRE 2025 API is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ASPIRE 2025 server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});