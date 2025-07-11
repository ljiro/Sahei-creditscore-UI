"use client"

import { useState, useEffect } from "react"
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
import { ChevronDown, UploadCloud, FileText, Search, Shield, User, Users2, UserCog, ListChecks, Cog, LogOut, Book, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2 } from "lucide-react";
import HybridWebView from "../hybridwebview/HybridWebView.js";
const statusStyles = {
  Approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  Disbursed: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Paid: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
};

interface LoanReport {
  id: string;
  clientName: string;
  clientId: number;
  type: string;
  purpose: string;
  amount: number;
  applicationDate: string;
  duration: string;
  status: string;
  interestRate: string;
  remainingBalance: number;
  nextPayment: string;
  validatedBy: string;
  creditScore: number;
  coApplicantNumber: number;
  guarantorNumber: number;
  clientAddress: string;
  clientContact: string;
  clientEmail: string;
  clientBirthdate: string;
  clientOccupation: string;
  previousLoans: {
    id: string;
    amount: number;
    date: string;
    status: string;
    type: string;
  }[];
  paymentHistory?: {
    id: string;
    date: string;
    amount: number;
    principal: number;
    interest: number;
    remainingBalance: number;
    status: string;
    method: string;
  }[];
  monthlyPayment?: number;
  collateralType?: string;
  paymentFrequency?: string;
}

export default function LoanReportsPage() {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<LoanReport | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [reports, setReports] = useState<LoanReport[]>([]);

  // HybridWebView integration for receiving report data from .NET
  useEffect(() => {
    (window as any).globalSetReportsPage = (dataFromDotNet: any) => {
      console.log("✅ Received report data from .NET:", dataFromDotNet);
      
      let reportsJson = [];
      if (typeof dataFromDotNet === 'string') {
        try {
          reportsJson = JSON.parse(dataFromDotNet);
        } catch (e) {
          console.error("Error parsing JSON string from .NET:", e);
          return;
        }
      } else if (Array.isArray(dataFromDotNet)) {
        reportsJson = dataFromDotNet;
      } else {
        console.error("Received data of unexpected type from .NET:", typeof dataFromDotNet);
        return;
      }

      const loanStatusMap: Record<string, string> = {
        "Active": "Disbursed",
        "Pending": "Pending",
        "Closed": "Paid",
        "Defaulted": "Declined",
        "Approved": "Approved"
      };

      const paymentStatusMap: Record<string, string> = {
        "Paid": "Paid",
        "Pending": "Pending",
        "Overdue": "Overdue"
      };

      const mappedReports = reportsJson.map((reportData: any) => {
        // Process payment history
        const payments = reportData.LedgerEntries
          ?.filter((entry: any) => entry.Type === "Payment")
          .map((payment: any, index: number) => ({
            id: `PAY${reportData.LoanId}-${index}`,
            date: payment.TransactionDate.split('T')[0],
            amount: payment.Credit,
            principal: payment.Credit * 0.9, // Assuming 10% interest
            interest: payment.Credit * 0.1,
            remainingBalance: payment.RunningBalance,
            status: paymentStatusMap["Paid"] || "Paid",
            method: payment.Notes?.includes('bank') ? 'Bank Transfer' : 'Cash'
          })) || [];

        // Process previous loans (simplified for example)
        const previousLoans = reportData.PreviousLoans?.map((loan: any) => ({
          id: loan.LoanId,
          amount: loan.PrincipalAmount,
          date: loan.DateGranted.split('T')[0],
          status: loanStatusMap[loan.LoanStatus] || "Closed",
          type: loan.ProductType
        })) || [];
        
        // Calculate credit score based on your business rules
        const creditScore = calculateCreditScore(
          reportData.CreditScore,
          reportData.PaymentHistory,
          reportData.LoanHistory,
          reportData.MemberFinancialData
        );

        return {
          id: reportData.LoanId,
          clientName: reportData.MemberFullName || "Unknown Client",
          clientId: reportData.MemberId,
          type: reportData.ProductType || "Unknown Type",
          purpose: reportData.Purpose || "Not Specified",
          amount: reportData.PrincipalAmount || 0,
          applicationDate: reportData.DateGranted?.split('T')[0] || new Date().toISOString().split('T')[0],
          duration: `${reportData.TermMonths || 0} months`,
          status: loanStatusMap[reportData.LoanStatus] || "Pending",
          interestRate: `${((reportData.InterestRate || 0) * 100).toFixed(2)}%`,
          remainingBalance: reportData.LedgerEntries?.slice(-1)[0]?.RunningBalance || reportData.PrincipalAmount || 0,
          nextPayment: payments.length > 0 ? 
            new Date(new Date(payments[payments.length-1].date).getTime() + 30*24*60*60*1000).toISOString().split('T')[0] : 
            new Date(new Date(reportData.DateGranted || new Date()).getTime() + 30*24*60*60*1000).toISOString().split('T')[0],
          validatedBy: reportData.ProcessedBy || "Loan Officer",
          creditScore: creditScore, // Using calculated credit score
          coApplicantNumber: reportData.CoMakers?.length || 0,
          guarantorNumber: reportData.CoMakers?.filter((c: any) => c.Status === "Active").length || 0,
          clientAddress: reportData.MemberAddress || "Address Not Available",
          clientContact: reportData.MemberContact || "Contact Not Available",
          clientEmail: reportData.MemberEmail || "Email Not Available",
          clientBirthdate: reportData.MemberBirthdate?.split('T')[0] || "Unknown",
          clientOccupation: reportData.MemberOccupation || "Occupation Not Available",
          previousLoans,
          paymentHistory: payments,
          monthlyPayment: reportData.InstallmentAmount,
          collateralType: reportData.CoMakers?.length > 0 ? "Secured" : "Unsecured",
          paymentFrequency: reportData.PayFrequency
        } as LoanReport;
      });

      setReports(mappedReports);
    };

      HybridWebView.SendInvokeMessageToDotNet("getPageReportToJS");
  }, []);

  // Credit score calculation function
  function calculateCreditScore(
    baseScore: number,
    paymentHistory: any[],
    loanHistory: any[],
    financialData: any
  ): number {
    // Base score from .NET (0-100 scale)
    let score = baseScore || 50; // Default to 50 if not provided

    // Adjust based on payment history (35% weight)
    const paymentScore = calculatePaymentHistoryScore(paymentHistory);
    score = score * 0.65 + paymentScore * 0.35;

    // Adjust based on loan history (20% weight)
    const loanScore = calculateLoanHistoryScore(loanHistory);
    score = score * 0.80 + loanScore * 0.20;

    // Adjust based on financial data (15% weight)
    const financialScore = calculateFinancialDataScore(financialData);
    score = score * 0.85 + financialScore * 0.15;

    // Ensure score is between 0-100
    return Math.min(Math.max(Math.round(score), 100));
  }

  function calculatePaymentHistoryScore(payments: any[]): number {
    if (!payments || payments.length === 0) return 70; // Neutral score for no history
    
    const onTimePayments = payments.filter(p => p.OnTime).length;
    const onTimePercentage = onTimePayments / payments.length;
    
    if (onTimePercentage >= 0.95) return 100; // Excellent
    if (onTimePercentage >= 0.85) return 85;  // Good
    if (onTimePercentage >= 0.70) return 70;  // Fair
    return 50; // Poor
  }

  function calculateLoanHistoryScore(loans: any[]): number {
    if (!loans || loans.length === 0) return 75; // Neutral score for no history
    
    const paidLoans = loans.filter(l => l.Status === "Closed" || l.Status === "Paid").length;
    const paidPercentage = paidLoans / loans.length;
    
    if (paidPercentage >= 0.90) return 100; // Excellent
    if (paidPercentage >= 0.75) return 85;  // Good
    if (paidPercentage >= 0.50) return 70;  // Fair
    return 50; // Poor
  }

  function calculateFinancialDataScore(data: any): number {
    if (!data) return 70; // Neutral score for no data
    
    let score = 70;
    
    // Income adjustment
    if (data.MonthlyIncome > 50000) score += 10;
    else if (data.MonthlyIncome > 30000) score += 5;
    
    // Debt-to-income adjustment
    if (data.DebtToIncomeRatio < 0.3) score += 10;
    else if (data.DebtToIncomeRatio < 0.5) score += 5;
    else if (data.DebtToIncomeRatio > 0.8) score -= 15;
    
    // Savings adjustment
    if (data.SavingsBalance > 100000) score += 5;
    
    return Math.min(Math.max(score, 30), 100);
  }
const filteredLoans = reports.filter(loan => {
    const searchTextLower = searchText.toLowerCase();
    const matchesSearch = 
        loan.id.toString().toLowerCase().includes(searchTextLower) ||
        loan.clientName.toLowerCase().includes(searchTextLower);
    const matchesStatus = statusFilter === "All" ? true : loan.status === statusFilter;
    return matchesSearch && matchesStatus;
});

  function LoanContract({ loan, onClose }: { loan: LoanReport, onClose: () => void }) {
    const contractRef = useRef<HTMLDivElement>(null);

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
      documentTitle: `Credit_Report_${loan.id}_${loan.clientName.replace(/\s+/g, '_')}`
    });

    // Credit score visualization
    const creditScoreColor = loan.creditScore >= 80 ? "text-green-600" :
                           loan.creditScore >= 60 ? "text-yellow-600" : "text-red-600";
    
    const creditScoreLabel = loan.creditScore >= 80 ? "Excellent" :
                           loan.creditScore >= 60 ? "Good" : "Fair";

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl bg-white rounded-lg h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Credit Report for {loan.clientName}
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Comprehensive credit history and current loan status
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
          
          <div 
            ref={contractRef} 
            className="bg-white p-8 border border-gray-200 rounded-lg shadow-none"
            style={{ minHeight: '297mm' }}
          >
            {/* Credit Score Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">CREDIT SCORE SUMMARY</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Overall Credit Rating</h3>
                  <p className="text-gray-600">Based on payment history, credit utilization, and financial stability</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${creditScoreColor}`}>
                    {loan.creditScore}
                  </div>
                  <div className={`text-sm font-medium ${creditScoreColor}`}>
                    {creditScoreLabel}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      loan.creditScore >= 80 ? "bg-green-500" :
                      loan.creditScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${loan.creditScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>300 (Poor)</span>
                  <span>850 (Excellent)</span>
                </div>
              </div>
            </div>

            {/* Rest of your report content */}
            {/* ... [keep all your existing report sections] */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Credit Reports</h1>
            <p className="text-gray-500">Generate and view detailed credit reports</p>
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
          {selectedLoan ? (
            <LoanContract loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">Loan Reports ({filteredLoans.length})</CardTitle>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search Reports..."
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
                              <span className={`text-sm font-medium ${
                                loan.creditScore >= 80 ? "text-green-600" :
                                loan.creditScore >= 60 ? "text-yellow-600" : "text-red-600"
                              }`}>
                                {loan.creditScore}
                              </span>
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
                              className={`flex items-center gap-1 ${statusStyles[loan.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800 border-gray-200'}`}
                            >
                              <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                              </svg>
                              {loan.status}
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
                              Generate Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                          No reports found matching your criteria
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
  );
}
