import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase, saveTradeToLedger } from '@/app/lib/mongodb';
import { validateTrade } from '@/app/models/Trade';

// GET /api/trades/[tradeId] - Get a specific trade by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { tradeId: string } }
) {
  const tradeId = params.tradeId;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!tradeId) {
    return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
  }
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required for security' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    
    // Find the trade by ID and ensure it belongs to the requesting user
    const trade = await db
      .collection('trades')
      .findOne({ id: tradeId, userId: userId });
    
    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found or you do not have permission to view it' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ trade });
  } catch (error) {
    console.error(`Error fetching trade ${tradeId}:`, error);
    
    return NextResponse.json({ 
      error: 'Failed to fetch trade', 
      details: error instanceof Error ? error.message : 'Unknown error',
      tradeId: tradeId,
      userId: userId
    }, { status: 500 });
  }
}

// DELETE /api/trades/[tradeId] - Delete a specific trade
export async function DELETE(
  request: NextRequest,
  { params }: { params: { tradeId: string } }
) {
  const tradeId = params.tradeId;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!tradeId) {
    return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
  }
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required for security' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    
    // First check if the trade exists and belongs to this user
    const existingTrade = await db
      .collection('trades')
      .findOne({ id: tradeId, userId });
    
    if (!existingTrade) {
      return NextResponse.json(
        { error: 'Trade not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }
    
    // Add deletion record to ledger before deleting the trade
    try {
      const deletionRecord = {
        ...existingTrade,
        action: 'deleted',
        deletedAt: new Date().toISOString(),
        previousState: existingTrade
      };
      
      // Save the deletion record to the ledger
      await saveTradeToLedger(deletionRecord);
      
      // Delete the trade
      const result = await db
        .collection('trades')
        .deleteOne({ id: tradeId, userId });

      if (result.deletedCount === 0) {
        return NextResponse.json({ 
          error: 'Failed to delete trade', 
          details: 'Trade was found but could not be deleted'
        }, { status: 500 });
      }
      
      return NextResponse.json({
        message: 'Trade deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (ledgerError) {
      console.error('Failed to save deletion record to ledger:', ledgerError);
      
      return NextResponse.json({
        error: 'Failed to delete trade',
        details: 'Could not record deletion in ledger',
        ledgerError: ledgerError instanceof Error ? ledgerError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error(`Error deleting trade ${tradeId}:`, error);
    
    return NextResponse.json({ 
      error: 'Failed to delete trade', 
      details: error instanceof Error ? error.message : 'Unknown error',
      tradeId: tradeId,
      userId: userId
    }, { status: 500 });
  }
}

// PUT /api/trades/[tradeId] - Update an existing trade
export async function PUT(
  request: NextRequest,
  { params }: { params: { tradeId: string } }
) {
  const tradeId = params.tradeId;
  
  if (!tradeId) {
    return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
  }

  try {
    const updates = await request.json();
    
    // Validate that we have a userId for security
    if (!updates.userId) {
      return NextResponse.json(
        { error: 'User ID is required for updating trades' },
        { status: 400 }
      );
    }
    
    // Validate the trade updates
    const validation = validateTrade(updates);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid trade data', details: validation.errors },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    
    // First check if the trade exists and belongs to this user
    const existingTrade = await db
      .collection('trades')
      .findOne({ id: tradeId, userId: updates.userId });
    
    if (!existingTrade) {
      return NextResponse.json(
        { error: 'Trade not found or you do not have permission to update it' },
        { status: 404 }
      );
    }
    
    // Update the trade
    const result = await db
      .collection('trades')
      .updateOne(
        { id: tradeId, userId: updates.userId },
        { $set: updates }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }
    
    // Add updated trade to ledger with update information
    const updatedTrade = {
      ...existingTrade,
      ...updates,
      updatedAt: new Date().toISOString(),
      previousState: existingTrade
    };
    
    try {
      // Save the updated trade to the ledger
      await saveTradeToLedger(updatedTrade);

      return NextResponse.json({
        message: 'Trade updated successfully',
        modifiedCount: result.modifiedCount
      });
    } catch (ledgerError) {
      // If ledger save fails, log the error but don't roll back the trade update
      // since that would be more complex and could lead to inconsistencies
      console.error('Failed to save updated trade to ledger:', ledgerError);
      
      return NextResponse.json({
        message: 'Trade updated but ledger entry failed',
        warning: 'The trade was updated but may not appear correctly in trade history',
        modifiedCount: result.modifiedCount
      }, { status: 207 }); // 207 Multi-Status to indicate partial success
    }
  } catch (error) {
    console.error('Error updating trade:', error);
    return NextResponse.json({ 
      error: 'Failed to update trade',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}