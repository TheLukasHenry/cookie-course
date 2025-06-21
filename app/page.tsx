"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ParticipantsTable from "@/components/participants-table";
import LessonsTable from "@/components/lessons-table";

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "participants" | "lessons" | null
  >(null);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Cookie Course Management
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage participants for your baking lessons
          </p>
        </div>

        {/* Participants Management Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Participants Management</h2>
          <div className="flex gap-4">
            <Button
              onClick={() =>
                setActiveSection(
                  activeSection === "participants" ? null : "participants"
                )
              }
              variant={activeSection === "participants" ? "default" : "outline"}
            >
              {activeSection === "participants"
                ? "Hide Participants"
                : "Show Participants"}
            </Button>
          </div>
          {activeSection === "participants" && <ParticipantsTable />}
        </div>

        {/* Lessons Management Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Lessons Management</h2>
          <div className="flex gap-4">
            <Button
              onClick={() =>
                setActiveSection(activeSection === "lessons" ? null : "lessons")
              }
              variant={activeSection === "lessons" ? "default" : "outline"}
            >
              {activeSection === "lessons" ? "Hide Lessons" : "Show Lessons"}
            </Button>
          </div>
          {activeSection === "lessons" && <LessonsTable />}
        </div>
      </div>
    </div>
  );
}
