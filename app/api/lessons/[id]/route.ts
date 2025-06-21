import { NextRequest, NextResponse } from "next/server";
import cosmosService, { Lesson } from "@/lib/cosmos";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lesson = await cosmosService.getLesson(params.id);

    if (!lesson) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          details: `No lesson found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: lesson,
        message: "Lesson fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch lesson",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Check if lesson exists
    const existingLesson = await cosmosService.getLesson(params.id);
    if (!existingLesson) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          details: `No lesson found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    // Validate skill level if provided
    if (body.skillLevel) {
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
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses = ["scheduled", "completed", "cancelled"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid status",
            details: "Status must be one of: scheduled, completed, cancelled",
          },
          { status: 400 }
        );
      }
    }

    // Validate numeric fields if provided
    if (
      body.duration !== undefined &&
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
      body.maxParticipants !== undefined &&
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

    if (
      body.price !== undefined &&
      (typeof body.price !== "number" || body.price < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid price",
          details: "Price must be a non-negative number",
        },
        { status: 400 }
      );
    }

    // Validate date if provided
    if (body.dateTime) {
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

      // Check if lesson is scheduled in the past (unless it's marked as completed)
      if (
        lessonDate < new Date() &&
        body.status !== "completed" &&
        existingLesson.status !== "completed"
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid date",
            details: "Lesson cannot be scheduled in the past",
          },
          { status: 400 }
        );
      }

      body.dateTime = lessonDate.toISOString();
    }

    // Prepare update data, trimming string fields
    const updateData: Partial<Lesson> = {};

    if (body.title) updateData.title = body.title.trim();
    if (body.description) updateData.description = body.description.trim();
    if (body.skillLevel) updateData.skillLevel = body.skillLevel;
    if (body.duration !== undefined) updateData.duration = body.duration;
    if (body.maxParticipants !== undefined)
      updateData.maxParticipants = body.maxParticipants;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.dateTime) updateData.dateTime = body.dateTime;
    if (body.status) updateData.status = body.status;
    if (body.location !== undefined) updateData.location = body.location.trim();
    if (body.instructor !== undefined)
      updateData.instructor = body.instructor.trim();
    if (Array.isArray(body.ingredients))
      updateData.ingredients = body.ingredients;
    if (Array.isArray(body.equipment)) updateData.equipment = body.equipment;
    if (Array.isArray(body.techniques)) updateData.techniques = body.techniques;

    const updatedLesson = await cosmosService.updateLesson(
      params.id,
      updateData
    );

    return NextResponse.json(
      {
        success: true,
        data: updatedLesson,
        message: "Lesson updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating lesson:", error);

    if (error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          details: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lesson",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if lesson exists
    const existingLesson = await cosmosService.getLesson(params.id);
    if (!existingLesson) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          details: `No lesson found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    // Check if lesson has enrollments
    if (
      existingLesson._enrollments_data &&
      existingLesson._enrollments_data.length > 0
    ) {
      const activeEnrollments = existingLesson._enrollments_data.filter(
        (enrollment) => enrollment.status === "enrolled"
      );

      if (activeEnrollments.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Cannot delete lesson with active enrollments",
            details: `Lesson has ${activeEnrollments.length} active enrollment(s). Please cancel enrollments first or change lesson status to 'cancelled'.`,
          },
          { status: 409 }
        );
      }
    }

    await cosmosService.deleteLesson(params.id);

    return NextResponse.json(
      {
        success: true,
        message: "Lesson deleted successfully",
        data: { id: params.id },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting lesson:", error);

    if (error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          details: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete lesson",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
