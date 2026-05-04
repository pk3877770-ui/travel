// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Use a global cache to avoid multiple connections in dev (hot reload)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your .env.local');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4,                        // Force IPv4
      serverSelectionTimeoutMS: 10000,  // Fail fast after 10s
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected');
  } catch (e) {
    // Reset so next request retries the connection
    cached.promise = null;
    cached.conn = null;
    console.error('❌ MongoDB connection failed:', e.message);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
