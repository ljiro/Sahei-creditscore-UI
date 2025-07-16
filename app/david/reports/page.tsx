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
import HybridWebView from "../hybridwebview/HybridWebView.js";

declare global {
  interface Window {
    HybridWebView?: {
      SendInvokeMessageToDotNet?: (method: string, payload: any) => void;
      InvokePrint?: (htmlContent: string) => void;
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
  Active: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  Closed: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
  Defaulted: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
};

const printStyles = `
  @page {
    size: A4;
    margin: 15mm;
  }
  @media print {
    body {
      color: #000;
      background: #fff;
      font-size: 12pt;
    }
    .no-print {
      display: none !important;
    }
    .print-container {
      padding: 0;
      max-width: 100%;
    }
    .print-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .print-footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 10pt;
    }
    .print-section {
      margin-bottom: 1.5rem;
      page-break-inside: avoid;
    }
    .print-section:last-child {
      margin-bottom: 0;
    }
    .print-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .print-card {
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 1rem;
      background: #fff;
    }
    .print-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      page-break-inside: avoid;
    }
    .print-table th, 
    .print-table td {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      text-align: left;
    }
    .print-table th {
      background-color: #f8fafc;
      font-weight: 600;
    }
    .print-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1e293b;
    }
    .print-subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 1rem 0 0.5rem;
      color: #334155;
    }
    .print-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .print-avoid-break {
      page-break-inside: avoid;
    }
    .credit-score-box {
      border: 2px solid #000;
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
      margin-bottom: 1rem;
      background: #f8fafc;
    }
    .credit-score-value {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0.5rem 0;
    }
    .credit-score-label {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .credit-score-range {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #64748b;
    }
    .credit-score-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      margin: 0.5rem 0;
      overflow: hidden;
    }
    .credit-score-progress {
      height: 100%;
    }
    .double-column {
      column-count: 2;
      column-gap: 2rem;
    }
    @page :first {
      margin-top: 0;
    }
  }
`;

export default function LoanReportsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<LoanReport | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [reports, setReports] = useState<LoanReport[]>([]);
  const [fullReport, setFullReport] = useState<MemberReport | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printMode, setPrintMode] = useState<'detailed'|'condensed'>('detailed');
  const reportRef = useRef<HTMLDivElement>(null);
  const hasRequestedReport = useRef(false);

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
        "Active": "Active",
        "Pending": "Pending",
        "Closed": "Closed",
        "Defaulted": "Defaulted",
        "Approved": "Approved",
        "Disbursed": "Disbursed",
        "Paid": "Paid"
      };

      const mappedReports = reportsJson.map((reportData: any) => {
        let creditScore = reportData.CreditScore || 0;
        
        if (!reportData.CreditScore) {
          let calculatedScore = 50;
          
          if (reportData.LoanStatus === "Active" || reportData.LoanStatus === "Approved") {
            calculatedScore += 10;
          } else if (reportData.LoanStatus === "Defaulted") {
            calculatedScore -= 20;
          }
          
          if (reportData.PaymentHistory?.length > 0) {
            const totalPayments = reportData.PaymentHistory.length;
            const onTimePayments = reportData.PaymentHistory.filter((p: any) => p.Status === "Completed").length;
            const latePayments = reportData.PaymentHistory.filter((p: any) => p.Status === "Late").length;
            
            calculatedScore += (onTimePayments * 2);
            calculatedScore -= (latePayments * 3);
          }
          
          if (reportData.PreviousLoans?.length > 0) {
            const successfulLoans = reportData.PreviousLoans.filter((l: any) => 
              l.LoanStatus === "Closed" || l.LoanStatus === "Paid"
            ).length;
            
            calculatedScore += (successfulLoans * 3);
          }
          
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
          creditScore: reportData.CreditScore,
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

        const educationLevels = [
          "Elementary",
          "High School",
          "Vocational",
          "College",
          "Postgraduate"
        ];

        const civilStatuses = [
          "Single",
          "Married",
          "Widowed",
          "Separated"
        ];

        const membershipStatuses = [
          "Active",
          "Inactive",
          "Suspended",
          "Terminated"
        ];

        const calculateAge = (birthdate: string) => {
          if (!birthdate) return 0;
          const birthDate = new Date(birthdate);
          const diff = Date.now() - birthDate.getTime();
          const ageDate = new Date(diff);
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        const calculateCreditScore = (data: any) => {
          let score = 50;
          
          if (data.MonthlyIncome > 50000) score += 10;
          else if (data.MonthlyIncome > 30000) score += 5;
          
          if (data.Dependents === 0) score += 5;
          else if (data.Dependents > 3) score -= 5;
          
          if (data.SavingsBalance > 10000) score += 5;
          
          return Math.max(0, Math.min(100, score));
        };

        const formattedReport: MemberReport = {
          MemberId: reportData.MemberId,
          FirstName: reportData.FirstName,
          MiddleName: reportData.MiddleName || "",
          LastName: reportData.LastName,
          FullName: reportData.FullName,
          Suffix: reportData.Suffix || "",
          Gender: reportData.Gender || "Not specified",
          DateOfBirth: reportData.DateOfBirth?.split('T')[0] || "Unknown",
          Contact: reportData.Contact,
          Address: reportData.Address,
          Email: reportData.Email,
          Nationality: reportData.Nationality || "Not specified",
          EducationLevel: typeof reportData.EducationLevel === 'number' 
            ? educationLevels[reportData.EducationLevel] || "Not specified"
            : reportData.EducationLevel || "Not specified",
          CivilStatus: typeof reportData.CivilStatus === 'number'
            ? civilStatuses[reportData.CivilStatus] || "Not specified"
            : reportData.CivilStatus || "Not specified",
          Dependents: reportData.Dependents || 0,
          MonthlyIncome: reportData.MonthlyIncome || 0,
          SavingsBalance: reportData.SavingsBalance || 0,
          MonthlyExpenses: reportData.MonthlyExpenses || 0,
          MembershipStatus: typeof reportData.MembershipStatus === 'number'
            ? membershipStatuses[reportData.MembershipStatus] || "Unknown"
            : reportData.MembershipStatus || "Unknown",
          CreditScore: reportData.CreditScore || calculateCreditScore(reportData),
          MembershipDate: reportData.MembershipDate?.split('T')[0] || "Unknown",
          ClosureReason: reportData.ClosureReason || "N/A",
          PmsStatus: reportData.PmsStatus || "N/A",
          CreatedAt: reportData.CreatedAt?.split('T')[0] || "Unknown",
          UpdatedAt: reportData.UpdatedAt?.split('T')[0] || "Unknown",
          Loans: reportData.Loans?.map((loan: any) => ({
            id: loan.id.toString(),
            type: loan.type,
            amount: loan.amount,
            date: loan.applicationDate?.split('T')[0],
            status: loan.status,
            interestRate: loan.InterestRate,
            purpose: loan.purpose || "Not specified",
            duration: loan.duration,
            validatedBy: loan.validatedBy || "N/A"
          })) || [],
          MemberFinancialProfile: reportData.MemberFinancialProfile || {
            Occupation: "Not specified",
            Employer: "Not specified",
            YearsEmployed: 0,
            BusinessType: "N/A",
            BusinessYears: 0
          },
          Addresses: reportData.Addresses || [],
          ContactInfos: reportData.ContactInfos || [],
          MemberShares: reportData.MemberShares || [],
          LoanAccounts: reportData.LoanAccounts || [],
          MemberIdCards: reportData.MemberIdCards || [],
          CoMadeLoans: reportData.CoMadeLoans || []
        };

        setFullReport(formattedReport);
        
        if (reportData.MainLoan) {
          const calculateMonthlyPayment = (loan: any) => {
            if (!loan.amount || !loan.InterestRate || !loan.duration) return 0;
            
            const months = parseInt(loan.duration.split(' ')[0]) || 12;
            const principal = loan.amount;
            const monthlyRate = loan.InterestRate / 12;
            
            return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
          };

          const calculateNextPaymentDate = (loan: any) => {
            if (!loan.applicationDate) return new Date().toISOString().split('T')[0];
            
            const appDate = new Date(loan.applicationDate);
            const nextDate = new Date(appDate);
            nextDate.setMonth(nextDate.getMonth() + 1);
            return nextDate.toISOString().split('T')[0];
          };

          setSelectedLoan(prev => {
            if (prev && prev.id === reportData.MainLoan.id.toString()) {
              return prev; // Don't update if it's the same loan
            }
            return {
              id: reportData.MainLoan.id.toString(),
              clientName: reportData.FullName,
              clientId: reportData.MemberId,
              type: reportData.MainLoan.type,
              purpose: reportData.MainLoan.purpose || "Not specified",
              amount: reportData.MainLoan.amount,
              applicationDate: reportData.MainLoan.applicationDate?.split('T')[0] || "Unknown",
              duration: reportData.MainLoan.duration,
              status: reportData.MainLoan.status,
              interestRate: `${(reportData.MainLoan.InterestRate * 100).toFixed(2)}%`,
              remainingBalance: reportData.MainLoan.remainingBalance || reportData.MainLoan.amount,
              nextPayment: calculateNextPaymentDate(reportData.MainLoan),
              validatedBy: reportData.MainLoan.validatedBy || "Loan Officer",
              creditScore: formattedReport.CreditScore,
              coApplicantNumber: reportData.CoMadeLoans?.length || 0,
              guarantorNumber: reportData.CoMadeLoans?.filter((c: any) => c.Status === "Active").length || 0,
              clientAddress: reportData.Address,
              clientContact: reportData.Contact,
              clientEmail: reportData.Email,
              clientBirthdate: reportData.DateOfBirth?.split('T')[0] || "Unknown",
              clientOccupation: formattedReport.MemberFinancialProfile?.Occupation || "Not specified",
              previousLoans: reportData.Loans
                ?.filter((l: any) => l.id !== reportData.MainLoan?.id)
                ?.map((loan: any) => ({
                  id: loan.id.toString(),
                  amount: loan.amount,
                  date: loan.applicationDate?.split('T')[0],
                  status: loan.status,
                  type: loan.type
                })) || [],
              paymentHistory: [],
              monthlyPayment: calculateMonthlyPayment(reportData.MainLoan),
              collateralType: "Unsecured",
              paymentFrequency: "Monthly"
            };
          });
        }
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
      if (!selectedLoan || hasRequestedReport.current) return;
      
      console.log("📤 Generating report from frontend...");
      hasRequestedReport.current = true;

      const payload = {
        MemberId: selectedLoan.clientId,
        LoanId: parseInt(selectedLoan.id)
      };

      console.log("Data report sent: ", payload);

      HybridWebView.SendInvokeMessageToDotNet(
        "getPageReportFullToJS",
        payload
      );
    };

    generateFullReport();

    return () => {
      hasRequestedReport.current = false;
    };
  }, [selectedLoan]);

  const handlePrint = () => {
    if (!reportRef.current) return;
    
    setIsPrinting(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Could not open print window');
      }

      // Clone the report content
      const printContent = reportRef.current.cloneNode(true) as HTMLElement;
      
      // Add print-specific classes and structure
      const sections = [
        { selector: '.credit-score-section', className: 'print-section print-card' },
        { selector: '.client-info-section', className: 'print-section double-column' },
        { selector: '.financial-profile-section', className: 'print-section double-column' },
        { selector: '.loan-details-section', className: 'print-section print-card' },
        { selector: '.payment-history-section', className: 'print-section print-avoid-break' },
        { selector: '.previous-loans-section', className: 'print-section print-avoid-break' }
      ];

      sections.forEach(({ selector, className }) => {
        const element = printContent.querySelector(selector);
        if (element) {
          element.classList.add(...className.split(' '));
        }
      });

      // Enhance credit score display for print
      const creditScoreElement = printContent.querySelector('.credit-score-display');
      if (creditScoreElement) {
        creditScoreElement.innerHTML = `
          <div class="credit-score-box">
            <div class="credit-score-label">Credit Score</div>
            <div class="credit-score-value ${getCreditScoreColor(selectedLoan?.creditScore || 0)}">
              ${selectedLoan?.creditScore || 0}
            </div>
            <div class="credit-score-label">
              ${getCreditScoreLabel(selectedLoan?.creditScore || 0)}
            </div>
            <div class="credit-score-bar">
              <div class="credit-score-progress ${getCreditScoreColor(selectedLoan?.creditScore || 0).replace('text', 'bg')}" 
                   style="width: ${selectedLoan?.creditScore || 0}%"></div>
            </div>
            <div class="credit-score-range">
              <span>0 (Poor)</span>
              <span>100 (Excellent)</span>
            </div>
          </div>
        `;
      }

      // Create print header
      const header = document.createElement('div');
      header.className = 'print-header';
      header.innerHTML = `
        <div>
          <h1 class="print-title">Loan Report - ${selectedLoan?.clientName || 'Report'}</h1>
          <div>Generated on ${new Date().toLocaleDateString()}</div>
        </div>
        <div>
          <div>Member ID: ${selectedLoan?.clientId || 'N/A'}</div>
          <div>Loan ID: ${selectedLoan?.id || 'N/A'}</div>
        </div>
      `;

      // Create print footer
      const footer = document.createElement('div');
      footer.className = 'print-footer';
      footer.innerHTML = `
        <div>Confidential - For internal use only</div>
        <div>Page <span class="page-number"></span></div>
      `;

      // Prepare the HTML for printing
      printWindow.document.write(`
        <html>
          <head>
            <title>Loan Report - ${selectedLoan?.clientName || 'Report'}</title>
            <style>${printStyles}</style>
          </head>
          <body>
            <div class="print-container">
              ${header.outerHTML}
              ${printContent.innerHTML}
              ${footer.outerHTML}
            </div>
            <script>
              // Update page numbers
              const pageNumbers = document.querySelectorAll('.page-number');
              for (let i = 0; i < pageNumbers.length; i++) {
                pageNumbers[i].textContent = (i + 1);
              }
              
              setTimeout(() => {
                window.print();
                window.close();
              }, 200);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();

      // For Hybrid WebView environment
      if (window.HybridWebView?.InvokePrint) {
        const htmlContent = `
          <html>
            <head>
              <style>${printStyles}</style>
            </head>
            <body>
              <div class="print-container">
                ${header.outerHTML}
                ${printContent.innerHTML}
                ${footer.outerHTML}
              </div>
            </body>
          </html>
        `;
        window.HybridWebView.InvokePrint(htmlContent);
      }
    } catch (error) {
      console.error("Error during printing:", error);
      // Fallback to basic window.print() if other methods fail
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  const handleGenerateReport = (loan: LoanReport) => {
    console.log("📤 Setting loan for report generation...");
    setSelectedLoan(loan);
    setFullReport(null);
  };

  const handleCloseDialog = () => {
    setSelectedLoan(null);
    setFullReport(null);
    hasRequestedReport.current = false;
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
    
    const calculateAge = (birthdate: string) => {
      if (!birthdate) return 0;
      const birthDate = new Date(birthdate);
      const diff = Date.now() - birthDate.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <Button 
                  onClick={handlePrint} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isPrinting}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  {isPrinting ? "Printing..." : "Print Report"}
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div ref={reportRef} className="p-4 bg-white">
            {/* Credit Score Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 credit-score-section">
              <h2 className="text-lg font-semibold mb-3">Credit Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="credit-score-display">
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl font-bold ${creditScoreColor}`}>
                      {loan.creditScore}
                    </div>
                    <div className="w-full">
                      <div className="text-sm font-medium mb-1">
                        {creditScoreLabel} Credit Score
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${creditScoreColor.replace('text', 'bg')}`}
                          style={{ width: `${loan.creditScore}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0 (Poor)</span>
                        <span>100 (Excellent)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 bg-white rounded border">
                    <div className="text-xs text-gray-500">Member Since</div>
                    <div className="font-medium">{fullReport?.MembershipDate || 'N/A'}</div>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <div className="text-xs text-gray-500">Total Loans</div>
                    <div className="font-medium">{fullReport?.Loans?.length || 0}</div>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <div className="text-xs text-gray-500">Active Loans</div>
                    <div className="font-medium">
                      {fullReport?.Loans?.filter((l: any) => l.status === "Active").length || 0}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <div className="text-xs text-gray-500">Payment History</div>
                    <div className="font-medium">
                      {loan.paymentHistory?.length || 0} records
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Information Section */}
            <div className="mb-6 border-b pb-4 client-info-section">
              <h2 className="text-lg font-semibold mb-3">Client Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p><strong>Full Name:</strong> {fullReport?.FullName}</p>
                  <p><strong>Member ID:</strong> {fullReport?.MemberId}</p>
                  <p><strong>Date of Birth:</strong> {fullReport?.DateOfBirth}</p>
                  <p><strong>Age:</strong> {fullReport?.DateOfBirth ? calculateAge(fullReport.DateOfBirth) : 'N/A'}</p>
                  <p><strong>Gender:</strong> {fullReport?.Gender}</p>
                </div>
                <div>
                  <p><strong>Contact:</strong> {fullReport?.Contact}</p>
                  <p><strong>Email:</strong> {fullReport?.Email}</p>
                  <p><strong>Address:</strong> {fullReport?.Address}</p>
                  <p><strong>Nationality:</strong> {fullReport?.Nationality}</p>
                </div>
                <div>
                  <p><strong>Civil Status:</strong> {fullReport?.CivilStatus}</p>
                  <p><strong>Dependents:</strong> {fullReport?.Dependents}</p>
                  <p><strong>Education Level:</strong> {fullReport?.EducationLevel}</p>
                  <p><strong>Member Since:</strong> {fullReport?.MembershipDate}</p>
                </div>
              </div>
            </div>

            {/* Financial Profile Section */}
            {fullReport && (
              <div className="mb-6 border-b pb-4 financial-profile-section">
                <h2 className="text-lg font-semibold mb-3">Financial Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p><strong>Monthly Income:</strong> ₱{fullReport.MonthlyIncome?.toLocaleString()}</p>
                    <p><strong>Monthly Expenses:</strong> ₱{fullReport.MonthlyExpenses?.toLocaleString()}</p>
                    <p><strong>Disposable Income:</strong> ₱{(fullReport.MonthlyIncome - fullReport.MonthlyExpenses)?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p><strong>Savings Balance:</strong> ₱{fullReport.SavingsBalance?.toLocaleString()}</p>
                    <p><strong>Occupation:</strong> {fullReport.MemberFinancialProfile?.Occupation || 'N/A'}</p>
                    <p><strong>Employer:</strong> {fullReport.MemberFinancialProfile?.Employer || 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Membership Status:</strong> {fullReport.MembershipStatus}</p>
                    <p><strong>Credit Score:</strong> {fullReport.CreditScore} ({getCreditScoreLabel(fullReport.CreditScore)})</p>
                  </div>
                </div>
              </div>
            )}

            {/* Current Loan Details Section */}
            <div className="mb-6 border-b pb-4 loan-details-section">
              <h2 className="text-lg font-semibold mb-3">Current Loan Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Loan ID:</strong> {loan.id}</p>
                  <p><strong>Type:</strong> {loan.type}</p>
                  <p><strong>Purpose:</strong> {loan.purpose}</p>
                  <p><strong>Amount:</strong> ₱{loan.amount.toLocaleString()}</p>
                  <p><strong>Date Applied:</strong> {loan.applicationDate}</p>
                </div>
                <div>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                  <p><strong>Monthly Payment:</strong> ₱{loan.monthlyPayment?.toLocaleString()}</p>
                  <p><strong>Remaining Balance:</strong> ₱{loan.remainingBalance.toLocaleString()}</p>
                  <p><strong>Status:</strong> <Badge className={statusStyles[loan.status as keyof typeof statusStyles]}>{loan.status}</Badge></p>
                  <p><strong>Validated By:</strong> {loan.validatedBy}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Duration:</strong> {loan.duration}</p>
                  <p><strong>Payment Frequency:</strong> {loan.paymentFrequency || 'Monthly'}</p>
                  <p><strong>Next Payment Due:</strong> {loan.nextPayment}</p>
                </div>
                <div>
                  <p><strong>Collateral Type:</strong> {loan.collateralType || 'Unsecured'}</p>
                  <p><strong>Co-applicants:</strong> {loan.coApplicantNumber}</p>
                  <p><strong>Guarantors:</strong> {loan.guarantorNumber}</p>
                </div>
              </div>
            </div>

            {/* Payment History Section */}
            {loan.paymentHistory && loan.paymentHistory.length > 0 && (
              <div className="mb-6 payment-history-section">
                <h2 className="text-lg font-semibold mb-3">Payment History</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Remaining</TableHead>
                        <TableHead>Method</TableHead>
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
                          <TableCell>₱{payment.remainingBalance.toLocaleString()}</TableCell>
                          <TableCell>{payment.method}</TableCell>
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

            {/* Previous Loans Section */}
            {fullReport?.Loans && fullReport.Loans.length > 1 && (
              <div className="mb-6 previous-loans-section">
                <h2 className="text-lg font-semibold mb-3">Previous Loans</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fullReport.Loans.filter((l: any) => l.id !== loan.id)
                        .slice(0, 3).map((prevLoan: any) => (
                        <TableRow key={prevLoan.id}>
                          <TableCell>{prevLoan.id}</TableCell>
                          <TableCell>{prevLoan.type}</TableCell>
                          <TableCell>₱{prevLoan.amount?.toLocaleString()}</TableCell>
                          <TableCell>{prevLoan.date}</TableCell>
                          <TableCell>
                            <Badge className={statusStyles[prevLoan.status as keyof typeof statusStyles] || 'bg-gray-100'}>
                              {prevLoan.status}
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
            <LoanReportDialog loan={selectedLoan} onClose={handleCloseDialog} />
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Defaulted">Defaulted</SelectItem>
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