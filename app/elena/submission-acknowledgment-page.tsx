"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Landmark, FilePlus, UserCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubmissionAcknowledgmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-10">
        {/* <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-green-700">
          <ArrowLeft size={24} />
        </Button> */}
        <h1 className="text-xl font-semibold">Application Submitted</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Thank You, Elena!</h2>
        <p className="text-gray-600 mb-1">Your Business Loan application has been successfully submitted.</p>
        <p className="text-gray-600 mb-6">
          Your application ID is: <span className="font-medium">BLN-2025-00789</span>.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          You can track the status of your application on your dashboard. We will notify you of any updates.
        </p>
        <Button className="w-full max-w-xs bg-green-600 hover:bg-green-700">Back to Dashboard</Button>
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
