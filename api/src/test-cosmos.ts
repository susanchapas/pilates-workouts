import { getCosmosClient, getCosmosConfig } from './services/cosmosService';

async function testCosmos() {
  try {
    console.log("Initializing Cosmos DB...");
    const client = await getCosmosClient();
    const config = getCosmosConfig();
    
    console.log(`Creating database ${config.databaseId} if not exists...`);
    const { database } = await client.databases.createIfNotExists({ id: config.databaseId });
    
    console.log(`Creating container ${config.containerId} if not exists...`);
    const { container } = await database.containers.createIfNotExists({
      id: config.containerId,
      partitionKey: { paths: [config.partitionKey] }
    });

    const testDoc = {
      id: `test-${Date.now()}`,
      name: "Test Pilates Exercise",
      muscleGroup: "Core",
      difficulty: 1,
      equipment: ["Mat"],
      description: "A test exercise to verify read/write."
    };

    console.log(`Writing test document: ${testDoc.id}`);
    const { resource: createdItem } = await container.items.create(testDoc);
    console.log(`Document created successfully with id: ${createdItem?.id}`);

    console.log(`Reading back document: ${createdItem?.id}`);
    const { resource: readItem } = await container.item(createdItem!.id, createdItem!.id).read();
    console.log(`Document read successfully: ${readItem?.name}`);

    console.log(`Deleting test document: ${createdItem?.id}`);
    await container.item(createdItem!.id, createdItem!.id).delete();
    console.log("Document deleted successfully.");

    console.log("Cosmos DB test completed successfully!");
  } catch (err) {
    console.error("Cosmos DB test failed:", err);
  }
}

testCosmos();
