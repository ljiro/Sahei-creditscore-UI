"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, ChevronDown } from "lucide-react"

interface LoanProduct {
  id: string
  name: string
  interestRate: number
  maxAmount: number
  termMonths: number
  status: "Active" | "Inactive"
  description: string
}

export default function LoanProductConfigPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const loanProducts: LoanProduct[] = [
    {
      id: "LP001",
      name: "Personal Loan",
      interestRate: 12.5,
      maxAmount: 100000,
      termMonths: 60,
      status: "Active",
      description: "General purpose personal loan",
    },
    {
      id: "LP002",
      name: "Business Loan",
      interestRate: 10.0,
      maxAmount: 500000,
      termMonths: 120,
      status: "Active",
      description: "Small business financing",
    },
    {
      id: "LP003",
      name: "Auto Loan",
      interestRate: 8.5,
      maxAmount: 200000,
      termMonths: 84,
      status: "Active",
      description: "Vehicle financing",
    },
    {
      id: "LP004",
      name: "Home Mortgage",
      interestRate: 6.5,
      maxAmount: 1000000,
      termMonths: 360,
      status: "Active",
      description: "Home purchase financing",
    },
    {
      id: "LP005",
      name: "Emergency Loan",
      interestRate: 15.0,
      maxAmount: 50000,
      termMonths: 24,
      status: "Inactive",
      description: "Quick emergency funding",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Loan Product Configuration</h1>
          <p className="text-gray-500">Manage loan products and their parameters</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Loan Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Loan Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input id="interest-rate" type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-amount">Maximum Amount ($)</Label>
                    <Input id="max-amount" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="term-months">Term (Months)</Label>
                    <Input id="term-months" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save and Activate</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                  <TableRow key={product.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{product.id}</TableCell>
                    <TableCell className="text-gray-900">{product.name}</TableCell>
                    <TableCell className="text-gray-900">{product.interestRate}%</TableCell>
                    <TableCell className="text-gray-900">${product.maxAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-900">{product.termMonths}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
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
  )
}
