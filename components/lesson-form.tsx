"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Plus, Edit } from "lucide-react";

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
}

interface LessonFormProps {
  lesson?: Lesson;
  onSuccess?: () => void;
  triggerText?: string;
  triggerVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export default function LessonForm({
  lesson,
  onSuccess,
  triggerText,
  triggerVariant = "default",
}: LessonFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    skillLevel: lesson?.skillLevel || ("beginner" as const),
    duration: lesson?.duration || 120,
    maxParticipants: lesson?.maxParticipants || 8,
    price: lesson?.price || 0,
    dateTime: lesson?.dateTime
      ? new Date(lesson.dateTime).toISOString().slice(0, 16)
      : "",
    location: lesson?.location || "",
    instructor: lesson?.instructor || "",
    ingredients: lesson?.ingredients?.join(", ") || "",
    equipment: lesson?.equipment?.join(", ") || "",
    techniques: lesson?.techniques?.join(", ") || "",
    status: lesson?.status || ("scheduled" as const),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare the lesson data
      const lessonData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        skillLevel: formData.skillLevel,
        duration: formData.duration,
        maxParticipants: formData.maxParticipants,
        price: formData.price,
        dateTime: new Date(formData.dateTime).toISOString(),
        location: formData.location.trim(),
        instructor: formData.instructor.trim(),
        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        equipment: formData.equipment
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        techniques: formData.techniques
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        status: formData.status,
      };

      const url = lesson ? `/api/lessons/${lesson.id}` : "/api/lessons";
      const method = lesson ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(
          lesson
            ? "Lesson updated successfully!"
            : "Lesson created successfully!"
        );

        if (!lesson) {
          // Reset form for new lesson creation
          setFormData({
            title: "",
            description: "",
            skillLevel: "beginner",
            duration: 120,
            maxParticipants: 8,
            price: 0,
            dateTime: "",
            location: "",
            instructor: "",
            ingredients: "",
            equipment: "",
            techniques: "",
            status: "scheduled",
          });
        }

        // Close dialog and trigger refresh after a brief delay
        setTimeout(() => {
          if (onSuccess) onSuccess();
          setOpen(false);
          setSuccess(null);
        }, 1500);
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className="gap-2">
          {lesson ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {triggerText || (lesson ? "Edit Lesson" : "Add New Lesson")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {lesson ? (
              <Edit className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {lesson ? "Edit Lesson" : "Create New Lesson"}
          </DialogTitle>
          <DialogDescription>
            {lesson
              ? "Update the lesson information below."
              : "Fill in the lesson details to create a new baking lesson."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Essential lesson details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g., Chocolate Chip Cookies"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleChange("instructor", e.target.value)}
                    placeholder="e.g., Chef Sarah"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe what participants will learn in this lesson..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skillLevel">Skill Level *</Label>
                  <select
                    id="skillLevel"
                    value={formData.skillLevel}
                    onChange={(e) => handleChange("skillLevel", e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scheduling & Logistics</CardTitle>
              <CardDescription>
                When and where the lesson takes place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateTime">Date & Time *</Label>
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => handleChange("dateTime", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g., Kitchen Studio A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="30"
                    max="480"
                    value={formData.duration}
                    onChange={(e) =>
                      handleChange("duration", parseInt(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxParticipants}
                    onChange={(e) =>
                      handleChange("maxParticipants", parseInt(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      handleChange("price", parseFloat(e.target.value))
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Content</CardTitle>
              <CardDescription>
                What participants will work with and learn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={(e) => handleChange("ingredients", e.target.value)}
                  placeholder="flour, sugar, butter, chocolate chips, eggs (separate with commas)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment</Label>
                <Textarea
                  id="equipment"
                  value={formData.equipment}
                  onChange={(e) => handleChange("equipment", e.target.value)}
                  placeholder="mixing bowls, measuring cups, oven, cookie sheets (separate with commas)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techniques">Techniques Covered</Label>
                <Textarea
                  id="techniques"
                  value={formData.techniques}
                  onChange={(e) => handleChange("techniques", e.target.value)}
                  placeholder="creaming, folding, baking, decorating (separate with commas)"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : lesson
                ? "Update Lesson"
                : "Create Lesson"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
