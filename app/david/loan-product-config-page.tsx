"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChevronDown,
  Cog,
  Edit2,
  ListChecks,
  LogOut,
  Shield,
  Trash2,
  UserCog,
  Users2,
  PackagePlus,
  CheckSquare,
  XSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const loanProducts = [
  {
    id: "LP001",
    name: "Business Loan",
    interestRate: "1.5% monthly",
    maxAmount: "₱500,000",
    minTerm: 6,
    maxTerm: 36,
    status: "Active",
  },
  {
    id: "LP002",
    name: "Salary Loan",
    interestRate: "1.2% monthly",
    maxAmount: "₱100,000",
    minTerm: 3,
    maxTerm: 24,
    status: "Active",
  },
  {
    id: "LP003",
    name: "Emergency Loan",
    interestRate: "2.0% monthly",
    maxAmount: "₱50,000",
    minTerm: 1,
    maxTerm: 12,
    status: "Active",
  },
]

export default function LoanProductConfigPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProductName, setNewProductName] = useState("")
  const [newInterestRate, setNewInterestRate] = useState("")
  const [newMaxAmount, setNewMaxAmount] = useState("")
  const [newMinTerm, setNewMinTerm] = useState("")
  const [newMaxTerm, setNewMaxTerm] = useState("")
  const [newProductDescription, setNewProductDescription] = useState("")

  const handleAddProduct = () => {
    if (newProductName && newInterestRate && newMaxAmount && newMinTerm && newMaxTerm) {
      loanProducts.push({
        id: `LP${String(loanProducts.length + 1).padStart(3, "0")}`,
        name: newProductName,
        interestRate: newInterestRate,
        maxAmount: newMaxAmount,
        minTerm: Number.parseInt(newMinTerm),
        maxTerm: Number.parseInt(newMaxTerm),
        status: "Active",
      })
      console.log("New loan product added:", { name: newProductName })
      setIsAddProductOpen(false)
      // Reset form fields
      setNewProductName("")
      setNewInterestRate("")
      setNewMaxAmount("")
      setNewMinTerm("")
      setNewMaxTerm("")
      setNewProductDescription("")
      alert("New loan product 'Back-to-School Loan' (Education Loan) saved and activated!")
    } else {
      alert("Please fill all required fields.")
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
          <Button variant="ghost" className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <Users2 className="mr-3 h-5 w-5" /> User Management
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-red-600 data-[active=true]:text-white"
            data-active="true"
          >
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
          <h1 className="text-xl font-semibold text-gray-800">Loan Product Configuration</h1>
          <div className="ml-auto flex items-center gap-3">
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <PackagePlus className="mr-2 h-4 w-4" /> Add New Loan Product
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-900 border-gray-200 sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="text-xl text-gray-800">Add New Loan Product</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Define the parameters for the new loan product. This will be available to members immediately upon
                    activation.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newProductName" className="text-right col-span-1 text-gray-700">
                      Product Name
                    </Label>
                    <Input
                      id="newProductName"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., Education Loan"
                      defaultValue="Education Loan"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newProductDescription" className="text-right col-span-1 text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      id="newProductDescription"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="Brief description for members"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newInterestRate" className="text-right col-span-1 text-gray-700">
                      Interest Rate
                    </Label>
                    <Input
                      id="newInterestRate"
                      value={newInterestRate}
                      onChange={(e) => setNewInterestRate(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., 1.0% monthly or 12% annually"
                      defaultValue="1.0% monthly"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newMaxAmount" className="text-right col-span-1 text-gray-700">
                      Max Loan Amount (₱)
                    </Label>
                    <Input
                      id="newMaxAmount"
                      type="number"
                      value={newMaxAmount}
                      onChange={(e) => setNewMaxAmount(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., 75000"
                      defaultValue="75000"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newMinTerm" className="text-right col-span-1 text-gray-700">
                      Min Repayment Term (Months)
                    </Label>
                    <Input
                      id="newMinTerm"
                      type="number"
                      value={newMinTerm}
                      onChange={(e) => setNewMinTerm(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., 6"
                      defaultValue="6"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newMaxTerm" className="text-right col-span-1 text-gray-700">
                      Max Repayment Term (Months)
                    </Label>
                    <Input
                      id="newMaxTerm"
                      type="number"
                      value={newMaxTerm}
                      onChange={(e) => setNewMaxTerm(e.target.value)}
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., 12"
                      defaultValue="12"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requiredDocs" className="text-right col-span-1 text-gray-700">
                      Required Documents
                    </Label>
                    <Input
                      id="requiredDocs"
                      className="col-span-3 bg-gray-100 border-gray-200 focus:ring-red-500 text-gray-800"
                      placeholder="e.g., School Assessment, ID (comma-separated)"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right col-span-1 text-gray-700">
                      Activate Product
                    </Label>
                    <Switch id="isActive" defaultChecked className="col-span-3 data-[state=checked]:bg-red-500" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddProductOpen(false)}
                    className="text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct} className="bg-red-600 hover:bg-red-700 text-white">
                    Save and Activate
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
              <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Card className="shadow-lg bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Current Loan Products ({loanProducts.length})</CardTitle>
              <CardDescription className="text-gray-500">
                Manage existing loan products offered by the cooperative.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-100">
                    <TableHead className="text-gray-700">Product ID</TableHead>
                    <TableHead className="text-gray-700">Name</TableHead>
                    <TableHead className="text-gray-700">Interest Rate</TableHead>
                    <TableHead className="text-gray-700">Max Amount</TableHead>
                    <TableHead className="text-gray-700">Term (Months)</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanProducts.map((product) => (
                    <TableRow key={product.id} className="border-gray-200 hover:bg-gray-100">
                      <TableCell className="font-medium text-gray-800">{product.id}</TableCell>
                      <TableCell className="text-gray-800">{product.name}</TableCell>
                      <TableCell className="text-gray-800">{product.interestRate}</TableCell>
                      <TableCell className="text-gray-800">{product.maxAmount}</TableCell>
                      <TableCell className="text-gray-800">
                        {product.minTerm} - {product.maxTerm}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${product.status === "Active" ? "bg-green-700 text-green-100" : "bg-gray-600 text-gray-200"}`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-1">
                        <Button variant="ghost" size="icon" className="text-sky-400 hover:text-sky-300 h-8 w-8">
                          <Edit2 size={16} />
                        </Button>
                        {product.status === "Active" ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Deactivate"
                            className="text-yellow-400 hover:text-yellow-300 h-8 w-8"
                          >
                            <XSquare size={16} />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Activate"
                            className="text-green-400 hover:text-green-300 h-8 w-8"
                          >
                            <CheckSquare size={16} />
                          </Button>
                        )}
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
