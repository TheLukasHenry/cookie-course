import { NextRequest, NextResponse } from "next/server";
import cosmosService from "@/lib/cosmos";

export async function GET() {
  try {
    await cosmosService.initialize();

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
    await cosmosService.initialize();

    const body = await request.json();

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
