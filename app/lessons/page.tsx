import LessonsTable from "@/components/lessons-table";

export const metadata = {
  title: "Lessons | Cookie Course",
  description: "All lessons available in Cookie Course."
};

export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <LessonsTable />
      </div>
    </main>
  );
}