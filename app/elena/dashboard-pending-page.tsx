"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Bell, UserCircle, Landmark, Calculator, FilePlus, Hourglass, MailCheck } from "lucide-react"

export default function MemberDashboardPendingPage() {
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Welcome, Elena!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Share Capital (Savings):</span>
                <span className="font-semibold text-green-700">₱15,500.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-yellow-400">
          <CardHeader className="bg-yellow-50 rounded-t-lg">
            <CardTitle className="text-md flex items-center text-yellow-700">
              <Hourglass size={20} className="mr-2" /> Active Loan Application
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Business Loan</span>
              <span className="text-sm text-gray-500">₱50,000.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs">
                Application Submitted - Pending
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-3">Submitted on: June 4, 2025</p>
            <Button variant="link" className="text-green-600 p-0 mt-1 h-auto">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Push notification update simulation */}
        <Card className="mb-6 border-blue-400">
          <CardHeader className="bg-blue-50 rounded-t-lg">
            <CardTitle className="text-md flex items-center text-blue-700">
              <MailCheck size={20} className="mr-2" /> Application Update
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700">
              Your loan application (BLN-2025-00789) has been{" "}
              <span className="font-semibold">forwarded for approval.</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">Received: June 5, 2025, 10:00 AM</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="text-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <Landmark size={32} className="mx-auto text-green-600 mb-2" />
            <p className="font-medium">Loan Products</p>
          </Card>
          <Card className="text-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <Calculator size={32} className="mx-auto text-green-600 mb-2" />
            <p className="font-medium">Loan Calculator</p>
          </Card>
        </div>
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
