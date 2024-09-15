"use client";
import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import styles from './Analytics.module.css';
import Image from 'next/image';
import Dashboard from '../dashboard/Dashboard';

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

const AnalyticsReports: React.FC = () => {

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

  const topSellingCategoryData = [
    ['Category', 'X', 'Y', 'Radius'], 
    ['Fashion', 30, 107, 100], 
    ['Electronics', 69, 64, 70], 
    ['Make-up', 34, 49, 50], 
  ];

  const todayOrdersData = [
    ['Time', 'Orders'],
    ['12am', 5000],
    ['8am', 15000],
    ['4pm', 7000],
    ['11pm', 16500],
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
    <div className={styles.analyticsReports}>
      <Dashboard />
      <div className={styles.newSection}>
        <div className={styles.topSellingCategory}>
          <h2>Top Selling Category</h2>
          <p>Total 10.4k Visitors</p>
          <div className={styles.bubbleChartContainer}>
            <Chart
              chartType="BubbleChart"
              width="100%"
              height="300px"
              data={topSellingCategoryData}
              options={{
                bubble: { textStyle: { fontSize: 11 } },
                hAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 }, 
                  textPosition: 'none',
                  title: '' ,
                },
                vAxis: {
                  baselineColor: 'transparent', 
                  gridlines: { count: 0 },
                  textPosition: 'none',
                  title: '' ,
                },
                colors: ['rgb(15, 96, 255)', 'rgb(0, 210, 255)', 'rgb(40, 167, 69)'],
              }}
            />
          </div>
        </div>

        <div className={styles.lastTransactions}>
          <h2>Last Transactions</h2>
          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>ISSUED DATE</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>#5089</td>
                  <td>31 March 2023</td>
                  <td>$1200</td>
                  <td><a href="#">View Detail</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className={styles.viewAll}>View All</a>
        </div>
      </div>

      <div className={styles.newSection}>
        <div className={styles.bestSellingProducts}>
          <h2>Best Selling Products</h2>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>TOTAL ORDER</th>
                <th>STATUS</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apple iPhone 13</td>
                <td>506</td>
                <td><span className={styles.inStock}>Stock</span></td>
                <td>$999.29</td>
              </tr>
              <tr>
                <td>Nike Air Jordan</td>
                <td>506</td>
                <td><span className={styles.inStock}>Stock</span></td>
                <td>$72.40</td>
              </tr>
              <tr>
                <td>Beats Studio 2</td>
                <td>506</td>
                <td><span className={styles.inStock}>Stock</span></td>
                <td>$99.90</td>
              </tr>
              <tr>
                <td>Apple Watch Series 7</td>
                <td>506</td>
                <td><span className={styles.outOfStock}>Out</span></td>
                <td>$249.99</td>
              </tr>
              <tr>
                <td>Amazon Echo Dot</td>
                <td>506</td>
                <td><span className={styles.inStock}>Stock</span></td>
                <td>$79.40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.trendingProducts}>
          <h2>Trending Products</h2>
          <p>Total 10.4k Visitors</p>
          <ul className={styles.trendingList}>
            {[...Array(4)].map((_, index) => (
              <li key={index}>
                <Image src="/people.png" alt="Black Dress - Lupin" width={50} height={50} />
                <div>
                  <h3>Black Dress - Lupin</h3>
                  <p>Item: #FXZ-4567</p>
                </div>
                <span>$999.29</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.newSection}>
        <div className={styles.todayOrder}>
          <h2>Today Order</h2>
          <div className={styles.orderSummary}>
            <h3>16.5K</h3>
            <span className={styles.orderChange}>↑ 6% vs last day</span>
          </div>
          <p>Orders Over Time</p>
          <div className={styles.orderChart}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="200px"
              data={todayOrdersData}
              options={{
                legend: { position: 'none' },
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
                colors: ['#0F60FF'],
              }}
            />
          </div>
        </div>

        <div className={styles.recentOrders}>
          <h2>Recent Orders</h2>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>CUSTOMER</th>
                <th>STATUS</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>#6548</td>
                  <td>Joseph Wheeler</td>
                  <td><span className={index % 2 === 0 ? styles.pending : styles.completed}>{index % 2 === 0 ? 'Pending' : 'Completed'}</span></td>
                  <td>$999.29</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
