"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit } from "lucide-react"
import { UploadCloud, ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown, X, Info, BadgeInfo, Calendar, Phone, Home, GraduationCap, HeartPulse, Briefcase, Wallet, CreditCard, BarChart2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  creditScore: number
  totalLoans: number
  status: "Active" | "Inactive"
  joinDate: string
}

const members = [
  {
    id: "CL001",
    name: "Juan Dela Cruz",
    gender: "Male",
    birthday: "1985-05-15",
    contact: "09123456789",
    address: "123 Main St, Manila",
    email: "juandelacruz@example.com",
    education: "Bachelor's Degree",
    maritalStatus: "Married",
    dependents: 2,
    industry: "Information Technology",
    monthlyIncome: 75000,
    savingsBalance: 150000,
    monthlyExpenses: 35000,
    status: "Active",
    loans: [
      {
        id: "LN001",
        type: "Personal Loan",
        purpose: "Home Renovation",
        amount: 50000,
        applicationDate: "2025-05-15",
        duration: "12 months",
        validatedBy: "Maria Santos",
        status: "Approved"
      },
      {
        id: "LN004",
        type: "Emergency Loan",
        purpose: "Medical Expenses",
        amount: 30000,
        applicationDate: "2025-06-10",
        duration: "6 months",
        validatedBy: "Carlos Reyes",
        status: "Approved"
      }
    ],
    creditScore: 85,
    joinedDate: "2023-01-10"
  },
  {
    id: "CL002",
    name: "Maria Santos",
    email: "mariasantos@example.com",
    gender: "Female",
    birthday: "1990-08-22",
    contact: "09234567890",
    address: "456 Oak Ave, Quezon City",
    education: "Master's Degree",
    maritalStatus: "Single",
    dependents: 0,
    industry: "Business Owner",
    monthlyIncome: 120000,
    savingsBalance: 350000,
    monthlyExpenses: 45000,
    status: "Active",
    loans: [
      {
        id: "LN002",
        type: "Business Loan",
        purpose: "Capital Expansion",
        amount: 150000,
        applicationDate: "2025-05-20",
        duration: "24 months",
        validatedBy: "Juan Dela Cruz",
        status: "Approved"
      }
    ],
    creditScore: 92,
    joinedDate: "2022-11-05"
  },
  {
    id: "CL003",
    name: "Pedro Reyes",
    email: "pedroreyes@example.com",
    gender: "Male",
    birthday: "1978-03-30",
    contact: "09345678901",
    address: "789 Pine Rd, Makati",
    education: "High School Graduate",
    maritalStatus: "Divorced",
    dependents: 1,
    industry: "Education",
    monthlyIncome: 50000,
    savingsBalance: 80000,
    monthlyExpenses: 30000,
    status: "Dormant",
    loans: [
      {
        id: "LN003",
        type: "Emergency Loan",
        purpose: "Medical Expenses",
        amount: 30000,
        applicationDate: "2023-05-25",
        duration: "6 months",
        validatedBy: "Ana Lopez",
        status: "Approved"
      }
    ],
    creditScore: 78,
    joinedDate: "2023-03-15"
  },
  {
    id: "CL004",
    name: "Ana Lopez",
    email: "analopez@example.com",
    gender: "Female",
    birthday: "1992-11-10",
    contact: "09456789012",
    address: "321 Maple St, Pasig",
    education: "Bachelor's Degree",
    maritalStatus: "Single",
    dependents: 0,
    industry: "Healthcare",
    monthlyIncome: 60000,
    savingsBalance: 95000,
    monthlyExpenses: 25000,
    status: "Suspended",
    loans: [
      {
        id: "LN005",
        type: "Personal Loan",
        purpose: "Debt Consolidation",
        amount: 70000,
        applicationDate: "2025-06-01",
        duration: "24 months",
        validatedBy: "David Lee",
        status: "Disapproved"
      }
    ],
    creditScore: 64,
    joinedDate: "2024-01-20"
  },
  {
    id: "CL005",
    name: "Carlos Garcia",
    email: "carlosgarcia@example.com",
    gender: "Male",
    birthday: "1980-01-25",
    contact: "09567890123",
    address: "654 Elm St, Taguig",
    education: "Master's Degree",
    maritalStatus: "Married",
    dependents: 3,
    industry: "Finance",
    monthlyIncome: 90000,
    savingsBalance: 250000,
    monthlyExpenses: 50000,
    status: "Closed",
    loans: [],
    creditScore: 0,
    joinedDate: "2022-02-18"
  }
]

function ClientDetailsPanel({ client, onClose }: { client: typeof members[0], onClose: () => void }) {
  const [loanDuration, setLoanDuration] = useState(12); // Default to 12 months

  const formatDuration = (months: number) => {
    if (months < 12) return `${months} month${months > 1 ? 's' : ''}`;
    if (months % 12 === 0) {
      const years = months / 12;
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="h-6 w-6" />
                {client.name}
                <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                  {client.id}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Comprehensive client profile and financial history
              </DialogDescription>
            </div>
         
          </div>
        </DialogHeader>
        
        <div className="grid gap-8 py-4">
          {/* Client Overview Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Client Overview
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
                    <p className="font-medium text-gray-800">{client.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-50">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium text-gray-800">
                      {new Date().getFullYear() - new Date(client.birthday).getFullYear()} years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-50">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-gray-800">{client.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-50">
                    <Home className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800 line-clamp-1">{client.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details and Financial Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Details Card */}
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
                      <p className="text-gray-800">{client.education}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Marital Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <HeartPulse className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{client.maritalStatus}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Dependents</Label>
                    <p className="text-gray-800">{client.dependents}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Industry</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{client.industry}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information Card */}
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
                    <p className="text-gray-800 font-medium">₱{client.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Monthly Expenses</Label>
                    <p className="text-gray-800 font-medium">₱{client.monthlyExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Savings Balance</Label>
                    <p className="text-gray-800 font-medium">₱{client.savingsBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Credit Score</Label>
                    <div className="flex items-center gap-2">
                      <BarChart2 className={`h-4 w-4 ${
                        client.creditScore >= 85 ? "text-green-500" : 
                        client.creditScore >= 70 ? "text-yellow-500" : "text-red-500"
                      }`} />
                      <span className={`font-medium ${
                        client.creditScore >= 85 ? "text-green-600" : 
                        client.creditScore >= 70 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {client.creditScore}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Loans Section */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                  Loan History ({client.loans.length})
                </CardTitle>
                <Dialog>
                 <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  New Loan Application
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Register Loan</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Fill out the details for the new loan
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullName" className="text-right col-span-1 text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter member's full name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right col-span-1 text-gray-700">
                      Gender
                    </Label>
                    <select 
                      id="gender" 
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 rounded-md p-2"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="birthday" className="text-right col-span-1 text-gray-700">
                      Birthday
                    </Label>
                    <Input
                      id="birthday"
                      type="date"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right col-span-1 text-gray-700">
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loan" className="text-right col-span-1 text-gray-700">
                      Loan
                    </Label>
                      <select 
                      id="loan" 
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 rounded-md p-2"
                    >
                      <option value="">Select Loan</option>
                      <option value="Male">Personal</option>
                      <option value="Female">Business</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="collateral" className="text-right col-span-1 text-gray-700">
                      Collateral
                    </Label>
                      <div className="col-span-3 flex items-center gap-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="secured"
                          name="loanSecurity"
                          value="secured"
                          className="h-4 w-4 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="secured"
                          className="font-normal text-gray-800 cursor-pointer"
                        >
                          Secured
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="unsecured"
                          name="loanSecurity"
                          value="unsecured"
                          className="h-4 w-4 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="unsecured"
                          className="font-normal text-gray-800 cursor-pointer"
                        >
                          Unsecured
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right col-span-1 text-gray-700">
                      Duration
                    </Label>
                    <div className="col-span-3 flex items-center gap-4">
                      <Slider
                        id="duration"
                        min={1}
                        max={60} // 5 years
                        step={1}
                        value={[loanDuration]}
                        onValueChange={(value) => setLoanDuration(value[0])}
                        className="w-[60%]"
                      />
                      <div className="relative w-[40%]">
                        <Input
                          type="number"
                          min={1}
                          max={60}
                          value={loanDuration}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (e.target.value === '') {
                              setLoanDuration(1);
                            } else if (!isNaN(value) && value >= 1 && value <= 60) {
                              setLoanDuration(value);
                            }
                          }}
                          className="w-full bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 pr-24 text-right"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                          {formatDuration(loanDuration)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right col-span-1 text-gray-700">
                      Amount
                    </Label>
                      <Input
                      id="amount"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentFrequency" className="text-right col-span-1 text-gray-700">
                      Payment Frequency
                    </Label>
                      <select 
                      id="gender" 
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 rounded-md p-2"
                    >
                      <option value="">Select Payment Frequency</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-Weekly">Bi-Weekly</option>
                      <option value="Semi-Monthly">Semi-Monthly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Loan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {client.loans.length > 0 ? (
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
                        <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.loans.map((loan) => (
                        <TableRow key={loan.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{loan.id}</TableCell>
                          <TableCell className="text-gray-700">{loan.type}</TableCell>
                          <TableCell className="text-gray-700">{loan.purpose}</TableCell>
                          <TableCell className="text-gray-700 font-medium">₱{loan.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-500">{loan.applicationDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={loan.status === "Approved" ? "default" : "destructive"}
                              className="flex items-center gap-1"
                            >
                              {loan.status === "Approved" ? (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              ) : (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </Button>
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
                  <p className="text-gray-400 text-sm mt-1">This client hasn't applied for any loans yet</p>
                  <Button variant="outline" className="mt-4 border-gray-200">Create New Loan</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => console.log("Delete client")}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Client
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              >
                Close
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => console.log("Edit client")}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Member
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function MembersPage() {
  const [searchText, setSearchText] = useState("")
  const [selectedMember, setSelectedMember] = useState<(typeof members)[0] | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")
  const [reportMember, setReportMember] = useState<typeof members[0] | null>(null)

  const filteredMembers = members.filter(client => {
    return client.id.toLowerCase().includes(searchText.toLowerCase()) ||
            client.name.toLowerCase().includes(searchText.toLowerCase()) ||
            client.contact.toLowerCase().includes(searchText.toLowerCase())
  })

  const sortedmembers = [...filteredMembers].sort((a, b) => {
    if (sortOrder === "none") return 0
    if (sortOrder === "asc") return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === "none") return "asc"
      if (prev === "asc") return "desc"
      return "none"
    });
  }

  const statusConfig = {
    Active: {
      className: "bg-green-100 text-green-800 border-green-200",
    },
    Dormant: {
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    Suspended: {
      className: "bg-orange-100 text-orange-800 border-orange-200",
    },
    Closed: {
      className: "bg-gray-200 text-gray-800 border-gray-300",
    }
  };


  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Member Management</h1>
          <p className="text-gray-500">Manage all Member accounts and information</p>
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
                          <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus2 className="mr-2 h-4 w-4" /> New Member
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Register New Member</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Fill out the details for the new Member
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullName" className="text-right col-span-1 text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter member's full name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right col-span-1 text-gray-700">
                      Gender
                    </Label>
                    <select 
                      id="gender" 
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 rounded-md p-2"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="birthday" className="text-right col-span-1 text-gray-700">
                      Birthday
                    </Label>
                    <Input
                      id="birthday"
                      type="date"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right col-span-1 text-gray-700">
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right col-span-1 text-gray-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="education" className="text-right col-span-1 text-gray-700">
                      Education
                    </Label>
                    <Input
                      id="education"
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="Enter education level"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maritalStatus" className="text-right col-span-1 text-gray-700">
                      Marital Status
                    </Label>
                    <select 
                      id="maritalStatus" 
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800 rounded-md p-2"
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              <Button variant="outline">Sort A-Z</Button>
            </div>
          </CardHeader>
          {/* {selectedMember ? (
            <ClientDetailsPanel client={selectedMember} onClose={() => setSelectedMember(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Client List</CardTitle>
                    <CardDescription className="text-gray-500">
                      {members.length} registered members
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader> */}
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-700">Member ID</TableHead>
                      <TableHead className="text-gray-700">Name</TableHead>
                      <TableHead className="text-gray-700">Email</TableHead>
                      <TableHead className="text-gray-700">Phone</TableHead>
                      <TableHead className="text-gray-700">Credit Score</TableHead>
                      <TableHead className="text-gray-700">Total Loans</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Actions</TableHead>
                   </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedmembers.map((member) => (
                      <TableRow 
  key={member.id} 
  className="border-gray-200 hover:bg-gray-50 cursor-pointer"
  onClick={() => setSelectedMember(member)}
>
  <TableCell className="font-medium text-gray-800">{member.id}</TableCell>
  <TableCell className="text-gray-700">
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-blue-100 text-blue-800">
          {member.name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <span>{member.name}</span>
    </div>
  </TableCell>
  <TableCell className="text-gray-700">
    <Badge variant="outline" className="border-gray-200 text-gray-600">
      {member.email}
    </Badge>
  </TableCell>
  <TableCell className="text-gray-700">{member.contact}</TableCell>
  <TableCell>
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${
        member.creditScore >= 85 ? "bg-green-500" : 
        member.creditScore >= 70 ? "bg-yellow-500" : "bg-red-500"
      }`} />
      <span className={`font-medium ${
        member.creditScore >= 85 ? "text-green-600" : 
        member.creditScore >= 70 ? "text-yellow-600" : "text-red-600"
      }`}>
        {member.creditScore}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-gray-500 hover:text-blue-600"
        onClick={(e) => {
          e.stopPropagation()
          setReportMember(member)
        }}
      >
        <FileText className="h-3 w-3" />
      </Button>
    </div>
  </TableCell>
   <TableCell className="text-gray-700">
    <Badge variant={member.loans.length > 0 ? "default" : "outline"}>
      {member.loans.length} {member.loans.length === 1 ? "loan" : "loans"}
    </Badge>
  </TableCell>  
   <TableCell className="text-gray-700">
      <Badge
    variant="outline"
    className={statusConfig[member.status as keyof typeof statusConfig].className}
  >
    {member.status}
  </Badge>
   </TableCell>
  <TableCell>
    <div className="flex gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-blue-500 hover:text-blue-600"
        onClick={(e) => {
          e.stopPropagation()
          setSelectedMember(member)
        }}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  </TableCell>
</TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
         
      </main>
      {selectedMember && (
        <ClientDetailsPanel client={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  )
}


 /* <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">Member ID</TableHead>
                  <TableHead className="text-gray-700">Name</TableHead>
                  <TableHead className="text-gray-700">Email</TableHead>
                  <TableHead className="text-gray-700">Phone</TableHead>
                  <TableHead className="text-gray-700">Credit Score</TableHead>
                  <TableHead className="text-gray-700">Total Loans</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((Member) => (
                  <TableRow key={Member.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{Member.id}</TableCell>
                    <TableCell className="text-gray-900">{Member.name}</TableCell>
                    <TableCell className="text-gray-600">{Member.email}</TableCell>
                    <TableCell className="text-gray-600">{Member.phone}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          Member.creditScore >= 700
                            ? "text-green-600"
                            : Member.creditScore >= 650
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {Member.creditScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-900">{Member.totalLoans}</TableCell>
                    <TableCell>
                      <Badge variant={Member.status === "Active" ? "default" : "secondary"}>{Member.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedMember(Member)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Member Details - {selectedMember?.name}</DialogTitle>
                            </DialogHeader>
                            {selectedMember && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <span className="font-medium">Member ID:</span> {selectedMember.id}
                                      </p>
                                      <p>
                                        <span className="font-medium">Name:</span> {selectedMember.name}
                                      </p>
                                      <p>
                                        <span className="font-medium">Email:</span> {selectedMember.email}
                                      </p>
                                      <p>
                                        <span className="font-medium">Phone:</span> {selectedMember.phone}
                                      </p>
                                      <p>
                                        <span className="font-medium">Join Date:</span> {selectedMember.joinDate}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Financial Information</h3>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <span className="font-medium">Credit Score:</span> {selectedMember.creditScore}
                                      </p>
                                      <p>
                                        <span className="font-medium">Total Loans:</span> {selectedMember.totalLoans}
                                      </p>
                                      <p>
                                        <span className="font-medium">Status:</span> {selectedMember.status}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-2">Loan History</h3>
                                  <div className="text-sm text-gray-600">
                                    <p>Loan history details would appear here...</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */
