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
import { ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown, X, Info, BadgeInfo, Calendar, Phone, Home, GraduationCap, HeartPulse, Briefcase, Wallet, CreditCard, BarChart2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const clients = [
  {
    id: "CL001",
    name: "Juan Dela Cruz",
    gender: "Male",
    birthday: "1985-05-15",
    contact: "09123456789",
    address: "123 Main St, Manila",
    education: "Bachelor's Degree",
    maritalStatus: "Married",
    dependents: 2,
    industry: "Information Technology",
    monthlyIncome: 75000,
    savingsBalance: 150000,
    monthlyExpenses: 35000,
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
    loans: [
      {
        id: "LN003",
        type: "Emergency Loan",
        purpose: "Medical Expenses",
        amount: 30000,
        applicationDate: "2025-05-25",
        duration: "6 months",
        validatedBy: "Ana Lopez",
        status: "Disapproved"
      }
    ],
    creditScore: 78,
    joinedDate: "2023-03-15"
  }
]

function ClientDetailsPanel({ client, onClose }: { client: typeof clients[0], onClose: () => void }) {
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
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
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  New Loan Application
                </Button>
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
                Edit Client
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ClientManagementPage() {
  const [searchText, setSearchText] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")

  const filteredClients = clients.filter(client => {
    return client.id.toLowerCase().includes(searchText.toLowerCase()) ||
           client.name.toLowerCase().includes(searchText.toLowerCase()) ||
           client.contact.toLowerCase().includes(searchText.toLowerCase())
  })

  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortOrder === "none") return 0
    if (sortOrder === "asc") return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === "none") return "asc"
      if (prev === "asc") return "desc"
      return "none"
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r-gray-200 sm:flex">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <UserCog className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users2 className="mr-3 h-5 w-5" /> User Management
          </Button>
          <Button 
            variant="secondary" 
            className="justify-start text-gray-900 bg-gray-100 hover:bg-gray-200"
          >
            <User className="mr-3 h-5 w-5" /> Clients
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Book className="mr-3 h-5 w-5" /> Loans
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <FileText className="mr-3 h-5 w-5" /> Reports
          </Button>
          <Button variant="ghost" className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <ListChecks className="mr-3 h-5 w-5" /> Loan Products
          </Button>
          <Button variant="ghost" className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <Cog className="mr-3 h-5 w-5" /> System Configuration
          </Button>
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
          <h1 className="text-xl font-semibold text-gray-800">Client Management</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="w-64 rounded-lg bg-gray-50 border-gray-200 pl-8 focus:ring-blue-500 focus:border-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={toggleSortOrder}
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortOrder === "none" ? "Sort" : sortOrder === "asc" ? "A-Z" : "Z-A"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus2 className="mr-2 h-4 w-4" /> New Client
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Register New Client</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Fill out the details for the new client
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
                      placeholder="Enter client's full name"
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
                    Register Client
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          {selectedClient ? (
            <ClientDetailsPanel client={selectedClient} onClose={() => setSelectedClient(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Client List</CardTitle>
                    <CardDescription className="text-gray-500">
                      {clients.length} registered clients
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
                      <TableHead className="text-gray-600 font-medium">CLIENT ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">NAME</TableHead>
                      <TableHead className="text-gray-600 font-medium">GENDER</TableHead>
                      <TableHead className="text-gray-600 font-medium">CONTACT</TableHead>
                      <TableHead className="text-gray-600 font-medium">LOANS</TableHead>
                      <TableHead className="text-gray-600 font-medium">CREDIT SCORE</TableHead>
                      <TableHead className="text-gray-600 font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClients.map((client) => (
                      <TableRow 
                        key={client.id} 
                        className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedClient(client)}
                      >
                        <TableCell className="font-medium text-gray-800">{client.id}</TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-100 text-blue-800">
                                {client.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <Badge variant="outline" className="border-gray-200 text-gray-600">
                            {client.gender}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{client.contact}</TableCell>
                        <TableCell className="text-gray-700">
                          <Badge variant={client.loans.length > 0 ? "default" : "outline"}>
                            {client.loans.length} {client.loans.length === 1 ? "loan" : "loans"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              client.creditScore >= 85 ? "bg-green-500" : 
                              client.creditScore >= 70 ? "bg-yellow-500" : "bg-red-500"
                            }`} />
                            <span className={`font-medium ${
                              client.creditScore >= 85 ? "text-green-600" : 
                              client.creditScore >= 70 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {client.creditScore}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-500 hover:text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedClient(client)
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
    </div>
  )
}