import cosmosService from "./cosmos";

export async function testCosmosConnection() {
  console.log("🧪 Testing Cosmos DB connection...");

  try {
    const isConnected = await cosmosService.testConnection();

    if (isConnected) {
      console.log("✅ Cosmos DB connection test passed!");
      return true;
    } else {
      console.log("❌ Cosmos DB connection test failed!");
      return false;
    }
  } catch (error) {
    console.error("❌ Cosmos DB connection error:", error);
    return false;
  }
}

export async function createSampleData() {
  console.log("📝 Creating sample data...");

  try {
    const participant = await cosmosService.createParticipant({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      age: 28,
      allergies: ["peanuts"],
      dietaryRestrictions: [],
      emergencyContact: {
        name: "Jane Doe",
        phone: "+1-555-0124",
        relationship: "spouse",
      },
      registrationDate: new Date().toISOString(),
      isActive: true,
    });
    console.log("✅ Created participant:", participant.id);

    const lesson = await cosmosService.createLesson({
      title: "Introduction to Cookie Baking",
      description: "Learn the basics of cookie baking with hands-on techniques",
      skillLevel: "beginner",
      duration: 120, // 2 hours
      maxParticipants: 10,
      price: 45,
      ingredients: ["flour", "butter", "sugar", "eggs", "vanilla extract"],
      equipment: ["mixing bowls", "electric mixer", "baking sheets"],
      techniques: ["creaming butter and sugar", "proper mixing techniques"],
      dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      location: "Kitchen Studio A",
      instructor: "Chef Sarah",
      status: "scheduled",
    });
    console.log("✅ Created lesson:", lesson.id);

    const enrollment = await cosmosService.enrollParticipant(
      lesson.id,
      participant.id,
      "Looking forward to learning new techniques!"
    );
    console.log("✅ Created enrollment:", enrollment.id);

    return { participant, lesson, enrollment };
  } catch (error) {
    console.error("❌ Error creating sample data:", error);
    throw error;
  }
}

export async function testCRUDOperations() {
  console.log("🧪 Testing CRUD operations...");

  try {
    console.log("Testing Participants CRUD...");

    const newParticipant = await cosmosService.createParticipant({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "+1-555-0199",
      age: 25,
      allergies: [],
      dietaryRestrictions: ["vegetarian"],
      emergencyContact: {
        name: "Emergency Contact",
        phone: "+1-555-0200",
        relationship: "friend",
      },
      registrationDate: new Date().toISOString(),
      isActive: true,
    });
    console.log("✅ Participant created:", newParticipant.id);

    const fetchedParticipant = await cosmosService.getParticipant(
      newParticipant.id
    );
    if (fetchedParticipant) {
      console.log("✅ Participant fetched successfully");
    }

    const updatedParticipant = await cosmosService.updateParticipant(
      newParticipant.id,
      {
        firstName: "Updated Test",
        phone: "+1-555-0201",
      }
    );
    console.log(
      "✅ Participant updated:",
      `${updatedParticipant.firstName} ${updatedParticipant.lastName}`
    );

    const allParticipants = await cosmosService.getAllParticipants();
    console.log("✅ Total active participants:", allParticipants.length);

    console.log("Testing Lessons CRUD...");

    const newLesson = await cosmosService.createLesson({
      title: "Advanced Cookie Decorating",
      description: "Master the art of cookie decoration with royal icing",
      skillLevel: "intermediate",
      duration: 180, // 3 hours
      maxParticipants: 8,
      price: 75,
      ingredients: [
        "decorated cookies",
        "royal icing",
        "food coloring",
        "piping bags",
      ],
      equipment: ["piping tips", "squeeze bottles", "decorating turntable"],
      techniques: [
        "flooding technique",
        "wet-on-wet design",
        "fine detail work",
      ],
      dateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      location: "Kitchen Studio B",
      instructor: "Chef Maria",
      status: "scheduled",
    });
    console.log("✅ Lesson created:", newLesson.id);

    const fetchedLesson = await cosmosService.getLesson(newLesson.id);
    if (fetchedLesson) {
      console.log("✅ Lesson fetched successfully");
    }

    const updatedLesson = await cosmosService.updateLesson(newLesson.id, {
      title: "Updated Advanced Cookie Decorating",
      price: 80,
    });
    console.log("✅ Lesson updated:", updatedLesson.title);

    const allLessons = await cosmosService.getAllLessons();
    console.log("✅ Total lessons:", allLessons.length);

    const scheduledLessons = await cosmosService.getLessonsByStatus(
      "scheduled"
    );
    console.log("✅ Scheduled lessons:", scheduledLessons.length);

    console.log("Testing Embedded Enrollments...");

    const enrollment = await cosmosService.enrollParticipant(
      newLesson.id,
      newParticipant.id,
      "Excited to learn advanced decoration techniques!"
    );
    console.log("✅ Enrollment created:", enrollment.id);

    const lessonEnrollments = await cosmosService.getEnrollmentsForLesson(
      newLesson.id
    );
    console.log("✅ Lesson enrollments:", lessonEnrollments.length);

    const participantEnrollments =
      await cosmosService.getEnrollmentsForParticipant(newParticipant.id);
    console.log("✅ Participant enrollments:", participantEnrollments.length);

    await cosmosService.updateEnrollmentStatus(
      newLesson.id,
      newParticipant.id,
      "completed"
    );
    console.log("✅ Enrollment status updated to completed");

    await cosmosService.updateEnrollmentPaymentStatus(
      newLesson.id,
      newParticipant.id,
      "paid"
    );
    console.log("✅ Payment status updated to paid");

    console.log("Testing Utility Methods...");

    const fullName = await cosmosService.getParticipantFullName(
      newParticipant.id
    );
    console.log("✅ Participant full name:", fullName);

    const lessonWithParticipants =
      await cosmosService.getLessonWithEnrolledParticipants(newLesson.id);
    if (lessonWithParticipants) {
      console.log("✅ Lesson with participants:", {
        lesson: lessonWithParticipants.lesson.title,
        participantCount: lessonWithParticipants.participants.length,
      });
    }

    await cosmosService.unenrollParticipant(newLesson.id, newParticipant.id);
    console.log("✅ Enrollment removed");

    await cosmosService.deleteParticipant(newParticipant.id);
    console.log("✅ Participant soft deleted (isActive = false)");

    await cosmosService.deleteLesson(newLesson.id);
    console.log("✅ Lesson deleted");

    console.log("🎉 All CRUD operations completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ CRUD operations test failed:", error);
    return false;
  }
}

export function checkEnvironmentVariables() {
  console.log("🔍 Checking environment variables...");

  const requiredVars = [
    "COSMOS_DB_ENDPOINT",
    "COSMOS_DB_KEY",
    "COSMOS_DB_DATABASE_ID",
    "COSMOS_DB_PARTICIPANTS_CONTAINER",
    "COSMOS_DB_LESSONS_CONTAINER",
  ];

  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value || value.trim() === "") {
      missingVars.push(varName);
      console.log(`❌ Missing: ${varName}`);
    } else {
      console.log(`✅ Found: ${varName}`);
    }
  }

  if (missingVars.length > 0) {
    console.log(
      `\n⚠️  Missing ${missingVars.length} required environment variables:`
    );
    missingVars.forEach((varName) => console.log(`   - ${varName}`));
    console.log("\n📝 Please add these to your .env file:");
    console.log("COSMOS_DB_ENDPOINT=your_cosmos_endpoint");
    console.log("COSMOS_DB_KEY=your_cosmos_key");
    console.log("COSMOS_DB_DATABASE_ID=hillpointe");
    console.log("COSMOS_DB_PARTICIPANTS_CONTAINER=participants");
    console.log("COSMOS_DB_LESSONS_CONTAINER=lessons");
    return false;
  }

  console.log("✅ All required environment variables are present!");
  return true;
}

export async function runAllTests() {
  console.log("🚀 Starting comprehensive Cosmos DB tests...\n");

  const envCheck = checkEnvironmentVariables();
  if (!envCheck) {
    console.log(
      "❌ Environment variables check failed. Please fix before continuing."
    );
    return false;
  }

  const connectionTest = await testCosmosConnection();
  if (!connectionTest) {
    console.log("❌ Connection test failed. Please check your credentials.");
    return false;
  }

  const crudTest = await testCRUDOperations();
  if (!crudTest) {
    console.log("❌ CRUD operations test failed.");
    return false;
  }

  console.log(
    "\n🎉 All tests passed! Your Cosmos DB integration is working correctly."
  );
  console.log("\n📊 Architecture Summary:");
  console.log(
    "- Participants: Separate container with firstName/lastName, phone, age, allergies, etc."
  );
  console.log(
    "- Lessons: Separate container with skillLevel, price, ingredients, equipment, etc."
  );
  console.log(
    "- Enrollments: Embedded in lessons as _enrollments_data[] with paymentStatus and notes"
  );
  console.log("\n🏗️ Data Structure Features:");
  console.log("- Soft delete for participants (isActive flag)");
  console.log("- Automatic timestamps (createdAt, updatedAt for lessons)");
  console.log(
    "- Rich participant profiles with emergency contacts and dietary info"
  );
  console.log(
    "- Comprehensive lesson details with ingredients, equipment, and techniques"
  );
  console.log("- Enhanced enrollments with payment tracking and notes");

  return true;
}
