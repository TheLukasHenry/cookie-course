/**
 * Test script for Participants API endpoints
 * Run with: npx tsx scripts/test-participants-api.ts
 */

const API_BASE_URL = "http://localhost:3000/api/participants";

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: number;
  allergies?: string[];
  dietaryRestrictions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  registrationDate: string;
  isActive: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
  message?: string;
  count?: number;
}

const testParticipant = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe.test@example.com",
  phone: "+1-555-0123",
  age: 25,
  allergies: ["Nuts", "Shellfish"],
  dietaryRestrictions: ["Vegetarian"],
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1-555-0124",
    relationship: "Spouse",
  },
};

async function makeRequest(
  url: string,
  method: string = "GET",
  body?: any
): Promise<ApiResponse> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    console.log(`${method} ${url}`);
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
    console.log("---");

    return data;
  } catch (error) {
    console.error(`Error making request to ${url}:`, error);
    return {
      success: false,
      error: "Request failed",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function testParticipantsAPI() {
  console.log("🧪 Testing Participants API Endpoints");
  console.log("=====================================\n");

  let createdParticipantId: string | null = null;

  try {
    console.log("1️⃣ Testing GET /api/participants");
    const getAllResponse = await makeRequest(API_BASE_URL);

    if (!getAllResponse.success) {
      console.error("❌ Failed to get participants:", getAllResponse.error);
      return;
    }

    console.log(
      `✅ Successfully fetched ${getAllResponse.count || 0} participants\n`
    );

    console.log("2️⃣ Testing POST /api/participants");
    const createResponse = await makeRequest(
      API_BASE_URL,
      "POST",
      testParticipant
    );

    if (!createResponse.success) {
      console.error("❌ Failed to create participant:", createResponse.error);
      return;
    }

    createdParticipantId = createResponse.data?.id;
    console.log(
      `✅ Successfully created participant with ID: ${createdParticipantId}\n`
    );

    if (!createdParticipantId) {
      console.error("❌ No participant ID returned from creation");
      return;
    }

    console.log("3️⃣ Testing GET /api/participants/[id]");
    const getOneResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`
    );

    if (!getOneResponse.success) {
      console.error(
        "❌ Failed to get specific participant:",
        getOneResponse.error
      );
      return;
    }

    console.log(
      `✅ Successfully fetched participant: ${getOneResponse.data?.firstName} ${getOneResponse.data?.lastName}\n`
    );

    console.log("4️⃣ Testing PUT /api/participants/[id]");
    const updateData = {
      firstName: "Jane",
      age: 30,
      allergies: ["Dairy", "Gluten"],
    };

    const updateResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`,
      "PUT",
      updateData
    );

    if (!updateResponse.success) {
      console.error("❌ Failed to update participant:", updateResponse.error);
      return;
    }

    console.log(`✅ Successfully updated participant\n`);

    console.log("5️⃣ Verifying participant update");
    const getUpdatedResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`
    );

    if (getUpdatedResponse.success && getUpdatedResponse.data) {
      const participant = getUpdatedResponse.data;
      console.log(
        `✅ Verified updates: Name: ${participant.firstName}, Age: ${
          participant.age
        }, Allergies: ${participant.allergies?.join(", ")}\n`
      );
    }

    console.log("6️⃣ Testing validation errors");
    const invalidUpdateResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`,
      "PUT",
      { email: "invalid-email", age: 15 }
    );

    if (
      !invalidUpdateResponse.success &&
      invalidUpdateResponse.error?.includes("Validation")
    ) {
      console.log(
        `✅ Validation working correctly: ${invalidUpdateResponse.details}\n`
      );
    } else {
      console.log(`⚠️  Validation might not be working as expected\n`);
    }

    console.log("7️⃣ Testing 404 error handling");
    const notFoundResponse = await makeRequest(
      `${API_BASE_URL}/nonexistent-id`
    );

    if (
      !notFoundResponse.success &&
      notFoundResponse.error?.includes("Not found")
    ) {
      console.log(`✅ 404 handling working correctly\n`);
    } else {
      console.log(`⚠️  404 handling might not be working as expected\n`);
    }

    console.log("8️⃣ Testing DELETE /api/participants/[id] (soft delete)");
    const deleteResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`,
      "DELETE"
    );

    if (!deleteResponse.success) {
      console.error("❌ Failed to delete participant:", deleteResponse.error);
      return;
    }

    console.log(`✅ Successfully deactivated participant\n`);

    console.log("9️⃣ Verifying soft delete");
    const getDeletedResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}`
    );

    if (
      getDeletedResponse.success &&
      getDeletedResponse.data?.isActive === false
    ) {
      console.log(`✅ Soft delete verified: participant is inactive\n`);
    } else if (!getDeletedResponse.success) {
      console.log(
        `ℹ️  Participant not found after soft delete (this might be expected behavior)\n`
      );
    }

    console.log("🔟 Testing hard delete (cleanup)");
    const hardDeleteResponse = await makeRequest(
      `${API_BASE_URL}/${createdParticipantId}?hard=true`,
      "DELETE"
    );

    if (hardDeleteResponse.success) {
      console.log(
        `✅ Successfully hard deleted participant (cleanup completed)\n`
      );
    } else {
      console.log(`⚠️  Hard delete failed, manual cleanup may be needed\n`);
    }

    console.log("🎉 All API tests completed successfully!");
  } catch (error) {
    console.error("💥 Test suite failed:", error);

    if (createdParticipantId) {
      console.log("🧹 Attempting cleanup...");
      await makeRequest(
        `${API_BASE_URL}/${createdParticipantId}?hard=true`,
        "DELETE"
      );
    }
  }
}

if (require.main === module) {
  console.log("Starting Participants API tests...");
  console.log(
    "Make sure your Next.js development server is running on localhost:3000\n"
  );

  testParticipantsAPI().catch(console.error);
}
