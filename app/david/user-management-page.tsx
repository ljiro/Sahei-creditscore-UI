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
import { ChevronDown, Cog, Edit2, ListChecks, LogOut, Shield, Trash2, UserCog, UserPlus2, Users2 } from "lucide-react"

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
          >
            <UserCog className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-red-600 data-[active=true]:text-white"
            data-active="true"
          >
            <Users2 className="mr-3 h-5 w-5" /> User Management
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
                        <Button variant="ghost" size="icon" className="text-sky-400 hover:text-sky-300 h-8 w-8">
                          <Edit2 size={16} />
                        </Button>
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
