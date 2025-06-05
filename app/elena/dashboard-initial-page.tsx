"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Home, Bell, UserCircle, Landmark, Calculator, FilePlus } from "lucide-react"

export default function MemberDashboardInitialPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Coop App</h1>
        <div className="flex items-center gap-3">
          <Bell size={24} />
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
              <hr />
              <div className="text-center py-4">
                <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">You have no active loan agreements.</p>
                <Button variant="link" className="text-green-600">
                  View Loan History
                </Button>
              </div>
            </div>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-md">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">No recent activity.</p>
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
