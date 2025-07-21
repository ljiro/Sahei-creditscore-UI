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
import { Checkbox } from "@/components/ui/checkbox"

const statusStyles = {
  Approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  Disbursed: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Paid: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
}

type LoanStatus = keyof typeof statusStyles
type MembershipStatus = "Active" | "Dormant" | "Suspended" | "Closed"
type ClosureReason = "N/A" | "Voluntary" | "Policy Violation" | "Non-Payment" | "Deceased" | "Other"
type RiskAssessmentLevel = "Very Low Risk" | "Low Risk" | "Medium Risk" | "High Risk" | "Very High Risk"

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

interface PersonalDetails {
  firstName: string
  middleName: string
  lastName: string
  contactNumber: string
  birthdate: string
  sex: "Male" | "Female"
  age: number
  presentAddress: string
  yearsOfStay: number
  educationType?: "Elementary" | "High School" | "Vocational" | "College" | "Post-graduate" | "None"
  civilStatus: "Single" | "Married" | "Widowed" | "Separated"
  membershipDate: string
  membershipStatus: MembershipStatus
  closureReason: ClosureReason
  dependents: Dependent[]
  spouseName?: string
  spouseContact?: string
  spouseBirthdate?: string
  spouseMonthlyIncomeMin?: number
  spouseMonthlyIncomeMax?: number
  monthlyIncome: number
  tin?: string
  sss?: string
  philhealth?: string
  savings?: number
  shareCapital?: number
  termDeposit?: number
  map?: number
}

interface Dependent {
  id: number
  isInSchool: boolean
}

interface Asset {
  id: number
  name: string
  location: string
  isPledged: boolean
}

interface Beneficiary {
  id: number
  name: string
  birthdate: string
  relationship: string
  contactNumber: string
}

interface SourceOfIncome {
  type: "Business" | "Employed"
  // Business fields
  businessType?: "Sari-sari Store" | "Direct Selling" | "Wagwagan" | "Farming" | "Mining" | "Eatery" | "Pension" | "Remittance" | "Others"
  businessTypeOther?: string
  businessIncomeMin?: number
  businessIncomeMax?: number
  // Employed fields
  supervisorName?: string
  companyName?: string
  employmentStatus?: "Regular" | "Contractual" | "Probationary" | "Part-time" | "Freelance"
  salaryMin?: number
  salaryMax?: number
  dateEmployed?: string
  workingHours?: number
  proofOfIncomeType?: "Pay Slip" | "Bank Statement" | "Business Permit"
  businessPermitStatus?: "Renewed" | "Not Renewed" | "New Business Permit"
}

interface OtherId {
  id: number
  name: string
  number: string
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
  finalOutcome?: "Paid in Full" | "Defaulted" | "N/A"
  loanBehaviourStatus?: "Pending" | "Active" | "Paid" | "In Arrears" | "Defaulted" | "Rejected" | "N/A"
  delinquencies?: number
  maxOverdueDays?: number
  riskAssessment?: RiskAssessmentLevel
  dateGranted?: string
  personalDetails?: PersonalDetails
  sourceOfIncome?: SourceOfIncome
  assets?: Asset[]
  beneficiaries?: Beneficiary[]
  actualPayments?: number
  totalPayments?: number
  daysOverdue?: number
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
  }
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
  const [personalDetails, setPersonalDetails] = useState<Partial<PersonalDetails>>(loan?.personalDetails || {})
  const [sourceOfIncome, setSourceOfIncome] = useState<Partial<SourceOfIncome>>(loan?.sourceOfIncome || { type: "Business" })
  const [assets, setAssets] = useState<Asset[]>(loan?.assets || [])
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(loan?.beneficiaries || [])
  const [otherIds, setOtherIds] = useState<OtherId[]>([])
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
  const [step, setStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnimating(true)
    setTimeout(() => {
      setStep(2)
      setIsAnimating(false)
    }, 300) // Animation duration
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(1)
      setIsAnimating(false)
    }, 300) // Animation duration
  }

  const handleDependentsChange = (newCount: number) => {
    const count = Math.max(0, newCount)
    const currentDependents = personalDetails.dependents || []
    const newDependents: Dependent[] = []

    for (let i = 0; i < count; i++) {
      if (currentDependents[i]) {
        newDependents.push(currentDependents[i])
      } else {
        newDependents.push({ id: Date.now() + i, isInSchool: false })
      }
    }
    setPersonalDetails({ ...personalDetails, dependents: newDependents })
  }

    // Handlers for dynamic beneficiaries
  const addBeneficiary = () => {
    setBeneficiaries([
      ...beneficiaries,
      { id: Date.now(), name: "", relationship: "", birthdate: "", contactNumber: "" },
    ])
  }
  const removeBeneficiary = (id: number) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id))
  }

  // Handlers for dynamic assets
  const addAsset = () => {
    setAssets([...assets, { id: Date.now(), name: "", location: "", isPledged: false }])
  }
  const removeAsset = (id: number) => {
    setAssets(assets.filter((a) => a.id !== id))
  }

  // Handlers for dynamic IDs
  const addOtherId = () => {
    setOtherIds([...otherIds, { id: Date.now(), name: "", number: "" }])
  }
  const removeOtherId = (id: number) => {
    setOtherIds(otherIds.filter((otherId) => otherId.id !== id))
  }


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

    // Combine all data to create the final loan object
    const fullClientName = `${personalDetails.firstName || ""} ${personalDetails.middleName?.[0] || ""} ${personalDetails.lastName || ""}`.trim()
    const monthlyPayment = formData.amount ? (formData.amount * 1.12) / loanDuration : 0

    const newLoan: Loan = {
      ...formData,
      id: loan?.id || `LN${String(Date.now()).slice(-3)}`,
      clientName: fullClientName,
      applicationDate: loan?.applicationDate || new Date().toISOString().split("T")[0],
      duration: `${loanDuration} months`,
      remainingBalance: loan?.remainingBalance || formData.amount || 0,
      nextPayment: loan?.nextPayment || "N/A",
      validatedBy: loan?.validatedBy || "System",
      creditScore: loan?.creditScore || 75,
      monthlyPayment,
      paymentHistory: loan?.paymentHistory || [],
      // Attach the detailed data
      personalDetails,
      sourceOfIncome,
      assets,
      beneficiaries,
    } as Loan

    onSave(newLoan)
    setStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? `Register New Loan - Step ${step} of 2` : `Edit Loan - ${loan?.id}`}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Step 1: Member's Personal Details" : "Step 2: Loan Details and Co-Makers"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6 p-1">
          <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            {step === 1 && (
              <div className="space-y-6">
                {/* Personal Information Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Personal Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="Juan" />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <Input placeholder="Reyes" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Dela Cruz" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>Contact Number</Label>
                      <Input type="tel" placeholder="09171234567" />
                    </div>
                    <div>
                      <Label>Birthdate</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Sex</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Present Address</Label>
                      <Textarea placeholder="123 Rizal St, Baguio City" />
                    </div>
                    <div>
                      <Label>Years at Present Address</Label>
                      <Input type="number" min="0" placeholder="5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="civilStatus">Civil Status</Label>
                      <Select
                        value={personalDetails.civilStatus || ""}
                        onValueChange={(value) =>
                          setPersonalDetails({
                            ...personalDetails,
                            civilStatus: value as "Single" | "Married" | "Widowed" | "Separated",
                          })
                        }
                      >
                        <SelectTrigger id="civilStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                          <SelectItem value="Separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="educationType">Education</Label>
                      <Select
                        value={personalDetails.educationType || ""}
                        onValueChange={(value) =>
                          setPersonalDetails({
                            ...personalDetails,
                            educationType: value as any,
                          })
                        }
                      >
                        <SelectTrigger id="educationType">
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Elementary">Elementary</SelectItem>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Vocational">Vocational</SelectItem>
                          <SelectItem value="College">College</SelectItem>
                          <SelectItem value="Post-graduate">Post-graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="numberOfDependents">Number of Dependents</Label>
                      <Input
                        id="numberOfDependents"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={personalDetails.dependents?.length || 0}
                        onChange={(e) => handleDependentsChange(Number.parseInt(e.target.value, 10) || 0)}
                      />
                    </div>
                  </div>
                  
                  {personalDetails.civilStatus === "Married" && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50/50">
                      <h4 className="font-medium mb-4 text-sm text-gray-600">Spouse Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="spouseName">Spouse's Name</Label>
                          <Input
                            id="spouseName"
                            placeholder="e.g., Maria Dela Cruz"
                            value={personalDetails.spouseName || ""}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, spouseName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="spouseContact">Spouse's Contact Number</Label>
                          <Input
                            id="spouseContact"
                            type="tel"
                            placeholder="09179876543"
                            value={personalDetails.spouseContact || ""}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, spouseContact: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="spouseBirthdate">Spouse's Birthdate</Label>
                          <Input
                            id="spouseBirthdate"
                            type="date"
                            value={personalDetails.spouseBirthdate || ""}
                            onChange={(e) =>
                              setPersonalDetails({ ...personalDetails, spouseBirthdate: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Spouse's Monthly Income (Range)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Min"
                              value={personalDetails.spouseMonthlyIncomeMin || ""}
                              onChange={(e) => {
                                const min = Number(e.target.value)
                                const max = personalDetails.spouseMonthlyIncomeMax || 0
                                setPersonalDetails({
                                  ...personalDetails,
                                  spouseMonthlyIncomeMin: min,
                                  spouseMonthlyIncomeMax: min > max ? min : max,
                                })
                              }}
                            />
                            <span className="text-gray-500">-</span>
                            <Input
                              type="number"
                              placeholder="Max"
                              value={personalDetails.spouseMonthlyIncomeMax || ""}
                              onChange={(e) => {
                                const max = Number(e.target.value)
                                const min = personalDetails.spouseMonthlyIncomeMin || 0
                                setPersonalDetails({
                                  ...personalDetails,
                                  spouseMonthlyIncomeMax: max,
                                  spouseMonthlyIncomeMin: max < min ? max : min,
                                })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {personalDetails.dependents && personalDetails.dependents.length > 0 && (
                    <div className="col-span-1 md:col-span-3 mt-4 space-y-2">
                      <Label>Dependent Details</Label>
                      {personalDetails.dependents.map((dependent, index) => (
                        <div
                          key={dependent.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                        >
                          <p className="text-sm font-medium">Dependent #{index + 1}</p>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`dependent-school-${dependent.id}`}
                              checked={dependent.isInSchool}
                              onCheckedChange={(checked) => {
                                const updatedDependents = [...(personalDetails.dependents || [])]
                                updatedDependents[index] = { ...dependent, isInSchool: !!checked }
                                setPersonalDetails({
                                  ...personalDetails,
                                  dependents: updatedDependents,
                                })
                              }}
                            />
                            <Label htmlFor={`dependent-school-${dependent.id}`} className="text-sm">
                              In School?
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </fieldset>

                {/* Membership Information Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Membership Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="membershipDate" className="text-sm font-medium text-gray-700">
                        Membership Date *
                      </Label>
                      <Input
                        id="membershipDate"
                        type="date"
                        value={personalDetails.membershipDate || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, membershipDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="membershipStatus" className="text-sm font-medium text-gray-700">
                        Membership Status *
                      </Label>
                      <Select
                        value={personalDetails.membershipStatus || ""}
                        onValueChange={(value) =>
                          setPersonalDetails({ ...personalDetails, membershipStatus: value as MembershipStatus })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Dormant">Dormant</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {personalDetails.membershipStatus === "Closed" && (
                    <div>
                      <Label htmlFor="closureReason" className="text-sm font-medium text-gray-700">
                        Closure Reason *
                      </Label>
                      <Select
                        value={personalDetails.closureReason || ""}
                        onValueChange={(value) =>
                          setPersonalDetails({ ...personalDetails, closureReason: value as ClosureReason })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="Voluntary">Voluntary</SelectItem>
                          <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                          <SelectItem value="Non-Payment">Non-Payment</SelectItem>
                          <SelectItem value="Deceased">Deceased</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </fieldset>                

                {/* Source of Income Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Source of Income</legend>
                  <Select
                    value={sourceOfIncome.type}
                    onValueChange={(v) => setSourceOfIncome({ type: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Employed">Employed</SelectItem>
                    </SelectContent>
                  </Select>
                  {sourceOfIncome.type === "Business" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Business Type</Label>
                        <Select
                          value={sourceOfIncome.businessType || ""}
                          onValueChange={(businessType) => setSourceOfIncome({ ...sourceOfIncome, businessType: businessType as any })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sari-sari Store">Sari-sari Store</SelectItem>
                            <SelectItem value="Direct Selling">Direct Selling</SelectItem>
                            <SelectItem value="Wagwagan">Wagwagan</SelectItem>
                            <SelectItem value="Farming">Farming</SelectItem>
                            <SelectItem value="Mining">Mining</SelectItem>
                            <SelectItem value="Eatery">Eatery</SelectItem>
                            <SelectItem value="Pension">Pension</SelectItem>
                            <SelectItem value="Remittance">Remittance</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {sourceOfIncome.businessType === "Others" && (
                        <div>
                          <Label>If other, please specify</Label>
                          <Input
                            placeholder="e.g., Online Selling"
                            value={sourceOfIncome.businessTypeOther || ""}
                            onChange={(e) =>
                              setSourceOfIncome({ ...sourceOfIncome, businessTypeOther: e.target.value })
                            }
                          />
                        </div>
                      )}
                      <div>
                        <Label>Income per Month (Range)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={sourceOfIncome.businessIncomeMin || ""}
                            onChange={(e) => {
                              const min = Number(e.target.value)
                              const max = sourceOfIncome.businessIncomeMax || 0
                              setSourceOfIncome({
                                ...sourceOfIncome,
                                businessIncomeMin: min,
                                businessIncomeMax: min > max ? min : max,
                              })
                            }}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={sourceOfIncome.businessIncomeMax || ""}
                            onChange={(e) => {
                              const max = Number(e.target.value)
                              const min = sourceOfIncome.businessIncomeMin || 0
                              setSourceOfIncome({
                                ...sourceOfIncome,
                                businessIncomeMax: max,
                                businessIncomeMin: max < min ? max : min,
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sourceOfIncome.type === "Employed" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Input
                        placeholder="Supervisor's Name"
                        value={sourceOfIncome.supervisorName || ""}
                        onChange={(e) => setSourceOfIncome({ ...sourceOfIncome, supervisorName: e.target.value })}
                      />
                      <Input
                        placeholder="Company Name"
                        value={sourceOfIncome.companyName || ""}
                        onChange={(e) => setSourceOfIncome({ ...sourceOfIncome, companyName: e.target.value })}
                      />
                      <div>
                        <Label>Employment Status</Label>
                        <Select
                          value={sourceOfIncome.employmentStatus || ""}
                          onValueChange={(value) =>
                            setSourceOfIncome({ ...sourceOfIncome, employmentStatus: value as any })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Regular">Regular</SelectItem>
                            <SelectItem value="Contractual">Contractual</SelectItem>
                            <SelectItem value="Probationary">Probationary</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Occupation</Label>
                        <Input placeholder="e.g., Teacher" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Salary (Range)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={sourceOfIncome.salaryMin || ""}
                            onChange={(e) => {
                              const min = Number(e.target.value)
                              const max = sourceOfIncome.salaryMax || 0
                              setSourceOfIncome({
                                ...sourceOfIncome,
                                salaryMin: min,
                                salaryMax: min > max ? min : max,
                              })
                            }}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={sourceOfIncome.salaryMax || ""}
                            onChange={(e) => {
                              const max = Number(e.target.value)
                              const min = sourceOfIncome.salaryMin || 0
                              setSourceOfIncome({
                                ...sourceOfIncome,
                                salaryMax: max,
                                salaryMin: max < min ? max : min,
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Date Employed</Label>
                        <Input
                          type="date"
                          value={sourceOfIncome.dateEmployed || ""}
                          onChange={(e) => setSourceOfIncome({ ...sourceOfIncome, dateEmployed: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Working Hours per Day</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 8"
                          value={sourceOfIncome.workingHours || ""}
                          onChange={(e) =>
                            setSourceOfIncome({ ...sourceOfIncome, workingHours: Number(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                  )}
                </fieldset>

                {/* Assets Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Assets</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="savings">Savings (₱)</Label>
                      <Input
                        id="savings"
                        type="number"
                        placeholder="0.00"
                        value={personalDetails.savings || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, savings: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shareCapital">Share Capital (₱)</Label>
                      <Input
                        id="shareCapital"
                        type="number"
                        placeholder="0.00"
                        value={personalDetails.shareCapital || ""}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, shareCapital: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="termDeposit">Term Deposit (TD) (₱)</Label>
                      <Input
                        id="termDeposit"
                        type="number"
                        placeholder="0.00"
                        value={personalDetails.termDeposit || ""}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, termDeposit: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="map">Mutual Aid Program (MAP) (₱)</Label>
                      <Input
                        id="map"
                        type="number"
                        placeholder="0.00"
                        value={personalDetails.map || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, map: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t">
                    <h4 className="font-medium text-sm mb-2">Owned Physical Assets</h4>
                    {assets.map((asset, index) => (
                      <div key={asset.id} className="space-y-2 border-b pb-4 mb-4">
                        <div className="flex justify-between items-center">
                          <Label>Asset #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAsset(asset.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input placeholder="Asset Name (e.g., House, Vehicle)" />
                          <Input placeholder="Location" />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Checkbox id={`isPledged-${asset.id}`} />
                          <Label htmlFor={`isPledged-${asset.id}`}>Pledge as collateral?</Label>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addAsset}>
                      Add Physical Asset
                    </Button>
                  </div>
                </fieldset>

                {/* Beneficiaries Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Beneficiaries</legend>
                  {beneficiaries.map((beneficiary, index) => (
                    <div key={beneficiary.id} className="space-y-2 border-b pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <Label>Beneficiary #{index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBeneficiary(beneficiary.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`beneficiary-name-${beneficiary.id}`} className="text-xs">
                            Name
                          </Label>
                          <Input id={`beneficiary-name-${beneficiary.id}`} placeholder="Beneficiary Name" />
                        </div>
                        <div>
                          <Label htmlFor={`beneficiary-rel-${beneficiary.id}`} className="text-xs">
                            Relationship
                          </Label>
                          <Select
                            value={
                              ["Spouse", "Child", "Parent", "Sibling"].includes(beneficiary.relationship)
                                ? beneficiary.relationship
                                : "Others"
                            }
                            onValueChange={(value) => {
                              const updatedBeneficiaries = [...beneficiaries]
                              const current = updatedBeneficiaries[index]
                              current.relationship = value === "Others" ? "" : value
                              setBeneficiaries(updatedBeneficiaries)
                            }}
                          >
                            <SelectTrigger id={`beneficiary-rel-${beneficiary.id}`}>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Spouse">Spouse</SelectItem>
                              <SelectItem value="Child">Child</SelectItem>
                              <SelectItem value="Parent">Parent</SelectItem>
                              <SelectItem value="Sibling">Sibling</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {beneficiary.relationship === "" ||
                        !["Spouse", "Child", "Parent", "Sibling"].includes(beneficiary.relationship) ? (
                          <div className="md:col-span-2">
                            <Label htmlFor={`beneficiary-rel-other-${beneficiary.id}`} className="text-xs">
                              If other, please specify
                            </Label>
                            <Input
                              id={`beneficiary-rel-other-${beneficiary.id}`}
                              placeholder="e.g., Cousin, Guardian"
                              value={beneficiary.relationship}
                              onChange={(e) => {
                                const updatedBeneficiaries = [...beneficiaries]
                                updatedBeneficiaries[index].relationship = e.target.value
                                setBeneficiaries(updatedBeneficiaries)
                              }}
                            />
                          </div>
                        ) : null}                        
                        <div>
                          <Label htmlFor={`beneficiary-bday-${beneficiary.id}`} className="text-xs">
                            Birthdate
                          </Label>
                          <Input id={`beneficiary-bday-${beneficiary.id}`} type="date" />
                        </div>
                        <div>
                          <Label htmlFor={`beneficiary-contact-${beneficiary.id}`} className="text-xs">
                            Contact Number
                          </Label>
                          <Input id={`beneficiary-contact-${beneficiary.id}`} type="tel" placeholder="Contact Number" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addBeneficiary}>
                    Add Beneficiary
                  </Button>
                </fieldset>

                {/* Document Upload Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Required Documents</legend>
                  <div className="space-y-6">
                    {/* Brgy. Clearance */}
                    <div>
                      <Label>Brgy. Clearance</Label>
                      <Input type="file" className="mt-1" />
                    </div>

                    {/* Proof of Income */}
                    <div className="pt-4 border-t">
                      <Label className="font-medium">Proof of Income</Label>
                      <div className="mt-2 space-y-4 p-4 border rounded-md bg-gray-50/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="proofOfIncomeType" className="text-xs">
                              Type of Proof
                            </Label>
                            <Select
                              value={sourceOfIncome.proofOfIncomeType}
                              onValueChange={(value) =>
                                setSourceOfIncome({
                                  ...sourceOfIncome,
                                  proofOfIncomeType: value as any,
                                })
                              }
                            >
                              <SelectTrigger id="proofOfIncomeType">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pay Slip">Pay Slip</SelectItem>
                                <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                                <SelectItem value="Business Permit">Business Permit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {sourceOfIncome.proofOfIncomeType === "Business Permit" && (
                            <div>
                              <Label htmlFor="businessPermitStatus" className="text-xs">
                                Permit Status
                              </Label>
                              <Select
                                value={sourceOfIncome.businessPermitStatus}
                                onValueChange={(value) =>
                                  setSourceOfIncome({
                                    ...sourceOfIncome,
                                    businessPermitStatus: value as any,
                                  })
                                }
                              >
                                <SelectTrigger id="businessPermitStatus">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="New Business Permit">New Business Permit</SelectItem>
                                  <SelectItem value="Renewed">Renewed</SelectItem>
                                  <SelectItem value="Not Renewed">Not Renewed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs">Upload File</Label>
                          <Input type="file" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Electricity Bill */}
                    <div className="pt-4 border-t">
                      <Label>Electricity Bill</Label>
                      <Input type="file" className="mt-1" />
                    </div>

                    {/* Water Bill */}
                    <div className="pt-4 border-t">
                      <Label>Water Bill</Label>
                      <Input type="file" className="mt-1" />
                    </div>
                  </div>
                </fieldset>

                {/* IDs Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Valid IDs</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input placeholder="TIN" />
                    <Input placeholder="SSS Number" />
                    <Input placeholder="Philhealth Number" />
                  </div>
                  {otherIds.map((otherId, index) => (
                    <div key={otherId.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                      <Input placeholder="Name of ID (e.g., Passport)" />
                      <div className="md:col-span-2 flex gap-2">
                        <Input placeholder="ID Number" className="flex-grow" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOtherId(otherId.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addOtherId}>
                    Add Other ID
                  </Button>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Loan Details Section */}
                <fieldset className="border p-4 rounded-md space-y-4">
                  <legend className="px-2 font-medium text-sm">Loan Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Type of Loan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                          <SelectItem value="Business Loan">Business Loan</SelectItem>
                          <SelectItem value="Restructured Loan">Restructured Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Loan Amount (₱)</Label>
                      <Input type="number" min="0" placeholder="50000" />
                    </div>
                  </div>
                  <div>
                    <Label>Purpose</Label>
                    <Input placeholder="e.g., For business expansion" />
                  </div>
                  <div>
                    <Label>Loan Term</Label>
                    <div className="flex items-center gap-4 mt-1">
                      <Slider
                        min={1}
                        max={60}
                        step={1}
                        value={[loanDuration]}
                        onValueChange={(v) => setLoanDuration(v[0])}
                        className="flex-1"
                      />
                      <div className="w-32 text-right">
                        <Input
                          type="number"
                          min={1}
                          max={60}
                          value={loanDuration}
                          onChange={(e) => setLoanDuration(Number(e.target.value))}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formatDuration(loanDuration)}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Payment Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Lumpsum">Lumpsum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Loan Behaviour Status</Label>
                    <Select
                      value={formData.loanBehaviourStatus}
                      onValueChange={(value) => setFormData({ ...formData, loanBehaviourStatus: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select behaviour status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="In Arrears">In Arrears</SelectItem>
                        <SelectItem value="Defaulted">Defaulted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.loanBehaviourStatus &&
                    !["Pending", "Rejected"].includes(formData.loanBehaviourStatus) && (
                      <div className="pt-4 mt-4 border-t space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {["Paid", "In Arrears", "Defaulted"].includes(formData.loanBehaviourStatus) && (
                            <>
                              <div>
                                <Label>No. of Delinquencies</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={formData.delinquencies || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, delinquencies: Number(e.target.value) })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Maximum Overdue Days</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={formData.maxOverdueDays || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, maxOverdueDays: Number(e.target.value) })
                                  }
                                />
                              </div>
                            </>
                          )}

                          {formData.loanBehaviourStatus === "Paid" && (
                            <div>
                              <Label>Loan Outcome</Label>
                              <Select
                                value={formData.finalOutcome}
                                onValueChange={(value) =>
                                  setFormData({ ...formData, finalOutcome: value as any })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Loan Outcome" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Paid in Full">Paid in Full</SelectItem>
                                  <SelectItem value="Defaulted">Defaulted</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <div>
                            <Label>Date Granted</Label>
                            <Input
                              type="date"
                              value={formData.dateGranted || ""}
                              onChange={(e) => setFormData({ ...formData, dateGranted: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Interest Rate (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              placeholder="12"
                              value={formData.interestRate?.replace("%", "") || ""}
                              onChange={(e) => setFormData({ ...formData, interestRate: `${e.target.value}%` })}
                            />
                          </div>
                          <div>
                            <Label>Installment Amount (₱)</Label>
                            <Input
                              type="number"
                              min="0"
                              placeholder="4500"
                              value={formData.monthlyPayment || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, monthlyPayment: Number(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Loan Officer Risk Assessment</Label>
                          <Select
                            value={formData.riskAssessment || ""}
                            onValueChange={(value) =>
                              setFormData({ ...formData, riskAssessment: value as RiskAssessmentLevel })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Very Low Risk">Very Low Risk</SelectItem>
                              <SelectItem value="Low Risk">Low Risk</SelectItem>
                              <SelectItem value="Medium Risk">Medium Risk</SelectItem>
                              <SelectItem value="High Risk">High Risk</SelectItem>
                              <SelectItem value="Very High Risk">Very High Risk</SelectItem>
                              <SelectItem value="N/A">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                </fieldset>

                {/* Co-Makers Section */}
                <fieldset className="border p-4 rounded-md space-y-4">
                  <legend className="px-2 font-medium text-sm">Co-Maker Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <Label>Middle Name</Label>
                        <Input placeholder="Doe" />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input placeholder="Smith" />
                      </div>
                      <div>
                        <Label>Contact Number</Label>
                        <Input type="tel" placeholder="0917xxxxxxx" />
                      </div>
                    <div className="md:col-span-2">
                      <Label>Amount to Pledge as Liability (₱)</Label>
                      <Input type="number" min="0" placeholder="0" />
                    </div>
                  </div>
                </fieldset>

                {/* SHOULD BE IN LOANDETAILSPANEL() Approval Section */}
                {/* <fieldset className="border p-4 rounded-md space-y-4">
                  <legend className="px-2 font-medium text-sm text-red-600">For Office Use Only</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Credit Investigation By</Label>
                      <Input placeholder="CI Personnel Name" />
                    </div>
                    <div>
                      <Label>Amount Approved (₱)</Label>
                      <Input type="number" min="0" />
                    </div>
                  </div>
                </fieldset> */}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === 2 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {step === 1 ? (
                "Next"
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {mode === "create" ? "Register Loan" : "Update Loan"}
                </>
              )}
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

    // HybridWebView.SendInvokeMessageToDotNet("getLoans");

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
