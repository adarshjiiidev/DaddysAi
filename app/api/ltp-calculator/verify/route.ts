import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Try to fetch expiry dates to verify credentials
    const headers = new Headers();
    headers.set('Authorization', `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`);

    const response = await fetch('https://login.ltpcalculator.com/optionChain/fetch-data?symbol=NIFTY&expiry=26-06-2025&lotSize=75', {
      headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('LTP verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to verify credentials' },
      { status: 401 }
    );
  }
}