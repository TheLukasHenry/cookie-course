import { Metadata } from "next";
import { notFound } from "next/navigation";
import cosmosService from "@/lib/cosmos";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  DollarSign,
  Utensils,
  Wrench,
  BookOpen,
  ChefHat,
} from "lucide-react";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const lesson = await cosmosService.getLesson(id);

    if (!lesson) {
      return {
        title: "Lesson Not Found | Cookie Course",
        description: "The requested cooking lesson could not be found.",
      };
    }

    return {
      title: `${lesson.title} | Cookie Course`,
      description: lesson.description,
    };
  } catch (error) {
    return {
      title: "Lesson Not Found | Cookie Course",
      description: "The requested cooking lesson could not be found.",
    };
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  let lesson;

  try {
    const { id } = await params;
    lesson = await cosmosService.getLesson(id);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    notFound();
  }

  if (!lesson) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              <Badge className={getStatusColor(lesson.status)}>
                {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
              </Badge>
              <Badge className={getSkillLevelColor(lesson.skillLevel)}>
                {lesson.skillLevel.charAt(0).toUpperCase() +
                  lesson.skillLevel.slice(1)}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {lesson.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Lesson Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Schedule & Logistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Date & Time</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(lesson.dateTime)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDuration(lesson.duration)}
                        </div>
                      </div>
                    </div>
                    {lesson.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.location}
                          </div>
                        </div>
                      </div>
                    )}
                    {lesson.instructor && (
                      <div className="flex items-center gap-3">
                        <ChefHat className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Instructor</div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.instructor}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    What You&apos;ll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lesson.ingredients && lesson.ingredients.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="secondary">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {lesson.equipment && lesson.equipment.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        Equipment & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.equipment.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {lesson.techniques && lesson.techniques.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Techniques Taught
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.techniques.map((technique, index) => (
                          <Badge key={index} variant="secondary">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Class Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-2xl font-bold">{lesson.price}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Max Participants
                    </span>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">
                        {lesson.maxParticipants}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Skill Level
                    </span>
                    <Badge className={getSkillLevelColor(lesson.skillLevel)}>
                      {lesson.skillLevel.charAt(0).toUpperCase() +
                        lesson.skillLevel.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{" "}
                    {new Date(lesson.updatedAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Lesson ID:</span> {lesson.id}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
