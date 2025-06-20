"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, BarChart2, Users2, User, Book, FileText, Upload, Settings } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/david/dashboard", icon: BarChart2, label: "Dashboard" },
    { href: "/david/users", icon: Users2, label: "Users" },
    { href: "/david/members", icon: User, label: "Members" },
    { href: "/david/loans", icon: Book, label: "Loans" },
    { href: "/david/reports", icon: FileText, label: "Reports" },
    { href: "/david/upload", icon: Upload, label: "Upload Data" },
    { href: "/david/loan-product-config", icon: Settings, label: "Loan Products" },
  ]

  return (
    <aside className="hidden w-72 flex-col border-r bg-white border-r-gray-200 sm:flex">
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref legacyBehavior>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
