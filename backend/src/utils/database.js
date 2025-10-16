const { MongoClient } = require('mongodb');

let client = null;
let db = null;

const getConnectionString = () => {
  const password = process.env.MONGO_PASSWORD;
  const isLocal = process.env.IS_LOCAL === 'true';
  
  if (isLocal) {
    return `mongodb://root:${password}@mongodb:27017`;
  } else {
    return `mongodb://root:${password}@mongodb.default.svc.cluster.local:27017`;
  }
};

const connect = async () => {
  if (client) return db;
  
  try {
    const connectionString = getConnectionString();
    client = new MongoClient(connectionString);
    await client.connect();
    db = client.db('days-since');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const close = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
};

module.exports = { connect, close };
