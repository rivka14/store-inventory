import mongoose from 'mongoose';

let connection = null;

const connectionEvents = {
  connected: () => console.log('MongoDB connected'),
  open: () => console.log('MongoDB connection open'),
  disconnected: () => console.log('MongoDB disconnected'),
  reconnected: () => console.log('MongoDB reconnected'),
  disconnecting: () => console.log('MongoDB disconnecting'),
  close: () => console.log('MongoDB connection closed'),
  error: (err) => console.error('MongoDB connection error:', err)
};

export const connectDB = async () => {
  if (connection) {
    return connection;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/store-inventory';
  const options = {
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    w: 'majority'
  };

  try {
    connection = await mongoose.connect(uri, options);

    Object.entries(connectionEvents).forEach(([event, handler]) => {
      mongoose.connection.on(event, handler);
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  if (connection) {
    await mongoose.disconnect();
    connection = null;
  }
};

export const getConnection = () => connection;
