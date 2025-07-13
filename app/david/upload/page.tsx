"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, UploadCloud, X, CheckCircle2, AlertCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import HybridWebView from "../hybridwebview/HybridWebView.js";

type Match = {
  id: number
  newRecord: Record<string, string>
  existingRecord: Record<string, string>
  confidence: number
  matchReasons: string[]
}

type UploadMode = "proposed" | "current"

export default function UploadPage() {
  // Upload mode state
  const [uploadMode, setUploadMode] = useState<UploadMode>("proposed")

  // File upload state
  const [clientFile, setClientFile] = useState<File | null>(null)
  const [loanFile, setLoanFile] = useState<File | null>(null)
  const [additionalFile, setAdditionalFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(null)

  // Name matching state
  const [potentialMatches, setPotentialMatches] = useState<Match[] | null>(null)
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<"merge" | "not-duplicate" | null>(null)
  const [decidedMatches, setDecidedMatches] = useState<number[]>([])

  // File handlers
  const handleClientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientFile(e.target.files?.[0] || null)
    setUploadStatus(null)
  }

  const handleLoanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanFile(e.target.files?.[0] || null)
    setUploadStatus(null)
  }

  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalFile(e.target.files?.[0] || null)
    setUploadStatus(null)
  }

  // File removal handlers
  const removeClientFile = () => setClientFile(null)
  const removeLoanFile = () => setLoanFile(null)
  const removeAdditionalFile = () => setAdditionalFile(null)

  // Upload files to backend
  const uploadFiles = async () => {
    const requiredFiles = uploadMode === "proposed" 
      ? [clientFile, loanFile] 
      : [clientFile, loanFile, additionalFile];
    
    if (requiredFiles.some(file => !file)) {
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("mode", uploadMode);
      formData.append("clientFile", clientFile!);
      formData.append("loanFile", loanFile!);
      
      if (uploadMode === "current" && additionalFile) {
        formData.append("additionalFile", additionalFile);
      }

      console.log("form data ", formData)
      // Add headers for binary data
      const response = await fetch("http://localhost:5000/upload_combined", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      if (data.matches?.length > 0) {
        setPotentialMatches(data.matches);
        setIsDialogOpen(true);
      }
      setUploadStatus("success");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  // Name matching logic
  const currentMatch = potentialMatches?.[currentMatchIdx]
  const undecidedMatches = potentialMatches?.filter(m => !decidedMatches.includes(m.id)) || []
  const totalMatches = potentialMatches?.length || 0

  const handleDialogClose = () => setIsDialogOpen(false)

  const showConfirmation = (action: "merge" | "not-duplicate") => {
    setPendingAction(action)
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmMatch = async (isDuplicate: boolean) => {
    if (!potentialMatches || !currentMatch) return
    
    setDecidedMatches(prev => [...prev, currentMatch.id])
    setIsConfirmDialogOpen(false)

    const nextIdx = potentialMatches.findIndex(
      (m, idx) => !decidedMatches.includes(m.id) && idx !== currentMatchIdx
    )
    
    if (nextIdx !== -1) {
      setCurrentMatchIdx(nextIdx)
    } else {
      setIsDialogOpen(false)
    }
  }

  const navigateMatch = (direction: "prev" | "next") => {
    if (!potentialMatches) return
    const undecided = potentialMatches.filter(m => !decidedMatches.includes(m.id))
    if (undecided.length <= 1) return
    
    const currentUndecidedIdx = undecided.findIndex(m => m.id === currentMatch?.id)
    let newIdx = direction === "prev"
      ? currentUndecidedIdx > 0 ? currentUndecidedIdx - 1 : undecided.length - 1
      : currentUndecidedIdx < undecided.length - 1 ? currentUndecidedIdx + 1 : 0
    
    setCurrentMatchIdx(potentialMatches.findIndex(m => m.id === undecided[newIdx].id))
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Data Upload</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback className="text-gray-900">DL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">David Lee</p>
                <p className="text-xs text-gray-500">IT Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Card className="shadow-sm border-gray-200 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Upload Member Data</CardTitle>
              <CardDescription className="text-gray-500">
                {uploadMode === "proposed" 
                  ? "Upload client and loan files for proposed members" 
                  : "Upload client, loan, and additional files for current members"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Mode Toggle */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Upload Mode</Label>
                  <ToggleGroup 
                    type="single" 
                    value={uploadMode}
                    onValueChange={(value) => {
                      if (value) {
                        setUploadMode(value as UploadMode)
                        setClientFile(null)
                        setLoanFile(null)
                        setAdditionalFile(null)
                        setUploadStatus(null)
                      }
                    }}
                  >
                    <ToggleGroupItem value="proposed" className="px-4">
                      Proposed
                    </ToggleGroupItem>
                    <ToggleGroupItem value="current" className="px-4">
                      Current
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Client File Input */}
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="client-file" className="text-gray-700">
                    Clients Excel File
                  </Label>
                  <Input
                    id="client-file"
                    type="file"
                    accept=".xlsx"
                    onChange={handleClientFileChange}
                  />
                  {clientFile && (
                    <div className="flex items-center gap-2 mt-2 p-2 border rounded">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm">{clientFile.name}</p>
                        <p className="text-xs text-gray-500">{(clientFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={removeClientFile}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Loan File Input */}
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="loan-file" className="text-gray-700">
                    Loans Excel File
                  </Label>
                  <Input
                    id="loan-file"
                    type="file"
                    accept=".xlsx"
                    onChange={handleLoanFileChange}
                  />
                  {loanFile && (
                    <div className="flex items-center gap-2 mt-2 p-2 border rounded">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm">{loanFile.name}</p>
                        <p className="text-xs text-gray-500">{(loanFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={removeLoanFile}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Additional File Input (Current mode only) */}
                {uploadMode === "current" && (
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="additional-file" className="text-gray-700">
                      Additional Data File
                    </Label>
                    <Input
                      id="additional-file"
                      type="file"
                      accept=".xlsx"
                      onChange={handleAdditionalFileChange}
                    />
                    {additionalFile && (
                      <div className="flex items-center gap-2 mt-2 p-2 border rounded">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm">{additionalFile.name}</p>
                          <p className="text-xs text-gray-500">{(additionalFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={removeAdditionalFile}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Upload Button */}
                <Button
                  onClick={uploadFiles}
                  disabled={
                    isUploading || 
                    (uploadMode === "proposed" 
                      ? !clientFile || !loanFile 
                      : !clientFile || !loanFile || !additionalFile)
                  }
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
                      Upload {uploadMode === "proposed" ? "Proposed" : "Current"} Data
                    </>
                  )}
                </Button>

                {/* Upload Status */}
                {uploadStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>Data uploaded successfully!</p>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p>Error uploading data. Please try again.</p>
                  </div>
                )}

                {/* Upload Guidelines */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Upload Guidelines:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Only .xlsx files are accepted</li>
                    <li>Maximum file size: 5MB per file</li>
                    <li>Ensure data follows the required format</li>
                    <li>First row should contain column headers</li>
                    {uploadMode === "current" && (
                      <li>Additional file must contain supplementary member data</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Name Matching Dialog */}
          <Dialog open={isDialogOpen && !!currentMatch} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Potential Duplicate Member Found</span>
                </DialogTitle>
                <DialogDescription>
                  {`Reviewing match ${undecidedMatches.findIndex(m => m.id === currentMatch?.id) + 1} of ${undecidedMatches.length} (${totalMatches} total)`}
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
        </main>
      </div>
    </div>
  )
}