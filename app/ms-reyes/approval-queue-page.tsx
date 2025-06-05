"use client"

import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  FileSearch,
  Filter,
  GanttChartSquare,
  LogOut,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react"
import Image from "next/image"

const applicationsForApproval = [
  {
    id: "BLN-2025-00789",
    memberName: "Elena D. Santos",
    memberId: "MEM-00123",
    loanType: "Business Loan",
    amount: "₱50,000",
    submittedDate: "June 4, 2025",
    forwardedBy: "Marco Cruz",
    officerNotes: "Member in good standing, business permit verified.",
    shareCapital: "₱15,500.00",
    businessPermitUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "SLN-2025-00792",
    memberName: "Robert Downey",
    memberId: "MEM-00110",
    loanType: "Salary Loan",
    amount: "₱30,000",
    submittedDate: "June 3, 2025",
    forwardedBy: "Ana Lim",
    officerNotes: "Regular employee, payslip verified.",
    shareCapital: "₱10,200.00",
    businessPermitUrl: null,
  },
]

type Application = (typeof applicationsForApproval)[0]

export default function ApprovalQueuePage() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app)
  }

  const handleApprove = () => {
    // Logic to approve application
    console.log("Approved:", selectedApp?.id)
    setSelectedApp(null) // Clear selection
    setIsApproveDialogOpen(false)
    // Remove from list or update status in a real app
  }

  const handleReject = () => {
    // Logic to reject application
    console.log("Rejected:", selectedApp?.id)
    setSelectedApp(null) // Clear selection
    setIsRejectDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r sm:flex">
        <div className="border-b border-slate-700 p-5">
          <h2 className="text-2xl font-semibold text-sky-400">Management Portal</h2>
          <p className="text-sm text-slate-400">Credit Committee</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-slate-700 hover:bg-slate-100 hover:text-black data-[active=true]:bg-sky-600 data-[active=true]:text-white"
            data-active="true"
          >
            <GanttChartSquare className="mr-3 h-5 w-5" /> Approval Queue
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-black">
            <FileSearch className="mr-3 h-5 w-5" /> Approved Loans
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-black">
            <ShieldAlert className="mr-3 h-5 w-5" /> Rejected Loans
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-black">
            <BarChart3 className="mr-3 h-5 w-5" /> Reports
          </Button>
          <Button variant="ghost" className="justify-start text-slate-700 hover:bg-slate-100 hover:text-black">
            <Settings className="mr-3 h-5 w-5" /> System Settings
          </Button>
        </nav>
        <div className="mt-auto p-3 border-t border-slate-700">
          <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-100 hover:text-black">
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
          {selectedApp ? (
            <>
              <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setSelectedApp(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Application Details: {selectedApp.id}</h1>
            </>
          ) : (
            <h1 className="text-xl font-semibold">Loan Approval Queue</h1>
          )}
          <div className="ml-auto flex items-center gap-3">
            {!selectedApp && (
              <>
                <Input
                  type="search"
                  placeholder="Search by Member or ID..."
                  className="w-64 rounded-lg bg-slate-50 pl-8"
                />
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </>
            )}
            <div className="flex items-center gap-2 border-l pl-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Ms. Reyes" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Ms. Reyes</p>
                <p className="text-xs text-muted-foreground">Head, Credit Committee</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {!selectedApp ? (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Applications Awaiting Final Adjudication</CardTitle>
                <CardDescription>{applicationsForApproval.length} applications require your attention.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>App ID</TableHead>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Forwarded By</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationsForApproval.map((app) => (
                      <TableRow
                        key={app.id}
                        className={
                          app.memberName === "Elena D. Santos"
                            ? "bg-sky-50 hover:bg-sky-100 cursor-pointer"
                            : "hover:bg-muted/50 cursor-pointer"
                        }
                        onClick={() => handleViewDetails(app)}
                      >
                        <TableCell className="font-medium">{app.id}</TableCell>
                        <TableCell>{app.memberName}</TableCell>
                        <TableCell>{app.loanType}</TableCell>
                        <TableCell>{app.amount}</TableCell>
                        <TableCell>{app.forwardedBy}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="text-sky-600 border-sky-600 hover:bg-sky-50">
                            View Details <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            // 360-degree view for selected application
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Details ({selectedApp.loanType})</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <strong>Requested Amount:</strong> {selectedApp.amount}
                    </div>
                    <div>
                      <strong>Term:</strong> 12 Months (example)
                    </div>
                    <div>
                      <strong>Purpose:</strong> Purchase additional materials...
                    </div>
                    <div>
                      <strong>Submitted:</strong> {selectedApp.submittedDate}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Member Profile: {selectedApp.memberName}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <strong>Member ID:</strong> {selectedApp.memberId}
                    </div>
                    <div>
                      <strong>Share Capital:</strong> {selectedApp.shareCapital}
                    </div>
                    <div>
                      <strong>Membership Since:</strong> Jan 15, 2020 (example)
                    </div>
                    <div>
                      <strong>Active Loans:</strong> 0 (example)
                    </div>
                    <div>
                      <strong>Credit Standing:</strong> Good (example)
                    </div>
                  </CardContent>
                </Card>
                {selectedApp.businessPermitUrl && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Submitted Document: Business Permit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={selectedApp.businessPermitUrl || "/placeholder.svg"}
                        alt="Business Permit"
                        width={600}
                        height={400}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Notes (from {selectedApp.forwardedBy})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm p-3 bg-slate-50 rounded-md border">{selectedApp.officerNotes}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Adjudication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Loan amount aligns with institutional policies. Member is in good standing. All pertinent data
                      available.
                    </p>
                    <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
                          <X className="mr-2 h-4 w-4" /> Reject Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Rejection</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to reject this loan application for {selectedApp.amount}? Please
                            provide a reason for rejection (optional).
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea placeholder="Reason for rejection..." className="my-2" />
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleReject}>
                            Yes, Reject
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Check className="mr-2 h-4 w-4" /> Approve Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Approval</DialogTitle>
                          <DialogDescription>
                            Are you certain you wish to approve this loan of {selectedApp.amount} for{" "}
                            {selectedApp.memberName}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                            Yes, Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
