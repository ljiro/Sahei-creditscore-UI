"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Smartphone } from "lucide-react"

export default function MemberLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <Smartphone className="mx-auto h-12 w-12 text-green-600" />
          <CardTitle className="text-2xl">Member Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="elena.d" defaultValue="elena.d" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="password123" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-green-600 hover:bg-green-700">Login</Button>
          <p className="mt-4 text-xs text-center text-gray-500">
            Forgot password?{" "}
            <a href="#" className="underline">
              Reset here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
