"use client";

import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import styles from './Dashboard.module.css';

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

const Dashboard: React.FC = () => {
  const salesData = [
    ['Day', 'Sales', 'Cost'],
    ['Mon', 300, 200],
    ['Tue', 320, 210],
    ['Wed', 310, 200],
    ['Thu', 350, 230],
    ['Fri', 330, 220],
    ['Sat', 360, 240],
    ['Sun', 350, 235],
  ];

  const sessionsData = [
    ['Day', 'Sessions'],
    ['Mon', 15],
    ['Tue', 16],
    ['Wed', 14],
    ['Thu', 18],
    ['Fri', 17],
    ['Sat', 19],
    ['Sun', 16.5],
  ];

  const ordersData = [
    ['Day', 'Orders'],
    ['Mon', 20],
    ['Tue', 22],
    ['Wed', 21],
    ['Thu', 25],
    ['Fri', 23],
    ['Sat', 26],
    ['Sun', 25],
  ];

  const totalProfitData = [
    ['Day', 'Profit'],
    ['Mon', 50],
    ['Tue', 55],
    ['Wed', 52],
    ['Thu', 58],
    ['Fri', 53],
    ['Sat', 60],
    ['Sun', 57],
  ];

  const discountedAmountData = [
    ['Day', 'Discounted Amount'],
    ['Mon', 12],
    ['Tue', 14],
    ['Wed', 13],
    ['Thu', 15],
    ['Fri', 14],
    ['Sat', 16],
    ['Sun', 15],
  ];

  const salesByCountry = [
    ['Country', 'Sales'],
    ['United States', 30],
    ['Brazil', 26],
    ['India', 22],
    ['Australia', 17],
  ];

  const [activeReport, setActiveReport] = useState<ReportType>(ReportType.Customers);

  const reportData: Record<ReportType, any[]> = {
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
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={salesData}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              hAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 }, 
              },
              vAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 },
                textPosition: 'none',
              },
              colors: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <h2>Sessions</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>16.5K</span>
          </div>
          <span className={styles.statChange}>↓ 3% vs last 7 days</span>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={sessionsData}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              hAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 }, 
                textPosition: 'none',
              },
              vAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 },
                textPosition: 'none',
              },
              colors: ['rgb(255, 64, 64)'],
            }}
          />
        </div>
      </div>

      <div className={styles.statsGridThree}>
        <div className={styles.statCard}>
          <h2>Total Orders</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>25.7K</span>
          </div>
          <span className={styles.statChange}>↑ 6% vs last 7 days</span>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={ordersData}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              hAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 }, 
                textPosition: 'none',
              },
              vAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 },
                textPosition: 'none',
              },
              colors: ['rgb(54, 162, 235)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <h2>Total Profit</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>50K</span>
          </div>
          <span className={styles.statChange}>↑ 12% vs last 7 days</span>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={totalProfitData}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              hAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 }, 
                textPosition: 'none',
              },
              vAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 },
                textPosition: 'none',
              },
              colors: ['rgb(75, 192, 192)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <h2>Discounted Amount</h2>
          <div className={styles.statValue}>
            <span className={styles.mainValue}>12K</span>
          </div>
          <span className={styles.statChange}>↑ 2% vs last 7 days</span>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={discountedAmountData}
            options={{
              legend: { position: 'bottom' },
              curveType: 'function',
              hAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 }, 
                textPosition: 'none',
              },
              vAxis: {
                baselineColor: 'transparent', 
                gridlines: { count: 0 },
                textPosition: 'none',
              },
              colors: ['rgb(255, 64, 64)'],
            }}
          />
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

        <div className={styles.bottomRight}>
          <div className={styles.usersSection}>
            <h2>Users in last 30 minutes</h2>
            <div className={styles.usersValue}>16.5K</div>
            <p>Users per minute</p>
            <div className={styles.userChart}>
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="200px"
                data={[
                  ['Minute', 'Users'],
                  ...Array(30).fill(0).map((_, i) => [`${i + 1}`, Math.random() * 20]),
                ]}
                options={{
                  legend: { position: 'none' },
                  bar: { groupWidth: '95%' },
                  hAxis: {
                    baselineColor: 'transparent', 
                    gridlines: { count: 0 }, 
                    textPosition: 'none',
                  },
                  vAxis: {
                    baselineColor: 'transparent', 
                    gridlines: { count: 0 },
                    textPosition: 'none',
                  },
                  colors: ['#0F60FF'],
                }}
              />
            </div>
          </div>

          <div className={styles.salesByCountry}>
            <h2>Sales by Country</h2>
            <Chart
              chartType="BarChart"
              width="100%"
              height="300px"
              data={salesByCountry}
              options={{
                legend: { position: 'none' },
                hAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 }, 
                  textPosition: 'none',
                },
                vAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 },
                },
                colors: ['rgb(70, 178, 178)', 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(54, 162, 235)'],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
