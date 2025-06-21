// Test script to verify Cosmos DB connection
import {
  testCosmosConnection,
  checkEnvironmentVariables,
} from "../lib/cosmos-test";

async function main() {
  console.log("🚀 Testing Cosmos DB Connection...\n");

  try {
    // First check environment variables
    console.log("Step 1: Checking environment variables...");
    const envCheck = checkEnvironmentVariables();

    if (!envCheck) {
      console.log(
        "\n❌ Environment check failed. Please add the missing variables to your .env file."
      );
      console.log("\n📝 Required variables:");
      console.log("COSMOS_DB_ENDPOINT=your_cosmos_endpoint");
      console.log("COSMOS_DB_KEY=your_cosmos_key");
      console.log("COSMOS_DB_DATABASE_ID=hillpointe");
      console.log("COSMOS_DB_PARTICIPANTS_CONTAINER=participants");
      console.log("COSMOS_DB_LESSONS_CONTAINER=lessons");
      process.exit(1);
    }

    console.log("\nStep 2: Testing database connection...");
    const connectionTest = await testCosmosConnection();

    if (connectionTest) {
      console.log("\n🎉 SUCCESS! Cosmos DB connection is working correctly.");
      console.log("\n✅ Your Azure Cosmos DB integration is ready to use!");
      console.log("\n📊 Database Details:");
      console.log(`- Database: ${process.env.COSMOS_DB_DATABASE_ID}`);
      console.log(
        `- Participants Container: ${process.env.COSMOS_DB_PARTICIPANTS_CONTAINER}`
      );
      console.log(
        `- Lessons Container: ${process.env.COSMOS_DB_LESSONS_CONTAINER}`
      );
    } else {
      console.log(
        "\n❌ Connection test failed. Please check your credentials."
      );
      console.log("\n🔍 Troubleshooting tips:");
      console.log("1. Verify your COSMOS_DB_ENDPOINT is correct");
      console.log("2. Check that your COSMOS_DB_KEY is valid");
      console.log('3. Ensure the database "hillpointe" exists');
      console.log('4. Confirm containers "participants" and "lessons" exist');
      process.exit(1);
    }
  } catch (error: any) {
    console.error("\n💥 Error during testing:", error.message);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    process.exit(1);
  }
}

main();
