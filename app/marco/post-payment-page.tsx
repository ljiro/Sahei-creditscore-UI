"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  CheckCircle,
  FileClock,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
  Printer,
} from "lucide-react"

// Mock member data
const members = [
  {
    id: "MEM-00123",
    name: "Elena D. Santos",
    activeLoanId: "BLN-2025-00789",
    loanType: "Business Loan",
    outstandingBalance: 50000.0,
    monthlyPayment: 4522.73,
    nextDueDate: "July 5, 2025",
  },
  {
    id: "MEM-00088",
    name: "Pedro Penduko",
    activeLoanId: "BLN-2024-00150",
    loanType: "Business Loan",
    outstandingBalance: 15200.0,
    monthlyPayment: 5200.0,
    nextDueDate: "June 1, 2025",
  },
  {
    id: "MEM-00092",
    name: "Ana Reyes",
    activeLoanId: "SLN-2024-00180",
    loanType: "Salary Loan",
    outstandingBalance: 8100.0,
    monthlyPayment: 2100.0,
    nextDueDate: "June 3, 2025",
  },
]

type Member = (typeof members)[0] | null

export default function PostPaymentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member>(null)
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const handleSearch = () => {
    const foundMember = members.find(
      (m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase() === searchTerm.toLowerCase(),
    )
    setSelectedMember(foundMember || null)
    setPaymentConfirmed(false)
    setPaymentAmount("")
  }

  const handleConfirmPayment = () => {
    if (selectedMember && Number.parseFloat(paymentAmount) > 0) {
      // In a real app, this would update the backend
      const newBalance = selectedMember.outstandingBalance - Number.parseFloat(paymentAmount)
      setSelectedMember({ ...selectedMember, outstandingBalance: newBalance })
      setPaymentConfirmed(true)
    }
  }

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
            data-active="true"
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
          <h1 className="text-lg font-semibold">Post Payment</h1>
        </header>

        <main className="flex-1 p-4 sm:px-6">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Record Member Payment</CardTitle>
              <CardDescription>Search for a member to post their loan payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by Member Name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>

              {selectedMember && !paymentConfirmed && (
                <Card className="mt-4">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&query=${selectedMember.name.split(" ")[0]}+avatar`}
                        />
                        <AvatarFallback>{selectedMember.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{selectedMember.name}</CardTitle>
                        <CardDescription>Member ID: {selectedMember.id}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Active Loan Details:</h4>
                      <p className="text-xs">
                        Loan ID: {selectedMember.activeLoanId} ({selectedMember.loanType})
                      </p>
                      <p className="text-xs">
                        Outstanding Balance:{" "}
                        <span className="font-semibold text-orange-600">
                          ₱{selectedMember.outstandingBalance.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-xs">Monthly Payment: ₱{selectedMember.monthlyPayment.toFixed(2)}</p>
                      <p className="text-xs">Next Due Date: {selectedMember.nextDueDate}</p>
                    </div>
                    <div>
                      <Label htmlFor="paymentAmount">Payment Amount (₱)</Label>
                      <Input
                        id="paymentAmount"
                        type="number"
                        placeholder="e.g., 2500"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        defaultValue="2500" // As per scenario
                      />
                    </div>
                    <Button onClick={handleConfirmPayment} className="w-full bg-green-600 hover:bg-green-700">
                      Confirm Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!selectedMember && searchTerm && (
                <p className="text-center text-muted-foreground mt-4">No member found for "{searchTerm}".</p>
              )}

              {paymentConfirmed && selectedMember && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-md text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-700">Payment Successful!</h3>
                  <p className="text-sm text-gray-700 mt-2">
                    Payment of <span className="font-bold">₱{Number.parseFloat(paymentAmount).toFixed(2)}</span> for{" "}
                    {selectedMember.name} (ID: {selectedMember.id}) has been recorded.
                  </p>
                  <p className="text-sm text-gray-700">
                    New Outstanding Balance:{" "}
                    <span className="font-bold">₱{selectedMember.outstandingBalance.toFixed(2)}</span>
                  </p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" /> Print Official Receipt
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedMember(null)
                        setPaymentConfirmed(false)
                        setSearchTerm("")
                        setPaymentAmount("")
                      }}
                    >
                      New Payment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
