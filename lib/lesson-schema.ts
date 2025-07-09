import { z } from "zod";

export const createLessonSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),

  skillLevel: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Please select a valid skill level" }),
  }),

  duration: z
    .number()
    .min(15, "Duration must be at least 15 minutes")
    .max(480, "Duration cannot exceed 8 hours")
    .int("Duration must be a whole number"),

  maxParticipants: z
    .number()
    .min(1, "Must allow at least 1 participant")
    .max(50, "Cannot exceed 50 participants")
    .int("Number of participants must be a whole number"),

  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(10000, "Price cannot exceed $10,000"),

  dateTime: z
    .string()
    .min(1, "Date and time is required")
    .refine((date) => {
      const lessonDate = new Date(date);
      return !isNaN(lessonDate.getTime());
    }, "Please enter a valid date and time")
    .refine((date) => {
      const lessonDate = new Date(date);
      return lessonDate > new Date();
    }, "Lesson must be scheduled in the future"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be less than 200 characters")
    .trim(),

  instructor: z
    .string()
    .min(1, "Instructor name is required")
    .max(100, "Instructor name must be less than 100 characters")
    .trim(),

  ingredients: z
    .array(z.string().trim().min(1))
    .min(1, "At least one ingredient is required")
    .max(20, "Cannot have more than 20 ingredients"),

  equipment: z
    .array(z.string().trim().min(1))
    .min(1, "At least one piece of equipment is required")
    .max(15, "Cannot have more than 15 pieces of equipment"),

  techniques: z
    .array(z.string().trim().min(1))
    .min(1, "At least one technique is required")
    .max(10, "Cannot have more than 10 techniques"),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;

// For form state management
export type FormState = {
  success?: boolean;
  message?: string;
  errors?: {
    [K in keyof CreateLessonInput]?: string[];
  };
};
