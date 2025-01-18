import { WithId, Document, ObjectId } from "mongodb";
import { databaseClient } from "../databaseConnector.js";

export async function saveSceneDataAsync(data: object): Promise<void>
{
    try {
        await databaseClient.connect();
        const database = await databaseClient.db('GameCreatorDb');
        const collection = await database.collection('projectsCollection');

        if ((data as any).id)
        {
          const id: string = (data as any).id;
          (data as any).id = undefined;
          const filter = { _id: new ObjectId(id) };
          const update = { $set: data };
          const result = await collection.updateOne(filter, update);
          console.log(`Data updated with _id: ${filter._id}`);
        }
        else
        {
          const result = await collection.insertOne(data);
          console.log(`Data inserted with _id: ${result.insertedId}`);
        }
      } catch (error) {
        console.error('Error saving scene:', error);
      } finally {
        await databaseClient.close();
      }
}

export async function loadScenesDataAsync(): Promise<WithId<Document>[]>
{
    let scenes: WithId<Document>[] = [];
    try {
        await databaseClient.connect();
        const database = await databaseClient.db('GameCreatorDb');
        const collection = await database.collection('projectsCollection');
        scenes = await collection.find({}).toArray();
    } catch (error) {
        console.error('Error loading scenes:', error);
    } finally {
        await databaseClient.close();
    }
    return scenes;
}