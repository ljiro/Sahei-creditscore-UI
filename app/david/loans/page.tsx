"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, UploadCloud,Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown, X, Info, Calendar, Phone, Home, CreditCard, BarChart2, DollarSign, Clock, CheckCircle, AlertCircle, Eye, FilePlus2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"


const statusStyles = {
  Approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
};

// Type that represents ONLY the keys of statusStyles
type LoanStatus = keyof typeof statusStyles;

// Define the Loan interface with required fields to prepare for dynamic data handling
interface Loan {
  id: string;
  clientName: string;
  type: string;
  purpose: string;
  amount: number;
  applicationDate: string;
  duration: string;
  status: LoanStatus; // Use the specific type
  interestRate: string;
  remainingBalance: number;
  nextPayment: string;
  validatedBy: string;
  creditScore: number;
  coApplicantNumber: number;
  guarantorNumber: number;
}

const loans = [
  {
    id: "LN001",
    clientName: "Juan Dela Cruz",
    type: "Personal Loan",
    purpose: "Home Renovation",
    amount: 50000,
    applicationDate: "2025-05-15",
    duration: "12 months",
    status: "Approved",
    interestRate: "12%",
    remainingBalance: 42000,
    nextPayment: "2025-06-15",
    validatedBy: "Maria Santos",
    creditScore: 85,
    coApplicantNumber: 2,
    guarantorNumber: 1
    
  },
  {
    id: "LN002",
    clientName: "Maria Santos",
    type: "Business Loan",
    purpose: "Capital Expansion",
    amount: 150000,
    applicationDate: "2025-05-20",
    duration: "24 months",
    status: "Pending",
    interestRate: "10%",
    remainingBalance: 150000,
    nextPayment: "N/A",
    validatedBy: "Juan Dela Cruz",
    creditScore: 92,
    coApplicantNumber: 0,
    guarantorNumber: 2
  },
  {
    id: "LN003",
    clientName: "Pedro Reyes",
    type: "Emergency Loan",
    purpose: "Medical Expenses",
    amount: 30000,
    applicationDate: "2025-05-25",
    duration: "6 months",
    status: "Declined",
    interestRate: "15%",
    remainingBalance: 25000,
    nextPayment: "2025-06-25",
    validatedBy: "Ana Lopez",
    creditScore: 78,
    coApplicantNumber: 1,
    guarantorNumber: 1
  }
]

function LoanDetailsPanel({ loan, onClose }: { loan: typeof loans[0], onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>Add commentMore actions
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                {loan.id} - {loan.clientName}
                <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                  {loan.type}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Comprehensive loan details and payment history
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-8 py-4">
          {/* Loan Overview Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Loan Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-50">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-medium text-gray-800">₱{loan.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-50">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-800">{loan.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-50">
                    <BarChart2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-medium text-gray-800">{loan.interestRate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-50">
                    <Calendar className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Payment</p>
                    <p className="font-medium text-gray-800">{loan.nextPayment}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Details and Client Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Details Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-500" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Client Name</Label>
                    <p className="text-gray-800 font-medium">{loan.clientName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Application Date</Label>
                    <p className="text-gray-800 font-medium">{loan.applicationDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Purpose</Label>
                    <p className="text-gray-800 font-medium">{loan.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Remaining Balance</Label>
                    <p className="text-gray-800 font-medium">₱{loan.remainingBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Co-Applicants</Label>
                    <p className="text-gray-800 font-medium">{loan.coApplicantNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Guarantors</Label>
                    <p className="text-gray-800 font-medium">{loan.guarantorNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Validated By</Label>
                    <p className="text-gray-800 font-medium">{loan.validatedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Client Credit Score</Label>
                    <div className="flex items-center gap-2">
                      <BarChart2 className={`h-4 w-4 ${
                        loan.creditScore >= 85 ? "text-green-500" : 
                        loan.creditScore >= 70 ? "text-yellow-500" : "text-red-500"
                      }`} />
                      <span className={`font-medium ${
                        loan.creditScore >= 85 ? "text-green-600" : 
                        loan.creditScore >= 70 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {loan.creditScore}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {loan.status === "Approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : loan.status === "Pending" ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-500">Current Status</Label>
                    <Badge 
                            className={`flex items-center gap-1 ${statusStyles[loan.status]}`}
                          >
                            <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {loan.status}
                          </Badge>
                  </div>
                  {loan.status === "Pending" && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Actions</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                  {loan.status === "Approved" && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Next Steps</Label>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        Generate Contract
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History Section */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                      <TableHead className="text-gray-600 font-medium">Date</TableHead>
                      <TableHead className="text-gray-600 font-medium">Amount</TableHead>
                      <TableHead className="text-gray-600 font-medium">Principal</TableHead>
                      <TableHead className="text-gray-600 font-medium">Interest</TableHead>
                      <TableHead className="text-gray-600 font-medium">Remaining Balance</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-700">2025-05-15</TableCell>
                      <TableCell className="text-gray-700 font-medium">₱5,000</TableCell>
                      <TableCell className="text-gray-700">₱4,167</TableCell>
                      <TableCell className="text-gray-700">₱833</TableCell>
                      <TableCell className="text-gray-700">₱45,833</TableCell>
                      <TableCell>
                        <Badge variant="default" className="flex items-center gap-1">
                          <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          Paid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => console.log("Delete loan")}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Loan
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
                onClick={() => console.log("Process payment")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}// ... (keep the existing LoanDetailsPanel component exactly as is)

export default function LoansPage() {
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0] | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortOption, setSortOption] = useState<"none" | "date" | "amount">("none")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [coApplicantNumber, setCoApplicantNumber] = useState<number>(0)
  const [guarantorNumber, setGuarantorNumber] = useState<number>(0)

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchText.toLowerCase()) ||
                          loan.clientName.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || loan.status === statusFilter;

    return matchesSearch && matchesStatus;
  })

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sortOption === "none") return 0
    
    if (sortOption === "date") {
      return sortDirection === "asc" 
        ? new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime()
        : new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
    }
    
    if (sortOption === "amount") {
      return sortDirection === "asc" 
        ? a.amount - b.amount
        : b.amount - a.amount
    }
    
    return 0
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === "none") return "asc"
      if (prev === "asc") return "desc"
      return "none"
    })
  }

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
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Loan Management</h1>
          <p className="text-gray-500">Manage all loan applications and accounts</p>
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
           {selectedLoan ? (
            <LoanDetailsPanel loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Loans ({filteredLoans.length})</CardTitle>
               <Dialog>
                          <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FilePlus2 className="mr-2 h-4 w-4" /> New Loan
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

                        <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search Loans..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>
              </div>
             
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">Loan ID</TableHead>
                  <TableHead className="text-gray-700">Client Name</TableHead>
                  <TableHead className="text-gray-700">Type</TableHead>
                  <TableHead className="text-gray-700">Amount</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Application Date</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               {sortedLoans.map((loan) => (
                      <TableRow 
                        key={loan.id} 
                        className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedLoan(loan)}
                      >
                        <TableCell className="font-medium text-gray-800">{loan.id}</TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-100 text-blue-800">
                                {loan.clientName.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{loan.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <Badge variant="outline" className="border-gray-200 text-gray-600">
                            {loan.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 font-medium">₱{loan.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-500">{loan.applicationDate}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`flex items-center gap-1 ${statusStyles[loan.status]}`}
                          >
                            <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {loan.status}
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
                                setSelectedLoan(loan)
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
        )}
      </main>
    </div>
  )
}
