import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase, saveTradeToLedger } from '@/app/lib/mongodb';
import { validateTrade } from '@/app/models/Trade';

// GET /api/trades - Get all trades for a user
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const trades = await db
      .collection('trades')
      .find({ userId })
      .sort({ timestamp: -1 }) // Sort by timestamp descending (newest first)
      .toArray();

    return NextResponse.json({ trades });
  } catch (error) {
    console.error('Error fetching trades:', error);
    
    return NextResponse.json({ 
      error: 'Failed to fetch trades', 
      details: error instanceof Error ? error.message : 'Unknown error',
      userId: userId
    }, { status: 500 });
  }
}

// POST /api/trades - Create a new trade
export async function POST(request: NextRequest) {
  try {
    const trade = await request.json();
    
    // Validate the trade using our model
    const validation = validateTrade(trade);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid trade data', details: validation.errors },
        { status: 400 }
      );
    }

    // Save to trades collection
    const db = await connectToDatabase();
    let result;
    
    try {
      // First insert into trades collection
      result = await db.collection('trades').insertOne(trade);
      
      // Then save to ledger collection
      await saveTradeToLedger(trade);
      
      return NextResponse.json({
        message: 'Trade saved successfully',
        tradeId: result.insertedId
      }, { status: 201 });
    } catch (ledgerError) {
      // If ledger save fails, try to rollback the trade insertion
      if (result?.insertedId) {
        try {
          await db.collection('trades').deleteOne({ _id: result.insertedId });
          console.error('Rolled back trade insertion due to ledger save failure:', ledgerError);
        } catch (rollbackError) {
          console.error('Failed to rollback trade after ledger save failure:', rollbackError);
        }
      }
      
      console.error('Error saving trade or ledger entry:', ledgerError);
      return NextResponse.json({ 
        error: 'Failed to create trade', 
        details: ledgerError instanceof Error ? ledgerError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing trade request:', error);
    return NextResponse.json({ 
      error: 'Failed to create trade', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}