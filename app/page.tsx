"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ParticipantForm from "@/components/participant-form";
import ParticipantsTable from "@/components/participants-table";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleParticipantCreated = () => {
    // Refresh the participants table
    setRefreshTrigger((prev) => prev + 1);
    // Hide the form
    setShowForm(false);
  };

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
          {/* Toggle Form Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Participants Management</h2>
            <Button
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "default"}
            >
              {showForm ? "Cancel" : "Add New Participant"}
            </Button>
          </div>

          {/* Participant Form */}
          {showForm && (
            <div className="flex justify-center">
              <ParticipantForm onSuccess={handleParticipantCreated} />
            </div>
          )}

          {/* Participants Table */}
          <ParticipantsTable refreshTrigger={refreshTrigger} />
        </div>

        {/* Setup Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui Test</CardTitle>
              <CardDescription>
                Testing that components are working properly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input">Test Input</Label>
                <Input id="test-input" placeholder="Type something..." />
              </div>
              <Button className="w-full" variant="outline">
                Test Button
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Status</CardTitle>
              <CardDescription>Implementation Progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Next.js 15 with TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Tailwind CSS v4</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">shadcn/ui Components</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Cosmos DB Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Participant Management</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Current Capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Create Participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">View Participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Form Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Error Handling</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500">🔄</span>
                <span className="text-sm">Lesson Management</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Server running on{" "}
            <code className="bg-muted px-2 py-1 rounded">localhost:3000</code>
          </p>
        </div>
      </div>
    </div>
  );
}
