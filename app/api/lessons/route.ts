import { NextRequest, NextResponse } from "next/server";
import cosmosService, { Lesson } from "@/lib/cosmos";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as Lesson["status"] | null;

    let lessons: Lesson[];

    if (status) {
      lessons = await cosmosService.getLessonsByStatus(status);
    } else {
      lessons = await cosmosService.getAllLessons();
    }

    return NextResponse.json(
      {
        success: true,
        data: lessons,
        count: lessons.length,
        message: "Lessons fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch lessons",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "skillLevel",
      "duration",
      "maxParticipants",
      "price",
      "dateTime",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          details: `Required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate skill level
    const validSkillLevels = ["beginner", "intermediate", "advanced"];
    if (!validSkillLevels.includes(body.skillLevel)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid skill level",
          details:
            "Skill level must be one of: beginner, intermediate, advanced",
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ["scheduled", "completed", "cancelled"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status",
          details: "Status must be one of: scheduled, completed, cancelled",
        },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (
      body.duration &&
      (typeof body.duration !== "number" || body.duration <= 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid duration",
          details: "Duration must be a positive number (in minutes)",
        },
        { status: 400 }
      );
    }

    if (
      body.maxParticipants &&
      (typeof body.maxParticipants !== "number" || body.maxParticipants <= 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid max participants",
          details: "Max participants must be a positive number",
        },
        { status: 400 }
      );
    }

    if (body.price && (typeof body.price !== "number" || body.price < 0)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid price",
          details: "Price must be a non-negative number",
        },
        { status: 400 }
      );
    }

    // Validate date
    const lessonDate = new Date(body.dateTime);
    if (isNaN(lessonDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date",
          details: "Date must be a valid ISO date string",
        },
        { status: 400 }
      );
    }

    // Check if lesson is scheduled in the past
    if (lessonDate < new Date() && body.status !== "completed") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date",
          details: "Lesson cannot be scheduled in the past",
        },
        { status: 400 }
      );
    }

    // Create lesson object
    const lessonData = {
      title: body.title.trim(),
      description: body.description.trim(),
      skillLevel: body.skillLevel,
      duration: body.duration,
      maxParticipants: body.maxParticipants,
      price: body.price,
      dateTime: lessonDate.toISOString(),
      status: body.status || "scheduled",
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : [],
      equipment: Array.isArray(body.equipment) ? body.equipment : [],
      techniques: Array.isArray(body.techniques) ? body.techniques : [],
      location: body.location?.trim() || "",
      instructor: body.instructor?.trim() || "",
    };

    const lesson = await cosmosService.createLesson(lessonData);

    return NextResponse.json(
      {
        success: true,
        data: lesson,
        message: "Lesson created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating lesson:", error);

    if (
      error.message.includes("duplicate") ||
      error.message.includes("already exists")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson already exists",
          details: error.message,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create lesson",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
