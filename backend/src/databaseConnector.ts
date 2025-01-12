import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import * as fs from 'node:fs';

const password = fs.readFileSync('password.txt', 'utf8');
const uri = `mongodb+srv://bimz:${password}@cluster0.gzlqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase(): Promise<Collection[]> {
  try {
    const collections = await run();
    return collections;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function run(): Promise<Collection[]> {
  const collections: Collection[] = [];
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('GameCreatorDb');
    const collection = database.collection('projectsCollection');
    collections.push(collection);
  } finally {
    await client.close();
  }
  return collections;
}

export async function saveDataToDatabase(data: object): Promise<void> {
  try {
    await client.connect();
    const database = client.db('GameCreatorDb');
    const collection = database.collection('projectsCollection');
    const result = await collection.insertOne(data);
    console.log(`Data inserted with _id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error saving data to the database:', error);
    throw error;
  } finally {
    await client.close();
  }
}