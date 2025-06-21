"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldAlert, KeyRound } from "lucide-react"

export default function AdminLoginPage() {
  const [showMfa, setShowMfa] = useState(false)
  const [username, setUsername] = useState("admin.david")
  const [password, setPassword] = useState("superSecureP@ss!")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation, in real app, call API
    if (username && password) {
      setShowMfa(true)
    }
  }

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // MFA code validation logic here
    alert("MFA Submitted! Logging in...") // Placeholder
    // Redirect to admin dashboard
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-2xl">
        <CardHeader className="space-y-2 text-center py-8">
          <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
          <CardTitle className="text-3xl font-bold text-gray-900">Admin Secure Access</CardTitle>
          <CardDescription className="text-gray-500">Cooperative System Administration</CardDescription>
        </CardHeader>
        {!showMfa ? (
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6 p-8">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-900">
                  Admin Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin.user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 focus:ring-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-900">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 focus:ring-red-500"
                />
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-3 text-white">
                Login
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit}>
            <CardContent className="grid gap-6 p-8">
              <div className="text-center">
                <KeyRound className="mx-auto h-12 w-12 text-yellow-400 mb-2" />
                <p className="text-lg font-medium text-gray-900">Multi-Factor Authentication</p>
                <p className="text-sm text-gray-500">Enter the code from your authenticator app.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mfaCode" className="text-gray-900">
                  MFA Code
                </Label>
                <Input
                  id="mfaCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="bg-gray-100 border-gray-300 text-gray-900 text-center text-2xl tracking-[0.5em] focus:ring-yellow-500"
                />
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex flex-col gap-2">
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg py-3">
                Verify Code
              </Button>
              <Button variant="link" onClick={() => setShowMfa(false)} className="text-gray-500 hover:text-gray-900">
                Back to login
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
