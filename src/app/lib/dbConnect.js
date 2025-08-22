import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNamesObj = {
    productsCollection: 'products',
    usersCollection: "users", 
}

let client;
let isConnected = false;


export default async function dbConnect(collectionName){
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    if(!uri){
        throw new Error('MONGODB_URI is missing from environment variables')

    }

    if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }

  const dbName = process.env.DB_NAME || 'default_db_name';
  return client.db(dbName).collection(collectionName);

}