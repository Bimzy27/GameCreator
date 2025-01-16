import { MongoClient, ServerApiVersion } from 'mongodb';
import * as fs from 'node:fs';

const password = fs.readFileSync('password.txt', 'utf8');
const uri = `mongodb+srv://bimz:${password}@cluster0.gzlqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const databaseClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});