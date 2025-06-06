"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Shield, UserCog, Users2, ListChecks, Cog, LogOut } from "lucide-react";

Chart.register(...registerables, ChartDataLabels);

interface Loan {
  loan_status: string;
  loan_type: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [cards, setCards] = useState([
    ["Approved", 0],
    ["Declined", 0],
    ["Pending", 0],
  ]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

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

  // Generate realistic sample loan data
  const generateSampleLoans = (count = 200): Loan[] => {
    const statuses = ["Approved", "Disapproved", "Pending"];
    const types = ["Personal", "Business", "Auto", "Mortgage", "Education"];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Weighted probabilities for more realistic data
    const statusWeights = [0.6, 0.25, 0.15]; // 60% approved, 25% declined, 15% pending
    const typeWeights = [0.4, 0.3, 0.15, 0.1, 0.05]; // Personal loans most common
    
    return Array.from({ length: count }, (_, i) => {
      // Weighted random selection
      const randomStatus = getWeightedRandom(statuses, statusWeights);
      const randomType = getWeightedRandom(types, typeWeights);
      
      // Random date in the past 6 months
      const monthOffset = Math.floor(Math.random() * 6);
      const day = Math.floor(Math.random() * 28) + 1;
      const date = new Date();
      date.setMonth(date.getMonth() - monthOffset);
      date.setDate(day);
      
      return {
        loan_status: randomStatus,
        loan_type: randomType,
        createdAt: date.toISOString()
      };
    });
  };

  // Helper function for weighted random selection
  const getWeightedRandom = (items: string[], weights: number[]) => {
    let random = Math.random() * weights.reduce((a, b) => a + b, 0);
    return items.find((_, i) => (random -= weights[i]) < 0) || items[0];
  };

  const getLoans = async () => {
    try {
      // Simulate API call with generated data
      const data = generateSampleLoans();
      
      setLoans(data);
      
      // Update status cards
      const approvedCount = data.filter(item => item.loan_status === "Approved").length;
      const declinedCount = data.filter(item => item.loan_status === "Disapproved").length;
      const pendingCount = data.filter(item => item.loan_status === "Pending").length;
      
      setCards([
        ["Approved", approvedCount],
        ["Declined", declinedCount],
        ["Pending", pendingCount]
      ]);
      
      // Update charts
      countByType(data);
      countByMonth(data);
    } catch (e) {
      console.error("Error loading loan data:", e);
    }
  };

  const countByMonth = (loanData: Loan[]) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Get current month and go back 5 months
    const currentDate = new Date();
    const monthsToShow = 6;
    const monthCounts: Record<string, number> = {};
    
    // Initialize recent months with 0
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      monthCounts[monthNames[date.getMonth()]] = 0;
    }
    
    // Count loans per month
    loanData.forEach(loan => {
      const month = monthNames[new Date(loan.createdAt).getMonth()];
      if (monthCounts.hasOwnProperty(month)) {
        monthCounts[month]++;
      }
    });
    
    // Convert to arrays for chart
    const labels = Object.keys(monthCounts);
    const data = Object.values(monthCounts);
    
    setSalesData({
      labels,
      datasets: [{
        ...salesData.datasets[0],
        data
      }]
    });
  };

  const countByType = (loanData: Loan[]) => {
    const types = ["Personal", "Business", "Auto", "Mortgage", "Education"];
    const colors = [
      chartColors.red,
      chartColors.green,
      chartColors.blue,
      chartColors.orange,
      chartColors.purple
    ];
    
    const typeCounts: Record<string, number> = {};
    
    // Initialize all types with 0
    types.forEach(type => {
      typeCounts[type] = 0;
    });
    
    // Count approved loans by type
    loanData
      .filter(loan => loan.loan_status === "Approved")
      .forEach(loan => {
        typeCounts[loan.loan_type]++;
      });
    
    // Convert to arrays for chart
    const labels = types;
    const data = types.map(type => typeCounts[type]);
    
    setLoansData({
      labels,
      datasets: [{
        ...loansData.datasets[0],
        data,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.7', '1'))
      }]
    });
  };

  useEffect(() => {
    getLoans();
  }, []);

  useEffect(() => {
    if (loans.length > 0) {
      initCharts();
    }
  }, [loans, salesData, loansData, factorsData]);

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
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-white border-r sm:flex">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm font-medium">
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-red-600 data-[active=true]:text-white"
            data-active="true"
          >
            <UserCog className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users2 className="mr-3 h-5 w-5" /> User Management
          </Button>
          <Button variant="ghost" className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <ListChecks className="mr-3 h-5 w-5" /> Loan Products
          </Button>
          <Button variant="ghost" className="justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <Cog className="mr-3 h-5 w-5" /> System Configuration
          </Button>
        </nav>
        <div className="mt-auto p-3 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm">
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
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Monthly Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas id="monthlySales"></canvas>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm h-96">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Approval Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas id="factors"></canvas>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm h-96">
                <CardHeader>
                  <CardTitle className="text-gray-800">Calendar</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-gray-200 bg-white"
                  />
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