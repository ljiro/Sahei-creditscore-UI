// components/ClientReportDialog.tsx
"use client"

import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"



function ClientReportDialog({ 
  client, 
  onClose 
}: { 
  client: typeof members[0], 
  onClose: () => void 
}) {
  const reportRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
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
    documentTitle: `Client_Report_${client.id}_${client.name.replace(/\s+/g, '_')}`
  })

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-white rounded-lg h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                Client Report: {client.name}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Comprehensive client profile and financial history
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
        
        {/* Report Content */}
        <div 
          ref={reportRef} 
          className="bg-white p-8 border border-gray-200 rounded-lg shadow-none"
          style={{ minHeight: '297mm' }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">CLIENT PROFILE REPORT</h1>
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          
          {/* Client Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">CLIENT INFORMATION</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Personal Details</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">Client ID:</span> {client.id}</p>
                  <p><span className="text-gray-500">Name:</span> {client.name}</p>
                  <p><span className="text-gray-500">Gender:</span> {client.gender}</p>
                  <p><span className="text-gray-500">Birthday:</span> {client.birthday} (Age: {new Date().getFullYear() - new Date(client.birthday).getFullYear()})</p>
                  <p><span className="text-gray-500">Contact:</span> {client.contact}</p>
                  <p><span className="text-gray-500">Address:</span> {client.address}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Background</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">Education:</span> {client.education}</p>
                  <p><span className="text-gray-500">Marital Status:</span> {client.maritalStatus}</p>
                  <p><span className="text-gray-500">Dependents:</span> {client.dependents}</p>
                  <p><span className="text-gray-500">Industry:</span> {client.industry}</p>
                  <p><span className="text-gray-500">Member Since:</span> {client.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">FINANCIAL INFORMATION</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-lg font-semibold">₱{client.monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Monthly Expenses</p>
                <p className="text-lg font-semibold">₱{client.monthlyExpenses.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Savings Balance</p>
                <p className="text-lg font-semibold">₱{client.savingsBalance.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Credit Score</h3>
              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      client.creditScore >= 85 ? "bg-green-500" : 
                      client.creditScore >= 70 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${client.creditScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {client.creditScore}/100 ({client.creditScore >= 85 ? "Excellent" : client.creditScore >= 70 ? "Good" : "Fair"})
                </span>
              </div>
            </div>
          </div>
          
          {/* Loan History */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">LOAN HISTORY</h2>
            {client.loans.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {client.loans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{loan.id}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{loan.type}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{loan.purpose}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">₱{loan.amount.toLocaleString()}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{loan.applicationDate}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            loan.status === "Approved" ? "bg-green-100 text-green-800" : 
                            loan.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No loan history recorded</p>
            )}
          </div>
          
          {/* Summary */}
          <div className="mt-8 text-sm text-gray-500">
            <p>This document was automatically generated by the system and contains confidential information about the client.</p>
            <p className="mt-2">Generated by: System Administrator</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ClientReportDialog