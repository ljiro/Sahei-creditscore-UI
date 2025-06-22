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
import { ChevronDown, UploadCloud, FileText, Search, Shield, User, Users2, UserCog, ListChecks, Cog, LogOut, Book, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2 } from "lucide-react";



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
    documentTitle: `Credit_Report_${loan.id}_${loan.clientName.replace(/\s+/g, '_')}`
  })

  // Mock data for the credit report fields
  const creditReportData = {
    subjectData: {
      cicSubjectCode: "G00000437",
      prefix: "Mr.",
      firstName: "Juan",
      middleName: "Dela",
      lastName: "Cruz",
      dateOfBirth: "15/03/1985",
      countryOfBirth: "Philippines",
      resident: "Yes",
      numberOfDependents: 2,
      lastUpdateDate: "30/04/2015",
      previousLastName: "",
      birthplace: "Manila",
      nationality: "Filipino",
      placeOfBirth: "Manila",
      gender: "Male",
      civilStatus: "Married",
      carsOwned: 1,
    },
    spouseData: {
      name: "Maria",
      middleName: "Santos",
      lastName: "Dela Cruz",
    },
    motherData: {
      firstName: "Ana",
      middleName: "Santos",
      lastName: "Dela Cruz",
    },
    fatherData: {
      firstName: "Pedro",
      middleName: "Reyes",
      suffix: "Jr.",
      lastName: "Dela Cruz",
    },
    identificationCodes: {
      tin: "123-456-789-000",
      sssCard: "01-2345678-9",
      tinLastUpdate: "30/04/2015",
      sssLastUpdate: "30/04/2015",
    },
    idDocuments: [
      {
        idType: "Driver's License",
        idNumber: "DL12345678",
        issueDate: "15/03/2010",
        expiryDate: "15/03/2025",
        issuingCountry: "Philippines",
        issuedBy: "LTO",
        lastUpdateDate: "30/04/2015",
      },
      {
        idType: "Passport",
        idNumber: "P12345678",
        issueDate: "20/05/2018",
        expiryDate: "20/05/2028",
        issuingCountry: "Philippines",
        issuedBy: "DFA",
        lastUpdateDate: "30/04/2015",
      },
    ],
    addresses: [
      {
        addressType: "Residence",
        fullAddress: "123 Main St, Manila",
        ownerLessee: "Owner",
        occupiedSince: "01/01/2010",
        lastUpdateDate: "30/04/2015",
      },
      {
        addressType: "Mailing",
        fullAddress: "PO Box 123, Manila Central Post Office",
        ownerLessee: "N/A",
        occupiedSince: "01/01/2010",
        lastUpdateDate: "30/04/2015",
      },
    ],
    contacts: [
      {
        contactType: "Main phone",
        contact: "09123456789",
        lastUpdateDate: "30/04/2015",
      },
      {
        contactType: "Email",
        contact: "juan.delacruz@example.com",
        lastUpdateDate: "30/04/2015",
      },
    ],
    employmentData: {
      companyName: "ABC Architecture Firm",
      psic: "7110",
      grossIncome: 50000,
      incomePeriod: "Monthly",
      currency: "PHP",
      occupationStatus: "Employed",
      occupation: "Architect",
      phoneNumber: "02-8123-4567",
      innovationStatus: "No",
      hiredId: "EMP12345",
      dateHired: "15/06/2010",
      lastUpdateDate: "30/04/2015",
    },
    soleTraderData: {
      name: "Juan Dela Cruz Architectural Services",
      addresses: [
        {
          addressType: "Company Main Address",
          fullAddress: "456 Business Ave, Makati City",
          ownerLessee: "Lessee",
          occupiedSince: "01/01/2018",
          lastUpdateDate: "30/04/2015",
        },
      ],
      identificationCodes: {
        tin: "987-654-321-000",
        lastUpdateDate: "30/04/2015",
      },
      contacts: [
        {
          contactType: "Business Phone",
          contact: "02-8888-9999",
          lastUpdateDate: "30/04/2015",
        },
      ],
    },
  };

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
        
        {/* Credit Report Document */}
        <div 
  ref={contractRef} 
  className="bg-white p-8 border border-gray-200 rounded-lg shadow-none"
  style={{ minHeight: '297mm' }}
>
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold mb-2">CREDIT REPORT</h1>
    <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
  </div>
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">CURRENT LOAN APPLICATION</h2>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Loan ID</p>
          <div className="font-medium">{loan.id}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Loan Type</p>
          <div className="font-medium">{loan.type}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Loan Amount</p>
          <div className="font-medium">₱{loan.amount.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Application Date</p>
          <div className="font-medium">{loan.applicationDate}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Status</p>
          <div className="font-medium">
            <Badge 
              variant={
                loan.status === "Approved" ? "default" : 
                loan.status === "Pending" ? "secondary" : "destructive"
              }
            >
              {loan.status}
            </Badge>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Validated By</p>
          <div className="font-medium">{loan.validatedBy}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Loan Purpose</p>
        <div className="font-medium">{loan.purpose}</div>
      </div>
    </div>
  </div>
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
  
  {/* Subject Information Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">SUBJECT INFORMATION</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">PERSONAL DETAILS:</h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="mb-1"><span className="font-medium">CIC Subject Code:</span> {creditReportData.subjectData.cicSubjectCode}</p>
          <p className="mb-1"><span className="font-medium">Prefix:</span> {creditReportData.subjectData.prefix}</p>
          <p className="mb-1"><span className="font-medium">First Name:</span> {creditReportData.subjectData.firstName}</p>
          <p className="mb-1"><span className="font-medium">Middle Name:</span> {creditReportData.subjectData.middleName}</p>
          <p className="mb-1"><span className="font-medium">Last Name:</span> {creditReportData.subjectData.lastName}</p>
          <p className="mb-1"><span className="font-medium">Date of Birth:</span> {creditReportData.subjectData.dateOfBirth}</p>
          <p className="mb-1"><span className="font-medium">Country of Birth:</span> {creditReportData.subjectData.countryOfBirth}</p>
          <p className="mb-1"><span className="font-medium">Resident:</span> {creditReportData.subjectData.resident}</p>
          <p className="mb-1"><span className="font-medium">Dependents:</span> {creditReportData.subjectData.numberOfDependents}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {creditReportData.subjectData.lastUpdateDate}</p>
          <p className="mb-1"><span className="font-medium">Previous Last Name:</span> {creditReportData.subjectData.previousLastName || "N/A"}</p>
          <p className="mb-1"><span className="font-medium">Birthplace:</span> {creditReportData.subjectData.birthplace}</p>
          <p className="mb-1"><span className="font-medium">Nationality:</span> {creditReportData.subjectData.nationality}</p>
          <p className="mb-1"><span className="font-medium">Place of Birth:</span> {creditReportData.subjectData.placeOfBirth}</p>
          <p className="mb-1"><span className="font-medium">Gender:</span> {creditReportData.subjectData.gender}</p>
          <p className="mb-1"><span className="font-medium">Civil Status:</span> {creditReportData.subjectData.civilStatus}</p>
          <p className="mb-1"><span className="font-medium">Cars Owned:</span> {creditReportData.subjectData.carsOwned}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">FAMILY INFORMATION:</h3>
        <div className="mb-4">
          <h4 className="font-medium">Spouse:</h4>
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-1"><span className="font-medium">Name:</span> {creditReportData.spouseData.name}</p>
            <p className="mb-1"><span className="font-medium">Middle Name:</span> {creditReportData.spouseData.middleName}</p>
            <p className="mb-1"><span className="font-medium">Last Name:</span> {creditReportData.spouseData.lastName}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium">Mother (Maiden Name):</h4>
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-1"><span className="font-medium">First Name:</span> {creditReportData.motherData.firstName}</p>
            <p className="mb-1"><span className="font-medium">Middle Name:</span> {creditReportData.motherData.middleName}</p>
            <p className="mb-1"><span className="font-medium">Last Name:</span> {creditReportData.motherData.lastName}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium">Father:</h4>
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-1"><span className="font-medium">First Name:</span> {creditReportData.fatherData.firstName}</p>
            <p className="mb-1"><span className="font-medium">Middle Name:</span> {creditReportData.fatherData.middleName}</p>
            <p className="mb-1"><span className="font-medium">Suffix:</span> {creditReportData.fatherData.suffix || "N/A"}</p>
            <p className="mb-1"><span className="font-medium">Last Name:</span> {creditReportData.fatherData.lastName}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Identification Codes Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">IDENTIFICATION CODES</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">TAX INFORMATION:</h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="mb-1"><span className="font-medium">TIN:</span> {creditReportData.identificationCodes.tin}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {creditReportData.identificationCodes.tinLastUpdate}</p>
          <p className="mb-1"><span className="font-medium">SSS Card:</span> {creditReportData.identificationCodes.sssCard}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {creditReportData.identificationCodes.sssLastUpdate}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">IDENTIFICATION DOCUMENTS:</h3>
        {creditReportData.idDocuments.map((doc, index) => (
          <div key={index} className="mb-4 border-b pb-4 last:border-b-0">
            <div className="grid grid-cols-2 gap-2">
              <p className="mb-1"><span className="font-medium">Type:</span> {doc.idType}</p>
              <p className="mb-1"><span className="font-medium">Number:</span> {doc.idNumber}</p>
              <p className="mb-1"><span className="font-medium">Issue Date:</span> {doc.issueDate}</p>
              <p className="mb-1"><span className="font-medium">Expiry Date:</span> {doc.expiryDate}</p>
              <p className="mb-1"><span className="font-medium">Issuing Country:</span> {doc.issuingCountry}</p>
              <p className="mb-1"><span className="font-medium">Issued By:</span> {doc.issuedBy}</p>
              <p className="mb-1"><span className="font-medium">Last Update:</span> {doc.lastUpdateDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Addresses Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">ADDRESSES</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {creditReportData.addresses.map((address, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">{address.addressType.toUpperCase()}</h3>
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-1"><span className="font-medium">Address:</span> {address.fullAddress}</p>
            <p className="mb-1"><span className="font-medium">Owner/Lessee:</span> {address.ownerLessee}</p>
            <p className="mb-1"><span className="font-medium">Occupied Since:</span> {address.occupiedSince}</p>
            <p className="mb-1"><span className="font-medium">Last Update:</span> {address.lastUpdateDate}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Contact Information Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">CONTACT INFORMATION</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {creditReportData.contacts.map((contact, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">{contact.contactType.toUpperCase()}</h3>
          <p className="mb-1"><span className="font-medium">Contact:</span> {contact.contact}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {contact.lastUpdateDate}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Employment Information Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">EMPLOYMENT INFORMATION</h2>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <div className="grid grid-cols-2 gap-2">
          <p className="mb-1"><span className="font-medium">Company Name:</span> {creditReportData.employmentData.companyName}</p>
          <p className="mb-1"><span className="font-medium">PSIC:</span> {creditReportData.employmentData.psic}</p>
          <p className="mb-1"><span className="font-medium">Gross Income:</span> {creditReportData.employmentData.grossIncome.toLocaleString()} {creditReportData.employmentData.currency}</p>
          <p className="mb-1"><span className="font-medium">Income Period:</span> {creditReportData.employmentData.incomePeriod}</p>
          <p className="mb-1"><span className="font-medium">Occupation Status:</span> {creditReportData.employmentData.occupationStatus}</p>
          <p className="mb-1"><span className="font-medium">Occupation:</span> {creditReportData.employmentData.occupation}</p>
          <p className="mb-1"><span className="font-medium">Phone Number:</span> {creditReportData.employmentData.phoneNumber}</p>
          <p className="mb-1"><span className="font-medium">Innovation Status:</span> {creditReportData.employmentData.innovationStatus}</p>
          <p className="mb-1"><span className="font-medium">Hired ID:</span> {creditReportData.employmentData.hiredId}</p>
          <p className="mb-1"><span className="font-medium">Date Hired:</span> {creditReportData.employmentData.dateHired}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {creditReportData.employmentData.lastUpdateDate}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Sole Trader Information Section */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">SOLE TRADER INFORMATION</h2>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h3 className="font-medium mb-2">BUSINESS DETAILS:</h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="mb-1"><span className="font-medium">Name:</span> {creditReportData.soleTraderData.name}</p>
        </div>
        
        <h3 className="font-medium mb-2 mt-4">BUSINESS ADDRESSES:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditReportData.soleTraderData.addresses.map((address, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{address.addressType.toUpperCase()}</h4>
              <div className="grid grid-cols-2 gap-2">
                <p className="mb-1"><span className="font-medium">Address:</span> {address.fullAddress}</p>
                <p className="mb-1"><span className="font-medium">Owner/Lessee:</span> {address.ownerLessee}</p>
                <p className="mb-1"><span className="font-medium">Occupied Since:</span> {address.occupiedSince}</p>
                <p className="mb-1"><span className="font-medium">Last Update:</span> {address.lastUpdateDate}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="font-medium mb-2 mt-4">BUSINESS IDENTIFICATION:</h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="mb-1"><span className="font-medium">TIN:</span> {creditReportData.soleTraderData.identificationCodes.tin}</p>
          <p className="mb-1"><span className="font-medium">Last Update:</span> {creditReportData.soleTraderData.identificationCodes.lastUpdateDate}</p>
        </div>
        
        <h3 className="font-medium mb-2 mt-4">BUSINESS CONTACTS:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditReportData.soleTraderData.contacts.map((contact, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{contact.contactType.toUpperCase()}</h4>
              <p className="mb-1"><span className="font-medium">Contact:</span> {contact.contact}</p>
              <p className="mb-1"><span className="font-medium">Last Update:</span> {contact.lastUpdateDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  <div className="text-xs text-gray-500 mt-8">
    <p>This credit report is confidential and intended solely for the use of ABC Lending Corporation. 
    Unauthorized access or distribution is prohibited.</p>
  </div>
</div>
      </DialogContent>
    </Dialog>
  )
}
export default function LoanReportsPage() {
  const pathname = usePathname()
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