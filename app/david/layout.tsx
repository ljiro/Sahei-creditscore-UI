import type React from "react"
import { AdminSidebar } from "./components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-72">{children}</div>
    </div>
  )
}