"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building } from "lucide-react"

export default function StaffLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center bg-slate-700 text-white rounded-t-lg py-8">
          <Building className="mx-auto h-12 w-12" />
          <CardTitle className="text-3xl">Cooperative Staff Portal</CardTitle>
          <CardDescription className="text-slate-300">Loan Management System</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 p-8">
          <div className="grid gap-2">
            <Label htmlFor="email">Organizational Email</Label>
            <Input id="email" type="email" placeholder="marco.cruz@coop.ph" defaultValue="marco.cruz@coop.ph" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="staffpassword" />
          </div>
        </CardContent>
        <CardFooter className="p-8 pt-0">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
