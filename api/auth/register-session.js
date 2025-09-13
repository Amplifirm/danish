const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema (same as in register.js and login.js)
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  company: {
    type: String,
    default: '',
    trim: true
  },
  jobTitle: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  registeredSessions: [{
    sessionId: String,
    sessionTitle: String,
    track: String,
    time: String,
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Auth middleware function
async function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error('Invalid token');
    }

    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    // Verify authentication
    const user = await verifyToken(req);
    
    const { sessionId, sessionTitle, track, time } = req.body;

    if (!sessionId || !sessionTitle) {
      return res.status(400).json({ message: 'Session ID and title are required' });
    }

    const alreadyRegistered = user.registeredSessions.some(
      session => session.sessionId === sessionId
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this session' });
    }

    user.registeredSessions.push({
      sessionId,
      sessionTitle,
      track: track || '',
      time: time || ''
    });

    await user.save();

    res.json({
      message: 'Successfully registered for session',
      registeredSessions: user.registeredSessions
    });

  } catch (error) {
    console.error('Session registration error:', error);
    
    if (error.message === 'Authentication failed') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.status(500).json({ message: 'Server error registering for session' });
  }
}