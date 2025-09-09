import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { generateResetToken } from '@/lib/models/user';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Find user by email
    const user = await usersCollection.findOne({ email });

    // For security reasons, don't reveal if the email exists or not
    // Just return success even if the email doesn't exist
    if (!user) {
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link shortly.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetExpiry = new Date();
    resetExpiry.setHours(resetExpiry.getHours() + 1); // Token valid for 1 hour

    // Update user with reset token
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          passwordReset: {
            token: resetToken,
            expiresAt: resetExpiry
          },
          updatedAt: new Date()
        }
      }
    );

    // Send password reset email
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json(
      { 
        message: 'If your email is registered, you will receive a password reset link shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}