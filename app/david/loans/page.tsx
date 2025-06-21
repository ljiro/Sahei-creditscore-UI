"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronDown, UploadCloud, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown, X, Info, Calendar, Phone, Home, CreditCard, BarChart2, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    status: "Active",
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
                      variant={
                        loan.status === "Approved" ? "default" : 
                        loan.status === "Pending" ? "secondary" : "destructive"
                      }
                      className="flex items-center gap-1"
                    >
                      {loan.status === "Approved" ? (
                        <>
                          <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {loan.status}
                        </>
                      ) : loan.status === "Pending" ? (
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

export default function LoanManagementPage() {
  const pathname = usePathname()
  const [searchText, setSearchText] = useState("")
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0] | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortOption, setSortOption] = useState<"none" | "date" | "amount">("none")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [coApplicantNumber, setCoApplicantNumber] = useState<number>(0)
  const [guarantorNumber, setGuarantorNumber] = useState<number>(0)

  const filteredLoans = loans.filter(loan => {
    // Filter by search text
    const matchesSearch = 
      loan.id.toLowerCase().includes(searchText.toLowerCase()) ||
      loan.clientName.toLowerCase().includes(searchText.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      selectedStatus === "all" || 
      loan.status.toLowerCase() === selectedStatus.toLowerCase()
    
    // Filter by type
    const matchesType = 
      selectedType === "all" || 
      loan.type.toLowerCase().includes(selectedType.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesType
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

  const handleSort = (option: typeof sortOption) => {
    if (sortOption === option) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortOption(option)
      setSortDirection("asc")
    }
  }

  const resetFilters = () => {
    setSelectedStatus("all")
    setSelectedType("all")
    setSortOption("none")
    setSortDirection("asc")
    setSearchText("")
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar - keep exactly as is */}
<aside className="hidden w-72 flex-col border-r bg-white border-r-gray-200 sm:flex">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Link href="/david/dashboard" passHref legacyBehavior>
            <Button
              variant={pathname === '/david/dashboard' ? "secondary" : "ghost"}
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <BarChart2 className="mr-3 h-5 w-5" /> Dashboard
            </Button>
          </Link>
          <Link href="/david/users" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/users' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Users2 className="mr-3 h-5 w-5" /> Users
            </Button>
          </Link>
          <Link href="/david/members" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/members' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <User className="mr-3 h-5 w-5" /> Members
            </Button>
          </Link>
          <Link href="/david/loans" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/loans' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Book className="mr-3 h-5 w-5" /> Loans
            </Button>
          </Link>
          <Link href="/david/reports" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/reports' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FileText className="mr-3 h-5 w-5" /> Reports
            </Button>
          </Link>
          <Link href="/david/upload" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/upload' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <UploadCloud className="mr-3 h-5 w-5" /> Upload
            </Button>
          </Link>
        </nav>
        <div className="mt-auto p-3 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Loan Management</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search loans..."
                className="w-64 rounded-lg bg-gray-50 border-gray-200 pl-8 focus:ring-blue-500 focus:border-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={selectedStatus !== "all" ? "secondary" : "outline"} 
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ListChecks className="mr-2 h-4 w-4" />
                  {selectedStatus === "all" ? "Status" : selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedStatus("all")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>All Statuses</span>
                    {selectedStatus === "all" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedStatus("Approved")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Approved</span>
                    {selectedStatus === "Approved" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedStatus("Pending")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Pending</span>
                    {selectedStatus === "Pending" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedStatus("Active")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Active</span>
                    {selectedStatus === "Active" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Type Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={selectedType !== "all" ? "secondary" : "outline"} 
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {selectedType === "all" ? "Type" : selectedType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedType("all")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>All Types</span>
                    {selectedType === "all" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedType("Personal")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Personal Loan</span>
                    {selectedType === "Personal" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedType("Business")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Business Loan</span>
                    {selectedType === "Business" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedType("Emergency")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Emergency Loan</span>
                    {selectedType === "Emergency" && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={sortOption !== "none" ? "secondary" : "outline"} 
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sortOption === "none" ? "Sort" : `Sort by ${sortOption}`}
                  {sortOption !== "none" && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({sortDirection === "asc" ? "A-Z" : "Z-A"})
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>By Date</span>
                    {sortOption === "date" && (
                      <span className="text-xs text-gray-500">
                        {sortDirection === "asc" ? "Oldest" : "Newest"}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>By Amount</span>
                    {sortOption === "amount" && (
                      <span className="text-xs text-gray-500">
                        {sortDirection === "asc" ? "Lowest" : "Highest"}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100 text-red-500"
                  onClick={() => {
                    setSortOption("none")
                    setSortDirection("asc")
                  }}
                >
                  Clear Sorting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset Filters Button */}
            {(selectedStatus !== "all" || selectedType !== "all" || sortOption !== "none" || searchText) && (
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="text-gray-700 hover:bg-gray-100"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}

            {/* New Loan Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus2 className="h-4 w-4 mr-2" />
                  New Loan
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px] rounded-lg">
                {/* ... existing new loan dialog code ... */}
              </DialogContent>
            </Dialog>

            {/* User Avatar */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="David" />
                <AvatarFallback className="text-gray-900">DL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">David Lee</p>
                <p className="text-xs text-gray-500">IT Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {selectedLoan ? (
            <LoanDetailsPanel loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Loans</CardTitle>
                    <CardDescription className="text-gray-500">
                      {filteredLoans.length} of {loans.length} loans shown
                      {(selectedStatus !== "all" || selectedType !== "all") && (
                        <span className="ml-2">
                          (Filtered by: 
                          {selectedStatus !== "all" && ` Status: ${selectedStatus}`}
                          {selectedType !== "all" && ` Type: ${selectedType}`})
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableHead className="text-gray-600 font-medium">LOAN ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">CLIENT</TableHead>
                      <TableHead className="text-gray-600 font-medium">TYPE</TableHead>
                      <TableHead className="text-gray-600 font-medium">AMOUNT</TableHead>
                      <TableHead className="text-gray-600 font-medium">DATE</TableHead>
                      <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
                      <TableHead className="text-gray-600 font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans.length > 0 ? (
                      sortedLoans.map((loan) => (
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
                              variant={
                                loan.status === "Approved" ? "default" : 
                                loan.status === "Pending" ? "secondary" : "destructive"
                              }
                              className="flex items-center gap-1"
                            >
                              {loan.status === "Approved" ? (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              ) : loan.status === "Pending" ? (
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                          No loans found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}