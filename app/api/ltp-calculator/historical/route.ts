import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// JWT secret should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol') || 'NIFTY';
    const expiry = searchParams.get('expiry') || '';
    const lotSize = searchParams.get('lotSize') || '75';
    const fetchDate = searchParams.get('fetchDate') || '';
    const fetchTime = searchParams.get('fetchTime') || '';
    
    // Validate required parameters
    if (!expiry || !fetchDate || !fetchTime) {
      return NextResponse.json(
        { error: 'Missing required parameters: expiry, fetchDate, or fetchTime' },
        { status: 400 }
      );
    }
    
    // Get user credentials from cookies or database
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    let userId;
    let ltpCredentials;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    
    // If we have a userId, try to get LTP credentials from the database
    if (userId) {
      try {
        const client = await clientPromise;
        const db = client.db();
        
        const user = await db.collection('users').findOne(
          { _id: new ObjectId(userId) },
          { projection: { ltpCredentials: 1 } }
        );
        
        if (user?.ltpCredentials) {
          ltpCredentials = user.ltpCredentials;
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }
    }
    
    // Extract username and password
    const LTP_USERNAME = ltpCredentials?.username || process.env.LTP_USERNAME || '';
    const LTP_PASSWORD = ltpCredentials?.password || process.env.LTP_PASSWORD || '';
    
    if (!LTP_USERNAME || !LTP_PASSWORD) {
      return NextResponse.json(
        { error: 'LTP Calculator credentials not found' },
        { status: 401 }
      );
    }
    
    // Implement rate limiting
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a few seconds.' },
        { status: 429 }
      );
    }
    lastRequestTime = now;
    
    // Format the time to ensure it's in the correct format (HH:MM:SS)
    const formattedTime = fetchTime.includes(':') ? fetchTime : `${fetchTime}:00`;
    
    // Construct the URL for the external API
    const url = `https://login.ltpcalculator.com/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lotSize}&fetchTime=${fetchDate} ${formattedTime}`;
    
    // Set up authentication headers
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(`${LTP_USERNAME}:${LTP_PASSWORD}`).toString('base64')
    );
    
    // Make the request to the external API
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    
    if (!response.ok) {
      // If rate limited, wait and retry once
      if (response.status === 429) {
        // Wait for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Retry the request
        const retryResponse = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        
        if (!retryResponse.ok) {
          return NextResponse.json(
            { error: `LTP Calculator API error: ${retryResponse.status}` },
            { status: retryResponse.status }
          );
        }
        
        const data = await retryResponse.json();
        return NextResponse.json(formatResponse(data));
      }
      
      return NextResponse.json(
        { error: `LTP Calculator API error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(formatResponse(data));
  } catch (error) {
    console.error('Error in historical LTP data API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to format the response
function formatResponse(data: any) {
  // Perform null checks and extract relevant fields
  if (!data || typeof data !== 'object') {
    return { error: 'Invalid data format' };
  }
  
  // Extract the fields we need
  const formattedData = {
    direction: data.direction || 'UNKNOWN',
    scenario: data.scenario || 'UNKNOWN',
    riskyResistance: data.riskyResistance || null,
    riskySupport: data.riskySupport || null,
    moderateResistance: data.moderateResistance || null,
    moderateSupport: data.moderateSupport || null,
    rMaxGain: data.rMaxGain || null,
    sMaxGain: data.sMaxGain || null,
    rMaxPain: data.rMaxPain || null,
    sMaxPain: data.sMaxPain || null,
    // Include any other fields that might be needed
  };
  
  return formattedData;
}