"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import {
  ChevronDown,
  Edit2,
  Trash2,
  UserCog,
  UserPlus2,
  User,
  Search,
  ArrowUpDown,
  Info,
  BadgeInfo,
  Calendar,
  Phone,
  Home,
  Users2,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive" | "Pending"
  lastLogin: string
  branches: string[]
  coops: string[]
  permissions: string[]
  createdDate: string
}

const initialUsers: UserData[] = [
  {
    id: "USR001",
    name: "Marco Cruz",
    email: "marco.cruz@coop.ph",
    role: "Loan Officer",
    status: "Active",
    lastLogin: "2025-06-04 08:15 AM",
    branches: ["LaTrinidad Branch", "Baguio Branch"],
    coops: ["coop1", "coop2"],
    permissions: ["loans", "clients"],
    createdDate: "2024-01-15",
  },
  {
    id: "USR002",
    name: "Ms. Reyes",
    email: "ms.reyes@coop.ph",
    role: "Management (Credit Committee)",
    status: "Active",
    lastLogin: "2025-06-04 09:00 AM",
    branches: ["All Branches"],
    coops: ["coop1", "coop2", "coop3", "coop4"],
    permissions: ["loans", "clients", "reports", "users"],
    createdDate: "2023-11-20",
  },
  {
    id: "USR003",
    name: "David Lee",
    email: "admin.david@coop.ph",
    role: "System Administrator",
    status: "Active",
    lastLogin: "2025-06-04 10:30 AM",
    branches: ["All Branches"],
    coops: ["coop1", "coop2", "coop3", "coop4"],
    permissions: ["loans", "clients", "reports", "users", "system"],
    createdDate: "2023-01-10",
  },
]

const bankBranches = [
  { id: "branch1", name: "LaTrinidad Branch" },
  { id: "branch2", name: "Baguio Branch" },
  { id: "branch3", name: "Ifugao Branch" },
  { id: "branch4", name: "Sagada Branch" },
  { id: "branch5", name: "Tublay Branch" },
]

const cooperatives = [
  { id: "coop1", name: "Baguio Cooperative" },
  { id: "coop2", name: "La Trinidad Cooperative" },
  { id: "coop3", name: "Benguet Cooperative" },
  { id: "coop4", name: "Cordillera Cooperative" },
]

const availablePermissions = [
  { id: "loans", name: "Loan Management", description: "Create, view, and manage loans" },
  { id: "clients", name: "Client Management", description: "Manage client accounts and information" },
  { id: "reports", name: "Reports & Analytics", description: "Generate and view reports" },
  { id: "users", name: "User Management", description: "Manage system users and permissions" },
  { id: "system", name: "System Administration", description: "Full system access and configuration" },
]

const userRoles = [
  { value: "Cashier", label: "Cashier (Access to Post Payment)" },
  { value: "Loan Officer", label: "Loan Officer" },
  { value: "Credit Committee", label: "Credit Committee" },
  { value: "Branch Manager", label: "Branch Manager" },
  { value: "System Administrator", label: "System Administrator" },
]

function UserDetailsPanel({
  user,
  onClose,
  onEdit,
  onDelete,
}: {
  user: UserData
  onClose: () => void
  onEdit: (user: UserData) => void
  onDelete: (userId: string) => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg max-h-[90vh] overflow-y-auto">
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
              <DialogDescription className="text-gray-500">User account details and permissions</DialogDescription>
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
                    <p
                      className={`font-medium ${
                        user.status === "Active"
                          ? "text-green-600"
                          : user.status === "Inactive"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
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
                      {user.branches.length > 2 ? `${user.branches.length} branches` : user.branches.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-500" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Email Address</Label>
                  <p className="text-gray-800 font-medium">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">User Role</Label>
                  <p className="text-gray-800 font-medium">{user.role}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Account Created</Label>
                  <p className="text-gray-800 font-medium">{user.createdDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Account Status</Label>
                  <Badge
                    variant={
                      user.status === "Active" ? "default" : user.status === "Inactive" ? "destructive" : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.permissions.map((permissionId) => {
                    const permission = availablePermissions.find((p) => p.id === permissionId)
                    return (
                      <div key={permissionId} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-700">{permission?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Access Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Home className="h-5 w-5 text-amber-500" />
                  Branch Access ({user.branches.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.branches.map((branch, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-700">{branch}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-green-500" />
                  Cooperative Access ({user.coops.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.coops.map((coopId) => {
                    const coop = cooperatives.find((c) => c.id === coopId)
                    return (
                      <div key={coopId} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-700">{coop?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user "{user.name}" and revoke all
                    access permissions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(user.id)} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => onEdit(user)} className="bg-blue-600 hover:bg-blue-700">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UserFormDialog({
  user,
  isOpen,
  onClose,
  onSave,
  mode,
}: {
  user?: UserData
  isOpen: boolean
  onClose: () => void
  onSave: (user: UserData) => void
  mode: "create" | "edit"
}) {
  const [formData, setFormData] = useState<Partial<UserData>>(
    user || {
      name: "",
      email: "",
      role: "",
      status: "Active",
      branches: [],
      coops: [],
      permissions: [],
    },
  )
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBranchToggle = (branchName: string) => {
    setFormData((prev) => ({
      ...prev,
      branches: prev.branches?.includes(branchName)
        ? prev.branches.filter((b) => b !== branchName)
        : [...(prev.branches || []), branchName],
    }))
  }

  const handleCoopToggle = (coopId: string) => {
    setFormData((prev) => ({
      ...prev,
      coops: prev.coops?.includes(coopId) ? prev.coops.filter((c) => c !== coopId) : [...(prev.coops || []), coopId],
    }))
  }

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions?.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...(prev.permissions || []), permissionId],
    }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (mode === "create" && !password) {
      toast({
        title: "Password Required",
        description: "Please enter a password for the new user.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: UserData = {
      ...formData,
      id: user?.id || `USR${String(Date.now()).slice(-3)}`,
      lastLogin: user?.lastLogin || "Never",
      createdDate: user?.createdDate || new Date().toISOString().split("T")[0],
    } as UserData

    onSave(newUser)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New User" : `Edit User - ${user?.name}`}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Fill out the details for the new user account" : "Update the user information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password (for new users or password change) */}
          {mode === "create" && (
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {password && (
                <p className="text-xs text-gray-500 mt-1">
                  Password strength: {password.length < 6 ? "Weak" : password.length < 10 ? "Moderate" : "Strong"}
                </p>
              )}
            </div>
          )}

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">User Role *</Label>
              <Select value={formData.role || ""} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || "Active"}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <Label className="text-base font-medium">Permissions</Label>
            <div className="mt-3 space-y-3">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={formData.permissions?.includes(permission.id) || false}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                      {permission.name}
                    </Label>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch Access */}
          <div>
            <Label className="text-base font-medium">Branch Access</Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {bankBranches.map((branch) => (
                <div key={branch.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`branch-${branch.id}`}
                    checked={formData.branches?.includes(branch.name) || false}
                    onCheckedChange={() => handleBranchToggle(branch.name)}
                  />
                  <Label htmlFor={`branch-${branch.id}`} className="text-sm">
                    {branch.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Cooperative Access */}
          <div>
            <Label className="text-base font-medium">Cooperative Access</Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {cooperatives.map((coop) => (
                <div key={coop.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`coop-${coop.id}`}
                    checked={formData.coops?.includes(coop.id) || false}
                    onCheckedChange={() => handleCoopToggle(coop.id)}
                  />
                  <Label htmlFor={`coop-${coop.id}`} className="text-sm">
                    {coop.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {mode === "create" ? "Create User" : "Update User"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>(initialUsers)
  const [searchText, setSearchText] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  const filteredUsers = users.filter((user) => {
    return (
      user.id.toLowerCase().includes(searchText.toLowerCase()) ||
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "none") return 0
    if (sortOrder === "asc") return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc"
      if (prev === "asc") return "desc"
      return "none"
    })
  }

  const handleCreateUser = (newUser: UserData) => {
    setUsers((prev) => [...prev, newUser])
    setIsCreateDialogOpen(false)

    toast({
      title: "Success",
      description: `User ${newUser.name} has been created successfully.`,
    })
  }

  const handleUpdateUser = (updatedUser: UserData) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setEditingUser(null)
    setSelectedUser(updatedUser)

    toast({
      title: "Success",
      description: `User ${updatedUser.name} has been updated successfully.`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId)
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setSelectedUser(null)

    toast({
      title: "Success",
      description: `User ${userToDelete?.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    setSelectedUser(null)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage system users and permissions</p>
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
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-gray-800">System Users ({filteredUsers.length})</CardTitle>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus2 className="mr-2 h-4 w-4" />
                New User
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search Users..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
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
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
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
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
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
                        variant={
                          user.status === "Active"
                            ? "default"
                            : user.status === "Inactive"
                              ? "destructive"
                              : "secondary"
                        }
                        className="flex items-center gap-1 w-fit"
                      >
                        <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      {selectedUser && (
        <UserDetailsPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      <UserFormDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateUser}
        mode="create"
      />

      {editingUser && (
        <UserFormDialog
          user={editingUser}
          isOpen={true}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
          mode="edit"
        />
      )}
    </div>
  )
}
