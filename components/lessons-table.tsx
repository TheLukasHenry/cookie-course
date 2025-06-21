"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  RefreshCw,
  Calendar,
  Clock,
  Users,
  DollarSign,
  MapPin,
  User,
  Trash2,
  AlertCircle,
} from "lucide-react";
import LessonForm from "./lesson-form";

interface Lesson {
  id: string;
  title: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  duration: number;
  maxParticipants: number;
  price: number;
  ingredients?: string[];
  equipment?: string[];
  techniques?: string[];
  dateTime: string;
  location?: string;
  instructor?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  _enrollments_data?: any[];
}

interface ApiResponse {
  success: boolean;
  data?: Lesson[];
  error?: string;
  details?: string;
  count?: number;
}

export default function LessonsTable() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/lessons");
      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setLessons(result.data);
      } else {
        setError(result.error || "Failed to fetch lessons");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    try {
      setDeletingId(lessonId);

      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Remove the lesson from the local state
        setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
      } else {
        setError(result.error || "Failed to delete lesson");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);
      return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    } catch {
      return { date: "Invalid Date", time: "" };
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  const getCurrentEnrollments = (lesson: Lesson) => {
    return (
      lesson._enrollments_data?.filter(
        (enrollment) => enrollment.status === "enrolled"
      ).length || 0
    );
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading lessons...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
            <Button onClick={fetchLessons} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Baking Lessons
            </CardTitle>
            <CardDescription>
              Manage your baking lessons, schedules, and participants
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={fetchLessons} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <LessonForm onSuccess={fetchLessons} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {lessons.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No lessons yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first baking lesson to get started with your cooking
              course.
            </p>
            <LessonForm onSuccess={fetchLessons} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lesson Details</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Skill Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => {
                    const dateTime = formatDateTime(lesson.dateTime);
                    const currentEnrollments = getCurrentEnrollments(lesson);

                    return (
                      <TableRow key={lesson.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {lesson.description}
                            </div>
                            {lesson.instructor && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                {lesson.instructor}
                              </div>
                            )}
                            {lesson.location && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {lesson.location}
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {dateTime.date}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {dateTime.time} ({formatDuration(lesson.duration)}
                              )
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {currentEnrollments}/{lesson.maxParticipants}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getSkillLevelColor(lesson.skillLevel)}
                          >
                            {lesson.skillLevel}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(lesson.status)}
                          >
                            {lesson.status}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{lesson.price}</span>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <LessonForm
                              lesson={lesson}
                              onSuccess={fetchLessons}
                              triggerText="Edit"
                              triggerVariant="outline"
                            />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  disabled={deletingId === lesson.id}
                                >
                                  {deletingId === lesson.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Lesson
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {lesson.title}"?
                                    {currentEnrollments > 0 && (
                                      <span className="text-destructive">
                                        {" "}
                                        This lesson has {
                                          currentEnrollments
                                        }{" "}
                                        active enrollment(s).
                                      </span>
                                    )}{" "}
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(lesson.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete Lesson
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
