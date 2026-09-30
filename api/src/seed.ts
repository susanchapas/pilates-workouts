/**
 * Azure Cosmos DB Seeding Script
 * Track 1A.3: Seed the database with 35–45 balanced exercises
 *
 * Usage:
 *   npm run seed            # Seeds directly into Azure Cosmos DB
 *   npm run seed:dry-run    # Validates data & configuration without inserting
 */

import { seedCosmosDatabase, isCosmosConfigured, getCosmosConfig } from './services/cosmosService';

async function main() {
  const isDryRun = process.argv.includes('--dry-run') || process.argv.includes('-d');
  const config = getCosmosConfig();

  console.log('='.repeat(70));
  console.log(' Azure Cosmos DB Exercise Seeder - Track 1A.3');
  console.log('='.repeat(70));
  console.log(`Mode:            ${isDryRun ? '🔍 DRY RUN (Validation & Preview)' : '🚀 LIVE SEEDING'}`);
  console.log(`Database:        ${config.databaseId}`);
  console.log(`Container:       ${config.containerId}`);
  console.log(`Partition Key:   ${config.partitionKey}`);
  console.log(`Cosmos Live:     ${isCosmosConfigured() ? '✅ Configured' : '⚠️ Not configured'}`);

  if (!isDryRun && !isCosmosConfigured()) {
    console.warn('\n⚠️ WARNING: Cosmos DB credentials are not configured in environment or local.settings.json.');
    console.warn('   To seed your Azure Cosmos DB account, please set:');
    console.warn('   - COSMOS_DB_CONNECTION_STRING="AccountEndpoint=https://...;AccountKey=...;"');
    console.warn('   in api/local.settings.json or your system environment variables.\n');
    console.log('   Running in DRY RUN mode to validate seed data:\n');
  }

  try {
    const result = await seedCosmosDatabase({ dryRun: isDryRun || !isCosmosConfigured() });

    console.log('\n--- Seeding Summary ---');
    console.log(`Total Exercises Processed: ${result.totalExercises}`);
    console.log(`Successfully Prepared:     ${result.inserted}`);
    console.log(`Failed:                    ${result.failed}`);
    console.log(`Target Destination:        ${result.source}`);
    console.log(`Execution Time:            ${result.durationMs}ms`);

    console.log('\nDistribution by Muscle Group:');
    Object.entries(result.stats.byMuscleGroup).forEach(([mg, count]) => {
      console.log(`  - ${mg.padEnd(16)}: ${count} exercises`);
    });

    console.log('\nDistribution by Difficulty:');
    console.log(`  - Level 1 (Beginner)    : ${result.stats.byDifficulty[1]}`);
    console.log(`  - Level 2 (Intermediate): ${result.stats.byDifficulty[2]}`);
    console.log(`  - Level 3 (Advanced)    : ${result.stats.byDifficulty[3]}`);

    console.log('\nDistribution by Equipment:');
    Object.entries(result.stats.byEquipment).forEach(([eq, count]) => {
      console.log(`  - ${eq.padEnd(12)}: ${count} exercises`);
    });

    console.log('\nDistribution by Workout Focus:');
    Object.entries(result.stats.byFocus).forEach(([focus, count]) => {
      console.log(`  - ${focus.padEnd(12)}: ${count} exercises`);
    });

    if (result.errors.length > 0) {
      console.error('\n❌ Errors encountered:');
      result.errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }

    console.log('\n' + '='.repeat(70));
    if (result.dryRun) {
      console.log('🎉 Dry run successful! All 45 exercises are validated and ready to seed.');
      console.log('   Run "npm run seed" once your Azure Cosmos DB connection string is set.');
    } else {
      console.log(`🎉 Success! All ${result.inserted} exercises successfully seeded to Azure Cosmos DB.`);
    }
    console.log('='.repeat(70) + '\n');
  } catch (error) {
    const err = error as Error;
    console.error(`\n❌ Seeding failed: ${err.message}`);
    process.exit(1);
  }
}

main();
