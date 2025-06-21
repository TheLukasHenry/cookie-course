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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  UserCheck,
  UserX,
} from "lucide-react";

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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  allergies: string;
  dietaryRestrictions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  isActive: boolean;
}

interface ParticipantFormProps {
  isEdit?: boolean;
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  submitMessage?: { type: "success" | "error"; text: string } | null;
}

// Extracted ParticipantForm component to prevent re-creation on each render
function ParticipantForm({
  isEdit = false,
  formData,
  onInputChange,
  submitMessage,
}: ParticipantFormProps) {
  return (
    <div className="grid gap-4 py-4">
      {submitMessage && (
        <div
          className={`p-3 rounded-md border ${
            submitMessage.type === "success"
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-medium">Basic Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => onInputChange("age", e.target.value)}
              placeholder="Enter age"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            value={formData.allergies}
            onChange={(e) => onInputChange("allergies", e.target.value)}
            placeholder="Enter allergies separated by commas"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
          <Textarea
            id="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={(e) =>
              onInputChange("dietaryRestrictions", e.target.value)
            }
            placeholder="Enter dietary restrictions separated by commas"
            rows={2}
          />
        </div>

        <h4 className="font-medium pt-4">Emergency Contact</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Contact Name</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) =>
                onInputChange("emergencyContactName", e.target.value)
              }
              placeholder="Emergency contact name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                onInputChange("emergencyContactPhone", e.target.value)
              }
              placeholder="Emergency contact phone"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContactRelationship">Relationship</Label>
          <Input
            id="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={(e) =>
              onInputChange("emergencyContactRelationship", e.target.value)
            }
            placeholder="Relationship to participant"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              onInputChange("isActive", checked as boolean)
            }
          />
          <Label htmlFor="isActive">Active participant</Label>
        </div>
      </div>
    </div>
  );
}

export default function ParticipantsTable() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] =
    useState<keyof Participant>("registrationDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    allergies: "",
    dietaryRestrictions: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      allergies: "",
      dietaryRestrictions: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      isActive: true,
    });
    setSubmitMessage(null);
  };

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
  }, []);

  // Filter and sort participants
  useEffect(() => {
    let filtered = participants.filter((participant) => {
      const matchesSearch =
        participant.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && participant.isActive) ||
        (statusFilter === "inactive" && !participant.isActive);

      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortDirection === "asc" ? 1 : -1;
      if (bValue === undefined) return sortDirection === "asc" ? -1 : 1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredParticipants(filtered);
    setCurrentPage(1);
  }, [participants, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: keyof Participant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    // Special handling for age field to prevent NaN values
    if (field === "age" && typeof value === "string") {
      // Only allow numeric input for age, or empty string
      if (value !== "" && (isNaN(Number(value)) || Number(value) < 0)) {
        return; // Don't update if invalid
      }
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  const handleSubmit = async (isEdit: boolean = false) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        age:
          formData.age && !isNaN(parseInt(formData.age))
            ? parseInt(formData.age)
            : undefined,
        allergies: formData.allergies
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        dietaryRestrictions: formData.dietaryRestrictions
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        emergencyContact:
          formData.emergencyContactName || formData.emergencyContactPhone
            ? {
                name: formData.emergencyContactName,
                phone: formData.emergencyContactPhone,
                relationship: formData.emergencyContactRelationship,
              }
            : undefined,
        isActive: formData.isActive,
      };

      const url =
        isEdit && editingParticipant
          ? `/api/participants/${editingParticipant.id}`
          : "/api/participants";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: `Participant ${isEdit ? "updated" : "created"} successfully!`,
        });

        resetForm();
        fetchParticipants();

        setTimeout(() => {
          if (isEdit) {
            setIsEditDialogOpen(false);
            setEditingParticipant(null);
          } else {
            setIsCreateDialogOpen(false);
          }
        }, 1500);
      } else {
        setSubmitMessage({
          type: "error",
          text:
            result.details ||
            `Failed to ${isEdit ? "update" : "create"} participant`,
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
    setFormData({
      firstName: participant.firstName,
      lastName: participant.lastName,
      email: participant.email,
      phone: participant.phone || "",
      age:
        participant.age && !isNaN(participant.age)
          ? participant.age.toString()
          : "",
      allergies: participant.allergies?.join(", ") || "",
      dietaryRestrictions: participant.dietaryRestrictions?.join(", ") || "",
      emergencyContactName: participant.emergencyContact?.name || "",
      emergencyContactPhone: participant.emergencyContact?.phone || "",
      emergencyContactRelationship:
        participant.emergencyContact?.relationship || "",
      isActive: participant.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/participants/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        fetchParticipants();
        setSelectedParticipants((prev) =>
          prev.filter((selectedId) => selectedId !== id)
        );
      } else {
        setError(result.details || "Failed to delete participant");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  const handleBulkStatusChange = async (status: boolean) => {
    try {
      const promises = selectedParticipants.map((id) =>
        fetch(`/api/participants/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: status }),
        })
      );

      await Promise.all(promises);
      fetchParticipants();
      setSelectedParticipants([]);
    } catch (error) {
      setError("Failed to update participants");
    }
  };

  const toggleParticipantSelection = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAllParticipants = () => {
    if (selectedParticipants.length === paginatedParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(paginatedParticipants.map((p) => p.id));
    }
  };

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
          <CardTitle>Participants Management</CardTitle>
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
          <CardTitle>Participants Management</CardTitle>
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
        <CardTitle>Participants Management ({participants.length})</CardTitle>
        <CardDescription>
          Manage participants registered for baking lessons
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {selectedParticipants.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusChange(true)}
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Activate ({selectedParticipants.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusChange(false)}
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Deactivate ({selectedParticipants.length})
                </Button>
              </>
            )}

            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Participant</DialogTitle>
                  <DialogDescription>
                    Fill in the participant's information to register them for
                    baking lessons.
                  </DialogDescription>
                </DialogHeader>
                <ParticipantForm
                  isEdit={false}
                  formData={formData}
                  onInputChange={handleInputChange}
                  submitMessage={submitMessage}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Participant"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Participants Table */}
        {filteredParticipants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "No participants match your search criteria."
                : "No participants registered yet."}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <p className="text-sm text-muted-foreground">
                Add your first participant using the button above.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedParticipants.length ===
                            paginatedParticipants.length &&
                          paginatedParticipants.length > 0
                        }
                        onCheckedChange={selectAllParticipants}
                      />
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("firstName")}
                    >
                      Name{" "}
                      {sortField === "firstName" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sortField === "email" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("age")}
                    >
                      Age{" "}
                      {sortField === "age" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Allergies/Dietary</TableHead>
                    <TableHead>Emergency Contact</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("registrationDate")}
                    >
                      Registration{" "}
                      {sortField === "registrationDate" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("isActive")}
                    >
                      Status{" "}
                      {sortField === "isActive" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedParticipants.includes(
                            participant.id
                          )}
                          onCheckedChange={() =>
                            toggleParticipantSelection(participant.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {participant.firstName} {participant.lastName}
                      </TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        {participant.phone || "Not provided"}
                      </TableCell>
                      <TableCell>{formatAge(participant.age)}</TableCell>
                      <TableCell className="max-w-32">
                        <div className="space-y-1">
                          {participant.allergies &&
                            participant.allergies.length > 0 && (
                              <div className="text-xs">
                                <span className="font-medium">Allergies:</span>{" "}
                                {formatArrayField(participant.allergies)}
                              </div>
                            )}
                          {participant.dietaryRestrictions &&
                            participant.dietaryRestrictions.length > 0 && (
                              <div className="text-xs">
                                <span className="font-medium">Dietary:</span>{" "}
                                {formatArrayField(
                                  participant.dietaryRestrictions
                                )}
                              </div>
                            )}
                          {(!participant.allergies ||
                            participant.allergies.length === 0) &&
                            (!participant.dietaryRestrictions ||
                              participant.dietaryRestrictions.length === 0) && (
                              <span className="text-muted-foreground text-xs">
                                None
                              </span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {participant.emergencyContact ? (
                          <div className="text-xs space-y-1">
                            <div className="font-medium">
                              {participant.emergencyContact.name}
                            </div>
                            <div className="text-muted-foreground">
                              {participant.emergencyContact.phone}
                            </div>
                            <div className="text-muted-foreground">
                              {participant.emergencyContact.relationship}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Not provided
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDate(participant.registrationDate)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            participant.isActive ? "default" : "secondary"
                          }
                        >
                          {participant.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(participant)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Participant
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete{" "}
                                  {participant.firstName} {participant.lastName}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(participant.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredParticipants.length
                  )}{" "}
                  of {filteredParticipants.length} participants
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Participant</DialogTitle>
              <DialogDescription>
                Update the participant's information.
              </DialogDescription>
            </DialogHeader>
            <ParticipantForm
              isEdit={true}
              formData={formData}
              onInputChange={handleInputChange}
              submitMessage={submitMessage}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingParticipant(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Participant"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
