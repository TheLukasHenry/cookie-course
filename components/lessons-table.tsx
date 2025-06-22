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
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            <span className="text-white">Loading lessons...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-2xl">
        <div className="py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
            <Button
              onClick={fetchLessons}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              Baking Lessons
            </h3>
            <p className="text-white/70 mt-2">
              Manage your baking lessons, schedules, and participants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={fetchLessons}
              className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 text-white border border-white/20"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <LessonForm onSuccess={fetchLessons} />
          </div>
        </div>
      </div>

      <div className="p-6">
        {lessons.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-amber-400/70 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">
              No lessons yet
            </h3>
            <p className="text-white/70 mb-4">
              Create your first baking lesson to get started with your cooking
              course.
            </p>
            <LessonForm onSuccess={fetchLessons} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">
                Showing {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="border border-white/20 rounded-lg overflow-hidden backdrop-blur-sm bg-white/5">
              <Table className="text-white/90 w-full table-fixed">
                <colgroup>
                  <col className="w-[30%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[15%]" />
                </colgroup>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/90 font-semibold">
                      Lesson Details
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">
                      Schedule
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">
                      Participants
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">
                      Skill Level
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">
                      Price
                    </TableHead>
                    <TableHead className="text-right text-white/90 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => {
                    const dateTime = formatDateTime(lesson.dateTime);
                    const currentEnrollments = getCurrentEnrollments(lesson);

                    return (
                      <TableRow
                        key={lesson.id}
                        className="border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="p-3">
                          <div className="space-y-1 min-w-0">
                            <div
                              className="font-medium text-white truncate"
                              title={lesson.title}
                            >
                              {lesson.title}
                            </div>
                            <div
                              className="text-sm text-white/70 line-clamp-2 break-words"
                              title={lesson.description}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: "1.3",
                                maxHeight: "2.6em",
                              }}
                            >
                              {lesson.description}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              {lesson.instructor && (
                                <div className="flex items-center gap-1 text-xs text-white/60 truncate">
                                  <User className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {lesson.instructor}
                                  </span>
                                </div>
                              )}
                              {lesson.location && (
                                <div className="flex items-center gap-1 text-xs text-white/60 truncate">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {lesson.location}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="p-3">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1 text-sm text-white/80">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{dateTime.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-white/60">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {dateTime.time} (
                                {formatDuration(lesson.duration)})
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="p-3">
                          <div className="flex items-center gap-1 min-w-0">
                            <Users className="h-3 w-3 text-white/60 flex-shrink-0" />
                            <span className="text-sm text-white/80 truncate">
                              {currentEnrollments}/{lesson.maxParticipants}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="p-3">
                          <Badge
                            variant="outline"
                            className={`${getSkillLevelColor(
                              lesson.skillLevel
                            )} truncate max-w-full`}
                          >
                            {lesson.skillLevel}
                          </Badge>
                        </TableCell>

                        <TableCell className="p-3">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(
                              lesson.status
                            )} truncate max-w-full`}
                          >
                            {lesson.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="p-3">
                          <div className="flex items-center gap-1 min-w-0">
                            <DollarSign className="h-3 w-3 text-white/60 flex-shrink-0" />
                            <span className="text-sm text-white/80 truncate">
                              ${lesson.price}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-right p-3">
                          <div className="flex items-center justify-end gap-1 min-w-0">
                            <LessonForm
                              lesson={lesson}
                              onSuccess={fetchLessons}
                              triggerText=""
                              triggerVariant="outline"
                              triggerClassName="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white p-2 min-w-0"
                            />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-white/10 border-white/20 text-white hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/50 p-2 min-w-0"
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
      </div>
    </div>
  );
}
