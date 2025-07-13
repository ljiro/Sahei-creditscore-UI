"use client";

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
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
  Trash2,
  Search,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit2,
  FilePlus2,
  Info,
  Calendar,
  BarChart2,
  Save,
  Eye,
  Loader2,
} from "lucide-react"
import { useRef } from "react";
import HybridWebView from "../hybridwebview/HybridWebView.js";

const statusStyles = {
  Approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  Disbursed: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Paid: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
}

type LoanStatus = keyof typeof statusStyles

interface Payment {
  id: string
  date: string
  amount: number
  principal: number
  interest: number
  remainingBalance: number
  status: "Paid" | "Pending" | "Overdue"
  method?: string
}

interface Loan {
  id: number
  clientName: string
  clientId: string
  type: string
  purpose: string
  amount: number
  applicationDate: string
  duration: string
  status: LoanStatus
  interestRate: string
  remainingBalance: number
  nextPayment: string
  validatedBy: string
  creditScore: number
  coApplicantNumber: number
  guarantorNumber: number
  paymentHistory: Payment[]
  monthlyPayment: number
  collateralType?: string
  paymentFrequency: string
}

const initialLoans: Loan[] = [
  {
    id: 1,
    clientName: "Juan Dela Cruz",
    clientId: "CL001",
    type: "Personal Loan",
    purpose: "Home Renovation",
    amount: 50000,
    applicationDate: "2025-05-15",
    duration: "12 months",
    status: "Disbursed",
    interestRate: "12%",
    remainingBalance: 42000,
    nextPayment: "2025-06-15",
    validatedBy: "Maria Santos",
    creditScore: 85,
    coApplicantNumber: 2,
    guarantorNumber: 1,
    monthlyPayment: 4500,
    collateralType: "Secured",
    paymentFrequency: "Monthly",
    paymentHistory: [
      {
        id: "PAY001",
        date: "2025-05-15",
        amount: 4500,
        principal: 3750,
        interest: 750,
        remainingBalance: 46250,
        status: "Paid",
        method: "Bank Transfer",
      },
      {
        id: "PAY002",
        date: "2025-06-15",
        amount: 4500,
        principal: 3787,
        interest: 713,
        remainingBalance: 42463,
        status: "Paid",
        method: "Cash",
      },
    ],
  },
  {
    id: 2,
    clientName: "Maria Santos",
    clientId: "CL002",
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
    guarantorNumber: 2,
    monthlyPayment: 6875,
    collateralType: "Secured",
    paymentFrequency: "Monthly",
    paymentHistory: [],
  },
]

function PaymentDialog({
  loan,
  isOpen,
  onClose,
  onProcessPayment,
}: {
  loan: Loan
  isOpen: boolean
  onClose: () => void
  onProcessPayment: (loanId: number, payment: Omit<Payment, "id">) => void
}) {
  const [paymentData, setPaymentData] = useState({
    amount: loan.monthlyPayment,
    date: new Date().toISOString().split("T")[0],
    method: "Cash",
    notes: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const interestAmount = (loan.remainingBalance * 0.12) / 12 // Monthly interest
    const principalAmount = paymentData.amount - interestAmount
    const newBalance = Math.max(0, loan.remainingBalance - principalAmount)

    const payment: Omit<Payment, "id"> = {
      date: paymentData.date,
      amount: paymentData.amount,
      principal: principalAmount,
      interest: interestAmount,
      remainingBalance: newBalance,
      status: "Paid",
      method: paymentData.method,
    }

    onProcessPayment(loan.id, payment)
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Process Payment - {loan.id}</DialogTitle>
          <DialogDescription>Record a new payment for this loan</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Payment Amount (₱) *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Payment Date *</Label>
              <Input
                id="date"
                type="date"
                value={paymentData.date}
                onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select
              value={paymentData.method}
              onValueChange={(value) => setPaymentData({ ...paymentData, method: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
                <SelectItem value="Online Payment">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={paymentData.notes}
              onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              rows={2}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Payment Breakdown</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Principal: ₱{(paymentData.amount - (loan.remainingBalance * 0.12) / 12).toFixed(2)}</div>
              <div>Interest: ₱{((loan.remainingBalance * 0.12) / 12).toFixed(2)}</div>
              <div>Current Balance: ₱{loan.remainingBalance.toLocaleString()}</div>
              <div>
                New Balance: ₱
                {Math.max(
                  0,
                  loan.remainingBalance - (paymentData.amount - (loan.remainingBalance * 0.12) / 12),
                ).toFixed(2)}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Process Payment
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function LoanDetailsPanel({
  loan,
  onClose,
  onEdit,
  onDelete,
  onProcessPayment,
}: {
  loan: Loan
  onClose: () => void
  onEdit: (loan: Loan) => void
  onDelete: (loanId: number) => void
  onProcessPayment: (loanId: number, payment: Omit<Payment, "id">) => void
}) {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-lg max-h-[90vh] overflow-y-auto">
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

          {/* Loan Details and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <Label className="text-sm text-gray-500">Monthly Payment</Label>
                    <p className="text-gray-800 font-medium">₱{loan.monthlyPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Payment Frequency</Label>
                    <p className="text-gray-800 font-medium">{loan.paymentFrequency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {loan.status === "Approved" || loan.status === "Disbursed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : loan.status === "Pending" ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  Status & Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-500">Current Status</Label>
                    <Badge className={`flex items-center gap-1 ${statusStyles[loan.status]}`}>
                      <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      {loan.status}
                    </Badge>
                  </div>
                  {loan.status === "Pending" && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Actions</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                          Decline
                        </Button>
                      </div>
                    </div>
                  )}
                  {(loan.status === "Approved" || loan.status === "Disbursed") && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Payment Actions</Label>
                      <Button
                        onClick={() => setIsPaymentDialogOpen(true)}
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Process Payment
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                Payment History ({loan.paymentHistory.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loan.paymentHistory.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="hover:bg-gray-50">
                        <TableHead className="text-gray-600 font-medium">Date</TableHead>
                        <TableHead className="text-gray-600 font-medium">Amount</TableHead>
                        <TableHead className="text-gray-600 font-medium">Principal</TableHead>
                        <TableHead className="text-gray-600 font-medium">Interest</TableHead>
                        <TableHead className="text-gray-600 font-medium">Balance</TableHead>
                        <TableHead className="text-gray-600 font-medium">Method</TableHead>
                        <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loan.paymentHistory.map((payment) => (
                        <TableRow key={payment.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="text-gray-700">{payment.date}</TableCell>
                          <TableCell className="text-gray-700 font-medium">
                            ₱{payment.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-700">₱{payment.principal.toFixed(2)}</TableCell>
                          <TableCell className="text-gray-700">₱{payment.interest.toFixed(2)}</TableCell>
                          <TableCell className="text-gray-700">₱{payment.remainingBalance.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-700">{payment.method}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="flex items-center gap-1">
                              <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                              </svg>
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <DollarSign className="h-10 w-10 text-gray-300 mb-3" />
                  <h4 className="text-gray-500 font-medium">No payment history</h4>
                  <p className="text-gray-400 text-sm mt-1">Payments will appear here once processed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex justify-between w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Loan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the loan "{loan.id}" and all associated
                    payment history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(loan.id)} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => onEdit(loan)} className="bg-blue-600 hover:bg-blue-700">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Loan
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>

      <PaymentDialog
        loan={loan}
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onProcessPayment={onProcessPayment}
      />
    </Dialog>
  )
}

function LoanFormDialog({
  loan,
  isOpen,
  onClose,
  onSave,
  mode,
}: {
  loan?: Loan
  isOpen: boolean
  onClose: () => void
  onSave: (loan: Loan) => void
  mode: "create" | "edit"
}) {
  const [formData, setFormData] = useState<Partial<Loan>>(
    loan || {
      clientName: "",
      clientId: "",
      type: "",
      purpose: "",
      amount: 0,
      duration: "12 months",
      status: "Pending",
      interestRate: "12%",
      paymentFrequency: "Monthly",
      collateralType: "Unsecured",
      coApplicantNumber: 0,
      guarantorNumber: 0,
    },
  )
  const [loanDuration, setLoanDuration] = useState(12)

  const formatDuration = (months: number) => {
    if (months < 12) return `${months} month${months > 1 ? "s" : ""}`
    if (months % 12 === 0) {
      const years = months / 12
      return `${years} year${years > 1 ? "s" : ""}`
    }
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return `${years}y ${remainingMonths}m`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const monthlyPayment = formData.amount ? (formData.amount * 1.12) / loanDuration : 0

    const newLoan: Loan = {
      ...formData,
      id: loan?.id || `LN${String(Date.now()).slice(-3)}`,
      applicationDate: loan?.applicationDate || new Date().toISOString().split("T")[0],
      duration: `${loanDuration} months`,
      remainingBalance: loan?.remainingBalance || formData.amount || 0,
      nextPayment: loan?.nextPayment || "N/A",
      validatedBy: loan?.validatedBy || "System",
      creditScore: loan?.creditScore || 75,
      monthlyPayment,
      paymentHistory: loan?.paymentHistory || [],
    } as Loan

    onSave(newLoan)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Register New Loan" : `Edit Loan - ${loan?.id}`}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Fill out the details for the new loan" : "Update the loan information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName || ""}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={formData.clientId || ""}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Loan Type *</Label>
              <Select value={formData.type || ""} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                  <SelectItem value="Business Loan">Business Loan</SelectItem>
                  <SelectItem value="Emergency Loan">Emergency Loan</SelectItem>
                  <SelectItem value="Auto Loan">Auto Loan</SelectItem>
                  <SelectItem value="Home Loan">Home Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Loan Amount (₱) *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={formData.amount || 0}
                onChange={(e) => setFormData({ ...formData, amount: Number.parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose *</Label>
            <Input
              id="purpose"
              value={formData.purpose || ""}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="collateralType">Collateral Type</Label>
              <Select
                value={formData.collateralType || "Unsecured"}
                onValueChange={(value) => setFormData({ ...formData, collateralType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Secured">Secured</SelectItem>
                  <SelectItem value="Unsecured">Unsecured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select
                value={formData.paymentFrequency || "Monthly"}
                onValueChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                  <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                id="duration"
                min={1}
                max={60}
                step={1}
                value={[loanDuration]}
                onValueChange={(value) => setLoanDuration(value[0])}
                className="flex-1"
              />
              <div className="w-32">
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={loanDuration}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (!Number.isNaN(value) && value >= 1 && value <= 60) {
                      setLoanDuration(value)
                    }
                  }}
                  className="text-right"
                />
                <p className="text-xs text-gray-500 mt-1">{formatDuration(loanDuration)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interestRate">Interest Rate</Label>
              <Input
                id="interestRate"
                value={formData.interestRate || "12%"}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || "Pending"}
                onValueChange={(value) => setFormData({ ...formData, status: value as LoanStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                  <SelectItem value="Disbursed">Disbursed</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === "create" ? "Register Loan" : "Update Loan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans)
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [updateLoan, setUpdateLoan] = useState<Loan | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null)
  const hasRequestedUpdate = useRef<boolean>(false);


   // HybridWebView integration for receiving loan data from .NET
    useEffect(() => {
    (window as any).globalSetLoans = (dataFromDotNet: any) => {
      console.log("✅ Received loan data from .NET:", dataFromDotNet);
      
      let loansJson = [];
      if (typeof dataFromDotNet === 'string') {
        try {
          loansJson = JSON.parse(dataFromDotNet);
        } catch (e) {
          console.error("Error parsing JSON string from .NET:", e);
          return;
        }
      } else if (Array.isArray(dataFromDotNet)) {
        loansJson = dataFromDotNet;
      } else {
        console.error("Received data of unexpected type from .NET:", typeof dataFromDotNet);
        return;
      }

      const loanStatusMap: Record<string, LoanStatus> = {
        "Active": "Disbursed",
        "Pending": "Pending",
        "Closed": "Paid",
        "Defaulted": "Declined"
      };

      const paymentStatusMap: Record<string, "Paid" | "Pending" | "Overdue"> = {
        "Paid": "Paid",
        "Pending": "Pending",
        "Overdue": "Overdue"
      };

      const mappedLoans = loansJson.map((loanData: any) => {
        // Find the most recent payment if any exists
        const payments = loanData.LedgerEntries
          ?.filter((entry: any) => entry.Type === "Payment")
          .map((payment: any, index: number) => ({
            id: `PAY${loanData.LoanId}-${index}`,
            date: payment.TransactionDate.split('T')[0],
            amount: payment.Credit,
            principal: payment.Credit * 0.9, // Assuming 10% interest
            interest: payment.Credit * 0.1,
            remainingBalance: payment.RunningBalance,
            status: paymentStatusMap["Paid"], // Default to Paid for ledger entries
            method: payment.Notes?.includes('bank') ? 'Bank Transfer' : 'Cash'
          })) || [];

        const disbursementEntry = loanData.LedgerEntries?.find((entry: any) => entry.Type === "Disbursement");
        
        return {
          id: loanData.LoanId,
          clientName: loanData.MemberFullName, // You'll need to get this from your data
          clientId: loanData.MemberId, // You'll need to get this from your data
          type: loanData.ProductType,
          purpose: "Business Expansion", // Default purpose
          amount: loanData.PrincipalAmount,
          applicationDate: loanData.DateGranted.split('T')[0],
          duration: `${loanData.TermMonths} months`,
          status: loanStatusMap[loanData.LoanStatus] || "Pending",
          interestRate: `${(loanData.InterestRate * 100).toFixed(2)}%`,
          remainingBalance: loanData.LedgerEntries?.slice(-1)[0]?.RunningBalance || loanData.PrincipalAmount,
          nextPayment: payments.length > 0 ? 
            new Date(new Date(payments[payments.length-1].date).getTime() + 30*24*60*60*1000).toISOString().split('T')[0] : 
            new Date(new Date(loanData.DateGranted).getTime() + 30*24*60*60*1000).toISOString().split('T')[0],
          validatedBy: "Loan Officer", // Default value
          creditScore: 75, // Default value
          coApplicantNumber: loanData.CoMakers?.length || 0,
          guarantorNumber: loanData.CoMakers?.filter((c: any) => c.Status === "Active").length || 0,
          paymentHistory: payments,
          monthlyPayment: loanData.InstallmentAmount,
          collateralType: loanData.CoMakers?.length > 0 ? "Secured" : "Unsecured",
          paymentFrequency: loanData.PayFrequency
        } as Loan;
      });

      setLoans(mappedLoans);

        
    };

    HybridWebView.SendInvokeMessageToDotNet("getLoans");

  }, []);
useEffect(() => {
  // Complete frontend to PostgreSQL enum mapping
  const statusMap: Record<string, string> = {
    Approved: "Active",
    Pending: "Pending",
    Declined: "Rejected",
    Disbursed: "Active",
    Paid: "Paid Off",
    Defaulted: "Defaulted",
    InArrears: "In Arrears"  // Added this missing mapping
  };

  // Helper function to safely map status with fallback
  const mapStatus = (status: string): string => {
    const mappedStatus = statusMap[status];
    if (!mappedStatus) {
      console.warn(`⚠️ Unknown status "${status}" - sending as-is`);
      return status;
    }
    return mappedStatus;
  };

  const sendLoanUpdate = () => {
    if (!updateLoan || hasRequestedUpdate.current) return;
    
    console.log("📤 Sending loan update to backend...");
    hasRequestedUpdate.current = true;

    // Prepare payload with safe status mapping
    const payload = {
      MemberId: String(updateLoan.clientId),
      LoanId: Number(updateLoan.id),
      UpdateData: {
        Status: mapStatus(updateLoan.status), // Use safe mapping function
        Amount: parseFloat(updateLoan.amount.toFixed(2)),
        InterestRate: parseFloat(updateLoan.interestRate.replace('%', '')),
        LoanType: updateLoan.type,
        Purpose: updateLoan.purpose,
        PaymentFrequency: updateLoan.paymentFrequency,
        CollateralType: updateLoan.collateralType || '',
        Duration: updateLoan.duration
      }
    };

    console.log("Update payload:", payload);

    try {
      if (!isValidPayload(payload)) {
        throw new Error("Invalid update payload");
      }

      HybridWebView.SendInvokeMessageToDotNet("updateLoan", payload);
    } catch (error) {
      console.error("❌ Failed to send loan update:", error);
      hasRequestedUpdate.current = false;
    }
  };

  const isValidPayload = (payload: any): boolean => {
    if (!payload || !payload.UpdateData) return false;
    
    // Validate basic types
    const validations = [
      typeof payload.MemberId === 'string',
      typeof payload.LoanId === 'number',
      typeof payload.UpdateData.Amount === 'number',
      typeof payload.UpdateData.Status === 'string'
    ];

    // Additional validations can be added here
    return validations.every(Boolean);
  };

  sendLoanUpdate();

  return () => {
    hasRequestedUpdate.current = false;
  };
}, [updateLoan]);

const filteredLoans = loans.filter((loan) => {
    const searchTextLower = searchText.toLowerCase();
    const matchesSearch =
      loan.id.toString().includes(searchTextLower) || // Convert number to string first
      loan.clientName.toLowerCase().includes(searchTextLower) ||
      (loan.type && loan.type.toLowerCase().includes(searchTextLower)); // Optional chaining if type might be undefined

    const matchesStatus = statusFilter === "All" || loan.status === statusFilter;

    return matchesSearch && matchesStatus;
});

  const handleCreateLoan = (newLoan: Loan) => {
    setLoans((prev) => [...prev, newLoan])
    setIsCreateDialogOpen(false)

    toast({
      title: "Success",
      description: `Loan ${newLoan.id} has been registered successfully.`,
    })
  }

   

  const handleUpdateLoan = (updatedLoan: Loan) => {
  setLoans(prev => prev.map(loan => 
    loan.id === updatedLoan.id ? updatedLoan : loan
  ));
  setEditingLoan(null);
  setSelectedLoan(updatedLoan);
  setUpdateLoan(updatedLoan); // This will trigger the useEffect
  
  toast({
    title: "Success",
    description: `Loan ${updatedLoan.id} has been updated successfully.`,
  });
};

  const handleDeleteLoan = (loanId: number) => {
    const loanToDelete = loans.find((l) => l.id === loanId)
    setLoans((prev) => prev.filter((loan) => loan.id !== loanId))
    setSelectedLoan(null)

    toast({
      title: "Success",
      description: `Loan ${loanToDelete?.id} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const handleProcessPayment = (loanId: number, payment: Omit<Payment, "id">) => {
    const paymentWithId = { ...payment, id: `PAY${Date.now()}` }

    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === loanId) {
          const updatedLoan = {
            ...loan,
            paymentHistory: [...loan.paymentHistory, paymentWithId],
            remainingBalance: payment.remainingBalance,
            status: payment.remainingBalance <= 0 ? ("Paid" as LoanStatus) : loan.status,
          }
          setSelectedLoan(updatedLoan)
          return updatedLoan
        }
        return loan
      }),
    )

    toast({
      title: "Payment Processed",
      description: `Payment of ₱${payment.amount.toLocaleString()} has been recorded successfully.`,
    })
  }

  const handleEditLoan = (loan: Loan) => {
    setEditingLoan(loan)
    
    setSelectedLoan(null)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Loan Management</h1>
          <p className="text-gray-500">Manage all loan applications and accounts</p>
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-800">Loans ({filteredLoans.length})</CardTitle>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <FilePlus2 className="mr-2 h-4 w-4" />
                New Loan
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search Loans..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                  <SelectItem value="Disbursed">Disbursed</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">Loan ID</TableHead>
                  <TableHead className="text-gray-700">Client Name</TableHead>
                  <TableHead className="text-gray-700">Type</TableHead>
                  <TableHead className="text-gray-700">Amount</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Application Date</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
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
                            {loan.clientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
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
                    <TableCell>
                      <Badge className={`flex items-center gap-1 ${statusStyles[loan.status]}`}>
                        <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{loan.applicationDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedLoan(loan)
                        }}
                      >
                        <Eye className="h-4 w-4" />
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
      {selectedLoan && (
        <LoanDetailsPanel
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
          onEdit={handleEditLoan}
          onDelete={handleDeleteLoan}
          onProcessPayment={handleProcessPayment}
        />
      )}

      <LoanFormDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateLoan}
        mode="create"
      />

      {editingLoan && (
        <LoanFormDialog
          loan={editingLoan}
          isOpen={true}
          onClose={() => setEditingLoan(null)}
          onSave={handleUpdateLoan}
          mode="edit"
        />
      )}
    </div>
  )
}
