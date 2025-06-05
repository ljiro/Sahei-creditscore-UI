"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  BarChart3,
  Download,
  FileSearch,
  GanttChartSquare,
  LogOut,
  Printer,
  Settings,
  ShieldAlert,
} from "lucide-react"

const approvedLoansData = {
  "Marco Cruz": [
    { loanId: "BLN-2025-00789", memberName: "Elena D. Santos", amount: "₱50,000", approvedDate: "June 6, 2025" },
    { loanId: "EML-2025-00795", memberName: "John Doe", amount: "₱15,000", approvedDate: "June 6, 2025" },
  ],
  "Ana Lim": [
    { loanId: "SLN-2025-00792", memberName: "Robert Downey", amount: "₱30,000", approvedDate: "June 6, 2025" },
  ],
}

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar (same as approval queue) */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r sm:flex">
        <div className="border-b border-slate-700 p-5">
          <h2 className="text-2xl font-semibold text-sky-400">Management Portal</h2>
          <p className="text-sm text-slate-400">Credit Committee</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900 data-[active=true]:bg-sky-600 data-[active=true]:text-white"
          >
            <GanttChartSquare className="mr-3 h-5 w-5" /> Approval Queue
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <FileSearch className="mr-3 h-5 w-5" /> Approved Loans
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <ShieldAlert className="mr-3 h-5 w-5" /> Rejected Loans
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900 data-[active=true]:bg-sky-600 data-[active=true]:text-white"
            data-active="true"
          >
            <BarChart3 className="mr-3 h-5 w-5" /> Reports
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <Settings className="mr-3 h-5 w-5" /> System Settings
          </Button>
        </nav>
        <div className="mt-auto p-3 border-t border-slate-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Reports Dashboard</h1>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle>Generate Report: Loans Approved Today by Officer</CardTitle>
              <CardDescription>
                View a summary of loans approved by each loan officer for the selected date range.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  {/* Replace with actual DatePickerWithRange component if available */}
                  {/* <DatePickerWithRange id="dateRange" className="w-[300px]" /> */}
                  <Input
                    type="text"
                    defaultValue="Today (June 6, 2025)"
                    className="w-[300px]"
                    placeholder="Select date range"
                  />
                </div>
                <div>
                  <Label htmlFor="officer">Loan Officer (Optional)</Label>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="All Officers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Officers</SelectItem>
                      <SelectItem value="marco">Marco Cruz</SelectItem>
                      <SelectItem value="ana">Ana Lim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-sky-600 hover:bg-sky-700">Generate Report</Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Display Area */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Report: Loans Approved - June 6, 2025</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(approvedLoansData).map(([officer, loans]) => (
                <div key={officer} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-slate-700">
                    Loan Officer: {officer} (Total: {loans.length})
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Member Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Approved Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loans.map((loan) => (
                        <TableRow key={loan.loanId}>
                          <TableCell>{loan.loanId}</TableCell>
                          <TableCell>{loan.memberName}</TableCell>
                          <TableCell>{loan.amount}</TableCell>
                          <TableCell>{loan.approvedDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
              {Object.keys(approvedLoansData).length === 0 && (
                <p className="text-muted-foreground text-center py-4">No loans approved for the selected criteria.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

// Mock DatePickerWithRange component if not available in shadcn/ui by default
// You would typically import this from "@/components/ui/date-picker-with-range"
// For this example, we'll just acknowledge its usage.
// const DatePickerWithRange = ({id, className}: {id: string, className?:string}) => <Input id={id} placeholder="Select date range" className={className} />;
