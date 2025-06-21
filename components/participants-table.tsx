"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Participant {
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

interface ParticipantsTableProps {
  refreshTrigger?: number;
}

export default function ParticipantsTable({
  refreshTrigger,
}: ParticipantsTableProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/participants");
      const result = await response.json();

      if (result.success) {
        setParticipants(result.data);
      } else {
        setError(result.details || "Failed to fetch participants");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAge = (age?: number) => {
    return age ? `${age} years` : "Not specified";
  };

  const formatArrayField = (items?: string[]) => {
    if (!items || items.length === 0) return "None";
    return items.join(", ");
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>Loading participant data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>Error loading participants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
            <Button onClick={fetchParticipants} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants ({participants.length})</CardTitle>
        <CardDescription>
          Manage participants registered for baking lessons
        </CardDescription>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No participants registered yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Add your first participant using the form above.
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Allergies</TableHead>
                  <TableHead>Dietary Restrictions</TableHead>
                  <TableHead>Emergency Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      {participant.firstName} {participant.lastName}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.phone || "Not provided"}</TableCell>
                    <TableCell>{formatAge(participant.age)}</TableCell>
                    <TableCell
                      className="max-w-32 truncate"
                      title={formatArrayField(participant.allergies)}
                    >
                      {formatArrayField(participant.allergies)}
                    </TableCell>
                    <TableCell
                      className="max-w-32 truncate"
                      title={formatArrayField(participant.dietaryRestrictions)}
                    >
                      {formatArrayField(participant.dietaryRestrictions)}
                    </TableCell>
                    <TableCell>
                      {participant.emergencyContact ? (
                        <div className="text-sm">
                          <div className="font-medium">
                            {participant.emergencyContact.name}
                          </div>
                          <div className="text-muted-foreground">
                            {participant.emergencyContact.phone}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {participant.emergencyContact.relationship}
                          </div>
                        </div>
                      ) : (
                        "Not provided"
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(participant.registrationDate)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          participant.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {participant.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
