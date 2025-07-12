"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, FileText, Search, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReactToPrint } from 'react-to-print';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';
import HybridWebView from "../hybridwebview/HybridWebView.js";

declare global {
  interface Window {
    HybridWebView?: {
      SendInvokeMessageToDotNet?: (method: string, payload: any) => void;
    };
    globalSetReportsPage?: (data: any) => void;
    globalSetFullReport?: (data: any) => void;
  }
}

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

interface MemberReport {
  MemberId: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  FullName: string;
  Suffix: string;
  Gender: string;
  DateOfBirth: string;
  Contact: string;
  Address: string;
  Email: string;
  Nationality: string;
  EducationLevel: string;
  CivilStatus: string;
  Dependents: number;
  MonthlyIncome: number;
  SavingsBalance: number;
  MonthlyExpenses: number;
  MembershipStatus: string;
  CreditScore: number;
  MembershipDate: string;
  ClosureReason: string;
  PmsStatus: string;
  CreatedAt: string;
  UpdatedAt: string;
  Loans: any[];
  MemberFinancialProfile: any;
  Addresses: any[];
  ContactInfos: any[];
  MemberShares: any[];
  LoanAccounts: any[];
  MemberIdCards: any[];
  CoMadeLoans: any[];
}

const statusStyles = {
  Approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  Declined: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  Disbursed: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Paid: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
};

export default function LoanReportsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<LoanReport | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [reports, setReports] = useState<LoanReport[]>([]);
  const [fullReport, setFullReport] = useState<MemberReport | null>(null);
  const pathname = usePathname();
  const reportRef = useRef<HTMLDivElement>(null);

  // Effect for initial report list
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

      const mappedReports = reportsJson.map((reportData: any) => {
        // Calculate credit score (0-100 range)
        let creditScore = reportData.CreditScore || 0;
        
        // If credit score isn't provided, calculate a basic one
        if (!reportData.CreditScore) {
          // Base score (50 is average)
          let calculatedScore = 50;
          
          // Adjust based on loan status
          if (reportData.LoanStatus === "Active" || reportData.LoanStatus === "Approved") {
            calculatedScore += 10;
          } else if (reportData.LoanStatus === "Defaulted") {
            calculatedScore -= 20;
          }
          
          // Adjust based on payment history
          if (reportData.PaymentHistory?.length > 0) {
            const totalPayments = reportData.PaymentHistory.length;
            const onTimePayments = reportData.PaymentHistory.filter((p: any) => p.Status === "Completed").length;
            const latePayments = reportData.PaymentHistory.filter((p: any) => p.Status === "Late").length;
            
            calculatedScore += (onTimePayments * 2);
            calculatedScore -= (latePayments * 3);
          }
          
          // Adjust based on previous loans
          if (reportData.PreviousLoans?.length > 0) {
            const successfulLoans = reportData.PreviousLoans.filter((l: any) => 
              l.LoanStatus === "Closed" || l.LoanStatus === "Paid"
            ).length;
            
            calculatedScore += (successfulLoans * 3);
          }
          
          // Cap between 0 and 100
          creditScore = Math.max(0, Math.min(100, calculatedScore));
        }

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
          remainingBalance: reportData.RemainingBalance || reportData.PrincipalAmount || 0,
          nextPayment: reportData.NextPaymentDate?.split('T')[0] || new Date().toISOString().split('T')[0],
          validatedBy: reportData.ProcessedBy || "Loan Officer",
          creditScore: creditScore,
          coApplicantNumber: reportData.CoMakers?.length || 0,
          guarantorNumber: reportData.CoMakers?.filter((c: any) => c.Status === "Active").length || 0,
          clientAddress: reportData.MemberAddress || "Address Not Available",
          clientContact: reportData.MemberContact || "Contact Not Available",
          clientEmail: reportData.MemberEmail || "Email Not Available",
          clientBirthdate: reportData.MemberBirthdate?.split('T')[0] || "Unknown",
          clientOccupation: reportData.MemberOccupation || "Occupation Not Available",
          previousLoans: reportData.PreviousLoans?.map((loan: any) => ({
            id: loan.LoanId,
            amount: loan.PrincipalAmount,
            date: loan.DateGranted?.split('T')[0],
            status: loanStatusMap[loan.LoanStatus] || "Closed",
            type: loan.ProductType
          })) || [],
          paymentHistory: reportData.PaymentHistory?.map((payment: any) => ({
            id: `PAY-${payment.PaymentId}`,
            date: payment.PaymentDate?.split('T')[0],
            amount: payment.Amount,
            principal: payment.PrincipalAmount,
            interest: payment.InterestAmount,
            remainingBalance: payment.RemainingBalance,
            status: payment.Status,
            method: payment.PaymentMethod
          })) || [],
          monthlyPayment: reportData.MonthlyPayment,
          collateralType: reportData.CollateralType || "Unsecured",
          paymentFrequency: reportData.PaymentFrequency
        };
      });

      setReports(mappedReports);
    };

    // Initialize HybridWebView communication

     HybridWebView.SendInvokeMessageToDotNet("getPageReportToJS");


    return () => {
      (window as any).globalSetReportsPage = undefined;
    };
  }, []);

  // Effect for full detailed report
  useEffect(() => {
    window.globalSetFullReport = (dataFromDotNet: any) => {
      console.log("✅ Received FULL report data from .NET:", dataFromDotNet);
      
      try {
        const reportData = typeof dataFromDotNet === 'string' 
          ? JSON.parse(dataFromDotNet) 
          : dataFromDotNet;

        const formattedReport: MemberReport = {
          MemberId: reportData.MemberId,
          FirstName: reportData.FirstName,
          MiddleName: reportData.MiddleName,
          LastName: reportData.LastName,
          FullName: reportData.FullName,
          Suffix: reportData.Suffix,
          Gender: reportData.Gender,
          DateOfBirth: reportData.DateOfBirth,
          Contact: reportData.Contact,
          Address: reportData.Address,
          Email: reportData.Email,
          Nationality: reportData.Nationality,
          EducationLevel: reportData.EducationLevel,
          CivilStatus: reportData.CivilStatus,
          Dependents: reportData.Dependents,
          MonthlyIncome: reportData.MonthlyIncome,
          SavingsBalance: reportData.SavingsBalance,
          MonthlyExpenses: reportData.MonthlyExpenses,
          MembershipStatus: reportData.MembershipStatus,
          CreditScore: reportData.CreditScore || 50, // Default to 50 if not provided
          MembershipDate: reportData.MembershipDate,
          ClosureReason: reportData.ClosureReason,
          PmsStatus: reportData.PmsStatus,
          CreatedAt: reportData.CreatedAt,
          UpdatedAt: reportData.UpdatedAt,
          Loans: reportData.Loans || [],
          MemberFinancialProfile: reportData.MemberFinancialProfile || {},
          Addresses: reportData.Addresses || [],
          ContactInfos: reportData.ContactInfos || [],
          MemberShares: reportData.MemberShares || [],
          LoanAccounts: reportData.LoanAccounts || [],
          MemberIdCards: reportData.MemberIdCards || [],
          CoMadeLoans: reportData.CoMadeLoans || []
        };

        setFullReport(formattedReport);
        setSelectedLoan(convertToLoanReport(formattedReport));
      } catch (error) {
        console.error("Error processing full report data:", error);
      }
    };

    return () => {
      window.globalSetFullReport = undefined;
    };
  }, []);

   
  useEffect(() => {
  const generateFullReport = () => {
    if (!selectedLoan) return;
    
    console.log("📤 Generating report from frontend...");

    // Prepare payload
    const payload = {
      MemberId: selectedLoan.clientId,
      LoanId: parseInt(selectedLoan.id) // Ensure this matches .NET's expected type
    };

    console.log("Data report sent: ", payload);

    // Send message (with null check)

      HybridWebView.SendInvokeMessageToDotNet(
        "getPageReportFullToJS",
        payload
      );
  
  };

  generateFullReport();
}, [selectedLoan]); // Only runs when selectedLoan changes



  const convertToLoanReport = (memberData: MemberReport): LoanReport => {
    const primaryLoan = memberData.LoanAccounts?.[0] || {};
    const paymentHistory = memberData.Loans?.flatMap(loan => 
      loan.Payments?.map((payment: any) => ({
        id: `PAY-${payment.PaymentId}`,
        date: payment.PaymentDate?.split('T')[0] || '',
        amount: payment.Amount,
        principal: payment.PrincipalAmount,
        interest: payment.InterestAmount,
        remainingBalance: payment.RemainingBalance,
        status: payment.Status,
        method: payment.PaymentMethod
      })) || []
    ) || [];

    return {
      id: primaryLoan.LoanId || 'N/A',
      clientName: memberData.FullName,
      clientId: memberData.MemberId,
      type: primaryLoan.LoanType || 'Unknown',
      purpose: primaryLoan.Purpose || 'Not Specified',
      amount: primaryLoan.PrincipalAmount || 0,
      applicationDate: primaryLoan.ApplicationDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      duration: `${primaryLoan.TermMonths || 0} months`,
      status: primaryLoan.LoanStatus || 'Pending',
      interestRate: `${((primaryLoan.InterestRate || 0) * 100).toFixed(2)}%`,
      remainingBalance: primaryLoan.RemainingBalance || 0,
      nextPayment: paymentHistory.length > 0 
        ? new Date(new Date(paymentHistory[paymentHistory.length-1].date).getTime() + 30*24*60*60*1000).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      validatedBy: primaryLoan.ApprovedBy || 'Loan Officer',
      creditScore: memberData.CreditScore || 50,
      coApplicantNumber: memberData.CoMadeLoans?.length || 0,
      guarantorNumber: memberData.CoMadeLoans?.filter((c: any) => c.Status === 'Active').length || 0,
      clientAddress: memberData.Address,
      clientContact: memberData.Contact,
      clientEmail: memberData.Email,
      clientBirthdate: memberData.DateOfBirth?.split('T')[0] || 'Unknown',
      clientOccupation: memberData.MemberFinancialProfile?.Occupation || 'Occupation Not Available',
      previousLoans: memberData.LoanAccounts?.map((loan: any) => ({
        id: loan.LoanId,
        amount: loan.PrincipalAmount,
        date: loan.ApplicationDate?.split('T')[0] || '',
        status: loan.LoanStatus,
        type: loan.LoanType
      })) || [],
      paymentHistory,
      monthlyPayment: primaryLoan.MonthlyPayment,
      collateralType: primaryLoan.CollateralType || 'Unsecured',
      paymentFrequency: primaryLoan.PaymentFrequency
    };
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      @media print {
        body { color: #000; background: #fff; }
        .no-print { display: none !important; }
      }
    `,
    documentTitle: `Loan_Report_${selectedLoan?.id || 'N/A'}_${selectedLoan?.clientName.replace(/\s+/g, '_') || 'Report'}`
  });

   const handleGenerateReport = (loan: LoanReport) => {
    console.log("📤 Setting loan for report generation...");
    setSelectedLoan(loan);

  };


  const filteredLoans = reports.filter(loan => {
    const searchTextLower = searchText.toLowerCase();
    const matchesSearch = 
      loan.id.toString().toLowerCase().includes(searchTextLower) ||
      loan.clientName.toLowerCase().includes(searchTextLower);
    const matchesStatus = statusFilter === "All" ? true : loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCreditScoreColor = (score: number) => {
    return score >= 80 ? "text-green-600" :
           score >= 60 ? "text-yellow-600" : "text-red-600";
  };

  const getCreditScoreLabel = (score: number) => {
    return score >= 80 ? "Excellent" :
           score >= 60 ? "Good" : 
           score >= 40 ? "Fair" : "Poor";
  };

  function LoanReportDialog({ loan, onClose }: { loan: LoanReport, onClose: () => void }) {
    const creditScoreColor = getCreditScoreColor(loan.creditScore);
    const creditScoreLabel = getCreditScoreLabel(loan.creditScore);
    
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Loan Report for {loan.clientName}
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Detailed credit report and loan information
                </DialogDescription>
              </div>
              <div className="flex gap-2 no-print">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div ref={reportRef} className="p-4 bg-white">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Client Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p><strong>Full Name:</strong> {loan.clientName}</p>
                  <p><strong>Member ID:</strong> {loan.clientId}</p>
                  {fullReport && <p><strong>Date of Birth:</strong> {fullReport.DateOfBirth}</p>}
                </div>
                <div>
                  <p><strong>Contact:</strong> {loan.clientContact}</p>
                  <p><strong>Email:</strong> {loan.clientEmail}</p>
                  {fullReport && <p><strong>Occupation:</strong> {fullReport.MemberFinancialProfile?.Occupation}</p>}
                </div>
                <div>
                  <p><strong>Address:</strong> {loan.clientAddress}</p>
                  {fullReport && <p><strong>Nationality:</strong> {fullReport.Nationality}</p>}
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-gray-50 rounded">
              <h2 className="text-lg font-semibold mb-2">Credit Score</h2>
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-bold ${creditScoreColor}`}>
                  {loan.creditScore}
                </div>
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${creditScoreColor.replace('text', 'bg')}`}
                      style={{ width: `${loan.creditScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 (Poor)</span>
                    <span>100 (Excellent)</span>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-sm">
                <strong>Rating:</strong> <span className={creditScoreColor}>{creditScoreLabel}</span>
              </p>
              {fullReport && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <p><strong>Monthly Income:</strong> ₱{fullReport.MonthlyIncome?.toLocaleString()}</p>
                  <p><strong>Monthly Expenses:</strong> ₱{fullReport.MonthlyExpenses?.toLocaleString()}</p>
                  <p><strong>Savings Balance:</strong> ₱{fullReport.SavingsBalance?.toLocaleString()}</p>
                  <p><strong>Dependents:</strong> {fullReport.Dependents}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Current Loan Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Loan ID:</strong> {loan.id}</p>
                  <p><strong>Type:</strong> {loan.type}</p>
                  <p><strong>Purpose:</strong> {loan.purpose}</p>
                  <p><strong>Amount:</strong> ₱{loan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                  <p><strong>Monthly Payment:</strong> ₱{loan.monthlyPayment?.toLocaleString()}</p>
                  <p><strong>Status:</strong> <Badge className={statusStyles[loan.status as keyof typeof statusStyles]}>{loan.status}</Badge></p>
                  <p><strong>Collateral:</strong> {loan.collateralType}</p>
                </div>
              </div>
            </div>

            {loan.paymentHistory && loan.paymentHistory.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Payment History</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loan.paymentHistory.slice(0, 5).map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>₱{payment.principal.toLocaleString()}</TableCell>
                          <TableCell>₱{payment.interest.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-green-200 text-green-800">
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {fullReport?.LoanAccounts && fullReport.LoanAccounts.length > 1 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Other Loans</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fullReport.LoanAccounts.filter((la: any) => la.LoanId !== loan.id)
                        .slice(0, 3).map((loanAcc: any) => (
                        <TableRow key={loanAcc.LoanId}>
                          <TableCell>{loanAcc.LoanId}</TableCell>
                          <TableCell>{loanAcc.LoanType}</TableCell>
                          <TableCell>₱{loanAcc.PrincipalAmount?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={statusStyles[loanAcc.LoanStatus as keyof typeof statusStyles] || 'bg-gray-100'}>
                              {loanAcc.LoanStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Loan Reports</h1>
            <p className="text-gray-500">Generate and print loan reports</p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4">
          {selectedLoan ? (
            <LoanReportDialog loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
          ) : (
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-gray-800">Loan Reports ({filteredLoans.length})</CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
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
                    <TableRow>
                      <TableHead>Loan ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Credit Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.length > 0 ? (
                      filteredLoans.map(loan => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {loan.clientName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{loan.clientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>₱{loan.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`font-medium ${getCreditScoreColor(loan.creditScore)}`}>
                                {loan.creditScore}
                              </div>
                              <div className="hidden sm:block text-xs text-gray-500">
                                {getCreditScoreLabel(loan.creditScore)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusStyles[loan.status as keyof typeof statusStyles]}>
                              {loan.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenerateReport(loan)}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Generate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
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