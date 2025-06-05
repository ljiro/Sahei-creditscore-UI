"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Bell, UserCircle, Landmark, FilePlus, CalendarDays, Award } from "lucide-react"

export default function MemberDashboardApprovedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Coop App</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </div>
          <UserCircle size={24} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Card className="mb-6 bg-green-50 border-green-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-green-700">
              <Award size={24} className="mr-2" /> Congratulations, Elena!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">
              Your Business Loan of <span className="font-bold">₱50,000.00</span> has been approved!
            </p>
            <p className="text-xs text-gray-500 mt-1">Approved on: June 6, 2025</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-md">Current Loan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Loan Type:</span>
                <span className="font-semibold">Business Loan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-semibold text-green-700">₱50,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Outstanding Balance:</span>
                <span className="font-semibold text-orange-600">₱50,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Payment Due:</span>
                <span className="font-semibold">July 5, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-semibold">₱4,522.73</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-2">
                <CalendarDays size={18} className="mr-2" /> View Payment Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-md">Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Share Capital (Savings):</span>
              <span className="font-semibold text-green-700">₱15,500.00</span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t p-2 sticky bottom-0 z-10">
        <Tabs defaultValue="dashboard" className="w-full">
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
