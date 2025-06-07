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
import { ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Book, Search, ArrowUpDown } from "lucide-react"

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
      <DialogContent className="sm:max-w-[900px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">Client Details - {client.id}</DialogTitle>
          <DialogDescription className="text-gray-500">
            Comprehensive view of client information and loan history
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500">Client ID</Label>
              <p className="text-gray-800 font-medium">{client.id}</p>
            </div>
            <div>
              <Label className="text-gray-500">Full Name</Label>
              <p className="text-gray-800 font-medium">{client.name}</p>
            </div>
            <div>
              <Label className="text-gray-500">Gender</Label>
              <p className="text-gray-800 font-medium">{client.gender}</p>
            </div>
            <div>
              <Label className="text-gray-500">Birthday</Label>
              <p className="text-gray-800 font-medium">{client.birthday}</p>
            </div>
            <div>
              <Label className="text-gray-500">Contact Number</Label>
              <p className="text-gray-800 font-medium">{client.contact}</p>
            </div>
            <div>
              <Label className="text-gray-500">Address</Label>
              <p className="text-gray-800 font-medium">{client.address}</p>
            </div>
            <div>
              <Label className="text-gray-500">Education</Label>
              <p className="text-gray-800 font-medium">{client.education}</p>
            </div>
            <div>
              <Label className="text-gray-500">Marital Status</Label>
              <p className="text-gray-800 font-medium">{client.maritalStatus}</p>
            </div>
            <div>
              <Label className="text-gray-500">Number of Dependents</Label>
              <p className="text-gray-800 font-medium">{client.dependents}</p>
            </div>
            <div>
              <Label className="text-gray-500">Industry</Label>
              <p className="text-gray-800 font-medium">{client.industry}</p>
            </div>
            <div>
              <Label className="text-gray-500">Monthly Income</Label>
              <p className="text-gray-800 font-medium">₱{client.monthlyIncome.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-gray-500">Savings Account Balance</Label>
              <p className="text-gray-800 font-medium">₱{client.savingsBalance.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-gray-500">Monthly Expenses</Label>
              <p className="text-gray-800 font-medium">₱{client.monthlyExpenses.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-gray-500">Credit Score</Label>
              <p className={`font-medium ${
                client.creditScore >= 85 ? "text-green-600" : 
                client.creditScore >= 70 ? "text-yellow-600" : "text-red-600"
              }`}>
                {client.creditScore}
              </p>
            </div>
            <div>
              <Label className="text-gray-500">Date Joined</Label>
              <p className="text-gray-800 font-medium">{client.joinedDate}</p>
            </div>
          </div>

          {/* Client Loans Section */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-800 mb-3">Client Loans ({client.loans.length})</h3>
            {client.loans.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                      <TableHead className="text-gray-700">Loan ID</TableHead>
                      <TableHead className="text-gray-700">Type</TableHead>
                      <TableHead className="text-gray-700">Purpose</TableHead>
                      <TableHead className="text-gray-700">Amount</TableHead>
                      <TableHead className="text-gray-700">Application Date</TableHead>
                      <TableHead className="text-gray-700">Duration</TableHead>
                      <TableHead className="text-gray-700">Validated By</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.loans.map((loan) => (
                      <TableRow key={loan.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="text-gray-700">{loan.id}</TableCell>
                        <TableCell className="text-gray-700">{loan.type}</TableCell>
                        <TableCell className="text-gray-700">{loan.purpose}</TableCell>
                        <TableCell className="text-gray-700">₱{loan.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-700">{loan.applicationDate}</TableCell>
                        <TableCell className="text-gray-700">{loan.duration}</TableCell>
                        <TableCell className="text-gray-700">{loan.validatedBy}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            loan.status === "Approved" ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"
                          }`}>
                            {loan.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-gray-500">This client has no loan applications.</p>
            )}
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
            onClick={() => console.log("Edit client")}
          >
            Edit Client
          </Button>
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
            data-active="true"
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
                  <UserPlus2 className="mr-2 h-4 w-4" /> New Client
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px]">
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
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter client's full name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right col-span-1 text-gray-700">
                      Gender
                    </Label>
                    <select 
                      id="gender" 
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800 rounded-md p-2"
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
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right col-span-1 text-gray-700">
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right col-span-1 text-gray-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="education" className="text-right col-span-1 text-gray-700">
                      Education
                    </Label>
                    <Input
                      id="education"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Enter education level"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maritalStatus" className="text-right col-span-1 text-gray-700">
                      Marital Status
                    </Label>
                    <select 
                      id="maritalStatus" 
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800 rounded-md p-2"
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
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
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
            <Card className="shadow-lg bg-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Client List ({clients.length})</CardTitle>
                <CardDescription className="text-gray-500">
                  Manage and review all client information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-100">
                      <TableHead className="text-gray-700">CLIENT ID</TableHead>
                      <TableHead className="text-gray-700">NAME</TableHead>
                      <TableHead className="text-gray-700">GENDER</TableHead>
                      <TableHead className="text-gray-700">CONTACT</TableHead>
                      <TableHead className="text-gray-700">LOANS</TableHead>
                      <TableHead className="text-gray-700">CREDIT SCORE</TableHead>
                      <TableHead className="text-gray-700">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClients.map((client) => (
                      <TableRow 
                        key={client.id} 
                        className="border-gray-200 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedClient(client)}
                      >
                        <TableCell className="font-medium text-gray-800">{client.id}</TableCell>
                        <TableCell className="text-gray-700">{client.name}</TableCell>
                        <TableCell className="text-gray-700">{client.gender}</TableCell>
                        <TableCell className="text-gray-700">{client.contact}</TableCell>
                        <TableCell className="text-gray-700">{client.loans.length}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              client.creditScore >= 85 ? "bg-green-700 text-green-100" : 
                              client.creditScore >= 70 ? "bg-yellow-700 text-yellow-100" : "bg-red-700 text-red-100"
                            }`}
                          >
                            {client.creditScore}
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