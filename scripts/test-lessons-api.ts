const API_BASE_URL = "http://localhost:3000";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
  message?: string;
  count?: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  duration: number;
  maxParticipants: number;
  price: number;
  ingredients?: string[];
  equipment?: string[];
  techniques?: string[];
  dateTime: string;
  location?: string;
  instructor?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  _enrollments_data?: any[];
}

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error);
    return {
      success: false,
      error: "Network error",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function testGetAllLessons(): Promise<boolean> {
  console.log("\n🧪 Testing GET /api/lessons...");

  const response = await makeRequest<Lesson[]>("/api/lessons");

  if (response.success) {
    console.log("✅ GET /api/lessons - Success");
    console.log(`📊 Found ${response.count} lessons`);
    if (response.data && response.data.length > 0) {
      console.log("📋 Sample lesson:", response.data[0].title);
    }
    return true;
  } else {
    console.log("❌ GET /api/lessons - Failed");
    console.log("Error:", response.error);
    console.log("Details:", response.details);
    return false;
  }
}

async function testCreateLesson(): Promise<string | null> {
  console.log("\n🧪 Testing POST /api/lessons...");

  const newLesson = {
    title: "Test Chocolate Chip Cookies",
    description:
      "Learn to make the perfect chocolate chip cookies from scratch",
    skillLevel: "beginner" as const,
    duration: 120,
    maxParticipants: 8,
    price: 45.0,
    dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    location: "Kitchen Studio A",
    instructor: "Chef Sarah",
    ingredients: ["flour", "sugar", "butter", "chocolate chips", "eggs"],
    equipment: ["mixing bowls", "measuring cups", "oven", "cookie sheets"],
    techniques: ["creaming", "folding", "baking"],
    status: "scheduled" as const,
  };

  const response = await makeRequest<Lesson>("/api/lessons", {
    method: "POST",
    body: JSON.stringify(newLesson),
  });

  if (response.success && response.data) {
    console.log("✅ POST /api/lessons - Success");
    console.log(
      `📝 Created lesson: ${response.data.title} (ID: ${response.data.id})`
    );
    return response.data.id;
  } else {
    console.log("❌ POST /api/lessons - Failed");
    console.log("Error:", response.error);
    console.log("Details:", response.details);
    return null;
  }
}

async function testGetSpecificLesson(lessonId: string): Promise<boolean> {
  console.log(`\n🧪 Testing GET /api/lessons/${lessonId}...`);

  const response = await makeRequest<Lesson>(`/api/lessons/${lessonId}`);

  if (response.success && response.data) {
    console.log("✅ GET /api/lessons/[id] - Success");
    console.log(`📝 Lesson: ${response.data.title}`);
    console.log(`📊 Duration: ${response.data.duration} minutes`);
    console.log(`💰 Price: $${response.data.price}`);
    console.log(`👥 Max Participants: ${response.data.maxParticipants}`);
    console.log(
      `📅 Scheduled: ${new Date(response.data.dateTime).toLocaleString()}`
    );
    return true;
  } else {
    console.log("❌ GET /api/lessons/[id] - Failed");
    console.log("Error:", response.error);
    console.log("Details:", response.details);
    return false;
  }
}

async function testUpdateLesson(lessonId: string): Promise<boolean> {
  console.log(`\n🧪 Testing PUT /api/lessons/${lessonId}...`);

  const updates = {
    title: "Updated: Advanced Chocolate Chip Cookies",
    skillLevel: "intermediate" as const,
    price: 55.0,
    maxParticipants: 6,
    description:
      "Master the art of chocolate chip cookies with advanced techniques",
  };

  const response = await makeRequest<Lesson>(`/api/lessons/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

  if (response.success && response.data) {
    console.log("✅ PUT /api/lessons/[id] - Success");
    console.log(`📝 Updated lesson: ${response.data.title}`);
    console.log(`📈 New skill level: ${response.data.skillLevel}`);
    console.log(`💰 New price: $${response.data.price}`);
    console.log(`👥 New max participants: ${response.data.maxParticipants}`);
    return true;
  } else {
    console.log("❌ PUT /api/lessons/[id] - Failed");
    console.log("Error:", response.error);
    console.log("Details:", response.details);
    return false;
  }
}

async function testDeleteLesson(lessonId: string): Promise<boolean> {
  console.log(`\n🧪 Testing DELETE /api/lessons/${lessonId}...`);

  const response = await makeRequest(`/api/lessons/${lessonId}`, {
    method: "DELETE",
  });

  if (response.success) {
    console.log("✅ DELETE /api/lessons/[id] - Success");
    console.log(`🗑️ Deleted lesson with ID: ${lessonId}`);
    return true;
  } else {
    console.log("❌ DELETE /api/lessons/[id] - Failed");
    console.log("Error:", response.error);
    console.log("Details:", response.details);
    return false;
  }
}

async function testValidationErrors(): Promise<void> {
  console.log("\n🧪 Testing validation errors...");

  const invalidLesson = {
    title: "",
    description: "Test description",
    skillLevel: "invalid" as any,
    duration: -30,
    maxParticipants: 0,
    price: -10,
    dateTime: "invalid-date",
  };

  const response = await makeRequest("/api/lessons", {
    method: "POST",
    body: JSON.stringify(invalidLesson),
  });

  if (!response.success) {
    console.log("✅ Validation errors handled correctly");
    console.log("Error:", response.error);
  } else {
    console.log("❌ Validation should have failed");
  }
}

async function testLessonsByStatus(): Promise<void> {
  console.log("\n🧪 Testing GET /api/lessons?status=scheduled...");

  const response = await makeRequest<Lesson[]>("/api/lessons?status=scheduled");

  if (response.success) {
    console.log("✅ GET /api/lessons?status=scheduled - Success");
    console.log(`📊 Found ${response.count} scheduled lessons`);
  } else {
    console.log("❌ GET /api/lessons?status=scheduled - Failed");
    console.log("Error:", response.error);
  }
}

async function runAllTests(): Promise<void> {
  console.log("🚀 Starting Lessons API Tests...");
  console.log("=" + "=".repeat(50));

  let createdLessonId: string | null = null;
  let testsPassed = 0;
  let totalTests = 0;

  totalTests++;
  if (await testGetAllLessons()) {
    testsPassed++;
  }

  totalTests++;
  createdLessonId = await testCreateLesson();
  if (createdLessonId) {
    testsPassed++;
  }

  if (createdLessonId) {
    totalTests++;
    if (await testGetSpecificLesson(createdLessonId)) {
      testsPassed++;
    }

    totalTests++;
    if (await testUpdateLesson(createdLessonId)) {
      testsPassed++;
    }

    totalTests++;
    if (await testDeleteLesson(createdLessonId)) {
      testsPassed++;
    }
  }

  totalTests++;
  await testValidationErrors();
  testsPassed++;

  totalTests++;
  await testLessonsByStatus();
  testsPassed++;

  console.log("\n" + "=" + "=".repeat(50));
  console.log("📊 Test Results:");
  console.log(`✅ Tests Passed: ${testsPassed}/${totalTests}`);
  console.log(`❌ Tests Failed: ${totalTests - testsPassed}/${totalTests}`);

  if (testsPassed === totalTests) {
    console.log("🎉 All tests passed! Lessons API is working correctly.");
  } else {
    console.log("⚠️  Some tests failed. Please check the API implementation.");
  }
}

if (require.main === module) {
  runAllTests().catch(console.error);
}

export {
  runAllTests,
  testGetAllLessons,
  testCreateLesson,
  testGetSpecificLesson,
  testUpdateLesson,
  testDeleteLesson,
};
