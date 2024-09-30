import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import styles from './Analytics.module.css';
import Image from 'next/image';
import Dashboard from '../dashboard/Dashboard';
import { useGetDashboardDataQuery, useGetReportsQuery } from '@/services/userService';

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

const AnalyticsReports: React.FC = () => {
  const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardDataQuery({});
  const { data: reportsData, isLoading: isReportsLoading } = useGetReportsQuery({});

  if (isDashboardLoading || isReportsLoading) {
    return <div>Loading...</div>;
  }

  const topSellingCategoryData = [
    ['Category', 'X', 'Y', 'Radius'],
    ...dashboardData.topSellingCategories.map((category: any, index: any) => [
      category.name,
      30 + index * 20,
      50 + index * 30,
      category.sales / 100
    ])
  ];

  const todayOrdersData = [
    ['Time', 'Orders'],
    ...dashboardData.todayOrders.map((order: { _id: string; count: number }) => [
      order._id,
      order.count
    ])
  ];


  return (
    <div className={styles.analyticsReports}>
      <Dashboard />
      <div className={styles.newSection}>
        <div className={styles.topSellingCategory}>
          <h2>Top Selling Category</h2>          <p>Total {dashboardData.totalVisitors} Visitors</p>
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
              {dashboardData.lastTransactions.map((transaction: { orderNumber: string; createdAt: string; totalPrice: number; _id: string }, index: number) => (
                <tr key={index}>
                  <td>#{transaction.orderNumber}</td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td>${transaction.totalPrice.toFixed(2)}</td>
                  <td><a href={`/order/${transaction._id}`}>View Detail</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="/orders" className={styles.viewAll}>View All</a>
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
              {dashboardData.bestSellingProducts.map((product: { name: string; totalOrders: number; quantity: number; price: number }, index: number) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.totalOrders}</td>
                  <td>
                    <span className={product.quantity > 0 ? styles.inStock : styles.outOfStock}>
                      {product.quantity > 0 ? 'Stock' : 'Out'}
                    </span>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.trendingProducts}>
          <h2>Trending Products</h2>
          <p>Total {dashboardData.totalVisitors} Visitors</p>
          <ul className={styles.trendingList}>
            {dashboardData.trendingProducts.map((product: any, index: number) => (
              <li key={index}>
                <Image src={product.images[0].url} alt={product.name} width={50} height={50} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Item: #{product.sku}</p>
                </div>
                <span>${product.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.newSection}>
        <div className={styles.todayOrder}>
          <h2>Today Order</h2>
          <div className={styles.orderSummary}>
            <h3>{dashboardData.todayTotalOrders}</h3>
            <span className={styles.orderChange}>
              {dashboardData.orderChangePercentage > 0 ? '↑' : '↓'} {Math.abs(dashboardData.orderChangePercentage)}% vs last day
            </span>
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
              {dashboardData.recentOrders.map((order: any, index: number) => (
                <tr key={index}>
                  <td>#{order.orderNumber}</td>
                  <td>{order.user.name}</td>
                  <td>
                    <span className={
                      order.orderStatus === 'Completed' ? styles.completed :
                      order.orderStatus === 'Pending' ? styles.pending :
                      styles.inProgress
                    }>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );};

export default AnalyticsReports;