"use client";
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import styles from './Dashboard.module.css';
import BottomRightSection from './BottomRightSection';
import { useGetDashboardDataQuery } from '@/services/userService';

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

interface ChartData {
  sales: (string | number)[][];
  sessions: (string | number)[][];
  orders: (string | number)[][];
  profit: (string | number)[][];
  discountedAmount: (string | number)[][];
}

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery({});
  const [chartData, setChartData] = useState<ChartData>({
    sales: [],
    sessions: [],
    orders: [],
    profit: [],
    discountedAmount: []
  });

  useEffect(() => {
    if (dashboardData) {
      const formattedData: ChartData = {
        sales: [['Day', 'Sales', 'Cost']],
        sessions: [['Day', 'Sessions']],
        orders: [['Day', 'Orders']],
        profit: [['Day', 'Profit']],
        discountedAmount: [['Day', 'Discounted Amount']]
      };
  
      dashboardData.dailyData.forEach((day: { _id: string; sales: number; cost: number; orders: number; profit: number; discountedAmount: number }) => {
        const date = new Date(day._id).toLocaleDateString('en-US', { weekday: 'short' });
        formattedData.sales.push([date, day.sales, day.cost]);
        formattedData.orders.push([date, day.orders]);
        formattedData.profit.push([date, day.profit]);
        formattedData.discountedAmount.push([date, day.discountedAmount]);
      });
  
      dashboardData.sessionsData.forEach((day: { _id: string; sessions: number }) => {
        formattedData.sessions.push([new Date(day._id).toLocaleDateString('en-US'), day.sessions]); // Ensure day.sessions is a number
      });
  
      setChartData(formattedData);
    }
  }, [dashboardData]);

  const [activeReport, setActiveReport] = useState<ReportType>(ReportType.Customers);

  const reportData: Record<ReportType, any[]> = {
    customers: chartData.sales,
    totalProducts: chartData.sessions,
    stockProducts: chartData.orders,
    outOfStock: chartData.profit,
    revenue: chartData.discountedAmount,
  };

  const reportTabs = [
    { key: ReportType.Customers, label: 'Customers', title: '2.4k' },
    { key: ReportType.TotalProducts, label: 'Total Products' },
    { key: ReportType.StockProducts, label: 'Stock Products' },
    { key: ReportType.OutOfStock, label: 'Out of Stock' },
    { key: ReportType.Revenue, label: 'Revenue' },
  ];
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard data</div>;

  const totalSales = dashboardData.dailyData.reduce((sum: number, day: { sales: number }) => sum + day.sales, 0);
  const totalCosts = dashboardData.dailyData.reduce((sum: number, day: { cost: number }) => sum + day.cost, 0);
  const totalOrders = dashboardData.dailyData.reduce((sum: number, day: { orders: number }) => sum + day.orders, 0);
  const totalProfit = dashboardData.dailyData.reduce((sum: number, day: { profit: number }) => sum + day.profit, 0);
  const totalDiscountedAmount = dashboardData.dailyData.reduce((sum: number, day: { discountedAmount: number }) => sum + day.discountedAmount, 0);

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>
            <h2>Total Sales & Costs</h2>
            <p>Last 7 days</p>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>${totalSales.toFixed(2)}K</span>
              <span className={styles.subValue}>${totalCosts.toFixed(2)}K</span>
            </div>
          </div>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData.sales}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              colors: ['rgb(15, 96, 255)', 'rgb(15, 183, 255)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <div>
            <h2>Sessions</h2>
            <p>Last 7 days</p>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>
                {chartData.sessions.slice(1).reduce((sum, day) => sum + (day[1] as number), 0)}
              </span>
            </div>
          </div>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData.sessions}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              colors: ['rgb(208, 38, 38)'],
            }}
          />
        </div>
      </div>

      <div className={styles.statsGridThree}>
        <div className={styles.statCard}>
          <div>
            <h2>Total Orders</h2>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>{totalOrders}</span>
            </div>
          </div>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData.orders}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              colors: ['rgb(54, 162, 235)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <div>
            <h2>Total Profit</h2>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>${totalProfit.toFixed(2)}K</span>
            </div>
          </div>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData.profit}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              colors: ['rgb(75, 192, 192)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <div>
            <h2>Discounted Amount</h2>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>${totalDiscountedAmount.toFixed(2)}K</span>
            </div>
          </div>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData.discountedAmount}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              colors: ['rgb(208, 38, 38)'],
            }}
          />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.reportsSection}>
          <p className={styles.reportsTitle}>Reports</p>
          <p className={styles.reportsTag}>Last 7 days</p>
          <div className={styles.reportsGrid}>
            {reportTabs.map(tab => (
              <div
                key={tab.key}
                className={`${styles.reportItem} ${activeReport === tab.key ? styles.active : ''}`}
                onClick={() => setActiveReport(tab.key)}
              >
                <span>{tab.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartContainer}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="300px"
              data={reportData[activeReport]}
              options={{
                legend: { position: 'bottom' },
                hAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 }, 
                },
                vAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 },
                },
                curveType: 'function',
              }}
            />
          </div>
        </div>
        
        <BottomRightSection salesByCountry={dashboardData.salesByCountry} recentUsers={dashboardData.recentUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
