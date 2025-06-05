"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calculator, Home, Landmark, FilePlus, UserCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number | string>(50000)
  const [loanTerm, setLoanTerm] = useState<string>("12") // months
  const [interestRate, setInterestRate] = useState<number>(1.5) // monthly
  const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null)

  const calculateLoan = () => {
    const principal = Number.parseFloat(String(loanAmount))
    const term = Number.parseInt(loanTerm)
    const monthlyRate = interestRate / 100

    if (principal > 0 && term > 0 && monthlyRate > 0) {
      // Simple interest calculation for estimation, actual might be more complex (e.g., amortizing)
      // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
      const i = monthlyRate
      const n = term
      const M = (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)
      setMonthlyPayment(M.toFixed(2))
    } else {
      setMonthlyPayment(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-green-700">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-semibold">Loan Calculator</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-6 w-6 text-green-600" /> Estimate Your Loan
            </CardTitle>
            <CardDescription>
              Enter your desired loan amount and term to see an estimated monthly repayment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Desired Loan Amount (₱)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="e.g., 50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Loan Term (Months)</Label>
              <Select value={loanTerm} onValueChange={setLoanTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="18">18 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="interestRate">Monthly Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="e.g., 1.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number.parseFloat(e.target.value))}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Standard rate for Business Loans. Subject to change.</p>
            </div>
            <Button onClick={calculateLoan} className="w-full bg-green-600 hover:bg-green-700">
              Calculate
            </Button>
            {monthlyPayment && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-center">
                <p className="text-sm text-gray-700">Estimated Monthly Repayment:</p>
                <p className="text-2xl font-bold text-green-700">₱{monthlyPayment}</p>
                <p className="text-xs text-gray-500 mt-1">This is an estimate. Actual amount may vary.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t p-2 sticky bottom-0 z-10">
        <Tabs defaultValue="apply" className="w-full">
          {" "}
          {/* Assuming calculator is part of apply flow */}
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger
              value="dashboard"
              className="flex flex-col items-center gap-1 data-[state=active]:text-green-600"
            >
              <Home size={20} /> <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex flex-col items-center gap-1 data-[state=active]:text-green-600">
              <Landmark size={20} /> <span className="text-xs">Loans</span>
            </TabsTrigger>
            <TabsTrigger value="apply" className="flex flex-col items-center gap-1 data-[state=active]:text-green-600">
              <FilePlus size={20} /> <span className="text-xs">Apply</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex flex-col items-center gap-1 data-[state=active]:text-green-600"
            >
              <UserCircle size={20} /> <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  )
}
