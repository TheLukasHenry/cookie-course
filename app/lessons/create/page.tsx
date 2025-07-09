import { Metadata } from "next";
import CreateLessonForm from "@/components/form/CreateLessonForm";

export const metadata: Metadata = {
  title: "Create New Lesson | Cookie Course",
  description: "Create and schedule a new cooking lesson for participants",
};

export default function CreateLessonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto py-8">
        <CreateLessonForm />
      </div>
    </div>
  );
}
