"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Landmark, Home, FilePlus, UserCircle, Briefcase, GraduationCap, AlertTriangle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const loanProducts = [
  {
    name: "Business Loan",
    description: "Expand your business with our flexible loan.",
    icon: <Briefcase className="mr-3 h-6 w-6 text-green-600" />,
  },
  {
    name: "Salary Loan",
    description: "Get cash advance based on your salary.",
    icon: <Landmark className="mr-3 h-6 w-6 text-blue-500" />,
  },
  {
    name: "Emergency Loan",
    description: "For unexpected expenses and urgent needs.",
    icon: <AlertTriangle className="mr-3 h-6 w-6 text-red-500" />,
  },
  {
    name: "Educational Loan",
    description: "Invest in your future with education financing.",
    icon: <GraduationCap className="mr-3 h-6 w-6 text-purple-500" />,
  },
]

export default function LoanProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-green-700">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-semibold">Loan Products</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <p className="text-sm text-gray-600 mb-4">Explore our range of loan products tailored to your needs.</p>
        <div className="space-y-4">
          {loanProducts.map((product) => (
            <Card key={product.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  {product.icon}
                  <div>
                    <h3 className="font-semibold text-md">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.description}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t p-2 sticky bottom-0 z-10">
        <Tabs defaultValue="loans" className="w-full">
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
