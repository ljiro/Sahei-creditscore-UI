"use client"

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Calendar } from "@/components/ui/calendar";

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

  const salesData = {
    labels: ['February', 'January', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: '# of loan applications',
      data: [120, 190, 130, 150, 120, 150],
      borderWidth: 2,
      borderColor: 'hsl(var(--chart-1))',
      backgroundColor: 'hsl(var(--chart-1))',
    }]
  };

  const loansData = {
    labels: ['Personal', 'end-to-end', 'Business'],
    datasets: [{
      label: '# of accepted loans',
      data: [0, 0, 0],
      borderWidth: 2,
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
      ],
    }]
  };

  const factorsData = {
    labels: ['Age', 'Dependents', 'Marital Status', 'Education', 'Gender', 'Income', 'Occupation', 'Assets'],
    datasets: [{
      label: '# of accepted loans',
      data: [11, 10, 9, 7, 10, 21, 20, 12],
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))',
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
      ],
    }]
  };

  const getLoans = async () => {
    try {
      // Replace with your actual API call
      // const res = await LoanDataService.getAll();
      // const data = res.data;
      const data: Loan[] = []; // Mock data - replace with actual API call
      
      setLoans(data);
      const approvedCount = data.filter(item => item.loan_status === "Approved").length;
      const declinedCount = data.filter(item => item.loan_status === "Disapproved").length;
      const pendingCount = data.filter(item => item.loan_status === "Pending").length;
      
      setCards([
        ["Approved", approvedCount],
        ["Declined", declinedCount],
        ["Pending", pendingCount]
      ]);
      
      countByType(data);
      countByMonth(data);
    } catch (e) {
      console.log(e);
    }
  };

  const countByMonth = (loanData: Loan[]) => {
    const currentMonth = new Date().getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data: Record<string, number> = {};
    
    for (let i = currentMonth - 5; i <= currentMonth; i++) {
      data[monthNames[i]] = 0;
    }
    
    loanData.forEach(loan => {
      const month = new Date(loan.createdAt).getMonth();
      data[monthNames[month]] += 1;
    });

    const entries = Object.entries(data);
    entries.sort((a, b) => monthNames.indexOf(a[0]) - monthNames.indexOf(b[0]));
    const keys = entries.map(entry => entry[0]);
    const values = entries.map(entry => entry[1]);

    salesData.labels = keys;
    salesData.datasets[0].data = values;
  };

  const countByType = (loanData: Loan[]) => {
    const data = [0, 0, 0];
    loanData.forEach(loan => {
      if (loan.loan_type == "Personal") {
        data[0] += 1;
      } else if (loan.loan_type == "Business") {
        data[1] += 1;
      } else if (loan.loan_type == "end-to-end") {
        data[2] += 1;
      }
    });
    loansData.datasets[0].data = data;
  };

  useEffect(() => {
    getLoans();
  }, []);

  useEffect(() => {
    if (loans.length > 0) {
      initCharts();
    }
  }, [loans]);

  const initCharts = () => {
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
            },
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
            },
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
          plugins: {
            datalabels: {
              color: 'hsl(var(--card-foreground))',
              font: {
                weight: 'bold'
              },
              formatter: (value) => {
                return value > 0 ? value : '';
              }
            },
            legend: {
              position: 'right'
            },
          }
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Cards Row */}
      <div className="flex flex-wrap -mx-2 mb-6">
        {cards.map((card, index) => (
          <Cards key={index} cardHeading={card[0]} cardContent={card[1]} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="flex flex-wrap -mx-2 mb-6">
        <div className="w-full lg:w-2/3 px-2 mb-4 lg:mb-0">
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 h-96">
            <canvas id="monthlySales"></canvas>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-2">
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 h-96">
            <canvas id="loansApproved"></canvas>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-wrap -mx-2">
        <div className="w-full lg:w-5/12 px-2 mb-4 lg:mb-0">
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 h-96">
            <canvas id="factors"></canvas>
          </div>
        </div>
        <div className="w-full lg:w-7/12 px-2">
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 h-96 flex justify-center items-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;