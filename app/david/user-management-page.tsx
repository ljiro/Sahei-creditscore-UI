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
import { ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2 , User, FileText} from "lucide-react"


const users = [
  {
    id: "USR001",
    name: "Marco Cruz",
    email: "marco.cruz@coop.ph",
    role: "Loan Officer",
    status: "Active",
    lastLogin: "2025-06-04 08:15 AM",
  },
  {
    id: "USR002",
    name: "Ms. Reyes",
    email: "ms.reyes@coop.ph",
    role: "Management (Credit Committee)",
    status: "Active",
    lastLogin: "2025-06-04 09:00 AM",
  },
  {
    id: "USR003",
    name: "David Lee",
    email: "admin.david@coop.ph",
    role: "System Administrator",
    status: "Active",
    lastLogin: "2025-06-04 10:30 AM",
  },
]

const bankBranches = [
  { id: "branch1", name: "LaTrinidad Branch" },
  { id: "branch2", name: "Baguio Branch" },
  { id: "branch3", name: "Ifugao Branch" },
  { id: "branch4", name: "Sagada Branch" },
  { id: "branch5", name: "Tublay Branch" },
]

function BranchAccessPanel({ user }: { user: typeof users[0] }) {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [role, setRole] = useState(user.role)
  const [isEditingRole, setIsEditingRole] = useState(false)

  const handleBranchToggle = (branchId: string) => {
    setSelectedBranches(prev =>
      prev.includes(branchId)
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId]
    )
  }

  const handleSaveChanges = () => {
    console.log("Saved changes for user", user.id, {
      email,
      passwordChanged: !!password,
      role,
      selectedBranches
    })
    setIsOpen(false)
    setPassword("") // Clear password field after save
    setIsEditingEmail(false)
    setIsEditingPassword(false)
    setIsEditingRole(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-sky-400 hover:text-sky-300 h-8 w-8">
          <Edit2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">User Account Management</DialogTitle>
          <DialogDescription className="text-gray-500">
            Configure user details and branch access
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* User Information Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500">User ID</Label>
              <p className="text-gray-800 font-medium">{user.id}</p>
            </div>
            <div>
              <Label className="text-gray-500">Name</Label>
              <p className="text-gray-800 font-medium">{user.name}</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-500">Role</Label>
                {!isEditingRole ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sky-600 hover:text-sky-500 h-6 px-2"
                    onClick={() => setIsEditingRole(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-gray-500 h-6 px-2"
                      onClick={() => {
                        setIsEditingRole(false)
                        setRole(user.role) // Reset to original role
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-600 hover:text-green-500 h-6 px-2"
                      onClick={() => setIsEditingRole(false)}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
              {isEditingRole ? (
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800">
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
              ) : (
                <p className="text-gray-800 font-medium">{role}</p>
              )}
            </div>
            <div>
              <Label className="text-gray-500">Status</Label>
              <p className={`font-medium ${
                user.status === "Active" ? "text-green-600" : "text-yellow-600"
              }`}>
                {user.status}
              </p>
            </div>
          </div>

          {/* Email Editing Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Email Address</h3>
              {!isEditingEmail ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sky-600 hover:text-sky-500"
                  onClick={() => setIsEditingEmail(true)}
                >
                  Edit
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-gray-500"
                    onClick={() => {
                      setIsEditingEmail(false)
                      setEmail(user.email) // Reset to original email
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-600 hover:text-green-500"
                    onClick={() => setIsEditingEmail(false)}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
            
            {isEditingEmail ? (
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
              />
            ) : (
              <p className="text-gray-700">{email}</p>
            )}
          </div>

          {/* Password Editing Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Password</h3>
              {!isEditingPassword ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sky-600 hover:text-sky-500"
                  onClick={() => setIsEditingPassword(true)}
                >
                  Change Password
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-gray-500"
                    onClick={() => {
                      setIsEditingPassword(false)
                      setPassword("") // Clear password field
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-600 hover:text-green-500"
                    onClick={() => setIsEditingPassword(false)}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
            
            {isEditingPassword && (
              <div className="space-y-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                />
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
            )}
          </div>

          {/* Branch Access Section */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-800 mb-3">Branch Access</h3>
            <div className="grid grid-cols-2 gap-2">
              {bankBranches.map(branch => (
                <div key={branch.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`branch-${branch.id}`}
                    checked={selectedBranches.includes(branch.id)}
                    onCheckedChange={() => handleBranchToggle(branch.id)}
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
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false)
              setIsEditingEmail(false)
              setIsEditingPassword(false)
              setIsEditingRole(false)
              setPassword("")
            }}
            className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function UserManagementPage() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("")

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
      className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-red-600 data-[active=true]:text-white"
      data-active="true"
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
          <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
          <div className="ml-auto flex items-center gap-3">
            <Input
              type="search"
              placeholder="Search users..."
              className="w-64 rounded-lg bg-gray-100 border-gray-200 pl-8 focus:ring-red-500"
            />
            <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <UserPlus2 className="mr-2 h-4 w-4" /> Create New User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-800 border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Create New User Account</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Enter the details for the new user. An email with provisional credentials will be sent.
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
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newUserEmail" className="text-right col-span-1 text-gray-700">
                      Organizational Email
                    </Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., jane.doe@coop.ph"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newUserRole" className="text-right col-span-1 text-gray-700">
                      Assign Role
                    </Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800">
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
                  <Button onClick={handleCreateUser} className="bg-red-600 hover:bg-red-700 text-white">
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
          <Card className="shadow-lg bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">System Users ({users.length})</CardTitle>
              <CardDescription className="text-gray-500">Manage user accounts, roles, and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-100">
                    <TableHead className="text-gray-700">User ID</TableHead>
                    <TableHead className="text-gray-700">Name</TableHead>
                    <TableHead className="text-gray-700">Email</TableHead>
                    <TableHead className="text-gray-700">Role</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-gray-700">Last Login</TableHead>
                    <TableHead className="text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-gray-200 hover:bg-gray-100">
                      <TableCell className="font-medium text-gray-800">{user.id}</TableCell>
                      <TableCell className="text-gray-700">{user.name}</TableCell>
                      <TableCell className="text-gray-700">{user.email}</TableCell>
                      <TableCell className="text-gray-700">{user.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${user.status === "Active" ? "bg-green-700 text-green-100" : "bg-yellow-700 text-yellow-100"}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700">{user.lastLogin}</TableCell>
                      <TableCell className="space-x-1">
                        <BranchAccessPanel user={user} />
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 h-8 w-8">
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}