import { NextRequest, NextResponse } from "next/server";
import cosmosService from "@/lib/cosmos";

// GET /api/participants/[id] - Get a specific participant
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize Cosmos DB connection
    await cosmosService.initialize();

    const participantId = params.id;

    // Validate participant ID
    if (!participantId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: "Participant ID is required",
        },
        { status: 400 }
      );
    }

    // Get participant from Cosmos DB
    const participant = await cosmosService.getParticipant(participantId);

    if (!participant) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          details: "Participant not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: participant,
        message: "Participant fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching participant:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch participant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT /api/participants/[id] - Update a specific participant
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize Cosmos DB connection
    await cosmosService.initialize();

    const participantId = params.id;

    // Validate participant ID
    if (!participantId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: "Participant ID is required",
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Basic validation for required fields (if provided)
    if (body.firstName !== undefined && !body.firstName.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: "First name cannot be empty",
        },
        { status: 400 }
      );
    }

    if (body.lastName !== undefined && !body.lastName.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: "Last name cannot be empty",
        },
        { status: 400 }
      );
    }

    // Email validation if provided
    if (body.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: "Please provide a valid email address",
          },
          { status: 400 }
        );
      }
    }

    // Age validation if provided
    if (body.age !== undefined && (body.age < 16 || body.age > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: "Age must be between 16 and 100",
        },
        { status: 400 }
      );
    }

    // Prepare update data (only include fields that are provided)
    const updateData: any = {};

    if (body.firstName !== undefined)
      updateData.firstName = body.firstName.trim();
    if (body.lastName !== undefined) updateData.lastName = body.lastName.trim();
    if (body.email !== undefined)
      updateData.email = body.email.trim().toLowerCase();
    if (body.phone !== undefined)
      updateData.phone = body.phone?.trim() || undefined;
    if (body.age !== undefined)
      updateData.age = body.age ? parseInt(body.age) : undefined;
    if (body.allergies !== undefined)
      updateData.allergies = body.allergies || [];
    if (body.dietaryRestrictions !== undefined)
      updateData.dietaryRestrictions = body.dietaryRestrictions || [];
    if (body.emergencyContact !== undefined)
      updateData.emergencyContact = body.emergencyContact || undefined;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    // Update participant
    const updatedParticipant = await cosmosService.updateParticipant(
      participantId,
      updateData
    );

    return NextResponse.json(
      {
        success: true,
        data: updatedParticipant,
        message: "Participant updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating participant:", error);

    // Handle specific errors
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          details: "Participant not found",
        },
        { status: 404 }
      );
    }

    if (error instanceof Error && error.message.includes("duplicate")) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate entry",
          details: "A participant with this email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update participant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/participants/[id] - Delete a specific participant (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize Cosmos DB connection
    await cosmosService.initialize();

    const participantId = params.id;

    // Validate participant ID
    if (!participantId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: "Participant ID is required",
        },
        { status: 400 }
      );
    }

    // Check if we should do a hard delete (query parameter)
    const url = new URL(request.url);
    const hardDelete = url.searchParams.get("hard") === "true";

    if (hardDelete) {
      // Hard delete - permanently remove from database
      await cosmosService.hardDeleteParticipant(participantId);
    } else {
      // Soft delete - set isActive to false
      await cosmosService.deleteParticipant(participantId);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Participant ${
          hardDelete ? "permanently deleted" : "deactivated"
        } successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting participant:", error);

    // Handle specific errors
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          details: "Participant not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete participant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
