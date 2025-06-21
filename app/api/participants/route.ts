import { NextRequest, NextResponse } from "next/server";
import cosmosService from "@/lib/cosmos";

export async function GET() {
  try {
    // Initialize Cosmos DB connection
    await cosmosService.initialize();

    // Get all participants
    const participants = await cosmosService.getAllParticipants();

    return NextResponse.json(
      {
        success: true,
        data: participants,
        count: participants.length,
        message: "Participants fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch participants",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Cosmos DB connection
    await cosmosService.initialize();

    // Parse request body
    const body = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: "First name, last name, and email are required",
        },
        { status: 400 }
      );
    }

    // Email validation
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

    // Age validation if provided
    if (body.age && (body.age < 16 || body.age > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: "Age must be between 16 and 100",
        },
        { status: 400 }
      );
    }

    // Create participant
    const newParticipant = await cosmosService.createParticipant({
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      age: body.age ? parseInt(body.age) : undefined,
      allergies: body.allergies || [],
      dietaryRestrictions: body.dietaryRestrictions || [],
      emergencyContact: body.emergencyContact || undefined,
      registrationDate: new Date().toISOString(),
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: newParticipant,
        message: "Participant created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating participant:", error);

    // Handle specific Cosmos DB errors
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
        error: "Failed to create participant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
