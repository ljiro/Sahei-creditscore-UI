"use client"

import { Input } from "@/components/ui/input"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  ChevronDown,
  ChevronRight,
  FileClock,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
  HandCoins,
} from "lucide-react"

const newApplications = [
  {
    id: "BLN-2025-00789",
    memberName: "Elena D. Santos",
    loanType: "Business Loan",
    amount: "₱50,000",
    submitted: "1 hr ago",
    status: "Pending Review",
  },
  {
    id: "SLN-2025-00790",
    memberName: "Juan Dela Cruz",
    loanType: "Salary Loan",
    amount: "₱20,000",
    submitted: "3 hrs ago",
    status: "Pending Review",
  },
  {
    id: "EML-2025-00791",
    memberName: "Maria Clara",
    loanType: "Emergency Loan",
    amount: "₱10,000",
    submitted: "5 hrs ago",
    status: "Pending Review",
  },
]

const paymentFollowUps = [
  {
    memberId: "MEM-00088",
    memberName: "Pedro Penduko",
    loanId: "BLN-2024-00150",
    dueDate: "June 1, 2025",
    overdueDays: 3,
    amountDue: "₱5,200.00",
  },
  {
    memberId: "MEM-00092",
    memberName: "Ana Reyes",
    loanId: "SLN-2024-00180",
    dueDate: "June 3, 2025",
    overdueDays: 1,
    amountDue: "₱2,100.00",
  },
]

export default function StaffDashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold text-green-700">Coop Staff Portal</h2>
        </div>
        <nav className="flex flex-col gap-1 p-2 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            data-active="true"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          >
            <FileClock className="mr-2 h-4 w-4" /> Loan Applications
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          >
            <Users className="mr-2 h-4 w-4" /> Members
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          >
            <HandCoins className="mr-2 h-4 w-4" /> Post Payment
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Marco Cruz" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Marco Cruz</p>
              <p className="text-xs text-muted-foreground">Loan Officer</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>New Applications</CardDescription>
                <CardTitle className="text-4xl text-orange-500">3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Pending Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Payment Follow-ups</CardDescription>
                <CardTitle className="text-4xl text-red-500">2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Require attention</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Approved Today</CardDescription>
                <CardTitle className="text-4xl text-green-500">5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">By all officers</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="new-applications">
            <TabsList className="mb-4">
              <TabsTrigger value="new-applications">New Applications (3)</TabsTrigger>
              <TabsTrigger value="payment-followups">Payment Follow-ups (2)</TabsTrigger>
            </TabsList>
            <TabsContent value="new-applications">
              <Card>
                <CardHeader>
                  <CardTitle>New Loan Applications Pending Review</CardTitle>
                  <CardDescription>Review and process these new applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>App ID</TableHead>
                        <TableHead>Member Name</TableHead>
                        <TableHead>Loan Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newApplications.map((app) => (
                        <TableRow
                          key={app.id}
                          className={
                            app.memberName === "Elena D. Santos"
                              ? "bg-green-50 hover:bg-green-100 font-medium"
                              : "hover:bg-muted/50"
                          }
                        >
                          <TableCell>{app.id}</TableCell>
                          <TableCell>{app.memberName}</TableCell>
                          <TableCell>{app.loanType}</TableCell>
                          <TableCell>{app.amount}</TableCell>
                          <TableCell>{app.submitted}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              View <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment-followups">
              <Card>
                <CardHeader>
                  <CardTitle>Members Requiring Payment Follow-up</CardTitle>
                  <CardDescription>Contact members regarding overdue payments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Member Name</TableHead>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Overdue By</TableHead>
                        <TableHead>Amount Due</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentFollowUps.map((followUp) => (
                        <TableRow key={followUp.memberId} className="hover:bg-muted/50">
                          <TableCell>{followUp.memberId}</TableCell>
                          <TableCell>{followUp.memberName}</TableCell>
                          <TableCell>{followUp.loanId}</TableCell>
                          <TableCell>{followUp.dueDate}</TableCell>
                          <TableCell className="text-red-600">{followUp.overdueDays} days</TableCell>
                          <TableCell>{followUp.amountDue}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Contact
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
