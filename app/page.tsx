"use client"

import MemberLoginPage from "./elena/login-page"
import LoanProductsPage from "./elena/loan-products-page.tsx"
import LoanCalculatorPage from "./elena/loan-calculator-page.tsx"
import LoanApplicationPage from "./elena/loan-application-page.tsx"
import MemberDashboardApprovedPage from "./elena/dashboard-approved-page.tsx"
import MemberDashboardInitialPage from "./elena/dashboard-initial-page.tsx"
import MemberDashboardPendingPage from "./elena/dashboard-pending-page.tsx"
import SubmissionAcknowledgmentPage from "./elena/submission-acknowledgement-page.tsx"

import ApplicationDetailsPage from "./marco/application-details-page.tsx"
import StaffDashboardPage from "./marco/dashboard-page.tsx"
import StaffLoginPage from "./marco/login-page.tsx"
import PostPaymentPage from "./marco/post-payment-page.tsx"

import ManagementLoginPage from "./ms-reyes/login-page.tsx"
import ReportsPage from "./ms-reyes/reports-page.tsx"
import ApprovalQueuePage from "./ms-reyes/approval-queue-page.tsx"

import AdminLoginPage from "./david/login-page.tsx"
import UserManagementPage from "./david/users/page"
import LoanProductConfigPage from "./david/loan-product-config-page.tsx" // You'll need to create this
import AdminDashboardPage from "./elena/dashboard-initial-page.tsx" // You'll need to create this
import DashboardPage from "./david/dashboard/page";
import LoanPage from "./david/loans/page";
import ClientManagement from "./david/clients/page"
import ReportPage from "./david/reports/page";
import { usePathname } from 'next/navigation'
import LoanReportsPage from "./david/reports/page"

export default function Page() {
  const pathname = usePathname()
  console.log("path" , pathname);

  switch(pathname) {
    case '/david':
    case '/david/dashboard':
      return <DashboardPage />
    case '/david/clients':
      return <ClientManagement />

    case '/david/users':
      return <UserManagementPage />
      
    case '/david/loans':
      return <LoanPage />
    case '/david/reports':
      return <ReportPage />
    case '/david/login':
      return <AdminLoginPage />
    default:
      return <DashboardPage />
  }
}