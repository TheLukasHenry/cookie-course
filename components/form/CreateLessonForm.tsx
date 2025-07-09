"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Plus,
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  DollarSign,
  Utensils,
  Wrench,
} from "lucide-react";
import { createLesson } from "@/lib/lesson-actions";
import { type FormState } from "@/lib/lesson-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Submit button component that uses useFormStatus for pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="px-8 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
    >
      {pending ? "Creating Lesson..." : "Create Lesson"}
    </Button>
  );
}

// Dynamic array input component for ingredients, equipment, and techniques
function ArrayInput({
  name,
  label,
  icon: Icon,
  placeholder,
  errors,
}: {
  name: string;
  label: string;
  icon: any;
  placeholder: string;
  errors?: string[];
}) {
  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;

    const container = form.querySelector(`[data-array="${name}"]`);
    if (!container) return;

    const newInput = document.createElement("div");
    newInput.className = "flex gap-2 items-center";
    newInput.innerHTML = `
      <input
        type="text"
        name="${name}"
        placeholder="${placeholder}"
        class="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button type="button" class="remove-item inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `;

    const removeBtn = newInput.querySelector(".remove-item");
    removeBtn?.addEventListener("click", () => newInput.remove());

    container.appendChild(newInput);
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Label>
      <div data-array={name} className="space-y-2">
        <div className="flex gap-2 items-center">
          <Input
            name={name}
            placeholder={placeholder}
            className="flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {errors && errors.length > 0 && (
        <div className="text-sm text-destructive space-y-1">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export default function CreateLessonForm() {
  const [state, formAction, isPending] = useActionState(
    createLesson,
    initialState
  );
  const [defaultDateTime, setDefaultDateTime] = useState("");

  // Format datetime for input (HTML datetime-local format)
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Set default date only on client to avoid hydration mismatch
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    setDefaultDateTime(formatDateTimeLocal(tomorrow));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Lesson</h1>
        <p className="text-muted-foreground">
          Design and schedule a new cooking lesson for participants
        </p>
      </div>

      {state?.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Core details about your cooking lesson
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Italian Pasta Making Basics"
                  required
                />
                {state?.errors?.title && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.title.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select name="skillLevel" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Beginner</Badge>
                        <span>Perfect for first-timers</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="intermediate">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Intermediate</Badge>
                        <span>Some cooking experience</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="advanced">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Advanced</Badge>
                        <span>Experienced home cooks</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.skillLevel && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.skillLevel.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what participants will learn in this lesson..."
                rows={4}
                required
              />
              {state?.errors?.description && (
                <div className="text-sm text-destructive space-y-1">
                  {state.errors.description.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Logistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule & Logistics
            </CardTitle>
            <CardDescription>
              When and where the lesson will take place
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateTime" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date & Time
                </Label>
                <Input
                  id="dateTime"
                  name="dateTime"
                  type="datetime-local"
                  value={defaultDateTime}
                  onChange={(e) => setDefaultDateTime(e.target.value)}
                  required
                />
                {state?.errors?.dateTime && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.dateTime.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="15"
                  max="480"
                  defaultValue="120"
                  required
                />
                {state?.errors?.duration && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.duration.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Main Kitchen, Studio A"
                  required
                />
                {state?.errors?.location && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.location.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Instructor
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  placeholder="e.g., Chef Maria Rodriguez"
                  required
                />
                {state?.errors?.instructor && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.instructor.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="maxParticipants"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Max Participants
                </Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  min="1"
                  max="50"
                  defaultValue="12"
                  required
                />
                {state?.errors?.maxParticipants && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.maxParticipants.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price ($)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="75.00"
                  required
                />
                {state?.errors?.price && (
                  <div className="text-sm text-destructive space-y-1">
                    {state.errors.price.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Lesson Content
            </CardTitle>
            <CardDescription>
              What participants will use and learn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ArrayInput
              name="ingredients"
              label="Ingredients"
              icon={Utensils}
              placeholder="e.g., Fresh basil, San Marzano tomatoes"
              errors={state?.errors?.ingredients}
            />

            <ArrayInput
              name="equipment"
              label="Equipment & Tools"
              icon={Wrench}
              placeholder="e.g., Stand mixer, Rolling pin"
              errors={state?.errors?.equipment}
            />

            <ArrayInput
              name="techniques"
              label="Techniques Taught"
              icon={BookOpen}
              placeholder="e.g., Knife skills, Sauce emulsification"
              errors={state?.errors?.techniques}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
