import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// JWT secret should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      username: string;
      isVerified: boolean;
    };

    // Get user data from request
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'LTP username and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Get user from database
    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      // Clear invalid token
      cookieStore.delete('auth_token');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user with LTP credentials
    await usersCollection.updateOne(
      { _id: new ObjectId(decoded.id) },
      {
        $set: {
          ltpCredentials: {
            username,
            password,
            updatedAt: new Date(),
          },
          updatedAt: new Date(),
        },
      }
    );

    // Return success
    return NextResponse.json({
      message: 'LTP credentials updated successfully',
    });
  } catch (error) {
    console.error('Update LTP credentials error:', error);
    
    // If token is invalid, clear it
    if (error instanceof jwt.JsonWebTokenError) {
      const cookieStore = await cookies();
      cookieStore.delete('auth_token');
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}