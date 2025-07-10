"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Button } from "@/components/ui/button";
import { Shield, UserCog, Users2, ListChecks, Cog, LogOut, User, FileText, Book } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, UploadCloud } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

Chart.register(...registerables, ChartDataLabels);

interface Loan {
  loan_status: string;
  loan_type: string;
  createdAt: string;
}

const DashboardPage = () => {
  const pathname = usePathname()
  const [cards, setCards] = useState([
    ["Approved", 0],
    ["Declined", 0],
    ["Pending", 0],
  ]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Vibrant color palette
  const chartColors = {
    red: 'rgba(255, 99, 132, 0.7)',
    orange: 'rgba(255, 159, 64, 0.7)',
    yellow: 'rgba(255, 205, 86, 0.7)',
    green: 'rgba(75, 192, 192, 0.7)',
    blue: 'rgba(54, 162, 235, 0.7)',
    purple: 'rgba(153, 102, 255, 0.7)',
    pink: 'rgba(255, 105, 180, 0.7)',
    teal: 'rgba(0, 128, 128, 0.7)',
    lime: 'rgba(50, 205, 50, 0.7)',
    navy: 'rgba(0, 0, 128, 0.7)'
  };

  const borderColors = {
    red: 'rgba(255, 99, 132, 1)',
    orange: 'rgba(255, 159, 64, 1)',
    yellow: 'rgba(255, 205, 86, 1)',
    green: 'rgba(75, 192, 192, 1)',
    blue: 'rgba(54, 162, 235, 1)',
    purple: 'rgba(153, 102, 255, 1)',
    pink: 'rgba(255, 105, 180, 1)',
    teal: 'rgba(0, 128, 128, 1)',
    lime: 'rgba(50, 205, 50, 1)',
    navy: 'rgba(0, 0, 128, 1)'
  };

  // Chart data states with vibrant colors
  const [salesData, setSalesData] = useState({
    labels: [] as string[],
    datasets: [{
      label: '# of loan applications',
      data: [] as number[],
      borderWidth: 3,
      borderColor: borderColors.blue,
      backgroundColor: chartColors.blue,
      tension: 0.3,
      pointBackgroundColor: borderColors.blue,
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      pointHoverBorderWidth: 2
    }]
  });

  const [loansData, setLoansData] = useState({
    labels: [] as string[],
    datasets: [{
      label: '# of accepted loans',
      data: [] as number[],
      borderWidth: 2,
      backgroundColor: [
        chartColors.red,
        chartColors.green,
        chartColors.blue,
        chartColors.orange,
        chartColors.purple
      ],
      borderColor: [
        borderColors.red,
        borderColors.green,
        borderColors.blue,
        borderColors.orange,
        borderColors.purple
      ],
      borderRadius: 6,
      borderSkipped: false
    }]
  });

  const [factorsData, setFactorsData] = useState({
    labels: ['Credit Score', 'Income', 'Employment', 'Debt Ratio', 'Loan Amount', 'Collateral'],
    datasets: [{
      label: 'Approval Impact Factors',
      data: [35, 25, 20, 10, 7, 3],
      backgroundColor: [
        chartColors.red,
        chartColors.orange,
        chartColors.yellow,
        chartColors.green,
        chartColors.blue,
        chartColors.purple
      ],
      borderColor: [
        borderColors.red,
        borderColors.orange,
        borderColors.yellow,
        borderColors.green,
        borderColors.blue,
        borderColors.purple
      ],
      borderWidth: 2,
      hoverOffset: 20
    }]
  });

  // HybridWebView integration for receiving dashboard data from .NET
  useEffect(() => {
    (window as any).globalSetDashboard = (dataFromDotNet: any) => {
      console.log("✅ Received dashboard data from .NET:", dataFromDotNet);
      
      let dashboardData;
      if (typeof dataFromDotNet === 'string') {
        try {
          dashboardData = JSON.parse(dataFromDotNet);
        } catch (e) {
          console.error("Error parsing JSON string from .NET:", e);
          return;
        }
      } else if (typeof dataFromDotNet === 'object') {
        dashboardData = dataFromDotNet;
      } else {
        console.error("Received data of unexpected type from .NET:", typeof dataFromDotNet);
        return;
      }

      // Update status cards
      setCards([
        ["Approved", dashboardData.ApprovedLoansCount],
        ["Declined", dashboardData.DeclinedLoansCount],
        ["Pending", dashboardData.PendingLoansCount]
      ]);

      // Update branches filter
      setBranches(dashboardData.AvailableBranches || []);
      setSelectedBranch(dashboardData.SelectedBranch || "all");

      // Update date range
      setDateRange({
        from: new Date(dashboardData.DateRangeStart),
        to: new Date(dashboardData.DateRangeEnd)
      });

      // Prepare chart data
      const monthlyLabels = dashboardData.MonthlyApplications?.map((item: any) => item.key) || [];
      const monthlyData = dashboardData.MonthlyApplications?.map((item: any) => item.value) || [];

      const loanTypeLabels = dashboardData.LoanTypesDistribution?.map((item: any) => item.key) || [];
      const loanTypeData = dashboardData.LoanTypesDistribution?.map((item: any) => item.value) || [];

      const factorsLabels = dashboardData.ApprovalFactorsDistribution?.map((item: any) => item.key) || [];
      const factorsData = dashboardData.ApprovalFactorsDistribution?.map((item: any) => item.value) || [];

      // Update chart data states
      setSalesData({
        labels: monthlyLabels,
        datasets: [{
          ...salesData.datasets[0],
          data: monthlyData
        }]
      });

      setLoansData({
        labels: loanTypeLabels,
        datasets: [{
          ...loansData.datasets[0],
          data: loanTypeData,
          backgroundColor: [
            chartColors.red,
            chartColors.green,
            chartColors.blue,
            chartColors.orange,
            chartColors.purple
          ],
          borderColor: [
            borderColors.red,
            borderColors.green,
            borderColors.blue,
            borderColors.orange,
            borderColors.purple
          ]
        }]
      });

      setFactorsData({
        labels: factorsLabels.length > 0 ? factorsLabels : ['Credit Score', 'Income', 'Employment', 'Debt Ratio', 'Loan Amount', 'Collateral'],
        datasets: [{
          ...factorsData.datasets[0],
          data: factorsData.length > 0 ? factorsData : [35, 25, 20, 10, 7, 3],
          backgroundColor: [
            chartColors.red,
            chartColors.orange,
            chartColors.yellow,
            chartColors.green,
            chartColors.blue,
            chartColors.purple
          ],
          borderColor: [
            borderColors.red,
            borderColors.orange,
            borderColors.yellow,
            borderColors.green,
            borderColors.blue,
            borderColors.purple
          ]
        }]
      });

      // Initialize charts with new data
      initCharts();
    };

    // Request dashboard data from .NET
    if (typeof HybridWebView !== 'undefined') {
      HybridWebView.SendInvokeMessageToDotNet("getDashboardData");
    } else {
      // Fallback to sample data if not in HybridWebView context
      const sampleData = {
        ApprovedLoansCount: 125,
        DeclinedLoansCount: 42,
        PendingLoansCount: 33,
        MonthlyApplications: [
          { key: "January", value: 45 },
          { key: "February", value: 52 },
          { key: "March", value: 68 },
          { key: "April", value: 72 },
          { key: "May", value: 65 },
          { key: "June", value: 58 }
        ],
        LoanTypesDistribution: [
          { key: "Personal", value: 85 },
          { key: "Business", value: 45 },
          { key: "Auto", value: 30 },
          { key: "Mortgage", value: 20 },
          { key: "Education", value: 10 }
        ],
        ApprovalFactorsDistribution: [
          { key: "Credit Score", value: 35 },
          { key: "Income", value: 25 },
          { key: "Employment", value: 20 },
          { key: "Debt Ratio", value: 10 },
          { key: "Loan Amount", value: 7 },
          { key: "Collateral", value: 3 }
        ],
        AvailableBranches: ["Main Branch", "Downtown", "Westside", "Eastside", "North Branch"],
        SelectedBranch: "All Branches",
        DateRangeStart: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
        DateRangeEnd: new Date().toISOString(),
        RecentActivities: [
          "New loan application from John Doe",
          "Loan #L-10025 approved",
          "Loan #L-10018 disbursed",
          "Payment received for loan #L-10012"
        ]
      };
      (window as any).globalSetDashboard(sampleData);
    }

  }, []);

  const initCharts = () => {
    // Destroy existing charts to prevent memory leaks
    Chart.getChart("loansApproved")?.destroy();
    Chart.getChart("monthlySales")?.destroy();
    Chart.getChart("factors")?.destroy();

    const loansApproved = document.getElementById('loansApproved') as HTMLCanvasElement;
    const monthlySales = document.getElementById('monthlySales') as HTMLCanvasElement;
    const factors = document.getElementById('factors') as HTMLCanvasElement;

    if (loansApproved) {
      new Chart(loansApproved, {
        type: 'bar',
        data: loansData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'hsl(var(--foreground))',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'hsl(var(--muted-foreground))',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            },
            x: {
              ticks: {
                color: 'hsl(var(--foreground))',
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    if (monthlySales) {
      new Chart(monthlySales, {
        type: 'line',
        data: salesData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'hsl(var(--foreground))',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'hsl(var(--muted-foreground))',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            },
            x: {
              ticks: {
                color: 'hsl(var(--foreground))',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            }
          }
        }
      });
    }

    if (factors) {
      new Chart(factors, {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: factorsData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutout: '65%',
          plugins: {
            datalabels: {
              color: '#fff',
              font: {
                weight: 'bold',
                size: 12
              },
              formatter: (value) => {
                return value > 0 ? `${value}%` : '';
              }
            },
            legend: {
              position: 'right',
              labels: {
                color: 'hsl(var(--foreground))',
                font: {
                  size: 12,
                  weight: 'bold'
                },
                padding: 20,
                boxWidth: 15
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          }
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-gray-900">DL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">David Lee</p>
                <p className="text-xs text-gray-500">IT Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-64">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-64">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card, index) => (
              <Card key={index} className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{card[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{card[1]}</div>
                  <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Monthly Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas id="monthlySales"></canvas>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-white border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Loan Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas id="loansApproved"></canvas>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Card className="bg-white border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Approval Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas id="factors"></canvas>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-white border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-full">
                  <div className="text-gray-500 text-center">
                    <p>Recent loan applications and approvals</p>
                    <p className="mt-2 text-sm">Data will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;