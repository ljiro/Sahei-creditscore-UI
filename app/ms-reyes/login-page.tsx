"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function ManagementLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center bg-slate-700 text-white rounded-t-lg py-8">
          <ShieldCheck className="mx-auto h-12 w-12 text-sky-400" />
          <CardTitle className="text-3xl">Management Portal</CardTitle>
          <CardDescription className="text-slate-300">Credit Committee Access</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 p-8 bg-white">
          <div className="grid gap-2">
            <Label htmlFor="email">Organizational Email</Label>
            <Input id="email" type="email" placeholder="ms.reyes@coop.ph" defaultValue="ms.reyes@coop.ph" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="managementPa55" />
          </div>
        </CardContent>
        <CardFooter className="p-8 pt-0 bg-white rounded-b-lg">
          <Button className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-3">Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
