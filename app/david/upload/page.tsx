"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, UploadCloud, X, CheckCircle2, AlertCircle } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Shield, BarChart2, Users2, User, Book, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UploadPage() {
  const pathname = usePathname()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setUploadStatus(null)
    }
  }

  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus(null)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // Randomly set success or error for demo purposes
      const isSuccess = Math.random() > 0.3
      setUploadStatus(isSuccess ? "success" : "error")
    }, 2000)
  }

  const removeFile = () => {
    setFile(null)
    setUploadStatus(null)
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r-gray-200 sm:flex">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Link href="/david/dashboard" passHref legacyBehavior>
            <Button
              variant={pathname === '/david/dashboard' ? "secondary" : "ghost"}
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <BarChart2 className="mr-3 h-5 w-5" /> Dashboard
            </Button>
          </Link>
          <Link href="/david/users" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/users' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Users2 className="mr-3 h-5 w-5" /> Users
            </Button>
          </Link>
          <Link href="/david/clients" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/clients' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <User className="mr-3 h-5 w-5" /> Clients
            </Button>
          </Link>
          <Link href="/david/loans" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/loans' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Book className="mr-3 h-5 w-5" /> Loans
            </Button>
          </Link>
          <Link href="/david/reports" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/reports' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FileText className="mr-3 h-5 w-5" /> Reports
            </Button>
          </Link>
          <Link href="/david/upload" passHref legacyBehavior>
            <Button 
              variant={pathname === '/david/upload' ? "secondary" : "ghost"} 
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <UploadCloud className="mr-3 h-5 w-5" /> Upload
            </Button>
          </Link>
        </nav>
        <div className="mt-auto p-3 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Data Upload</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="David" />
                <AvatarFallback className="text-gray-900">DL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">David Lee</p>
                <p className="text-xs text-gray-500">IT Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Card className="shadow-sm border-gray-200 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Upload Excel File</CardTitle>
              <CardDescription className="text-gray-500">
                Upload an Excel (.xlsx) file to import data into the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file" className="text-gray-700">
                    Select Excel File
                  </Label>
                  <Input 
                    id="file" 
                    type="file" 
                    accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={handleFileChange}
                    className="border-gray-300"
                  />
                </div>

                {file && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>File uploaded successfully!</p>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p>Error uploading file. Please try again.</p>
                  </div>
                )}

                <Button 
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Upload File
                    </>
                  )}
                </Button>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Upload Guidelines:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Only .xlsx files are accepted</li>
                    <li>Maximum file size: 5MB</li>
                    <li>Ensure data follows the required format</li>
                    <li>First row should contain column headers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}