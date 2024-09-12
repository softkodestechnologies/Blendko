"use client";

import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import styles from './Dashboard.module.css';
import BottomRightSection from './BottomRightSection';

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
          <div>
            <h2>Total Sales & Costs</h2>
            <p>Last 7 days</p>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>$350K</span>
              <span className={styles.subValue}>$235K</span>
            </div>
            <p><span className={styles.statChange}>↑ 8.56K </span>vs last 7 days</p>
          </div>
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
              colors: ['rgb(15, 96, 255)', 'rgb(15, 183, 255)'],
            }}
          />
        </div>

        <div className={styles.statCard}>
          <div>
            <h2>Sessions</h2>
            <p>Last 7 days</p>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>16.5K</span>
            </div>
            <p><span className={styles.statChange}>↓ 3% </span>vs last 7 days</p>
          </div>
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
              <span className={styles.mainValue}>25.7K</span>
            </div>
            <p><span className={styles.statChange}>↑ 6% </span> vs last 7 days</p>
          </div>
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
          <div>
            <h2>Total Profit</h2>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>50K</span>
            </div>
            <p><span className={styles.statChange}>↑ 12% </span> vs last 7 days</p>
          </div>
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
          <div>
            <h2>Discounted Amount</h2>
            <div className={styles.statValue}>
              <span className={styles.mainValue}>12K</span>
            </div>
            <p><span className={styles.statChange}>↑ 2% </span> vs last 7 days</p>
          </div>
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

        <BottomRightSection />
      </div>
    </div>
  );
};

export default Dashboard;
