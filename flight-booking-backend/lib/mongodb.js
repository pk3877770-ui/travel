// lib/mongodb.js
import mongoose from 'mongoose';
import dns from 'dns';

// Set DNS servers to Google's to help resolve Atlas SRV records in some environments
if (typeof window === 'undefined') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const MONGODB_URI = process.env.MONGODB_URI || '';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI || (process.env.NODE_ENV === 'production' && MONGODB_URI.includes('localhost'))) {
    if (process.env.NODE_ENV === 'production') {
       throw new Error('MONGODB_URI is not configured for production');
    }
    throw new Error('Please define MONGODB_URI in your .env.local');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4, // Force IPv4, prevents ECONNREFUSED in Node >=17
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Successfully connected to MongoDB");
  } catch (e) {
    console.error("MongoDB Connection Error Details:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
