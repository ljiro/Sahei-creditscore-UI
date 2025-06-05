"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  CheckCircle,
  Download,
  Eye,
  FileClock,
  FileText,
  HandCoins,
  History,
  LayoutDashboard,
  LogOut,
  Send,
  Settings,
  Users,
  XCircle,
  PlusCircle,
} from "lucide-react"
import Image from "next/image"

export default function ApplicationDetailsPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar (same as dashboard) */}
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold text-green-700">Coop Staff Portal</h2>
        </div>
        <nav className="flex flex-col gap-1 p-2 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            data-active="true"
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
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-lg font-semibold">Application ID: BLN-2025-00789</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Print
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" /> Forward to Credit Committee
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:px-6 grid md:grid-cols-3 gap-6">
          {/* Left Column: Application & Member Details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Application Details</CardTitle>
                <CardDescription>Submitted: June 4, 2025, 03:30 PM</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-muted-foreground">Loan Type:</span> Business Loan
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Requested Amount:</span> ₱50,000.00
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Loan Term:</span> 12 Months
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Purpose:</span> Purchase additional materials for
                  Panagbenga Festival
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Status:</span>{" "}
                  <span className="text-orange-600 font-semibold">Pending Review</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-muted-foreground">Name:</span> Elena D. Santos
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Member ID:</span> MEM-00123
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Contact:</span> 0917-123-4567
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Email:</span> elena.santos@email.com
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Membership Date:</span> Jan 15, 2020
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Share Capital:</span> ₱15,500.00
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Active Loans:</span> 0
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Credit Standing:</span>{" "}
                  <span className="text-green-600 font-semibold">Good</span>
                </div>
              </CardContent>
              <CardContent>
                <Button variant="outline" size="sm">
                  <History className="mr-2 h-4 w-4" /> View Full Membership History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium">Business_Permit_Elena_Santos.jpg</p>
                      <p className="text-xs text-muted-foreground">Uploaded: June 4, 2025, 03:28 PM (Size: 1.2MB)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" title="View Document">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Download Document">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Placeholder for image viewer */}
                <div className="mt-4 border rounded-md p-2 bg-slate-50">
                  <p className="text-sm font-medium mb-2 text-center">Business Permit Preview:</p>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Business Permit"
                    width={600}
                    height={400}
                    className="rounded-md mx-auto border"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Actions & Notes */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <span className="font-medium">Business Permit:</span> Verified with physical copy.
                </p>
                <p className="text-sm">
                  <span className="font-medium">Membership Standing:</span> Member in good standing.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Verified
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes for the credit committee or internal records..."
                  defaultValue="Member in good standing, business permit verified."
                />
                <Button variant="outline" size="sm" className="mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                </Button>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="border p-2 rounded-md bg-slate-50">
                    <p className="font-medium">Marco Cruz (June 5, 2025, 09:15 AM):</p>
                    <p>Member in good standing, business permit verified.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p>
                  <span className="font-medium">June 4, 2025, 03:30 PM:</span> Application Submitted by Elena D. Santos.
                </p>
                <p>
                  <span className="font-medium">June 5, 2025, 09:00 AM:</span> Application assigned to Marco Cruz for
                  review.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
