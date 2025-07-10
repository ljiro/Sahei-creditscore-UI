"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, UploadCloud, X, CheckCircle2, AlertCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export default function UploadPage() {
  // File upload state
  const [clientFile, setClientFile] = useState<File | null>(null)
  const [loanFile, setLoanFile] = useState<File | null>(null)
  const [isUploadingClient, setIsUploadingClient] = useState(false)
  const [isUploadingLoan, setIsUploadingLoan] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    client: "success" | "error" | null
    loan: "success" | "error" | null
  }>({ client: null, loan: null })

  // Name matching state
  const [potentialMatches, setPotentialMatches] = useState<Array<{
    id: number
    newRecord: Record<string, string>
    existingRecord: Record<string, string>
    confidence: number
    matchReasons: string[]
  }> | null>(null)
  const [currentMatchId, setCurrentMatchId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<"merge" | "not-duplicate" | null>(null)
  const [decidedMatches, setDecidedMatches] = useState<number[]>([])

  // Handle file selection
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

  // Handle file removal
  const removeClientFile = () => {
    setClientFile(null)
    setUploadStatus({ ...uploadStatus, client: null })
  }

  const removeLoanFile = () => {
    setLoanFile(null)
    setUploadStatus({ ...uploadStatus, loan: null })
  }

  // File upload handler for client file
  const handleClientUpload = async () => {
    if (!clientFile) return;
    setIsUploadingClient(true);
    setUploadStatus({ ...uploadStatus, client: null });

    try {
      // Send file to .NET backend for processing and name matching
      // The backend should process the file, check for duplicates, and call window.globalSetPotentialMatches with results
      if (window.HybridWebView && window.HybridWebView.SendInvokeMessageToDotNet) {
        // Read file as base64 or ArrayBuffer (depending on backend expectation)
        const reader = new FileReader();
        reader.onload = function (e) {
          const fileData = e.target?.result;
          // Send file data to .NET backend (you may need to adjust the message and payload format)
          window.HybridWebView.SendInvokeMessageToDotNet("uploadMembersFile", {
            fileName: clientFile.name,
            fileData: fileData // base64 or ArrayBuffer
          });
        };
        reader.readAsDataURL(clientFile); // or readAsArrayBuffer(clientFile)
      }
      setUploadStatus(prev => ({ ...prev, client: "success" }));
    } catch (error) {
      console.error('Client upload error:', error);
      setUploadStatus(prev => ({ ...prev, client: "error" }));
    } finally {
      setIsUploadingClient(false);
    }
  };

  const handleLoanUpload = async () => {
    if (!loanFile) return

    setIsUploadingLoan(true)
    setUploadStatus({ ...uploadStatus, loan: null })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setUploadStatus(prev => ({ ...prev, loan: "success" }))
    } catch (error) {
      console.error('Loan upload error:', error)
      setUploadStatus(prev => ({ ...prev, loan: "error" }))
    } finally {
      setIsUploadingLoan(false)
    }
  }

  // Receive potential matches from .NET backend
  // This function will be called by .NET after processing the uploaded file
  // The payload should be an array of match objects (same shape as before)
  React.useEffect(() => {
    (window as any).globalSetPotentialMatches = (matches: any[]) => {
      setPotentialMatches(matches);
      setCurrentMatchId(matches[0]?.id || null);
      setDecidedMatches([]);
      setIsDialogOpen(matches.length > 0);
    };
  }, []);

  // Get current match data
  const getCurrentMatch = () => {
    if (!potentialMatches || currentMatchId === null) return null
    return potentialMatches.find(match => match.id === currentMatchId)
  }

  // Handle match confirmation
  const handleConfirmMatch = (isDuplicate: boolean) => {
    if (!potentialMatches || currentMatchId === null) return
    
    // Add current match to decided matches
    setDecidedMatches(prev => [...prev, currentMatchId])
    
    // Find next undecided match
    const nextMatch = potentialMatches.find(
      match => !decidedMatches.includes(match.id) && match.id !== currentMatchId
    )
    
    if (nextMatch) {
      setCurrentMatchId(nextMatch.id)
    } else {
      setIsDialogOpen(false)
    }
    
    setIsConfirmDialogOpen(false)
  }

  // Show confirmation dialog
  const showConfirmation = (action: "merge" | "not-duplicate") => {
    setPendingAction(action)
    setIsConfirmDialogOpen(true)
  }

  // Navigate between undecided matches
  const navigateMatch = (direction: "prev" | "next") => {
    if (!potentialMatches || currentMatchId === null) return
    
    const undecidedMatches = potentialMatches.filter(
      match => !decidedMatches.includes(match.id)
    )
    
    if (undecidedMatches.length <= 1) return
    
    const currentIndex = undecidedMatches.findIndex(
      match => match.id === currentMatchId
    )
    
    let newIndex
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : undecidedMatches.length - 1
    } else {
      newIndex = currentIndex < undecidedMatches.length - 1 ? currentIndex + 1 : 0
    }
    
    setCurrentMatchId(undecidedMatches[newIndex].id)
  }

  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const currentMatch = getCurrentMatch()
  const undecidedMatches = potentialMatches?.filter(
    match => !decidedMatches.includes(match.id)
  ) || []
  const totalMatches = potentialMatches?.length || 0

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Data Upload</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback className="text-gray-900">AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Loan Officer</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Upload Card */}
          <Card className="shadow-sm border-gray-200 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Upload Data Files</CardTitle>
              <CardDescription className="text-gray-500">
                Upload Excel (.xlsx) files to import members and loans data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Members Upload Section */}
                <div className="space-y-4 border-b border-gray-200 pb-6">
                  <h3 className="font-medium text-gray-800">Members Data</h3>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="client-file" className="text-gray-700">
                      Select Members Excel File
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
                            Uploading...
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
                            Uploading...
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
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success message when all matches are resolved */}
          {uploadStatus.client === "success" && !isDialogOpen && potentialMatches && (
            <Card className="shadow-sm border-green-200 bg-green-50 max-w-2xl mx-auto">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    {decidedMatches.length === totalMatches
                      ? "All potential duplicates reviewed. Data processing complete!"
                      : "Client data uploaded successfully!"}
                  </span>
                </div>
              </CardHeader>
            </Card>
          )}
        </main>

        {/* Name Matching Dialog */}
        <Dialog open={isDialogOpen && currentMatch !== null} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Potential Duplicate Member Found</span>
              </DialogTitle>
              <DialogDescription>
                {`Reviewing match ${undecidedMatches.findIndex(m => m.id === currentMatchId) + 1} of ${undecidedMatches.length} (${totalMatches} total)`}
              </DialogDescription>
            </DialogHeader>

            {currentMatch && (
              <div className="space-y-4">
                {/* Navigation Controls */}
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={undecidedMatches.length <= 1}
                    onClick={() => navigateMatch("prev")}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Confidence:</span>
                    <Progress value={currentMatch.confidence} className="h-2 w-32" />
                    <span className="text-sm font-medium">{currentMatch.confidence}%</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={undecidedMatches.length <= 1}
                    onClick={() => navigateMatch("next")}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Match Reasons */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Match Reasons:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.matchReasons.map((reason, i) => (
                      <span key={i} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comparison Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Field</TableHead>
                      <TableHead>New Applicant</TableHead>
                      <TableHead>Existing Member</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.keys(currentMatch.newRecord).map((key) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </TableCell>
                        <TableCell>{currentMatch.newRecord[key]}</TableCell>
                        <TableCell>{currentMatch.existingRecord[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline"
                onClick={() => showConfirmation("not-duplicate")}
              >
                Not a Duplicate
              </Button>
              <Button 
                onClick={() => showConfirmation("merge")}
              >
                Merge Records
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Confirm Your Decision</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              {pendingAction === "merge" ? (
                <p>Are you sure these records belong to the same person? This will merge the new applicant with the existing member.</p>
              ) : (
                <p>Are you sure these records are for different people? This will keep them as separate records.</p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button variant="outline">
                  No, Go Back
                </Button>
              </DialogClose>
              <Button 
                onClick={() => pendingAction && handleConfirmMatch(pendingAction === "merge")}
              >
                Yes, Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}