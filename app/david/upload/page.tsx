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
  const [clientFile, setClientFile] = useState<File | null>(null)
  const [loanFile, setLoanFile] = useState<File | null>(null)
  const [isUploadingClient, setIsUploadingClient] = useState(false)
  const [isUploadingLoan, setIsUploadingLoan] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    client: "success" | "error" | null
    loan: "success" | "error" | null
  }>({ client: null, loan: null })

  const handleClientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setClientFile(e.target.files[0])
      setUploadStatus({ ...uploadStatus, client: null })
    }
  }

  const handleLoanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoanFile(e.target.files[0])
      setUploadStatus({ ...uploadStatus, loan: null })
    }
  }

  const handleClientUpload = async () => {
    if (!clientFile) return

    setIsUploadingClient(true)
    setUploadStatus({ ...uploadStatus, client: null })

    try {
      const formData = new FormData()
      formData.append('file', clientFile)
      
      const response = await fetch('http://localhost:5000/upload_clientinfo', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Client upload failed')
      setUploadStatus(prev => ({ ...prev, client: "success" }))
    } catch (error) {
      console.error('Client upload error:', error)
      setUploadStatus(prev => ({ ...prev, client: "error" }))
    } finally {
      setIsUploadingClient(false)
    }
  }

  const handleLoanUpload = async () => {
    if (!loanFile) return

    setIsUploadingLoan(true)
    setUploadStatus({ ...uploadStatus, loan: null })

    try {
      const formData = new FormData()
      formData.append('file', loanFile)
      
      const response = await fetch('http://localhost:5000/upload_loaninfo', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Loan upload failed')
      setUploadStatus(prev => ({ ...prev, loan: "success" }))
    } catch (error) {
      console.error('Loan upload error:', error)
      setUploadStatus(prev => ({ ...prev, loan: "error" }))
    } finally {
      setIsUploadingLoan(false)
    }
  }

  const removeClientFile = () => {
    setClientFile(null)
    setUploadStatus({ ...uploadStatus, client: null })
  }

  const removeLoanFile = () => {
    setLoanFile(null)
    setUploadStatus({ ...uploadStatus, loan: null })
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
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
              <CardTitle className="text-xl text-gray-800">Upload Data Files</CardTitle>
              <CardDescription className="text-gray-500">
                Upload Excel (.xlsx) files to import clients and loans data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Clients Upload Section */}
                <div className="space-y-4 border-b border-gray-200 pb-6">
                  <h3 className="font-medium text-gray-800">Clients Data</h3>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="client-file" className="text-gray-700">
                      Select Clients Excel File
                    </Label>
                    <Input 
                      id="client-file" 
                      type="file" 
                      accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={handleClientFileChange}
                      className="border-gray-300"
                    />
                  </div>

                  {clientFile && (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-gray-800">{clientFile.name}</p>
                              <p className="text-sm text-gray-500">{(clientFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                            onClick={removeClientFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleClientUpload}
                        disabled={!clientFile || isUploadingClient}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isUploadingClient ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading Client Data...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload Client Data
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {uploadStatus.client === "success" && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <p>Client data uploaded successfully!</p>
                    </div>
                  )}

                  {uploadStatus.client === "error" && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p>Error uploading client data. Please try again.</p>
                    </div>
                  )}
                </div>

                {/* Loans Upload Section */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Loans Data</h3>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="loan-file" className="text-gray-700">
                      Select Loans Excel File
                    </Label>
                    <Input 
                      id="loan-file" 
                      type="file" 
                      accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={handleLoanFileChange}
                      className="border-gray-300"
                    />
                  </div>

                  {loanFile && (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-gray-800">{loanFile.name}</p>
                              <p className="text-sm text-gray-500">{(loanFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                            onClick={removeLoanFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleLoanUpload}
                        disabled={!loanFile || isUploadingLoan}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isUploadingLoan ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading Loan Data...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload Loan Data
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {uploadStatus.loan === "success" && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <p>Loan data uploaded successfully!</p>
                    </div>
                  )}

                  {uploadStatus.loan === "error" && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p>Error uploading loan data. Please try again.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Upload Guidelines:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Only .xlsx files are accepted</li>
                    <li>Maximum file size: 5MB per file</li>
                    <li>Ensure data follows the required format</li>
                    <li>First row should contain column headers</li>
                    <li>You can upload one or both files at the same time</li>
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