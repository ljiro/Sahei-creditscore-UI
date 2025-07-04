"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Eye,
  Search,
  ArrowUpDown,
  ChevronDown,
  Trash2,
  User,
  Info,
  BadgeInfo,
  Calendar,
  Phone,
  Home,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Wallet,
  CreditCard,
  BarChart2,
  FileText,
  Edit2,
  UserPlus2,
  Save,
} from "lucide-react";

import HybridWebView from "../hybridwebview/HybridWebView.js";

const initialMembers: Member[] = [
  {
    memberId: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    fullName: "Juan Dela Cruz",
    gender: "Male",
    dateOfBirth: "1985-05-15",
    contact: "09123456789",
    address: "123 Main St, Manila",
    email: "juandelacruz@example.com",
    educationLevel: "Bachelor's Degree",
    civilStatus: "Married",
    dependents: 2,
    industry: "Information Technology",
    monthlyIncome: 75000,
    savingsBalance: 150000,
    monthlyExpenses: 35000,
    membershipStatus: "Active",
    loans: [
      {
        id: "LN001",
        type: "Personal Loan",
        purpose: "Home Renovation",
        amount: 50000,
        applicationDate: "2025-05-15",
        duration: "12 months",
        validatedBy: "Maria Santos",
        status: "Approved",
      },
    ],
    creditScore: 85,
    membershipDate: "2023-01-10",
  },
  {
    memberId: 3,
    firstName: "Maria",
    lastName: "Santos",
    fullName: "Maria Santos",
    email: "mariasantos@example.com",
    gender: "Female",
    dateOfBirth: "1990-08-22",
    contact: "09234567890",
    address: "456 Oak Ave, Quezon City",
    educationLevel: "Master's Degree",
    civilStatus: "Single",
    dependents: 0,
    industry: "Business Owner",
    monthlyIncome: 120000,
    savingsBalance: 350000,
    monthlyExpenses: 45000,
    membershipStatus: "Active",
    loans: [
      {
        id: "LN002",
        type: "Business Loan",
        purpose: "Capital Expansion",
        amount: 150000,
        applicationDate: "2025-05-20",
        duration: "24 months",
        validatedBy: "Juan Dela Cruz",
        status: "Approved",
      },
    ],
    creditScore: 92,
    membershipDate: "2022-11-05",
  },
];

interface Member {
  memberId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  gender?: string;
  dateOfBirth?: string;
  educationLevel?: string;
  civilStatus?: string;
  membershipDate?: string;
  membershipStatus: string;
  fullName: string;
  email?: string;
  contact?: string;
  address?: string;
  dependents?: number;
  industry?: string;
  monthlyIncome?: number;
  savingsBalance?: number;
  monthlyExpenses?: number;
  creditScore?: number;
  loans?: Array<{
    id: string;
    type: string;
    purpose: string;
    amount: number;
    applicationDate: string;
    duration: string;
    validatedBy: string;
    status: string;
  }>;
  remarks?: Array<{
    id: string;
    officer: string;
    comment: string;
    date: string;
  }>;
}

const statusConfig = {
  Active: { className: "bg-green-100 text-green-800 border-green-200" },
  Dormant: { className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  Suspended: { className: "bg-orange-100 text-orange-800 border-orange-200" },
  Closed: { className: "bg-gray-200 text-gray-800 border-gray-300" },
};

function AddRemarkDialog({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
}) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSave(comment);
      setComment("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Remark</DialogTitle>
          <DialogDescription>
            Add a comment or note about this client for future reference.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Remark</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your remark here..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Remark
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ClientDetailsPanel({
  client,
  onClose,
  onAddRemark,
  onEdit,
  onDelete,
}: {
  client: Member;
  onClose: () => void;
  onAddRemark: (comment: string) => void;
  onEdit: (client: Member) => void;
  onDelete: (clientId: number) => void;
}) {
  const [isAddRemarkOpen, setIsAddRemarkOpen] = useState(false);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="h-6 w-6" />
                {client.fullName}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Comprehensive member profile and financial history
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-8 py-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Member Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-50">
                    <BadgeInfo className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-800">{client.gender || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-50">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium text-gray-800">
                      {client.dateOfBirth
                        ? new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear() + " years"
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-50">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-gray-800">{client.contact || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-50">
                    <Home className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800 line-clamp-1">{client.address || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-500" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Education</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{client.educationLevel || "N/A"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Marital Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <HeartPulse className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{client.civilStatus || "N/A"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Dependents</Label>
                    <p className="text-gray-800">{client.dependents || 0}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Industry</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{client.industry || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-emerald-500" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Monthly Income</Label>
                    <p className="text-gray-800 font-medium">
                      ₱{(client.monthlyIncome || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Monthly Expenses</Label>
                    <p className="text-gray-800 font-medium">
                      ₱{(client.monthlyExpenses || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Savings Balance</Label>
                    <p className="text-gray-800 font-medium">
                      ₱{(client.savingsBalance || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Credit Score</Label>
                    <div className="flex items-center gap-2">
                      <BarChart2
                        className={`h-4 w-4 ${
                          (client.creditScore || 0) >= 85
                            ? "text-green-500"
                            : (client.creditScore || 0) >= 70
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          (client.creditScore || 0) >= 85
                            ? "text-green-600"
                            : (client.creditScore || 0) >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {client.creditScore || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-500" />
                Loan History ({(client.loans || []).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(client.loans || []).length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="hover:bg-gray-50">
                        <TableHead className="text-gray-600 font-medium">Loan ID</TableHead>
                        <TableHead className="text-gray-600 font-medium">Type</TableHead>
                        <TableHead className="text-gray-600 font-medium">Purpose</TableHead>
                        <TableHead className="text-gray-600 font-medium">Amount</TableHead>
                        <TableHead className="text-gray-600 font-medium">Date</TableHead>
                        <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(client.loans || []).map((loan) => (
                        <TableRow key={loan.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{loan.id}</TableCell>
                          <TableCell className="text-gray-700">{loan.type}</TableCell>
                          <TableCell className="text-gray-700">{loan.purpose}</TableCell>
                          <TableCell className="text-gray-700 font-medium">
                            ₱{loan.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-500">{loan.applicationDate}</TableCell>
                          <TableCell>
                            <Badge variant={loan.status === "Approved" ? "default" : "destructive"}>
                              {loan.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-10 w-10 text-gray-300 mb-3" />
                  <h4 className="text-gray-500 font-medium">No loan applications</h4>
                  <p className="text-gray-400 text-sm mt-1">This member hasn't applied for any loans yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  Remarks ({(client.remarks || []).length})
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => setIsAddRemarkOpen(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Add Remark
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(client.remarks || []).length > 0 ? (
                <div className="space-y-4">
                  {(client.remarks || []).map((remark) => (
                    <div key={remark.id} className="border-l-4 border-blue-200 pl-4 py-2 bg-gray-50 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{remark.officer}</p>
                          <p className="text-sm text-gray-500">{remark.date}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{remark.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-10 w-10 text-gray-300 mb-3" />
                  <h4 className="text-gray-500 font-medium">No remarks yet</h4>
                  <p className="text-gray-400 text-sm mt-1">Add the first remark for this client</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Member
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the member "{client.fullName}" and all
                    associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(client.memberId)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => onEdit(client)} className="bg-blue-600 hover:bg-blue-700">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Member
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>

      <AddRemarkDialog
        isOpen={isAddRemarkOpen}
        onClose={() => setIsAddRemarkOpen(false)}
        onSave={onAddRemark}
      />
    </Dialog>
  );
}

function ClientFormDialog({
  client,
  isOpen,
  onClose,
  onSave,
  mode,
}: {
  client?: Member;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Member) => void;
  mode: "create" | "edit";
}) {
  const [formData, setFormData] = useState<Partial<Member>>(
    client || {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      contact: "",
      address: "",
      educationLevel: "",
      civilStatus: "",
      dependents: 0,
      industry: "",
      monthlyIncome: 0,
      savingsBalance: 0,
      monthlyExpenses: 0,
      membershipStatus: "Active",
      loans: [],
      creditScore: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMember: Member = {
      ...formData,
      memberId: client?.memberId || Math.floor(Math.random() * 10000),
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      fullName: `${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName} ${
        formData.suffix || ""
      }`.trim(),
      dateOfBirth: formData.dateOfBirth || "",
      civilStatus: formData.civilStatus || "",
      membershipDate: client?.membershipDate || new Date().toISOString().split("T")[0],
      membershipStatus: formData.membershipStatus || "Active",
      loans: client?.loans || [],
      remarks: client?.remarks || [],
    } as Member;

    onSave(newMember);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Register New Member" : `Edit Member - ${client?.fullName}`}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Fill out the details for the new member" : "Update the member information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName || ""}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName || ""}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={formData.middleName || ""}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="suffix">Suffix</Label>
              <Input
                id="suffix"
                value={formData.suffix || ""}
                onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender || ""}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Birthday</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="membershipStatus">Status</Label>
              <Select
                value={formData.membershipStatus || "Active"}
                onValueChange={(value) => setFormData({ ...formData, membershipStatus: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Dormant">Dormant</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="educationLevel">Education</Label>
              <Input
                id="educationLevel"
                value={formData.educationLevel || ""}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="civilStatus">Marital Status</Label>
              <Select
                value={formData.civilStatus || ""}
                onValueChange={(value) => setFormData({ ...formData, civilStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dependents">Dependents</Label>
              <Input
                id="dependents"
                type="number"
                min="0"
                value={formData.dependents || 0}
                onChange={(e) => setFormData({ ...formData, dependents: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry || ""}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income (₱)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                min="0"
                value={formData.monthlyIncome || 0}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Expenses (₱)</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                min="0"
                value={formData.monthlyExpenses || 0}
                onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="savingsBalance">Savings Balance (₱)</Label>
              <Input
                id="savingsBalance"
                type="number"
                min="0"
                value={formData.savingsBalance || 0}
                onChange={(e) => setFormData({ ...formData, savingsBalance: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === "create" ? "Register Member" : "Update Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // HybridWebView integration
useEffect(() => {
  (window as any).globalSetMembers = (dataFromDotNet: any) => {
    console.log("✅ Received data from .NET. Data:", dataFromDotNet);
    
    let membersJson = [];
    if (typeof dataFromDotNet === 'string') {
      try {
        membersJson = JSON.parse(dataFromDotNet);
      } catch (e) {
        console.error("Error parsing JSON string from .NET:", e);
        return;
      }
    } else if (Array.isArray(dataFromDotNet)) {
      membersJson = dataFromDotNet;
    } else {
        console.error("Received data of unexpected type from .NET:", typeof dataFromDotNet);
        return;
    }

    const genderMap = { 0: "Male", 1: "Female", 2: "Other" };
    const educationMap = { 1: "Elementary Undergraduate", 2: "Elementary Graduate", 3: "High School Undergraduate", 4: "High School Graduate", 5: "Vocational", 6: "College Undergraduate", 7: "College Graduate", 8: "Masters Graduate", 9: "Doctorate Graduate", 10: "Other" };
    const civilStatusMap = { 1: "Single", 2: "Married", 3: "Widowed", 4: "Separated", 5: "Divorced" };
    const membershipStatusMap = { 0: "Active", 1: "Inactive", 2: "Closed" }; // Adjusted key for "Active" to 0 based on log

    const mapped = membersJson.map((m: any) => {
      // Safely access nested financial profile
      const profile = m.MemberFinancialProfile || {};

      return {
        memberId: m.MemberId,
        firstName: m.FirstName,
        lastName: m.LastName,
        middleName: m.MiddleName || "",
        suffix: m.Suffix || "",
        fullName: m.FullName || `${m.FirstName || ""} ${m.LastName || ""}`.trim(),
        
        gender: genderMap[m.Gender] || "N/A",
        educationLevel: educationMap[m.EducationLevel] || "N/A",
        civilStatus: civilStatusMap[m.CivilStatus] || "N/A",
        membershipStatus: membershipStatusMap[m.MembershipStatus] || "Unknown",

        dateOfBirth: m.DateOfBirth ? m.DateOfBirth.split("T")[0] : "",
        membershipDate: m.MembershipDate ? m.MembershipDate.split("T")[0] : "",

        // Access nested contact & address info
        contact: m.Contact || "",
        address: m.Address || "",
        
        // Access financial data from profile object
        dependents: m.Dependents || 0,
        industry: m.Industry || "",
        monthlyIncome: m.MonthlyIncome || 0,
        savingsBalance: m.SavingsBalance || 0,
        monthlyExpenses: m.MonthlyExpenses || 0,
        creditScore: m.CreditScore || 0,
        
        // Access loans from the correct property: m.LoanAccounts
        loans: (m.Loans || []).map((loan: any) => ({
          id: loan.id,
          type: loan.type,
          purpose: loan.purpose,
          amount: loan.amount,
          applicationDate: loan.applicationDate,
          duration: loan.duration,
          validatedBy: loan.validatedBy,
          status: loan.status,
        })),

        remarks: m.Remarks || [],
      };
    });

    setMembers(mapped);
  };

  // Ask .NET to load members
  HybridWebView.SendInvokeMessageToDotNet("getMembers");

}, []);

  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortOrder === "asc") return a.fullName.localeCompare(b.fullName);
    if (sortOrder === "desc") return b.fullName.localeCompare(a.fullName);
    return 0;
  });

  const toggleSort = () => {
    setSortOrder((prev) =>
      prev === "asc" ? "desc" : prev === "desc" ? "none" : "asc"
    );
  };

  const handleCreateMember = (newMember: Member) => {
    const income = newMember.monthlyIncome || 0;
    const expenses = newMember.monthlyExpenses || 0;
    const savings = newMember.savingsBalance || 0;

    const creditScore = Math.min(
      100,
      Math.max(0, Math.floor((income - expenses) / 1000) + Math.floor(savings / 10000) + 50)
    );

    const memberWithScore = { 
      ...newMember, 
      creditScore,
      remarks: newMember.remarks || [] 
    };
    setMembers((prev) => [...prev, memberWithScore]);
    setIsCreateDialogOpen(false);

    toast({
      title: "Success",
      description: `Member ${newMember.fullName} has been registered successfully.`,
    });
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers(prev => 
      prev.map(member => {
        if (member.memberId === updatedMember.memberId) {
          return {
            ...updatedMember,
            remarks: updatedMember.remarks || member.remarks || []
          };
        }
        return member;
      })
    );
    
    setEditingMember(null);
    
    // Update the selected member with preserved remarks
    const updatedWithRemarks = {
      ...updatedMember,
      remarks: updatedMember.remarks || members.find(m => m.memberId === updatedMember.memberId)?.remarks || []
    };
    setSelectedMember(updatedWithRemarks);

    toast({
      title: "Success",
      description: `Member ${updatedMember.fullName} has been updated successfully.`,
    });
  };

  const handleAddRemark = (comment: string) => {
    if (!selectedMember) return;

    const newRemark = {
      id: `RM${String(Date.now()).slice(-4)}`,
      officer: "David Lee",
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update members list
    setMembers(prev => prev.map(m => 
      m.memberId === selectedMember.memberId 
        ? { ...m, remarks: [...(m.remarks || []), newRemark] } 
        : m
    ));
    
    // Update selected member
    setSelectedMember(prev => ({
      ...prev!,
      remarks: [...(prev?.remarks || []), newRemark]
    }));
    
    toast({
      title: "Remark Added",
      description: "Your remark has been saved successfully.",
    });
  };

  const handleDeleteMember = (memberId: number) => {
    const deleted = members.find((m) => m.memberId === memberId);
    setMembers((prev) => prev.filter((m) => m.memberId !== memberId));
    setSelectedMember(null);

    toast({
      title: "Deleted",
      description: `Member ${deleted?.fullName} was removed.`,
      variant: "destructive",
    });
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setSelectedMember(null);
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Member Management</h1>
          <p className="text-gray-500">Manage all member accounts and information</p>
        </div>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">DL</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">David Lee</p>
            <p className="text-xs text-gray-500">IT Administrator</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-800">Members ({filteredMembers.length})</CardTitle>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserPlus2 className="mr-2 h-4 w-4" />
                New Member
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search Members..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleSort}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === "none" ? "Sort" : sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">Name</TableHead>
                  <TableHead className="text-gray-700">Contact</TableHead>
                  <TableHead className="text-gray-700">Credit Score</TableHead>
                  <TableHead className="text-gray-700">Total Loans</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMembers.map((member) => (
                  <TableRow
                    key={member.memberId}
                    className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {member.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{member.contact || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            (member.creditScore || 0) >= 85
                              ? "bg-green-500"
                              : (member.creditScore || 0) >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            (member.creditScore || 0) >= 85
                              ? "text-green-600"
                              : (member.creditScore || 0) >= 70
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {member.creditScore || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <Badge variant={(member.loans || []).length > 0 ? "default" : "outline"}>
                        {(member.loans || []).length} {(member.loans || []).length === 1 ? "loan" : "loans"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <Badge
                        variant="outline"
                        className={statusConfig[member.membershipStatus as keyof typeof statusConfig]?.className}
                      >
                        {member.membershipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {selectedMember && (
        <ClientDetailsPanel
          client={selectedMember}
          onClose={() => setSelectedMember(null)}
          onAddRemark={handleAddRemark}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      )}

      <ClientFormDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateMember}
        mode="create"
      />

      {editingMember && (
        <ClientFormDialog
          client={editingMember}
          isOpen={true}
          onClose={() => setEditingMember(null)}
          onSave={handleUpdateMember}
          mode="edit"
        />
      )}
    </div>
  );
}