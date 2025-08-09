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
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Disbursed: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  Paid: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Defaulted: "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200",
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
  educationType?: "Post-Graduate" | "College Graduate" | "College Undergraduate" | "Vocational Graduate" | "Highschool Graduate" | "Highschool Undergraduate" | "Elementary Graduate" | "Elementary Undergraduate" | "None"
  civilStatus: "Single" | "Married" | "Lived-in Partner" | "Legally Separated" | "Annulled" | "Widowed"
  membershipDate: string
  membershipStatus: MembershipStatus
  closureReason?: ClosureReason
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
  otherIds?: OtherId[]
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
  // use boolean flags to support both business and employment fields
  hasBusiness?: boolean
  hasEmployment?: boolean  // Business fields
  businessType?: "Sari-sari Store" | "Direct Selling" | "Wagwagan" | "Farming" | "Mining" | "Eatery" | "Pension" | "Remittance" | "Others"
  businessTypeOther?: string
  businessIncomeMin?: number
  businessIncomeMax?: number
  // Employed fields
  supervisorName?: string
  companyName?: string
  employmentStatus?: "Full-Time" | "Part-Time" | "Contractual/Project-Based" | "Self-Employed" | "Unemployed" | "Retired" | "Homemaker"
  salaryMin?: number
  salaryMax?: number
  dateEmployed?: string
  workingHours?: number
}

interface OtherId {
  id: number
  name: string
  number: string
}

interface ProofOfIncomeDocument {
  id: number
  fileName: string
  fileData: string // Base64 encoded string
  type: "Pay Slip" | "Bank Statement" | "Business Permit"
  businessPermitStatus?: "Renewed" | "Not Renewed" | "New Business Permit"
}

interface CoMaker {
  id: number // Temporary frontend ID for list management
  memberId: string // The actual ID of the member from the database
  name: string // Full name for display
  contactNumber: string // Fetched from member data for display
  liabilityAmount: number
}

interface LoanDocuments {
  // Base64 strings for document uploads
  brgyClearance?: string
  proofOfIncome?: ProofOfIncomeDocument[]
  electricityBill?: string
  waterBill?: string
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
  // remainingBalance: number
  // nextPayment: string
  // validatedBy: string
  // creditScore: number
  // coApplicantNumber: number
  // guarantorNumber: number
  paymentHistory: Payment[]
  monthlyPayment: number
  // collateralType?: string
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
  creditInvestigationBy?: string
  amountApproved?: number
  processedBy?: string
  dateProcessed?: string
  approvedBy?: string
  dateApproved?: string
  coMakers?: CoMaker[]
  documents?: LoanDocuments
}

const mockMembers: (PersonalDetails & { clientId: string })[] = [
  {
    clientId: "CL001",
    firstName: "Juan",
    middleName: "Reyes",
    lastName: "Dela Cruz",
    contactNumber: "09171234567",
    birthdate: "1985-01-15",
    sex: "Male",
    age: 40,
    presentAddress: "123 Rizal St, Baguio City",
    yearsOfStay: 15,
    civilStatus: "Married",
    educationType: "College Graduate",
    membershipDate: "2010-06-01",
    membershipStatus: "Active",
    dependents: [{ id: 1, isInSchool: true }],
    spouseName: "Juana Dela Cruz",
    spouseContact: "09177654321",
    spouseBirthdate: "1986-02-20",
    spouseMonthlyIncomeMin: 25000,
    spouseMonthlyIncomeMax: 30000,
    monthlyIncome: 0, // This is now derived from sourceOfIncome
    tin: "111-222-333-000",
    sss: "11-2222222-3",
    philhealth: "11-222222222-3",
    savings: 150000,
    shareCapital: 75000,
    termDeposit: 50000,
    map: 10000,
  },
  {
    clientId: "CL002",
    firstName: "Maria",
    middleName: "Santos",
    lastName: "Garcia",
    contactNumber: "09182345678",
    birthdate: "1990-05-20",
    sex: "Female",
    age: 35,
    presentAddress: "456 Bonifacio St, Trancoville, Baguio City",
    yearsOfStay: 10,
    civilStatus: "Single",
    educationType: "Post-Graduate",
    membershipDate: "2015-02-10",
    membershipStatus: "Active",
    dependents: [],
    monthlyIncome: 0,
    tin: "444-555-666-000",
    sss: "44-5555555-6",
    philhealth: "44-555555555-6",
    savings: 250000,
    shareCapital: 120000,
    termDeposit: 100000,
    map: 15000,
  },
  {
    clientId: "CL003",
    firstName: "Pedro",
    middleName: "Cruz",
    lastName: "Penduko",
    contactNumber: "09193456789",
    birthdate: "1992-11-30",
    sex: "Male",
    age: 32,
    presentAddress: "789 Kennon Road, Baguio City",
    yearsOfStay: 7,
    civilStatus: "Single",
    educationType: "Vocational Graduate",
    membershipDate: "2018-09-15",
    membershipStatus: "Active",
    dependents: [],
    monthlyIncome: 0,
    tin: "777-888-999-000",
    sss: "77-8888888-9",
    philhealth: "77-888888888-9",
    savings: 80000,
    shareCapital: 40000,
    termDeposit: 20000,
    map: 5000,
  },
]

// const initialLoans: Loan[] = [
//   // SCENARIO 1: Loan for an existing member (Juan Dela Cruz), currently active.
//   {
//     id: 1,
//     clientName: "Juan Dela Cruz",
//     clientId: "CL001",
//     type: "Personal Loan",
//     purpose: "Home Renovation and Improvements",
//     amount: 75000,
//     applicationDate: "2025-06-01",
//     duration: "24 months",
//     status: "Disbursed", // Mapped from "Active"
//     loanBehaviourStatus: "Active",
//     interestRate: "12%",
//     monthlyPayment: 3531.25,
//     paymentFrequency: "Monthly",
//     paymentHistory: [
//       {
//         id: "PAY001",
//         date: "2025-07-01",
//         amount: 3531.25,
//         principal: 2781.25,
//         interest: 750,
//         remainingBalance: 72218.75,
//         status: "Paid",
//         method: "Bank Transfer",
//       },
//     ],
//     personalDetails: mockMembers.find((m) => m.clientId === "CL001"),
//     sourceOfIncome: {
//       hasEmployment: true,
//       hasBusiness: false,
//       companyName: "Major Tech Corp",
//       employmentStatus: "Full-Time",
//       salaryMin: 45000,
//       salaryMax: 55000,
//     },
//     assets: [{ id: 101, name: "Motorcycle", location: "Baguio City", isPledged: false }],
//     beneficiaries: [{ id: 201, name: "Juana Dela Cruz", relationship: "Spouse", birthdate: "1986-02-20", contactNumber: "09177654321" }],
//     coMakers: [
//       {
//         id: 301,
//         memberId: "CL002", // Maria Santos is the co-maker
//         name: "Maria Santos Garcia",
//         contactNumber: "09182345678",
//         liabilityAmount: 25000,
//       },
//     ],
//     documents: {
//       brgyClearance: "data:application/pdf;base64,placeholder1...",
//       proofOfIncome: [{ id: 401, fileName: "payslip.pdf", fileData: "data:application/pdf;base64,placeholder2...", type: "Pay Slip" }],
//     },
//     dateGranted: "2025-06-05",
//     amountApproved: 75000,
//     processedBy: "Loan Officer A",
//     dateProcessed: "2025-06-04",
//     approvedBy: "Manager B",
//     dateApproved: "2025-06-05",
//   },
//   // SCENARIO 2: Loan for another existing member (Maria Santos), but was declined.
//   {
//     id: 2,
//     clientName: "Maria Santos Garcia",
//     clientId: "CL002",
//     type: "Business Loan",
//     purpose: "Capital for new online business",
//     amount: 200000,
//     applicationDate: "2025-07-10",
//     duration: "36 months",
//     status: "Declined", // Mapped from "Rejected"
//     loanBehaviourStatus: "Rejected",
//     interestRate: "10%",
//     monthlyPayment: 0,
//     paymentFrequency: "Monthly",
//     paymentHistory: [],
//     personalDetails: mockMembers.find((m) => m.clientId === "CL002"),
//     sourceOfIncome: {
//       hasBusiness: true,
//       businessType: "Direct Selling",
//       businessIncomeMin: 30000,
//       businessIncomeMax: 45000,
//     },
//     assets: [],
//     beneficiaries: [],
//     coMakers: [],
//     documents: {},
//     approvedBy: "Manager B",
//     dateApproved: "2025-07-12", // Date it was rejected
//   },
//   // SCENARIO 3: A new loan application for a new member (Lou Diamond Morados), currently pending.
//   // This simulates a record that would be created after filling out the form for a non-member.
//   {
//     id: 3,
//     clientName: "Lou Diamond Morados",
//     clientId: "CL004", // A new ID that would be generated by the backend.
//     type: "Personal Loan",
//     purpose: "For educational expenses",
//     amount: 30000,
//     applicationDate: "2025-07-25",
//     duration: "12 months",
//     status: "Pending",
//     loanBehaviourStatus: "Pending",
//     interestRate: "12%",
//     monthlyPayment: 0,
//     paymentFrequency: "Monthly",
//     paymentHistory: [],
//     personalDetails: {
//       firstName: "Lou Diamond",
//       middleName: "T",
//       lastName: "Morados",
//       contactNumber: "09064348210",
//       birthdate: "1995-03-12",
//       sex: "Male",
//       age: 30,
//       presentAddress: "La Trinidad, Benguet",
//       yearsOfStay: 4,
//       civilStatus: "Single",
//       educationType: "College Graduate",
//       membershipDate: "2025-07-25",
//       membershipStatus: "Active",
//       dependents: [],
//       monthlyIncome: 0,
//       tin: "999-888-777-000",
//       sss: "99-8888888-7",
//       philhealth: "99-888888888-7",
//       savings: 40000,
//       shareCapital: 15000,
//       termDeposit: 10000,
//       map: 2000,
//     },
//     sourceOfIncome: {
//       hasEmployment: true,
//       companyName: "Local BPO",
//       employmentStatus: "Full-Time",
//       salaryMin: 28000,
//       salaryMax: 32000,
//     },
//     assets: [],
//     beneficiaries: [{ id: 202, name: "Mother's Name", relationship: "Parent", birthdate: "1970-01-01", contactNumber: "09123456789" }],
//     coMakers: [
//       {
//         id: 302,
//         memberId: "CL003", // Pedro Penduko is the co-maker
//         name: "Pedro Penduko",
//         contactNumber: "09193456789",
//         liabilityAmount: 15000,
//       },
//     ],
//     documents: {
//       brgyClearance: "data:application/pdf;base64,placeholder3...",
//       proofOfIncome: [{ id: 402, fileName: "coe.pdf", fileData: "data:application/pdf;base64,placeholder4...", type: "Pay Slip" }],
//     },
//   },
// ]


// function PaymentDialog({
//   loan,
//   isOpen,
//   onClose,
//   onProcessPayment,
// }: {
//   loan: Loan
//   isOpen: boolean
//   onClose: () => void
//   onProcessPayment: (loanId: number, payment: Omit<Payment, "id">) => void
// }) {
//   const [paymentData, setPaymentData] = useState({
//     amount: loan.monthlyPayment,
//     date: new Date().toISOString().split("T")[0],
//     method: "Cash",
//     notes: "",
//   })
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsProcessing(true)

//     // Simulate processing delay
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     const interestAmount = 0 // Monthly interest
//     const principalAmount = paymentData.amount - interestAmount
//     const newBalance = 0

//     const payment: Omit<Payment, "id"> = {
//       date: paymentData.date,
//       amount: paymentData.amount,
//       principal: principalAmount,
//       interest: interestAmount,
//       remainingBalance: newBalance,
//       status: "Paid",
//       method: paymentData.method,
//     }

//     onProcessPayment(loan.id, payment)
//     setIsProcessing(false)
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Process Payment - {loan.id}</DialogTitle>
//           <DialogDescription>Record a new payment for this loan</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="amount">Payment Amount (₱) *</Label>
//               <Input
//                 id="amount"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={paymentData.amount}
//                 onChange={(e) => setPaymentData({ ...paymentData, amount: Number.parseFloat(e.target.value) || 0 })}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="date">Payment Date *</Label>
//               <Input
//                 id="date"
//                 type="date"
//                 value={paymentData.date}
//                 onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="method">Payment Method</Label>
//             <Select
//               value={paymentData.method}
//               onValueChange={(value) => setPaymentData({ ...paymentData, method: value })}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Cash">Cash</SelectItem>
//                 <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
//                 <SelectItem value="Check">Check</SelectItem>
//                 <SelectItem value="Online Payment">Online Payment</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="notes">Notes (Optional)</Label>
//             <Textarea
//               id="notes"
//               value={paymentData.notes}
//               onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
//               rows={2}
//             />
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-2">Payment Breakdown</h4>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div>Principal: ₱{(paymentData.amount - (loan.remainingBalance * 0.12) / 12).toFixed(2)}</div>
//               <div>Interest: ₱{((loan.remainingBalance * 0.12) / 12).toFixed(2)}</div>
//               <div>Current Balance: ₱{loan.remainingBalance.toLocaleString()}</div>
//               <div>
//                 New Balance: ₱
//                 {Math.max(
//                   0,
//                   loan.remainingBalance - (paymentData.amount - (loan.remainingBalance * 0.12) / 12),
//                 ).toFixed(2)}
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isProcessing}>
//               {isProcessing ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4 mr-2" />
//                   Process Payment
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

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
                    <p className="font-medium text-gray-800">N/A</p>
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
                  {loan.status === "Paid" || loan.status === "Disbursed" ? (
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
                  {(loan.status === "Paid" || loan.status === "Disbursed") && (
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

      {/* <PaymentDialog
        loan={loan}
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onProcessPayment={onProcessPayment}
      /> */}
    </Dialog>
  )
}

function LoanFormDialog({
  loan,
  isOpen,
  onClose,
  onSave,
  mode,
  members,
  isLoadingMembers
}: {
  loan?: Loan
  isOpen: boolean
  onClose: () => void
  onSave: (loan: Loan) => void
  mode: "create" | "edit"
  members: (PersonalDetails & { clientId: string })[]
  isLoadingMembers: boolean
}) {

  const [selectedMember, setSelectedMember] = useState<(PersonalDetails & { clientId: string }) | null>(null)
  const [memberSearchQuery, setMemberSearchQuery] = useState("")
  const [memberSearchResults, setMemberSearchResults] = useState<(PersonalDetails & { clientId: string })[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleMemberSearch = (query: string) => {
    setMemberSearchQuery(query)
    if (!query) {
      setMemberSearchResults([])
      return
    }
    const results = members.filter(
      (member) =>
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        member.clientId.toLowerCase().includes(query.toLowerCase()),
    )
    setMemberSearchResults(results)
  }

  const handleSelectMember = (member: PersonalDetails & { clientId: string }) => {
    setSelectedMember(member)
    setPersonalDetails(member)
    setFormData((prev) => ({ ...prev, clientId: member.clientId, clientName: `${member.firstName} ${member.lastName}` }))
    setMemberSearchQuery("")
    setMemberSearchResults([])
  }

  const handleClearSelection = () => {
    setSelectedMember(null)
    setPersonalDetails({}) // Reset to empty
    setFormData((prev) => ({ ...prev, clientId: "", clientName: "" }))
  }

  const [personalDetails, setPersonalDetails] = useState<Partial<PersonalDetails>>(loan?.personalDetails || {})
  const [sourceOfIncome, setSourceOfIncome] = useState<Partial<SourceOfIncome>>(
    loan?.sourceOfIncome || { hasBusiness: false, hasEmployment: true },
  )

  const [assets, setAssets] = useState<Asset[]>(loan?.assets || [])
  // Handlers for dynamic assets
  const addAsset = () => {
    setAssets([...assets, { id: Date.now(), name: "", location: "", isPledged: false }])
  }
  const removeAsset = (id: number) => {
    setAssets(assets.filter((a) => a.id !== id))
  }

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(loan?.beneficiaries || [])
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

  const [otherIds, setOtherIds] = useState<OtherId[]>([])
  // Handlers for dynamic IDs
  const addOtherId = () => {
    setOtherIds([...otherIds, { id: Date.now(), name: "", number: "" }])
  }
  const removeOtherId = (id: number) => {
    setOtherIds(otherIds.filter((otherId) => otherId.id !== id))
  }
  
  const [coMakers, setCoMakers] = useState<CoMaker[]>(loan?.coMakers || [])
  const [coMakerSearchQuery, setCoMakerSearchQuery] = useState("")
  const [coMakerSearchResults, setCoMakerSearchResults] = useState<(PersonalDetails & { clientId: string })[]>([])
  const [isCoMakerSearching, setIsCoMakerSearching] = useState(false)

  // Handlers for co-maker search and selection
  const handleCoMakerSearch = (query: string) => {
    setCoMakerSearchQuery(query)
    if (!query) {
      setCoMakerSearchResults([])
      return
    }
    const existingMemberIds = coMakers.map((cm) => cm.memberId)
    if (selectedMember) {
      existingMemberIds.push(selectedMember.clientId)
    }

    const results = members.filter(
      (member) =>
        !existingMemberIds.includes(member.clientId) &&
        (`${member.firstName} ${member.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
          member.clientId.toLowerCase().includes(query.toLowerCase())),
    )
    setCoMakerSearchResults(results)
  }

  const handleSelectCoMaker = (member: PersonalDetails & { clientId: string }) => {
    const newCoMaker: CoMaker = {
      id: Date.now(),
      memberId: member.clientId,
      name: `${member.firstName} ${member.lastName}`,
      contactNumber: member.contactNumber,
      liabilityAmount: 0, // Default liability to be edited by user
    }
    setCoMakers([...coMakers, newCoMaker])
    setCoMakerSearchQuery("")
    setCoMakerSearchResults([])
  }

  const removeCoMaker = (id: number) => {
    setCoMakers(coMakers.filter((cm) => cm.id !== id))
  }

  const handleCoMakerLiabilityChange = (id: number, amount: number) => {
    setCoMakers(coMakers.map((cm) => (cm.id === id ? { ...cm, liabilityAmount: amount } : cm)))
  }

  const [documents, setDocuments] = useState<LoanDocuments>(loan?.documents || {})
  // Handlers for document uploads
  const handleFileChange = (
    fileType: "brgyClearance" | "electricityBill" | "waterBill",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (!file) {
      setDocuments((prev) => ({ ...prev, [fileType]: undefined }))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      // The result is the Base64 encoded string
      setDocuments((prev) => ({ ...prev, [fileType]: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  // Handlers for dynamic Proof of Income documents
  const addProofOfIncome = () => {
    const newProof: ProofOfIncomeDocument = {
      id: Date.now(),
      fileName: "",
      fileData: "",
      type: "Pay Slip", // Default value
    }
    setDocuments((prev) => ({
      ...prev,
      proofOfIncome: [...(prev.proofOfIncome || []), newProof],
    }))
  }

  const removeProofOfIncome = (id: number) => {
    setDocuments((prev) => ({
      ...prev,
      proofOfIncome: prev.proofOfIncome?.filter((p) => p.id !== id),
    }))
  }

  const handleProofOfIncomeFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setDocuments((prev) => ({
        ...prev,
        proofOfIncome: prev.proofOfIncome?.map((p) =>
          p.id === id ? { ...p, fileName: file.name, fileData: reader.result as string } : p,
        ),
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleProofOfIncomeChange = (id: number, field: keyof ProofOfIncomeDocument, value: any) => {
    setDocuments((prev) => ({
      ...prev,
      proofOfIncome: prev.proofOfIncome?.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const [formData, setFormData] = useState<Partial<Loan>>(
    loan || {
      // This is the new, comprehensive default object for a new loan application.
      id: 0,
      clientName: "",
      clientId: "",
      type: "Personal Loan",
      purpose: "",
      amount: 0,
      applicationDate: new Date().toISOString().split("T")[0],
      duration: "12 months",
      interestRate: "12%",
      paymentHistory: [],
      monthlyPayment: 0,
      paymentFrequency: "Monthly",
      loanBehaviourStatus: "Pending",
      // Initialize all other optional and nested fields to their default empty states.
      finalOutcome: "N/A",
      delinquencies: 0,
      maxOverdueDays: 0,
      riskAssessment: "Low Risk",
      dateGranted: "",
      personalDetails: {
        firstName: "",
        middleName: "",
        lastName: "",
        contactNumber: "",
        birthdate: "",
        sex: "Male",
        age: 0,
        presentAddress: "",
        yearsOfStay: 0,
        civilStatus: "Single",
        membershipDate: "",
        membershipStatus: "Active",
        dependents: [],
        monthlyIncome: 0,
      },
      sourceOfIncome: {
        type: "Employed",
      },
      assets: [],
      beneficiaries: [],
      coMakers: [],
      creditInvestigationBy: "",
      amountApproved: 0,
      processedBy: "",
      dateProcessed: "",
      approvedBy: "",
      dateApproved: "",
    },
  )

  // State for loan duration
  // This is used to handle the duration input separately from the formData.
  const [loanDuration, setLoanDuration] = useState(
    loan ? parseInt(loan.duration.split(" ")[0], 10) : 12,
  )
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

  // Handlers for dependents
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

  // Used for both creating and editing loans
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const clientName = selectedMember
      ? `${selectedMember.firstName} ${selectedMember.lastName}`
      : `${personalDetails.firstName || ""} ${personalDetails.middleName || ""} ${personalDetails.lastName || ""}`.trim().replace(/\s+/g, ' ');

    // Combine all data to create the final loan object
    const loanPayload = {
      // Core loan details from formData state
      ...formData,
      id: loan?.id || 0, // Send 0 for a new loan or use existing ID for editing
      clientId: selectedMember ? selectedMember.clientId : null, // Use existing ID or null for new member
      clientName: clientName, // Use the dynamically constructed name
      duration: `${loanDuration} months`,

      // Nested objects containing all the details from the form steps
      personalDetails: personalDetails,
      sourceOfIncome: sourceOfIncome,
      assets: assets,
      beneficiaries: beneficiaries,
      coMakers: coMakers,
      documents: documents,
      
      // Any other calculated or default values
    }

    // Pass the complete payload to the onSave handler.
    onSave(loanPayload as Loan)
    setStep(1) // Reset form to step 1 after submission
    handleClearSelection() // Ensure form is clear for next time
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
                {mode === "create" && (
                  <fieldset className="border p-4 rounded-md">
                    <legend className="px-2 font-medium text-sm">Member Selection</legend>
                    {selectedMember ? (
                      <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-md">
                        <div>
                          <p className="font-semibold text-blue-800">{`${selectedMember.firstName} ${selectedMember.lastName}`}</p>
                          <p className="text-sm text-blue-600">
                            Existing member selected. Personal details are locked.
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClearSelection} className="text-blue-700">
                          Clear
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="memberSearch">Search for an Existing Member (Optional)</Label>
                        <div className="relative mt-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="memberSearch"
                            placeholder="Search by name or ID..."
                            value={memberSearchQuery}
                            onChange={(e) => handleMemberSearch(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        {isSearching && <p className="text-sm text-gray-500 mt-2 flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Searching...</p>}
                        {isLoadingMembers && <p className="text-sm text-gray-500 mt-2 flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Loading members...</p>}
                        {memberSearchResults.length > 0 && !isLoadingMembers && (
                          <div className="mt-2 border rounded-md max-h-40 overflow-y-auto bg-white">
                            {memberSearchResults.map((member) => (
                              <div
                                key={member.clientId}
                                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                onClick={() => handleSelectMember(member)}
                              >
                                <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                                <p className="text-sm text-gray-500">{member.presentAddress}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </fieldset>
                )}

                {/* Personal Information Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Personal Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        placeholder="Juan"
                        value={personalDetails.firstName || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                        readOnly={!!selectedMember}
                      />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <Input
                        placeholder="Reyes"
                        value={personalDetails.middleName || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, middleName: e.target.value })}
                        readOnly={!!selectedMember}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        placeholder="Dela Cruz"
                        value={personalDetails.lastName || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                        readOnly={!!selectedMember}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>Contact Number</Label>
                      <Input
                        type="tel"
                        placeholder="09171234567"
                        value={personalDetails.contactNumber || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, contactNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Birthdate</Label>
                      <Input
                        type="date"
                        value={personalDetails.birthdate || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, birthdate: e.target.value })}
                        readOnly={!!selectedMember}
                      />
                    </div>
                    <div>
                      <Label>Sex</Label>
                      <Select
                        value={personalDetails.sex || ""}
                        onValueChange={(value) => setPersonalDetails({ ...personalDetails, sex: value as any })}
                      >
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
                      <Textarea
                        placeholder="123 Rizal St, Baguio City"
                        value={personalDetails.presentAddress || ""}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, presentAddress: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Years at Present Address</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="5"
                        value={personalDetails.yearsOfStay || ""}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, yearsOfStay: Number(e.target.value) })
                        }
                      />
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
                            civilStatus: value as "Single" | "Married" | "Lived-in Partner" | "Widowed" | "Legally Separated" | "Annulled",
                          })
                        }
                      >
                        <SelectTrigger id="civilStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Lived-in Partner">Lived-in Partner</SelectItem>
                          <SelectItem value="Legally Separated">Legally Separated</SelectItem>
                          <SelectItem value="Annulled">Annulled</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
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
                            educationType: value as "None" | "Elementary Undergraduate" | "Elementary Graduate" | "Highschool Undergraduate" | "Highschool Graduate" | "Vocational Graduate" | "College Undergraduate" | "College Graduate" | "Post-Graduate",
                          })
                        }
                      >
                        <SelectTrigger id="educationType">
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Elementary Undergraduate">Elementary Undergraduate</SelectItem>
                          <SelectItem value="Elementary Graduate">Elementary Graduate</SelectItem>
                          <SelectItem value="Highschool Undergraduate">Highschool Undergraduate</SelectItem>
                          <SelectItem value="Highschool Graduate">Highschool Graduate</SelectItem>
                          <SelectItem value="Vocational Graduate">Vocational Graduate</SelectItem>
                          <SelectItem value="College Undergraduate">College Undergraduate</SelectItem>
                          <SelectItem value="College Graduate">College Graduate</SelectItem>
                          <SelectItem value="Post-Graduate">Post-Graduate</SelectItem>
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
                  <p className="text-sm text-gray-500 mb-4">Select all applicable sources of income.</p>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBusiness"
                        checked={sourceOfIncome.hasBusiness}
                        onCheckedChange={(checked) =>
                          setSourceOfIncome({ ...sourceOfIncome, hasBusiness: !!checked })
                        }
                      />
                      <Label htmlFor="hasBusiness" className="font-medium">
                        Has a Business
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasEmployment"
                        checked={sourceOfIncome.hasEmployment}
                        onCheckedChange={(checked) =>
                          setSourceOfIncome({ ...sourceOfIncome, hasEmployment: !!checked })
                        }
                      />
                      <Label htmlFor="hasEmployment" className="font-medium">
                        Is Employed
                      </Label>
                    </div>
                  </div>

                  {sourceOfIncome.hasBusiness && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-semibold text-gray-700 mb-4">Business Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Business Type</Label>
                          <Select
                            value={sourceOfIncome.businessType || ""}
                            onValueChange={(businessType) =>
                              setSourceOfIncome({ ...sourceOfIncome, businessType: businessType as any })
                            }
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
                    </div>
                  )}
                  {sourceOfIncome.hasEmployment && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-semibold text-gray-700 mb-4">Employment Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <SelectItem value="Full-Time">Full-Time</SelectItem>
                              <SelectItem value="Part-Time">Part-Time</SelectItem>
                              <SelectItem value="Contractual/Project-Based">Contractual/Project-Based</SelectItem>
                              <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                              <SelectItem value="Unemployed">Unemployed</SelectItem>
                              <SelectItem value="Retired">Retired</SelectItem>
                              <SelectItem value="Homemaker">Homemaker</SelectItem>
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
                          <Input
                            placeholder="Asset Name (e.g., House, Vehicle)"
                            value={asset.name}
                            onChange={(e) => {
                              const newAssets = [...assets]
                              newAssets[index].name = e.target.value
                              setAssets(newAssets)
                            }}
                          />
                          <Input
                            placeholder="Location"
                            value={asset.location}
                            onChange={(e) => {
                              const newAssets = [...assets]
                              newAssets[index].location = e.target.value
                              setAssets(newAssets)
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Checkbox
                            id={`isPledged-${asset.id}`}
                            checked={asset.isPledged}
                            onCheckedChange={(checked) => {
                              const newAssets = [...assets]
                              newAssets[index].isPledged = !!checked
                              setAssets(newAssets)
                            }}
                          />
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
                          <Input
                            id={`beneficiary-name-${beneficiary.id}`}
                            placeholder="Beneficiary Name"
                            value={beneficiary.name}
                            onChange={(e) => {
                              const updatedBeneficiaries = [...beneficiaries]
                              updatedBeneficiaries[index].name = e.target.value
                              setBeneficiaries(updatedBeneficiaries)
                            }}
                          />
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
                          <Input
                            id={`beneficiary-bday-${beneficiary.id}`}
                            type="date"
                            value={beneficiary.birthdate}
                            onChange={(e) => {
                              const updatedBeneficiaries = [...beneficiaries]
                              updatedBeneficiaries[index].birthdate = e.target.value
                              setBeneficiaries(updatedBeneficiaries)
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`beneficiary-contact-${beneficiary.id}`} className="text-xs">
                            Contact Number
                          </Label>
                          <Input
                            id={`beneficiary-contact-${beneficiary.id}`}
                            type="tel"
                            placeholder="Contact Number"
                            value={beneficiary.contactNumber}
                            onChange={(e) => {
                              const updatedBeneficiaries = [...beneficiaries]
                              updatedBeneficiaries[index].contactNumber = e.target.value
                              setBeneficiaries(updatedBeneficiaries)
                            }}
                          />
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
                      <Input type="file" className="mt-1" onChange={(e) => handleFileChange("brgyClearance", e)} />
                    </div>

                    {/* Proof of Income */}
                   <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="font-medium">Proof of Income</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addProofOfIncome}>
                          Add Proof
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {documents.proofOfIncome?.map((proof, index) => (
                          <div key={proof.id} className="space-y-4 p-4 border rounded-md bg-gray-50/50 relative">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-semibold text-gray-600">Proof #{index + 1}</p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProofOfIncome(proof.id)}
                                className="h-7 w-7 text-red-500 hover:text-red-700 absolute top-2 right-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`proofOfIncomeType-${proof.id}`} className="text-xs">
                                  Type of Proof
                                </Label>
                                <Select
                                  value={proof.type}
                                  onValueChange={(value) =>
                                    handleProofOfIncomeChange(
                                      proof.id,
                                      "type",
                                      value as ProofOfIncomeDocument["type"],
                                    )
                                  }
                                >
                                  <SelectTrigger id={`proofOfIncomeType-${proof.id}`}>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pay Slip">Pay Slip</SelectItem>
                                    <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                                    <SelectItem value="Business Permit">Business Permit</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {proof.type === "Business Permit" && (
                                <div>
                                  <Label htmlFor={`businessPermitStatus-${proof.id}`} className="text-xs">
                                    Permit Status
                                  </Label>
                                  <Select
                                    value={proof.businessPermitStatus}
                                    onValueChange={(value) =>
                                      handleProofOfIncomeChange(
                                        proof.id,
                                        "businessPermitStatus",
                                        value as ProofOfIncomeDocument["businessPermitStatus"],
                                      )
                                    }
                                  >
                                    <SelectTrigger id={`businessPermitStatus-${proof.id}`}>
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
                              <Label htmlFor={`proofOfIncomeFile-${proof.id}`} className="text-xs">
                                Upload File
                              </Label>
                              <Input
                                id={`proofOfIncomeFile-${proof.id}`}
                                type="file"
                                className="mt-1"
                                onChange={(e) => handleProofOfIncomeFileChange(proof.id, e)}
                              />
                              {proof.fileName && (
                                <p className="text-xs text-gray-500 mt-1">Current file: {proof.fileName}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        {(!documents.proofOfIncome || documents.proofOfIncome.length === 0) && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No proof of income documents added.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Electricity Bill */}
                    <div className="pt-4 border-t">
                      <Label>Electricity Bill</Label>
                      <Input type="file" className="mt-1" onChange={(e) => handleFileChange("electricityBill", e)} />
                    </div>

                    {/* Water Bill */}
                    <div className="pt-4 border-t">
                      <Label>Water Bill</Label>
                      <Input type="file" className="mt-1" onChange={(e) => handleFileChange("waterBill", e)} />
                    </div>
                  </div>
                </fieldset>

                {/* IDs Section */}
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 font-medium text-sm">Valid IDs</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input
                      placeholder="TIN"
                      value={personalDetails.tin || ""}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, tin: e.target.value })}
                    />
                    <Input
                      placeholder="SSS Number"
                      value={personalDetails.sss || ""}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, sss: e.target.value })}
                    />
                    <Input
                      placeholder="Philhealth Number"
                      value={personalDetails.philhealth || ""}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, philhealth: e.target.value })}
                    />
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Type of Loan</Label>
                      <Select
                        value={formData.type || ""}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
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
                      <Input
                        type="number"
                        min="0"
                        placeholder="50000"
                        value={formData.amount || ""}
                        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Application Date</Label>
                      <Input
                        type="date"
                        value={formData.applicationDate?.split("T")[0] || ""}
                        onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Purpose</Label>
                    <Input
                      placeholder="e.g., For business expansion"
                      value={formData.purpose || ""}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    />
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
                    <Select
                      value={formData.paymentFrequency || ""}
                      onValueChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
                    >
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
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          loanBehaviourStatus: value as any,
                        })
                      }}
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

                  {/* List of selected co-makers */}
                  {coMakers.map((coMaker, index) => (
                    <div key={coMaker.id} className="space-y-3 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <Label className="font-semibold">Co-Maker #{index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCoMaker(coMaker.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 border rounded-md">
                        <p className="font-medium text-gray-800">{coMaker.name}</p>
                        <p className="text-sm text-gray-500">
                          ID: {coMaker.memberId} | Contact: {coMaker.contactNumber}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor={`liability-${coMaker.id}`}>Amount to Pledge as Liability (₱)</Label>
                        <Input
                          id={`liability-${coMaker.id}`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={coMaker.liabilityAmount}
                          onChange={(e) => handleCoMakerLiabilityChange(coMaker.id, Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Search section to add a new co-maker */}
                  <div className="pt-2">
                    <Label htmlFor="coMakerSearch">Search for a Member to Add as Co-Maker</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="coMakerSearch"
                        placeholder="Search by name or ID..."
                        value={coMakerSearchQuery}
                        onChange={(e) => handleCoMakerSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {isCoMakerSearching && (
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </p>
                    )}
                    {isLoadingMembers && <p className="text-sm text-gray-500 mt-2 flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Loading members...</p>}
                    {coMakerSearchResults.length > 0 && !isLoadingMembers && (
                      <div className="mt-2 border rounded-md max-h-40 overflow-y-auto bg-white">
                        {coMakerSearchResults.map((member) => (
                          <div
                            key={member.clientId}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                            onClick={() => handleSelectCoMaker(member)}
                          >
                            <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                            <p className="text-sm text-gray-500">{member.presentAddress}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {coMakers.length === 0 && !coMakerSearchQuery && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No co-makers added. Use the search bar to find and add a member.
                      </p>
                    )}
                  </div>
                </fieldset>

                {/* SHOULD BE IN LOANDETAILSPANEL() Approval Section */}
                {formData.loanBehaviourStatus && !["Pending", "Rejected"].includes(formData.loanBehaviourStatus) && (
                  <fieldset className="border p-4 rounded-md space-y-4">
                    <legend className="px-2 font-medium text-sm text-red-600">For Account Officer Only</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Credit Investigation By</Label>
                        <Input
                          placeholder="CI Personnel Name"
                          value={formData.creditInvestigationBy || ""}
                          onChange={(e) => setFormData({ ...formData, creditInvestigationBy: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Amount Approved (₱)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={formData.amountApproved || ""}
                          onChange={(e) => setFormData({ ...formData, amountApproved: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label>Loan Processed By</Label>
                        <Input
                          placeholder="Processing Officer Name"
                          value={formData.processedBy || ""}
                          onChange={(e) => setFormData({ ...formData, processedBy: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Date Processed</Label>
                        <Input
                          type="date"
                          value={formData.dateProcessed || ""}
                          onChange={(e) => setFormData({ ...formData, dateProcessed: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Loan Approved By</Label>
                        <Input
                          placeholder="Approving Officer Name"
                          value={formData.approvedBy || ""}
                          onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Date Approved</Label>
                        <Input
                          type="date"
                          value={formData.dateApproved || ""}
                          onChange={(e) => setFormData({ ...formData, dateApproved: e.target.value })}
                        />
                      </div>
                    </div>
                  </fieldset>
                )}
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
  const [loans, setLoans] = useState<Loan[]>([])
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [updateLoan, setUpdateLoan] = useState<Loan | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null)
  const hasRequestedUpdate = useRef<boolean>(false);

  // State to hold all members fetched from the backend.
  const [allMembers, setAllMembers] = useState<(PersonalDetails & { clientId: string })[]>([])
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)

  // useEffect to fetch members from .NET when the component mounts.
  useEffect(() => {
    // Define the callback function that .NET will call with the data.
    ;(window as any).handleMembersSummaryResponse = (dataFromDotNet: any) => {
      console.log("✅ Received member data from .NET:", dataFromDotNet)
      try {

        let rawMembers = []
        if (typeof dataFromDotNet === "string") {
          rawMembers = JSON.parse(dataFromDotNet)
        } else if (Array.isArray(dataFromDotNet)) {
          rawMembers = dataFromDotNet
        } else {
          throw new Error("Received data of unexpected type from .NET")
        }

        const mappedMembers = rawMembers.map((member: any) => ({
          // --- Direct Mappings ---
          clientId: String(member.member_id), // Assuming the backend will send 'member_id'
          firstName: member.first_name,
          middleName: member.middle_name,
          lastName: member.last_name,
          contactNumber: member.contact_number,
          presentAddress: member.present_address,
          yearsOfStay: member.years_at_address,
          tin: member.tin,
          sss: member.sss,
          philhealth: member.philhealth,
          savings: member.savings,
          shareCapital: member.share_capital,
          termDeposit: member.term_deposit,
          map: member.map,
          spouseName: member.spouse_name,
          spouseContact: member.spouse_contact,
          spouseMonthlyIncomeMin: member.spouse_monthly_income_min,
          spouseMonthlyIncomeMax: member.spouse_monthly_income_max,

          // --- Date Formatting ---
          birthdate: member.date_of_birth ? member.date_of_birth.split("T")[0] : "",
          membershipDate: member.membership_date ? member.membership_date.split("T")[0] : "",
          spouseBirthdate: member.spouse_birthdate ? member.spouse_birthdate.split("T")[0] : "",
          sex: member.sex,
          civilStatus: member.civil_status,
          educationType: member.education,
          membershipStatus: member.membership_status,

          // --- Array Generation ---
          dependents: Array.from({ length: member.number_of_dependents || 0 }, (_, i) => ({
            id: Date.now() + i,
            isInSchool: false, // Default value
          })),
          
          // Default empty values for any potentially missing fields
          age: 0, 
          monthlyIncome: 0,
        }));

        console.log("Mapped members for frontend use:", mappedMembers);
        setAllMembers(mappedMembers)
      } catch (error) {
        console.error("❌ Failed to parse member data from .NET:", error)
        toast({
          title: "Data Error",
          description: "Could not process member data from the backend.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingMembers(false)
      }
    }

    // Send the message to .NET to request the members.
    try {
      console.log("🚀 Requesting all members from .NET backend...")
      HybridWebView.SendInvokeMessageToDotNet("GetMembersSummary")
    } catch (error) {
      console.error("❌ Failed to send 'GetMembersSummary' message to .NET:", error)
      // Fallback to mock data if the webview call fails (for browser development)
      setAllMembers([])
      setIsLoadingMembers(false)
    }

    // Cleanup: Remove the global function when the component unmounts.
    return () => {
      delete (window as any).handleMembersSummaryResponse
    }
  }, []) // The empty dependency array `[]` ensures this runs only once.

  // HybridWebView integration for receiving loan data from .NET
  //   useEffect(() => {
  //   (window as any).globalSetLoans = (dataFromDotNet: any) => {
  //     console.log("✅ Received loan data from .NET:", dataFromDotNet);
      
  //     let loansJson = [];
  //     if (typeof dataFromDotNet === 'string') {
  //       try {
  //         loansJson = JSON.parse(dataFromDotNet);
  //       } catch (e) {
  //         console.error("Error parsing JSON string from .NET:", e);
  //         return;
  //       }
  //     } else if (Array.isArray(dataFromDotNet)) {
  //       loansJson = dataFromDotNet;
  //     } else {
  //       console.error("Received data of unexpected type from .NET:", typeof dataFromDotNet);
  //       return;
  //     }

  //     const loanStatusMap: Record<string, LoanStatus> = {
  //       "Pending": "Pending",
  //       "Active": "Disbursed",
  //       "In Arrears": "Disbursed", // A loan in arrears is still an active, disbursed loan.
  //       "Paid": "Paid",
  //       "Defaulted": "Defaulted",
  //       "Rejected": "Declined",
  //     };

  //     const paymentStatusMap: Record<string, "Paid" | "Pending" | "Overdue"> = {
  //       "Paid": "Paid",
  //       "Pending": "Pending",
  //       "Overdue": "Overdue"
  //     };

  //     const mappedLoans = loansJson.map((loanData: any) => {
  //       // Find the most recent payment if any exists
  //       const payments = loanData.LedgerEntries
  //         ?.filter((entry: any) => entry.Type === "Payment")
  //         .map((payment: any, index: number) => ({
  //           id: `PAY${loanData.LoanId}-${index}`,
  //           date: payment.TransactionDate.split('T')[0],
  //           amount: payment.Credit,
  //           principal: payment.Credit * 0.9, // Assuming 10% interest
  //           interest: payment.Credit * 0.1,
  //           remainingBalance: payment.RunningBalance,
  //           status: paymentStatusMap["Paid"], // Default to Paid for ledger entries
  //           method: payment.Notes?.includes('bank') ? 'Bank Transfer' : 'Cash'
  //         })) || [];

  //       const disbursementEntry = loanData.LedgerEntries?.find((entry: any) => entry.Type === "Disbursement");
        
  //       return {
  //         id: loanData.LoanId,
  //         clientName: loanData.MemberFullName, // You'll need to get this from your data
  //         clientId: loanData.MemberId, // You'll need to get this from your data
  //         type: loanData.ProductType,
  //         purpose: "Business Expansion", // Default purpose
  //         amount: loanData.PrincipalAmount,
  //         applicationDate: loanData.DateGranted.split('T')[0],
  //         duration: `${loanData.TermMonths} months`,
  //         status: loanStatusMap[loanData.LoanStatus] || "Pending",
  //         interestRate: `${(loanData.InterestRate * 100).toFixed(2)}%`,
  //         remainingBalance: loanData.LedgerEntries?.slice(-1)[0]?.RunningBalance || loanData.PrincipalAmount,
  //         nextPayment: payments.length > 0 ? 
  //           new Date(new Date(payments[payments.length-1].date).getTime() + 30*24*60*60*1000).toISOString().split('T')[0] : 
  //           new Date(new Date(loanData.DateGranted).getTime() + 30*24*60*60*1000).toISOString().split('T')[0],
  //         validatedBy: "Loan Officer", // Default value
  //         creditScore: 75, // Default value
  //         coApplicantNumber: loanData.CoMakers?.length || 0,
  //         guarantorNumber: loanData.CoMakers?.filter((c: any) => c.Status === "Active").length || 0,
  //         paymentHistory: payments,
  //         monthlyPayment: loanData.InstallmentAmount,
  //         collateralType: loanData.CoMakers?.length > 0 ? "Secured" : "Unsecured",
  //         paymentFrequency: loanData.PayFrequency
  //       } as Loan;
  //     });

  //     setLoans(mappedLoans);

        
  //   };

  //   // HybridWebView.SendInvokeMessageToDotNet("getLoans");

  // }, []);
// useEffect(() => {
//   // Complete frontend to PostgreSQL enum mapping
//   const statusMap: Record<string, string> = {
//     Approved: "Active",
//     Pending: "Pending",
//     Declined: "Rejected",
//     Disbursed: "Active",
//     Paid: "Paid Off",
//     Defaulted: "Defaulted",
//     InArrears: "In Arrears"  // Added this missing mapping
//   };

//   // Helper function to safely map status with fallback
//   const mapStatus = (status: string): string => {
//     const mappedStatus = statusMap[status];
//     if (!mappedStatus) {
//       console.warn(`⚠️ Unknown status "${status}" - sending as-is`);
//       return status;
//     }
//     return mappedStatus;
//   };

//   const sendLoanUpdate = () => {
//     if (!updateLoan || hasRequestedUpdate.current) return;
    
//     console.log("📤 Sending loan update to backend...");
//     hasRequestedUpdate.current = true;

//     // Prepare payload with safe status mapping
//     const payload = {
//       MemberId: String(updateLoan.clientId),
//       LoanId: Number(updateLoan.id),
//       UpdateData: {
//         Status: mapStatus(updateLoan.status), // Use safe mapping function
//         Amount: parseFloat(updateLoan.amount.toFixed(2)),
//         InterestRate: parseFloat(updateLoan.interestRate.replace('%', '')),
//         LoanType: updateLoan.type,
//         Purpose: updateLoan.purpose,
//         PaymentFrequency: updateLoan.paymentFrequency,
//         CollateralType: updateLoan.collateralType || '',
//         Duration: updateLoan.duration
//       }
//     };

//     console.log("Update payload:", payload);

//     try {
//       if (!isValidPayload(payload)) {
//         throw new Error("Invalid update payload");
//       }

//       HybridWebView.SendInvokeMessageToDotNet("updateLoan", payload);
//     } catch (error) {
//       console.error("❌ Failed to send loan update:", error);
//       hasRequestedUpdate.current = false;
//     }
//   };

//   const isValidPayload = (payload: any): boolean => {
//     if (!payload || !payload.UpdateData) return false;
    
//     // Validate basic types
//     const validations = [
//       typeof payload.MemberId === 'string',
//       typeof payload.LoanId === 'number',
//       typeof payload.UpdateData.Amount === 'number',
//       typeof payload.UpdateData.Status === 'string'
//     ];

//     // Additional validations can be added here
//     return validations.every(Boolean);
//   };

//   sendLoanUpdate();

//   return () => {
//     hasRequestedUpdate.current = false;
//   };
// }, [updateLoan]);

  const filteredLoans = loans.filter((loan) => {
      const searchTextLower = searchText.toLowerCase();
      const matchesSearch =
        loan.id.toString().includes(searchTextLower) || // Convert number to string first
        loan.clientName.toLowerCase().includes(searchTextLower) ||
        (loan.type && loan.type.toLowerCase().includes(searchTextLower)); // Optional chaining if type might be undefined

      const matchesStatus = statusFilter === "All" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
  });

  const mapBehaviourToDisplayStatus = (
    behaviourStatus?: "Pending" | "Active" | "Paid" | "In Arrears" | "Defaulted" | "Rejected" | "N/A",
  ): LoanStatus => {
    switch (behaviourStatus) {
      case "Pending":
        return "Pending"
      case "Active":
      case "In Arrears":
        return "Disbursed"
      case "Paid":
        return "Paid"
      case "Rejected":
        return "Declined"
      case "Defaulted":
        return "Defaulted" // Correct mapping
      default:
        return "Pending"
    }
  }

  const handleCreateLoan = (loanPayload: Loan) => {
    // This function receives the "massive payload" from the form dialog.
    console.log("📤 Preparing to send new loan payload to .NET:", loanPayload);

    // Augment the payload with the display status before adding to local state
    // const loanWithDisplayStatus: Loan = {
    //   ...loanPayload,
    //   status: mapBehaviourToDisplayStatus(loanPayload.loanBehaviourStatus),
    // };

    // This ensures that every field matches the C# DTO's expected data type.
    const backendPayload = {
      ...loanPayload,
      // Ensure numeric fields are numbers, not strings.
      id: Number(loanPayload.id || 0),
      // clientId: loanPayload.clientId ? Number(loanPayload.clientId) : null, // Convert string ID back to a number for the backend.
      amount: Number(loanPayload.amount || 0),
      monthlyPayment: Number(loanPayload.monthlyPayment || 0),
      amountApproved: Number(loanPayload.amountApproved || 0),
      delinquencies: Number(loanPayload.delinquencies || 0),
      maxOverdueDays: Number(loanPayload.maxOverdueDays || 0),
      personalDetails: {
        ...loanPayload.personalDetails,
        // Ensure nested numeric fields are correct
        yearsOfStay: Number(loanPayload.personalDetails?.yearsOfStay || 0),
        savings: Number(loanPayload.personalDetails?.savings || 0),
        shareCapital: Number(loanPayload.personalDetails?.shareCapital || 0),
        termDeposit: Number(loanPayload.personalDetails?.termDeposit || 0),
        map: Number(loanPayload.personalDetails?.map || 0),
      },
      coMakers: loanPayload.coMakers?.map(coMaker => ({
        ...coMaker,
        // The backend expects the co-maker's temporary ID and memberId to be numbers.
        id: Number(coMaker.id),
        memberId: Number(coMaker.memberId),
      })),
      // Remove frontend-only properties that the backend DTO doesn't have.
      status: undefined, 
    };
    
    // The 'status' property is not in the DTO, so we remove it.
    delete (backendPayload as any).status;

    try {
      // Send the entire payload to the .NET backend method called "RegisterLoanApplication" that is designed to accept this entire object.
      HybridWebView.SendInvokeMessageToDotNet("RegisterLoanApplication", backendPayload);
      console.log("✅ Successfully sent 'RegisterLoanApplication' message to .NET");
      // Close the dialog and provide feedback to the user.
      // You can optionally add the loan to the local state for a faster UI update,
      // or wait for a confirmation callback from the backend.
      setIsCreateDialogOpen(false);
      toast({
        title: "Loan Submitted",
        description: `The new loan application has been sent for processing.`,
      });
    } catch (error) {
      console.error("❌ Failed to send 'registerLoanApplication' message to .NET:", error);
      toast({
        title: "Submission Failed",
        description: "Could not send the loan data to the backend. Please check the console.",
        variant: "destructive",
      });
    }
  };

//   const handleUpdateLoan = (updatedLoan: Loan) => {
//   setLoans(prev => prev.map(loan => 
//     loan.id === updatedLoan.id ? updatedLoan : loan
//   ));
//   setEditingLoan(null);
//   setSelectedLoan(updatedLoan);
//   setUpdateLoan(updatedLoan); // This will trigger the useEffect
  
//   toast({
//     title: "Success",
//     description: `Loan ${updatedLoan.id} has been updated successfully.`,
//   });
// };

//   const handleDeleteLoan = (loanId: number) => {
//     const loanToDelete = loans.find((l) => l.id === loanId)
//     setLoans((prev) => prev.filter((loan) => loan.id !== loanId))
//     setSelectedLoan(null)

//     toast({
//       title: "Success",
//       description: `Loan ${loanToDelete?.id} has been deleted successfully.`,
//       variant: "destructive",
//     })
//   }

//   const handleProcessPayment = (loanId: number, payment: Omit<Payment, "id">) => {
//     const paymentWithId = { ...payment, id: `PAY${Date.now()}` }

//     setLoans((prev) =>
//       prev.map((loan) => {
//         if (loan.id === loanId) {
//           const updatedLoan = {
//             ...loan,
//             paymentHistory: [...loan.paymentHistory, paymentWithId],
//             remainingBalance: payment.remainingBalance,
//             status: payment.remainingBalance <= 0 ? ("Paid" as LoanStatus) : loan.status,
//           }
//           setSelectedLoan(updatedLoan)
//           return updatedLoan
//         }
//         return loan
//       }),
//     )

//     toast({
//       title: "Payment Processed",
//       description: `Payment of ₱${payment.amount.toLocaleString()} has been recorded successfully.`,
//     })
//   }

//   const handleEditLoan = (loan: Loan) => {
//     setEditingLoan(loan)
    
//     setSelectedLoan(null)
//   }

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
                  <SelectItem value="Disbursed">Disbursed</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Defaulted">Defaulted</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">Name</TableHead>
                  <TableHead className="text-gray-700">Type</TableHead>
                  <TableHead className="text-gray-700">Amount</TableHead>
                  <TableHead className="text-gray-700">Loan Status</TableHead>
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
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {loan.clientName
                              .split("")
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
        members={allMembers}
        isLoadingMembers={isLoadingMembers}
      />

      {editingLoan && (
        <LoanFormDialog
          loan={editingLoan}
          isOpen={true}
          onClose={() => setEditingLoan(null)}
          onSave={handleUpdateLoan}
          mode="edit"
          members={allMembers}
          isLoadingMembers={isLoadingMembers}
        />
      )}
    </div>
  )
}
