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
import UserManagementPage from "./david/user-management-page.tsx"
import LoanProductConfigPage from "./david/loan-product-config-page.tsx"

export default function Page() {
  return <UserManagementPage />
}
