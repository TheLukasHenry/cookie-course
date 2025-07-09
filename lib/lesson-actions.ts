"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cosmosService from "@/lib/cosmos";
import { createLessonSchema, type FormState } from "@/lib/lesson-schema";

export async function createLesson(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      skillLevel: formData.get("skillLevel"),
      duration: Number(formData.get("duration")),
      maxParticipants: Number(formData.get("maxParticipants")),
      price: Number(formData.get("price")),
      dateTime: formData.get("dateTime"),
      location: formData.get("location"),
      instructor: formData.get("instructor"),
      ingredients: formData.getAll("ingredients").filter((item) => item !== ""),
      equipment: formData.getAll("equipment").filter((item) => item !== ""),
      techniques: formData.getAll("techniques").filter((item) => item !== ""),
    };

    // Validate with Zod
    const validatedFields = createLessonSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form for errors.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Create lesson with validated data
    const lessonData = {
      ...validatedFields.data,
      dateTime: new Date(validatedFields.data.dateTime).toISOString(),
      status: "scheduled" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newLesson = await cosmosService.createLesson(lessonData);

    // Revalidate cache
    revalidatePath("/lessons");
    revalidatePath("/");

    // Redirect - this will throw a special error that should not be caught
    redirect(`/lessons/${newLesson.id}`);
  } catch (error: any) {
    // Re-throw redirect errors - they're part of normal Next.js flow
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error creating lesson:", error);

    return {
      success: false,
      message: error.message || "Failed to create lesson. Please try again.",
      errors: {},
    };
  }
}

export async function getAllLessons() {
  try {
    return await cosmosService.getAllLessons();
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw new Error("Failed to fetch lessons");
  }
}
