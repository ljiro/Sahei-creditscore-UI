"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown } from "lucide-react"

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
  },
]

function LoanDetailsPanel({ loan, onClose }: { loan: typeof loans[0], onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">Loan Details - {loan.id}</DialogTitle>
          <DialogDescription className="text-gray-500">
            Comprehensive view of loan application and status
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500">Client Name</Label>
              <p className="text-gray-800 font-medium">{loan.clientName}</p>
            </div>
            <div>
              <Label className="text-gray-500">Loan Type</Label>
              <p className="text-gray-800 font-medium">{loan.type}</p>
            </div>
            <div>
              <Label className="text-gray-500">Purpose</Label>
              <p className="text-gray-800 font-medium">{loan.purpose}</p>
            </div>
            <div>
              <Label className="text-gray-500">Application Date</Label>
              <p className="text-gray-800 font-medium">{loan.applicationDate}</p>
            </div>
            <div>
              <Label className="text-gray-500">Loan Amount</Label>
              <p className="text-gray-800 font-medium">₱{loan.amount.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-gray-500">Interest Rate</Label>
              <p className="text-gray-800 font-medium">{loan.interestRate}</p>
            </div>
            <div>
              <Label className="text-gray-500">Duration</Label>
              <p className="text-gray-800 font-medium">{loan.duration}</p>
            </div>
            <div>
              <Label className="text-gray-500">Remaining Balance</Label>
              <p className="text-gray-800 font-medium">₱{loan.remainingBalance.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-gray-500">Next Payment Due</Label>
              <p className="text-gray-800 font-medium">{loan.nextPayment}</p>
            </div>
            <div>
              <Label className="text-gray-500">Status</Label>
              <p className={`font-medium ${
                loan.status === "Approved" ? "text-green-600" : 
                loan.status === "Pending" ? "text-yellow-600" : "text-blue-600"
              }`}>
                {loan.status}
              </p>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-800 mb-3">Payment History</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100">
                    <TableHead className="text-gray-700">Date</TableHead>
                    <TableHead className="text-gray-700">Amount</TableHead>
                    <TableHead className="text-gray-700">Principal</TableHead>
                    <TableHead className="text-gray-700">Interest</TableHead>
                    <TableHead className="text-gray-700">Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="text-gray-700">2025-05-15</TableCell>
                    <TableCell className="text-gray-700">₱5,000</TableCell>
                    <TableCell className="text-gray-700">₱4,167</TableCell>
                    <TableCell className="text-gray-700">₱833</TableCell>
                    <TableCell className="text-gray-700">₱45,833</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
          >
            Close
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => console.log("Loan action taken")}
          >
            Process Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function LoanManagementPage() {
  const [searchText, setSearchText] = useState("")
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0] | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")

  const filteredLoans = loans.filter(loan => {
    return loan.id.toLowerCase().includes(searchText.toLowerCase()) ||
           loan.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
           loan.status.toLowerCase().includes(searchText.toLowerCase())
  })

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sortOrder === "none") return 0
    if (sortOrder === "asc") return a.clientName.localeCompare(b.clientName)
    return b.clientName.localeCompare(a.clientName)
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === "none") return "asc"
      if (prev === "asc") return "desc"
      return "none"
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r sm:flex">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-500" />
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
            variant="ghost" 
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <User className="mr-3 h-5 w-5" /> Clients
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            data-active="true"
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
          <h1 className="text-xl font-semibold text-gray-800">Loan Management</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search loans..."
                className="w-64 rounded-lg bg-gray-100 border-gray-200 pl-8 focus:ring-red-500"
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
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Book className="mr-2 h-4 w-4" /> New Loan
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Create New Loan Application</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Fill out the details for the new loan application
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientName" className="text-right col-span-1 text-gray-700">
                      Client
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-800 border-gray-200">
                        <SelectItem value="juan" className="hover:bg-gray-100 hover:text-gray-900">
                          Juan Dela Cruz
                        </SelectItem>
                        <SelectItem value="maria" className="hover:bg-gray-100 hover:text-gray-900">
                          Maria Santos
                        </SelectItem>
                        <SelectItem value="pedro" className="hover:bg-gray-100 hover:text-gray-900">
                          Pedro Reyes
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loanType" className="text-right col-span-1 text-gray-700">
                      Loan Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-800 border-gray-200">
                        <SelectItem value="personal" className="hover:bg-gray-100 hover:text-gray-900">
                          Personal Loan
                        </SelectItem>
                        <SelectItem value="business" className="hover:bg-gray-100 hover:text-gray-900">
                          Business Loan
                        </SelectItem>
                        <SelectItem value="emergency" className="hover:bg-gray-100 hover:text-gray-900">
                          Emergency Loan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loanAmount" className="text-right col-span-1 text-gray-700">
                      Amount
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loanPurpose" className="text-right col-span-1 text-gray-700">
                      Purpose
                    </Label>
                    <Input
                      id="loanPurpose"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter loan purpose"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loanDuration" className="text-right col-span-1 text-gray-700">
                      Duration
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-800 border-gray-200">
                        <SelectItem value="6" className="hover:bg-gray-100 hover:text-gray-900">
                          6 months
                        </SelectItem>
                        <SelectItem value="12" className="hover:bg-gray-100 hover:text-gray-900">
                          12 months
                        </SelectItem>
                        <SelectItem value="24" className="hover:bg-gray-100 hover:text-gray-900">
                          24 months
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Create Loan
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
          {selectedLoan ? (
            <LoanDetailsPanel loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
            <Card className="shadow-lg bg-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Active Loans ({loans.length})</CardTitle>
                <CardDescription className="text-gray-500">
                  Manage and review all loan applications and statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-100">
                      <TableHead className="text-gray-700">LOAN ID</TableHead>
                      <TableHead className="text-gray-700">CLIENT NAME</TableHead>
                      <TableHead className="text-gray-700">TYPE</TableHead>
                      <TableHead className="text-gray-700">PURPOSE</TableHead>
                      <TableHead className="text-gray-700">AMOUNT</TableHead>
                      <TableHead className="text-gray-700">APPLICATION DATE</TableHead>
                      <TableHead className="text-gray-700">DURATION</TableHead>
                      <TableHead className="text-gray-700">STATUS</TableHead>
                      <TableHead className="text-gray-700">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans.map((loan) => (
                      <TableRow 
                        key={loan.id} 
                        className="border-gray-200 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedLoan(loan)}
                      >
                        <TableCell className="font-medium text-gray-800">{loan.id}</TableCell>
                        <TableCell className="text-gray-700">{loan.clientName}</TableCell>
                        <TableCell className="text-gray-700">{loan.type}</TableCell>
                        <TableCell className="text-gray-700">{loan.purpose}</TableCell>
                        <TableCell className="text-gray-700">₱{loan.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-700">{loan.applicationDate}</TableCell>
                        <TableCell className="text-gray-700">{loan.duration}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              loan.status === "Approved" ? "bg-green-700 text-green-100" : 
                              loan.status === "Pending" ? "bg-yellow-700 text-yellow-100" : "bg-blue-700 text-blue-100"
                            }`}
                          >
                            {loan.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-sky-400 hover:text-sky-300 h-8 w-8">
                            <Edit2 size={16} />
                          </Button>
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