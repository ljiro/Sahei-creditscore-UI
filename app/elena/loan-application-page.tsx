"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FilePlus, UploadCloud, Camera, Home, Landmark, UserCircle, Briefcase } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoanApplicationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0])
      setFileName(event.target.files[0].name)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-green-700">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-semibold">Business Loan Application</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-green-600" /> Application Form
            </CardTitle>
            <CardDescription>
              Please fill out the details below. Fields marked with * are pre-populated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-1">Personal Information</h3>
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" type="text" defaultValue="Elena D. Santos" disabled />
            </div>
            <div>
              <Label htmlFor="memberId">Member ID *</Label>
              <Input id="memberId" type="text" defaultValue="MEM-00123" disabled />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input id="contactNumber" type="tel" defaultValue="0917-123-4567" disabled />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" defaultValue="elena.santos@email.com" disabled />
            </div>

            <h3 className="font-semibold text-gray-700 border-b pb-1 mt-6">Loan Details</h3>
            <div>
              <Label htmlFor="loanAmount">Desired Loan Amount (₱)</Label>
              <Input id="loanAmount" type="number" defaultValue="50000" />
            </div>
            <div>
              <Label htmlFor="loanPurpose">Purpose of Loan</Label>
              <Textarea
                id="loanPurpose"
                placeholder="e.g., Purchase additional materials for Panagbenga Festival"
                defaultValue="Purchase additional materials for Panagbenga Festival"
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Preferred Loan Term</Label>
              <Select defaultValue="12">
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h3 className="font-semibold text-gray-700 border-b pb-1 mt-6">Document Submission</h3>
            <div>
              <Label htmlFor="businessPermit">Business Permit</Label>
              <Card className="border-dashed border-2 hover:border-green-500">
                <CardContent className="p-6 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    {fileName ? `File: ${fileName}` : "Drag & drop or click to upload"}
                  </p>
                  <input
                    type="file"
                    id="businessPermitUpload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("businessPermitUpload")?.click()}
                    >
                      <UploadCloud className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                    <Button type="button" variant="outline">
                      <Camera className="mr-2 h-4 w-4" /> Use Camera
                    </Button>
                  </div>
                  {fileName && <p className="text-xs text-green-600 mt-2">Successfully attached: {fileName}</p>}
                </CardContent>
              </Card>
              <p className="text-xs text-gray-500 mt-1">Please upload a clear image or PDF of your Business Permit.</p>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 mt-6">Submit Application</Button>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t p-2 sticky bottom-0 z-10">
        <Tabs defaultValue="apply" className="w-full">
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
