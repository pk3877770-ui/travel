// app/api/users/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, phone, password } = await request.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user.toObject();
    
    return Response.json({ 
      success: true, 
      user: userData, 
      token 
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}