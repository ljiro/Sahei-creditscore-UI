"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronDown, FileText, Search, Shield, User, Users2, UserCog, ListChecks, Cog, LogOut, Book, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Extended loan data with previous loans
const loans = [
  {
    id: "LN001",
    clientName: "Juan Dela Cruz",
    type: "Personal Loan",
    purpose: "Home Renovation",
    amount: 50000,
    applicationDate: "2025-05-15",
    duration: "12 months",
    status: "Pending",
    interestRate: "12%",
    remainingBalance: 50000,
    nextPayment: "N/A",
    validatedBy: "Maria Santos",
    creditScore: 85,
    coApplicantNumber: 2,
    guarantorNumber: 1,
    clientAddress: "123 Main St, Manila",
    clientContact: "09123456789",
    clientEmail: "juan.delacruz@example.com",
    clientBirthdate: "1985-03-15",
    clientOccupation: "Architect",
    previousLoans: [
      {
        id: "PL001",
        amount: 20000,
        date: "2023-01-10",
        status: "Fully Paid",
        type: "Personal Loan"
      },
      {
        id: "PL002",
        amount: 35000,
        date: "2024-03-22",
        status: "Fully Paid",
        type: "Emergency Loan"
      }
    ]
  },
  {
    id: "LN002",
    clientName: "Maria Santos",
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
    clientAddress: "456 Oak Ave, Quezon City",
    clientContact: "09234567890",
    clientEmail: "maria.santos@example.com",
    clientBirthdate: "1980-07-22",
    clientOccupation: "Business Owner",
    previousLoans: [
      {
        id: "BL001",
        amount: 100000,
        date: "2022-05-15",
        status: "Fully Paid",
        type: "Business Loan"
      },
      {
        id: "BL002",
        amount: 75000,
        date: "2023-11-30",
        status: "Fully Paid",
        type: "Equipment Loan"
      }
    ]
  },
  {
    id: "LN003",
    clientName: "Pedro Reyes",
    type: "Emergency Loan",
    purpose: "Medical Expenses",
    amount: 30000,
    applicationDate: "2025-05-25",
    duration: "6 months",
    status: "Approved",
    interestRate: "15%",
    remainingBalance: 30000,
    nextPayment: "2025-06-25",
    validatedBy: "Ana Lopez",
    creditScore: 78,
    coApplicantNumber: 1,
    guarantorNumber: 1,
    clientAddress: "789 Pine Rd, Makati",
    clientContact: "09345678901",
    clientEmail: "pedro.reyes@example.com",
    clientBirthdate: "1978-11-30",
    clientOccupation: "Teacher",
    previousLoans: [
      {
        id: "EL001",
        amount: 15000,
        date: "2024-02-10",
        status: "Fully Paid",
        type: "Emergency Loan"
      }
    ]
  }
]

function LoanContract({ loan, onClose }: { loan: typeof loans[0], onClose: () => void }) {
  const contractRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => contractRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          color: #000;
          background: #fff;
        }
        .no-print {
          display: none;
        }
      }
    `,
    documentTitle: `Loan_Contract_${loan.id}_${loan.clientName.replace(/\s+/g, '_')}`
  })

  const calculateMonthlyPayment = () => {
    const principal = loan.amount
    const rate = parseFloat(loan.interestRate) / 100 / 12
    const months = parseInt(loan.duration.split(' ')[0])
    return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
  }

  const monthlyPayment = calculateMonthlyPayment().toFixed(2)
  const totalInterest = (parseFloat(monthlyPayment) * parseInt(loan.duration.split(' ')[0]) - loan.amount).toFixed(2)
  const totalRepayment = (parseFloat(monthlyPayment) * parseInt(loan.duration.split(' ')[0])).toFixed(2)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-white rounded-lg h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Loan Contract for {loan.id}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Review and generate the loan contract document
              </DialogDescription>
            </div>
            <div className="flex gap-2 no-print">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="text-gray-700 border-gray-200 hover:bg-gray-100"
              >
                Close
              </Button>
              <Button 
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        {/* Loan Contract Document */}
        <div 
          ref={contractRef} 
          className="bg-white p-8 border border-gray-200 rounded-lg shadow-none"
          style={{ minHeight: '297mm' }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">LOAN AGREEMENT CONTRACT</h1>
            <p className="text-gray-600">This Agreement is made and entered into this {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">PARTIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">LENDER:</h3>
                <p className="mb-1">ABC Lending Corporation</p>
                <p className="mb-1">123 Business Center, Makati City</p>
                <p className="mb-1">Tel: (02) 8123-4567</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">BORROWER:</h3>
                <p className="mb-1">{loan.clientName}</p>
                <p className="mb-1">{loan.clientAddress}</p>
                <p className="mb-1">Contact: {loan.clientContact}</p>
                <p className="mb-1">Email: {loan.clientEmail}</p>
                <p className="mb-1">Credit Score: {loan.creditScore}/100</p>
              </div>
            </div>
          </div>
          
          {/* Client Financial History Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">CLIENT FINANCIAL HISTORY</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Previous Loans</h3>
                {loan.previousLoans.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loan.previousLoans.map((prevLoan) => (
                          <tr key={prevLoan.id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{prevLoan.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{prevLoan.type}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">₱{prevLoan.amount.toLocaleString()}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{prevLoan.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                prevLoan.status === "Fully Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {prevLoan.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No previous loans recorded</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Credit Assessment</h3>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        loan.creditScore >= 80 ? "bg-green-500" :
                        loan.creditScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${loan.creditScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Score: {loan.creditScore}/100 ({loan.creditScore >= 80 ? "Excellent" : loan.creditScore >= 60 ? "Good" : "Fair"})
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">LOAN TERMS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">1. Loan Amount</h3>
                <p>PHP {loan.amount.toLocaleString('en-PH', { style: 'decimal', minimumFractionDigits: 2 })}</p>
                
                <h3 className="font-medium mb-2 mt-4">2. Purpose</h3>
                <p>{loan.purpose}</p>
                
                <h3 className="font-medium mb-2 mt-4">3. Interest Rate</h3>
                <p>{loan.interestRate} per annum</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">4. Term</h3>
                <p>{loan.duration}</p>
                
                <h3 className="font-medium mb-2 mt-4">5. Repayment Schedule</h3>
                <p>Monthly amortization of PHP {monthlyPayment}</p>
                <p>First payment due on: {loan.nextPayment === "N/A" ? "Upon approval" : loan.nextPayment}</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-lg font-semibold">PHP {totalInterest}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Repayment</p>
                <p className="text-lg font-semibold">PHP {totalRepayment}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Effective Interest Rate</p>
                <p className="text-lg font-semibold">{loan.interestRate} p.a.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">TERMS AND CONDITIONS</h2>
            
            <h3 className="font-medium mb-2">1. Payment Terms</h3>
            <p className="mb-4">
              The Borrower agrees to repay the Loan Amount plus interest in {loan.duration} equal monthly installments 
              of PHP {monthlyPayment}, due on the {new Date().getDate()}th day of each month, beginning on {loan.nextPayment === "N/A" ? "the date specified in the approval notice" : loan.nextPayment}.
            </p>
            
            <h3 className="font-medium mb-2">2. Late Payment</h3>
            <p className="mb-4">
              Payments received more than 5 days after the due date will be subject to a late fee of 5% of the payment amount.
            </p>
            
            <h3 className="font-medium mb-2">3. Prepayment</h3>
            <p className="mb-4">
              The Borrower may prepay the loan in full or in part at any time without penalty. Partial prepayments will 
              be applied first to any accrued interest and then to the principal balance.
            </p>
            
            <h3 className="font-medium mb-2">4. Default</h3>
            <p className="mb-4">
              The Borrower shall be in default if any payment is not received within 30 days of its due date. Upon default, 
              the Lender may declare the entire unpaid balance immediately due and payable.
            </p>
            
            <h3 className="font-medium mb-2">5. Security</h3>
            <p className="mb-4">
              {loan.guarantorNumber > 0 ? 
                `This loan is secured by ${loan.guarantorNumber} guarantor(s). The guarantor(s) agree to be jointly and severally liable for the repayment of this loan.` : 
                'This is an unsecured personal loan.'}
            </p>
            
            <h3 className="font-medium mb-2">6. Governing Law</h3>
            <p className="mb-4">
              This Agreement shall be governed by and construed in accordance with the laws of the Republic of the Philippines.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">SIGNATURES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <div className="border-t border-gray-300 pt-4 mb-16">
                  <p className="font-medium">BORROWER:</p>
                  <p className="mb-1">{loan.clientName}</p>
                  <p>Date: ___________________</p>
                </div>
                
                {loan.coApplicantNumber > 0 && (
                  <div className="border-t border-gray-300 pt-4 mb-16">
                    <p className="font-medium">CO-APPLICANT(S):</p>
                    {Array.from({ length: loan.coApplicantNumber }).map((_, i) => (
                      <div key={i} className="mb-4">
                        <p className="mb-1">Name: ___________________</p>
                        <p>Signature: ___________________</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="border-t border-gray-300 pt-4 mb-16">
                  <p className="font-medium">LENDER:</p>
                  <p className="mb-1">ABC Lending Corporation</p>
                  <p className="mb-1">By: ___________________</p>
                  <p>Date: ___________________</p>
                </div>
                
                {loan.guarantorNumber > 0 && (
                  <div className="border-t border-gray-300 pt-4 mb-16">
                    <p className="font-medium">GUARANTOR(S):</p>
                    {Array.from({ length: loan.guarantorNumber }).map((_, i) => (
                      <div key={i} className="mb-4">
                        <p className="mb-1">Name: ___________________</p>
                        <p>Signature: ___________________</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-8">
            <p>This document constitutes the entire agreement between the parties and supersedes all prior agreements and understandings. 
            Any modifications must be in writing and signed by both parties.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function LoanReportsPage() {
  const [searchText, setSearchText] = useState("")
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("Pending")

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchText.toLowerCase()) ||
                         loan.clientName.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === "All" ? true : loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
            variant="secondary" 
            className="justify-start text-gray-900 bg-gray-100 hover:bg-gray-200"
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
          <h1 className="text-xl font-semibold text-gray-800">Loan Contract Reports</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search loans..."
                className="w-64 rounded-lg bg-gray-50 border-gray-200 pl-8 focus:ring-blue-500 focus:border-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200 focus:ring-blue-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-800 border-gray-200">
                <SelectItem value="All" className="hover:bg-gray-100">All</SelectItem>
                <SelectItem value="Pending" className="hover:bg-gray-100">Pending</SelectItem>
                <SelectItem value="Approved" className="hover:bg-gray-100">Approved</SelectItem>
                <SelectItem value="Active" className="hover:bg-gray-100">Active</SelectItem>
              </SelectContent>
            </Select>
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
          {selectedLoan ? (
            <LoanContract loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Pending Loan Approvals</CardTitle>
                    <CardDescription className="text-gray-500">
                      {filteredLoans.length} loans found
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableHead className="text-gray-600 font-medium">LOAN ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">CLIENT</TableHead>
                      <TableHead className="text-gray-600 font-medium">CREDIT SCORE</TableHead>
                      <TableHead className="text-gray-600 font-medium">TYPE</TableHead>
                      <TableHead className="text-gray-600 font-medium">AMOUNT</TableHead>
                      <TableHead className="text-gray-600 font-medium">DATE</TableHead>
                      <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
                      <TableHead className="text-gray-600 font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.length > 0 ? (
                      filteredLoans.map((loan) => (
                        <TableRow key={loan.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{loan.id}</TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-blue-100 text-blue-800">
                                  {loan.clientName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{loan.clientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    loan.creditScore >= 80 ? "bg-green-500" :
                                    loan.creditScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${loan.creditScore}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{loan.creditScore}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <Badge variant="outline" className="border-gray-200 text-gray-600">
                              {loan.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 font-medium">₱{loan.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-500">{loan.applicationDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                loan.status === "Approved" ? "default" : 
                                loan.status === "Pending" ? "secondary" : "destructive"
                              }
                              className="flex items-center gap-1"
                            >
                              {loan.status === "Approved" ? (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              ) : loan.status === "Pending" ? (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              ) : (
                                <>
                                  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {loan.status}
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => setSelectedLoan(loan)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Contract
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                          No loans found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
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