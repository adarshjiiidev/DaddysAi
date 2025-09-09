import { MongoClient } from 'mongodb';
import { Trade } from '@/app/models/Trade';

// MongoDB connection string
const uri = process.env.MONGODB_URI;

// Check if MongoDB URI is defined
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

// MongoDB client
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise;

// Helper function to extract database name from MongoDB URI
function extractDatabaseName(uri: string | undefined): string | null {
  if (!uri) return null;
  
  try {
    // Parse the connection string to extract the database name
    // Format: mongodb://username:password@host:port/database?options
    const dbNameMatch = uri.match(/\/([^\/?]+)(\?|$)/);
    if (dbNameMatch && dbNameMatch[1]) {
      return dbNameMatch[1];
    }
    return null;
  } catch (error) {
    console.error('Error extracting database name from URI:', error);
    return null;
  }
}

// Helper function to get database connection
export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    // Extract database name from connection string or use default
    const dbName = extractDatabaseName(uri) || 'idaddy_vedaai';
    console.log(`Connecting to database: ${dbName}`);
    return client.db(dbName);
  } catch (error) {
    console.error('Database connection error:', error);
    // Provide more detailed error message
    const errorMessage = error instanceof Error 
      ? `Unable to connect to database: ${error.message}` 
      : 'Unable to connect to database: Unknown error';
    throw new Error(errorMessage);
  }
}

// Helper function to save a trade to the ledger
export async function saveTradeToLedger(trade: Trade) {
  if (!trade.userId) {
    throw new Error('User ID is required for saving to ledger');
  }
  
  try {
    const db = await connectToDatabase();
    
    // Extract date from timestamp for organization
    const tradeDate = new Date(trade.timestamp).toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Create a ledger entry with user and date information
    const ledgerEntry = {
      userId: trade.userId,
      tradeDate,
      tradeId: trade.id,
      trade: trade,
      createdAt: new Date()
    };
    
    // Save to ledger collection
    const result = await db.collection('ledger').insertOne(ledgerEntry);
    
    if (!result.acknowledged) {
      throw new Error('Ledger entry was not acknowledged by the database');
    }
    
    return { 
      success: true,
      ledgerId: result.insertedId,
      tradeId: trade.id
    };
  } catch (error) {
    console.error('Error saving trade to ledger:', error);
    
    // Enhance error with more context
    const enhancedError = error instanceof Error 
      ? new Error(`Failed to save trade ${trade.id} to ledger: ${error.message}`) 
      : new Error(`Failed to save trade ${trade.id} to ledger: Unknown error`);
    
    // Preserve the original stack trace if available
    if (error instanceof Error && error.stack) {
      enhancedError.stack = error.stack;
    }
    
    throw enhancedError;
  }
}

// Helper function to get user's ledger entries
export async function getUserLedger(userId: string, startDate?: string, endDate?: string) {
  if (!userId) {
    throw new Error('User ID is required for fetching ledger');
  }
  
  try {
    const db = await connectToDatabase();
    
    // Build query with date range if provided
    const query: any = { userId };
    
    if (startDate || endDate) {
      query.tradeDate = {};
      
      if (startDate) {
        query.tradeDate.$gte = startDate;
      }
      
      if (endDate) {
        query.tradeDate.$lte = endDate;
      }
    }
    
    // Get ledger entries sorted by date and time
    const ledgerEntries = await db
      .collection('ledger')
      .find(query)
      .sort({ tradeDate: -1, createdAt: -1 })
      .toArray();
    
    return ledgerEntries;
  } catch (error) {
    console.error('Error fetching user ledger:', error);
    
    // Enhance error with more context
    const dateRangeInfo = startDate || endDate 
      ? `with date range ${startDate || 'any'} to ${endDate || 'any'}` 
      : '';
    
    const enhancedError = error instanceof Error 
      ? new Error(`Failed to fetch ledger for user ${userId} ${dateRangeInfo}: ${error.message}`) 
      : new Error(`Failed to fetch ledger for user ${userId} ${dateRangeInfo}: Unknown error`);
    
    // Preserve the original stack trace if available
    if (error instanceof Error && error.stack) {
      enhancedError.stack = error.stack;
    }
    
    throw enhancedError;
  }
}