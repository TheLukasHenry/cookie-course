import { CosmosClient, Database, Container, SqlQuerySpec } from "@azure/cosmos";

// Types for our application
export interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseId: string;
  containers: {
    participants: string;
    lessons: string;
    // Note: enrollments are embedded in lessons, not a separate container
  };
}

export interface Participant {
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

export interface Enrollment {
  id: string;
  participantId: string;
  lessonId: string;
  enrollmentDate: string;
  status: "enrolled" | "completed" | "cancelled";
  paymentStatus?: "paid" | "pending" | "refunded";
  notes?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  maxParticipants: number;
  price: number;
  ingredients?: string[];
  equipment?: string[];
  techniques?: string[];
  dateTime: string; // ISO date string for when lesson is scheduled
  location?: string;
  instructor?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  // Embedded enrollments data
  _enrollments_data?: Enrollment[];
}

class CosmosService {
  private client: CosmosClient | null = null;
  private database: Database | null = null;
  private containers: {
    participants: Container | null;
    lessons: Container | null;
  } = {
    participants: null,
    lessons: null,
  };

  private config: CosmosConfig = {
    endpoint: process.env.COSMOS_DB_ENDPOINT || "",
    key: process.env.COSMOS_DB_KEY || "",
    databaseId: process.env.COSMOS_DB_DATABASE_ID || "",
    containers: {
      participants:
        process.env.COSMOS_DB_PARTICIPANTS_CONTAINER || "participants",
      lessons: process.env.COSMOS_DB_LESSONS_CONTAINER || "lessons",
    },
  };

  async initialize(): Promise<void> {
    if (!this.client) {
      this.client = new CosmosClient({
        endpoint: this.config.endpoint,
        key: this.config.key,
      });

      this.database = this.client.database(this.config.databaseId);
      this.containers.participants = this.database.container(
        this.config.containers.participants
      );
      this.containers.lessons = this.database.container(
        this.config.containers.lessons
      );
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.initialize();
      if (!this.database) return false;

      const { resource } = await this.database.read();
      return !!resource;
    } catch (error) {
      console.error("Cosmos DB connection test failed:", error);
      return false;
    }
  }

  // Participant CRUD operations
  async createParticipant(
    participant: Omit<Participant, "id">
  ): Promise<Participant> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    const now = new Date().toISOString();
    const newParticipant: Participant = {
      id: `participant-${Date.now()}`,
      ...participant,
      registrationDate: participant.registrationDate || now,
      isActive:
        participant.isActive !== undefined ? participant.isActive : true,
    };

    const { resource } = await this.containers.participants.items.create(
      newParticipant
    );
    return resource as Participant;
  }

  async getParticipant(id: string): Promise<Participant | null> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    try {
      const { resource } = await this.containers.participants
        .item(id, id)
        .read<Participant>();
      return resource || null;
    } catch (error: any) {
      if (error.code === 404) return null;
      throw error;
    }
  }

  async getAllParticipants(): Promise<Participant[]> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    const querySpec: SqlQuerySpec = {
      query:
        "SELECT * FROM c WHERE c.isActive = true ORDER BY c.registrationDate DESC",
    };

    const { resources } = await this.containers.participants.items
      .query<Participant>(querySpec)
      .fetchAll();
    return resources;
  }

  async updateParticipant(
    id: string,
    updates: Partial<Participant>
  ): Promise<Participant> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    const existing = await this.getParticipant(id);
    if (!existing) throw new Error("Participant not found");

    const updated = { ...existing, ...updates };
    const { resource } = await this.containers.participants
      .item(id, id)
      .replace(updated);
    return resource as Participant;
  }

  async deleteParticipant(id: string): Promise<void> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    // Soft delete by setting isActive to false
    await this.updateParticipant(id, { isActive: false });
  }

  async hardDeleteParticipant(id: string): Promise<void> {
    await this.initialize();
    if (!this.containers.participants)
      throw new Error("Participants container not initialized");

    await this.containers.participants.item(id, id).delete();
  }

  // Lesson CRUD operations
  async createLesson(
    lesson: Omit<Lesson, "id" | "createdAt" | "updatedAt">
  ): Promise<Lesson> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    const now = new Date().toISOString();
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      _enrollments_data: [], // Initialize empty enrollments array
      ...lesson,
    };

    const { resource } = await this.containers.lessons.items.create(newLesson);
    return resource as Lesson;
  }

  async getLesson(id: string): Promise<Lesson | null> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    try {
      const { resource } = await this.containers.lessons
        .item(id, id)
        .read<Lesson>();
      return resource || null;
    } catch (error: any) {
      if (error.code === 404) return null;
      throw error;
    }
  }

  async getAllLessons(): Promise<Lesson[]> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    const querySpec: SqlQuerySpec = {
      query: "SELECT * FROM c ORDER BY c.dateTime ASC",
    };

    const { resources } = await this.containers.lessons.items
      .query<Lesson>(querySpec)
      .fetchAll();
    return resources;
  }

  async getLessonsByStatus(status: Lesson["status"]): Promise<Lesson[]> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    const querySpec: SqlQuerySpec = {
      query: "SELECT * FROM c WHERE c.status = @status ORDER BY c.dateTime ASC",
      parameters: [{ name: "@status", value: status }],
    };

    const { resources } = await this.containers.lessons.items
      .query<Lesson>(querySpec)
      .fetchAll();
    return resources;
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    const existing = await this.getLesson(id);
    if (!existing) throw new Error("Lesson not found");

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    const { resource } = await this.containers.lessons
      .item(id, id)
      .replace(updated);
    return resource as Lesson;
  }

  async deleteLesson(id: string): Promise<void> {
    await this.initialize();
    if (!this.containers.lessons)
      throw new Error("Lessons container not initialized");

    await this.containers.lessons.item(id, id).delete();
  }

  // Enrollment operations (embedded in lessons)
  async enrollParticipant(
    lessonId: string,
    participantId: string,
    notes?: string
  ): Promise<Enrollment> {
    await this.initialize();

    const lesson = await this.getLesson(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    const participant = await this.getParticipant(participantId);
    if (!participant) throw new Error("Participant not found");

    // Check if already enrolled
    const existingEnrollment = lesson._enrollments_data?.find(
      (e) => e.participantId === participantId
    );
    if (existingEnrollment)
      throw new Error("Participant already enrolled in this lesson");

    // Check capacity
    const currentEnrollments =
      lesson._enrollments_data?.filter((e) => e.status === "enrolled").length ||
      0;
    if (currentEnrollments >= lesson.maxParticipants) {
      throw new Error("Lesson is at maximum capacity");
    }

    // Create new enrollment
    const newEnrollment: Enrollment = {
      id: `enrollment-${Date.now()}`,
      participantId,
      lessonId,
      enrollmentDate: new Date().toISOString(),
      status: "enrolled",
      paymentStatus: "pending",
      notes,
    };

    // Add to lesson's enrollments
    if (!lesson._enrollments_data) lesson._enrollments_data = [];
    lesson._enrollments_data.push(newEnrollment);

    // Update lesson
    await this.updateLesson(lessonId, {
      _enrollments_data: lesson._enrollments_data,
    });

    return newEnrollment;
  }

  async unenrollParticipant(
    lessonId: string,
    participantId: string
  ): Promise<void> {
    await this.initialize();

    const lesson = await this.getLesson(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    if (!lesson._enrollments_data)
      throw new Error("No enrollments found for this lesson");

    // Remove enrollment
    lesson._enrollments_data = lesson._enrollments_data.filter(
      (e) => e.participantId !== participantId
    );

    // Update lesson
    await this.updateLesson(lessonId, {
      _enrollments_data: lesson._enrollments_data,
    });
  }

  async getEnrollmentsForLesson(lessonId: string): Promise<Enrollment[]> {
    const lesson = await this.getLesson(lessonId);
    return lesson?._enrollments_data || [];
  }

  async getEnrollmentsForParticipant(
    participantId: string
  ): Promise<{ lesson: Lesson; enrollment: Enrollment }[]> {
    const lessons = await this.getAllLessons();
    const enrollments: { lesson: Lesson; enrollment: Enrollment }[] = [];

    for (const lesson of lessons) {
      if (lesson._enrollments_data) {
        const participantEnrollments = lesson._enrollments_data.filter(
          (e) => e.participantId === participantId
        );
        for (const enrollment of participantEnrollments) {
          enrollments.push({ lesson, enrollment });
        }
      }
    }

    return enrollments;
  }

  async updateEnrollmentStatus(
    lessonId: string,
    participantId: string,
    status: Enrollment["status"]
  ): Promise<void> {
    const lesson = await this.getLesson(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    if (!lesson._enrollments_data)
      throw new Error("No enrollments found for this lesson");

    const enrollment = lesson._enrollments_data.find(
      (e) => e.participantId === participantId
    );
    if (!enrollment) throw new Error("Enrollment not found");

    enrollment.status = status;

    await this.updateLesson(lessonId, {
      _enrollments_data: lesson._enrollments_data,
    });
  }

  async updateEnrollmentPaymentStatus(
    lessonId: string,
    participantId: string,
    paymentStatus: Enrollment["paymentStatus"]
  ): Promise<void> {
    const lesson = await this.getLesson(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    if (!lesson._enrollments_data)
      throw new Error("No enrollments found for this lesson");

    const enrollment = lesson._enrollments_data.find(
      (e) => e.participantId === participantId
    );
    if (!enrollment) throw new Error("Enrollment not found");

    enrollment.paymentStatus = paymentStatus;

    await this.updateLesson(lessonId, {
      _enrollments_data: lesson._enrollments_data,
    });
  }

  // Utility methods
  async getParticipantFullName(participantId: string): Promise<string> {
    const participant = await this.getParticipant(participantId);
    if (!participant) return "Unknown Participant";
    return `${participant.firstName} ${participant.lastName}`;
  }

  async getLessonWithEnrolledParticipants(
    lessonId: string
  ): Promise<{ lesson: Lesson; participants: Participant[] } | null> {
    const lesson = await this.getLesson(lessonId);
    if (!lesson) return null;

    const participants: Participant[] = [];
    if (lesson._enrollments_data) {
      for (const enrollment of lesson._enrollments_data) {
        const participant = await this.getParticipant(enrollment.participantId);
        if (participant) {
          participants.push(participant);
        }
      }
    }

    return { lesson, participants };
  }
}

// Export singleton instance
const cosmosService = new CosmosService();
export default cosmosService;
