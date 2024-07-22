"use client";

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

const Dashboard: React.FC = () => {
  // Sample data for charts
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 320, 310, 350, 330, 360, 350],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
      {
        label: 'Cost',
        data: [200, 210, 200, 230, 220, 240, 235],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.5,
      },
    ],
  };

  const sessionsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sessions',
        data: [15, 16, 14, 18, 17, 19, 16.5],
        borderColor: 'rgb(255, 64, 64)',
        tension: 0.5,
      },
    ],
  };

  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [20, 22, 21, 25, 23, 26, 25],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.5,
      },
    ],
  };

  const totalProfitData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Profit',
        data: [50, 55, 52, 58, 53, 60, 57],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  const discountedAmountData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Discounted Amount',
        data: [12, 14, 13, 15, 14, 16, 15],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.5,
      },
    ],
  };

  const salesByCountry = {
    labels: ['United States', 'Brazil', 'India', 'Australia'],
    datasets: [
      {
        label: 'Sales by Country',
        data: [30, 26, 22, 17],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const [activeReport, setActiveReport] = useState<ReportType>(ReportType.Customers);

  const reportData: Record<ReportType, any> = {
    customers: salesData,
    totalProducts: sessionsData,
    stockProducts: ordersData,
    outOfStock: totalProfitData,
    revenue: discountedAmountData,
  };

  const reportTabs = [
    { key: ReportType.Customers, label: 'Customers', title: '2.4k' },
    { key: ReportType.TotalProducts, label: 'Total Products' },
    { key: ReportType.StockProducts, label: 'Stock Products' },
    { key: ReportType.OutOfStock, label: 'Out of Stock' },
    { key: ReportType.Revenue, label: 'Revenue' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h2>Total Sales & Costs</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>$350K</span>
            <span className={styles.subValue}>$235K</span>
          </div>
          <span className={styles.statChange}>↑ 8.56K vs last 7 days</span>
          <Line data={salesData} />
        </div>

        <div className={styles.statCard}>
          <h2>Sessions</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>16.5K</span>
          </div>
          <span className={styles.statChange}>↓ 3% vs last 7 days</span>
          <Line data={sessionsData} />
        </div>
      </div>

      <div className={styles.statsGridThree}>
        <div className={styles.statCard}>
          <h2>Total Orders</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>25.7K</span>
          </div>
          <span className={styles.statChange}>↑ 6% vs last 7 days</span>
          <Line data={ordersData} />
        </div>

        <div className={styles.statCard}>
          <h2>Total Profit</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>50K</span>
          </div>
          <span className={styles.statChange}>↑ 12% vs last 7 days</span>
          <Line data={totalProfitData} />
        </div>

        <div className={styles.statCard}>
          <h2>Discounted Amount</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>12K</span>
          </div>
          <span className={styles.statChange}>↑ 2% vs last 7 days</span>
          <Line data={discountedAmountData} />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.reportsSection}>
          <h2>Reports</h2>
          <p>Last 7 days</p>
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
            <Line data={reportData[activeReport]} />
          </div>
        </div>

        <div className={styles.bottomRight}>
          <div className={styles.usersSection}>
            <h2>Users in last 30 minutes</h2>
            <div className={styles.usersValue}>16.5K</div>
            <p>Users per minute</p>
            <div className={styles.userChart}>
              <Bar
                data={{
                  labels: Array(30).fill(''),
                  datasets: [{
                    data: Array(30).fill(10).map(() => Math.random() * 20),
                    backgroundColor: '#0F60FF'
                  }]
                }}
                options={{ scales: { y: { beginAtZero: true } } }}
                width={500}
              />
            </div>
          </div>

          <div className={styles.salesByCountry}>
            <h2>Sales by Country</h2>
            <Bar data={salesByCountry} />
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
