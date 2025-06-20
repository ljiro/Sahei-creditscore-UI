// "use client"

// import MemberLoginPage from "./elena/login-page"
// import LoanProductsPage from "./elena/loan-products-page.tsx"
// import LoanCalculatorPage from "./elena/loan-calculator-page.tsx"
// import LoanApplicationPage from "./elena/loan-application-page.tsx"
// import MemberDashboardApprovedPage from "./elena/dashboard-approved-page.tsx"
// import MemberDashboardInitialPage from "./elena/dashboard-initial-page.tsx"
// import MemberDashboardPendingPage from "./elena/dashboard-pending-page.tsx"
// import SubmissionAcknowledgmentPage from "./elena/submission-acknowledgement-page.tsx"

// import ApplicationDetailsPage from "./marco/application-details-page.tsx"
// import StaffDashboardPage from "./marco/dashboard-page.tsx"
// import StaffLoginPage from "./marco/login-page.tsx"
// import PostPaymentPage from "./marco/post-payment-page.tsx"

// import ManagementLoginPage from "./ms-reyes/login-page.tsx"
// import ReportsPage from "./ms-reyes/reports-page.tsx"
// import ApprovalQueuePage from "./ms-reyes/approval-queue-page.tsx"

// import AdminLoginPage from "./david/login/page";
// import UserManagementPage from "./david/users/page";
// import LoanProductConfigPage from "./david/loan-product-config/page"; // You'll need to create this
// // import AdminDashboardPage from "./elena/dashboard-initial-page.tsx"; // You'll need to create this
// import DashboardPage from "./david/dashboard/page";
// import LoanPage from "./david/loans/page";
// import ClientManagement from "./david/clients/page";
// import ReportPage from "./david/reports/page";
// import { usePathname } from 'next/navigation';
// // import LoanReportsPage from "./david/reports/page;"

// export default function Page() {
//   const pathname = usePathname();
//   console.log("pathname:" , pathname);

//   switch(pathname) {
//     case '/david':
//     case '/david/dashboard':
//       return <DashboardPage />
//     case '/david/clients':
//       return <ClientManagement />
//     case '/david/users':
//       return <UserManagementPage />
//     case '/david/loans':
//       return <LoanPage />
//     case '/david/reports':
//       return <ReportPage />
//     case '/david/login':
//       return <AdminLoginPage />
//     case '/david/loan-product-config':
//       return <LoanProductConfigPage />
//     default:
//       return <DashboardPage />
//   }
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, FileText, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lending Management System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solution for managing loans, clients, and financial operations with advanced reporting and
            analytics capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage client profiles, financial information, and loan history</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Loan Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Process loan applications, approvals, and manage loan products</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Generate detailed reports and analyze lending performance</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-2" />
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage system users, roles, and access permissions</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>System Administrator Access</CardTitle>
              <CardDescription>Access the administrative dashboard to manage all system operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/david/dashboard">
                <Button className="w-full" size="lg">
                  <Shield className="mr-2 h-5 w-5" />
                  Enter Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
