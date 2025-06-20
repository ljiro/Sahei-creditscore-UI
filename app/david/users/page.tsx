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
import { ChevronDown, UploadCloud, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2, User, FileText, Search, ArrowUpDown, X, Info, BadgeInfo, Calendar, Phone, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Book } from "lucide-react";

const users = [
  {
    id: "USR001",
    name: "Marco Cruz",
    email: "marco.cruz@coop.ph",
    role: "Loan Officer",
    status: "Active",
    lastLogin: "2025-06-04 08:15 AM",
    branches: ["LaTrinidad Branch", "Baguio Branch"],
    coops: ["coop1", "coop2"]
  },
  {
    id: "USR002",
    name: "Ms. Reyes",
    email: "ms.reyes@coop.ph",
    role: "Management (Credit Committee)",
    status: "Active",
    lastLogin: "2025-06-04 09:00 AM",
    branches: ["All Branches"],
    coops: ["coop1", "coop2", "coop3", "coop4"]
  },
  {
    id: "USR003",
    name: "David Lee",
    email: "admin.david@coop.ph",
    role: "System Administrator",
    status: "Active",
    lastLogin: "2025-06-04 10:30 AM",
    branches: ["All Branches"],
    coops: ["coop1", "coop2", "coop3", "coop4"]
  },
]

const bankBranches = [
  { id: "branch1", name: "LaTrinidad Branch" },
  { id: "branch2", name: "Baguio Branch" },
  { id: "branch3", name: "Ifugao Branch" },
  { id: "branch4", name: "Sagada Branch" },
  { id: "branch5", name: "Tublay Branch" },
]

function UserDetailsPanel({ user, onClose }: { user: typeof users[0], onClose: () => void }) {
  const [selectedBranches, setSelectedBranches] = useState<string[]>(user.branches)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [role, setRole] = useState(user.role)
  const [isEditingRole, setIsEditingRole] = useState(false)
    const [selectedCoops, setSelectedCoops] = useState<string[]>(user.coops || [])


    const cooperatives = [
    { id: "coop1", name: "Baguio Cooperative" },
    { id: "coop2", name: "La Trinidad Cooperative" },
    { id: "coop3", name: "Benguet Cooperative" },
    { id: "coop4", name: "Cordillera Cooperative" },
  ]

  const handleBranchToggle = (branchId: string) => {
    setSelectedBranches(prev =>
      prev.includes(branchId)
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId]
    )
  }

   const handleCoopToggle = (coopId: string) => {
    setSelectedCoops(prev =>
      prev.includes(coopId)
        ? prev.filter(id => id !== coopId)
        : [...prev, coopId]
    )
  }


    const handleSaveChanges = () => {
    console.log("Saved changes for user", user.id, {
      email,
      passwordChanged: !!password,
      role,
      selectedBranches,
      selectedCoops
    })
    onClose()
    setPassword("")
    setIsEditingEmail(false)
    setIsEditingPassword(false)
    setIsEditingRole(false)
  }


  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <UserCog className="h-6 w-6" />
                {user.name}
                <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                  {user.id}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                User account details and permissions
              </DialogDescription>
            </div>
         
          </div>
        </DialogHeader>
        
        <div className="grid gap-8 py-4">
          {/* User Overview Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                User Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-50">
                    <BadgeInfo className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-800">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-50">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium text-gray-800">{user.lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-50">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${
                      user.status === "Active" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {user.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-50">
                    <Home className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Branch Access</p>
                    <p className="font-medium text-gray-800 line-clamp-1">
                      {user.branches.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Account Information Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-500" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* Email */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-sm text-gray-700">Email Address</Label>
                  <div className="col-span-2">
                    {isEditingEmail ? (
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                        />
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setIsEditingEmail(false)
                              setEmail(user.email)
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => setIsEditingEmail(false)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800">{email}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-500"
                          onClick={() => setIsEditingEmail(true)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-sm text-gray-700">Password</Label>
                  <div className="col-span-2">
                    {isEditingPassword ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                          />
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setIsEditingPassword(false)
                                setPassword("")
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => setIsEditingPassword(false)}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="showPassword"
                            checked={showPassword}
                            onCheckedChange={(checked) => setShowPassword(!!checked)}
                          />
                          <label
                            htmlFor="showPassword"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                          >
                            Show password
                          </label>
                        </div>
                        {password && (
                          <p className="text-xs text-gray-500">
                            Password strength: {password.length < 6 ? "Weak" : password.length < 10 ? "Moderate" : "Strong"}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800">••••••••</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-500"
                          onClick={() => setIsEditingPassword(true)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" /> Change Password
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-sm text-gray-700">User Role</Label>
                  <div className="col-span-2">
                    {isEditingRole ? (
                      <div className="flex gap-2">
                        <Select value={role} onValueChange={setRole} className="w-full">
                          <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-gray-800 border-gray-200">
                            <SelectItem value="Cashier" className="hover:bg-gray-100 hover:text-gray-900">
                              Cashier (Access to Post Payment)
                            </SelectItem>
                            <SelectItem value="Loan Officer" className="hover:bg-gray-100 hover:text-gray-900">
                              Loan Officer
                            </SelectItem>
                            <SelectItem value="Credit Committee" className="hover:bg-gray-100 hover:text-gray-900">
                              Credit Committee
                            </SelectItem>
                            <SelectItem value="Branch Manager" className="hover:bg-gray-100 hover:text-gray-900">
                              Branch Manager
                            </SelectItem>
                            <SelectItem value="System Administrator" className="hover:bg-gray-100 hover:text-gray-900">
                              System Administrator
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setIsEditingRole(false)
                              setRole(user.role)
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => setIsEditingRole(false)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800">{role}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-500"
                          onClick={() => setIsEditingRole(true)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branch Access Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Home className="h-5 w-5 text-amber-500" />
                  Branch Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {bankBranches.map(branch => (
                    <div key={branch.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`branch-${branch.id}`}
                        checked={selectedBranches.includes(branch.name)}
                        onCheckedChange={() => handleBranchToggle(branch.name)}
                      />
                      <label
                        htmlFor={`branch-${branch.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                      >
                        {branch.name}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

             <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-500" />
              Cooperative Access
            </CardTitle>
            <CardDescription className="text-gray-500">
              Select which cooperatives this user can access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cooperatives.map(coop => (
                <div key={coop.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`coop-${coop.id}`}
                    checked={selectedCoops.includes(coop.id)}
                    onCheckedChange={() => handleCoopToggle(coop.id)}
                  />
                  <label
                    htmlFor={`coop-${coop.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  >
                    {coop.name}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
      </Card>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => console.log("Delete user")}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
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
                onClick={handleSaveChanges}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function UserManagementPage() {

  const pathname = usePathname()
  const [searchText, setSearchText] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("")

  const filteredUsers = users.filter(user => {
    return user.id.toLowerCase().includes(searchText.toLowerCase()) ||
           user.name.toLowerCase().includes(searchText.toLowerCase()) ||
           user.email.toLowerCase().includes(searchText.toLowerCase())
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
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

  const handleCreateUser = () => {
    if (newUserName && newUserEmail && newUserRole) {
      // Add user to list (in real app, call API)
      users.push({
        id: `USR${String(users.length + 1).padStart(3, "0")}`,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        status: "Pending Activation",
        lastLogin: "Never",
        branches: [],
        coops: [],
      })
      console.log("New user created:", { name: newUserName, email: newUserEmail, role: newUserRole })
      setIsCreateUserOpen(false)
      setNewUserName("")
      setNewUserEmail("")
      setNewUserRole("")
      alert("User account created and provisional credentials sent.")
    } else {
      alert("Please fill all fields.")
    }
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
              <User className="mr-3 h-5 w-5" /> members
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
          <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search users..."
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
            <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus2 className="mr-2 h-4 w-4" /> New User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200 sm:max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Create New User</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Fill out the details for the new user account
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newUserName" className="text-right col-span-1 text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="newUserName"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newUserEmail" className="text-right col-span-1 text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800"
                      placeholder="e.g., jane.doe@coop.ph"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newUserRole" className="text-right col-span-1 text-gray-700">
                      Role
                    </Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger className="col-span-3 bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-800">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-800 border-gray-200">
                        <SelectItem value="Cashier" className="hover:bg-gray-100 hover:text-gray-900">
                          Cashier (Access to Post Payment)
                        </SelectItem>
                        <SelectItem value="Loan Officer" className="hover:bg-gray-100 hover:text-gray-900">
                          Loan Officer
                        </SelectItem>
                        <SelectItem value="Credit Committee" className="hover:bg-gray-100 hover:text-gray-900">
                          Credit Committee
                        </SelectItem>
                        <SelectItem value="Branch Manager" className="hover:bg-gray-100 hover:text-gray-900">
                          Branch Manager
                        </SelectItem>
                        <SelectItem value="System Administrator" className="hover:bg-gray-100 hover:text-gray-900">
                          System Administrator
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateUserOpen(false)}
                    className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleCreateUser}
                  >
                    Create User
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
          {selectedUser ? (
            <UserDetailsPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-800">System Users</CardTitle>
                    <CardDescription className="text-gray-500">
                      {users.length} active users
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
                      <TableHead className="text-gray-600 font-medium">USER ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">NAME</TableHead>
                      <TableHead className="text-gray-600 font-medium">EMAIL</TableHead>
                      <TableHead className="text-gray-600 font-medium">ROLE</TableHead>
                      <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
                      <TableHead className="text-gray-600 font-medium">LAST LOGIN</TableHead>
                      <TableHead className="text-gray-600 font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedUsers.map((user) => (
                      <TableRow 
                        key={user.id} 
                        className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <TableCell className="font-medium text-gray-800">{user.id}</TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-100 text-blue-800">
                                {user.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">{user.email}</TableCell>
                        <TableCell className="text-gray-700">
                          <Badge variant="outline" className="border-gray-200 text-gray-600">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === "Active" ? "default" : "outline"}
                            className="flex items-center gap-1"
                          >
                            <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-500 hover:text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedUser(user)
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log("Delete user", user.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
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