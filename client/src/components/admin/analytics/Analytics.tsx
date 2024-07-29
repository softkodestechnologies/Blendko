"use client";
import React, { useState } from 'react';
import { Line, Bar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import styles from './Analytics.module.css';
import Image from 'next/image';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

enum ReportType {
  Customers = 'customers',
  TotalProducts = 'totalProducts',
  StockProducts = 'stockProducts',
  OutOfStock = 'outOfStock',
  Revenue = 'revenue'
}

const AnalyticsReports: React.FC = () => {
  // Sample data for charts
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 320, 310, 350, 330, 360, 350],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
      {
        label: 'Cost',
        data: [200, 210, 200, 230, 220, 240, 235],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
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
        tension: 0.4,
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
        tension: 0.4,
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
        tension: 0.4,
      },
    ],
  };

  const discountedAmountData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Discounted Amount',
        data: [12, 14, 13, 15, 14, 16, 15],
        borderColor: 'rgb(256, 56, 56)',
        tension: 0.4,
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

  const topSellingCategoryData = {
    datasets: [
      {
        label: 'Fashion',
        data: [{ x: 0.5, y: 0.5, r: 100 }],
        backgroundColor: 'rgba(15, 96, 255, 0.7)',
      },
      {
        label: 'Electronics',
        data: [{ x: 0, y: 0.5, r: 60 }],
        backgroundColor: 'rgba(0, 210, 255, 0.7)',
      },
      {
        label: 'Make-up',
        data: [{ x: 0, y: 0.5, r: 50 }],
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
      },
    ],
  };

  const bubbleOptions: ChartOptions<'bubble'> = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bubble'>) => {
            const label = context.dataset.label || '';
            const value = ['4,567', '3,167', '1,845'][context.dataIndex];
            return `${label}: ${value} Per Day`;
          },
        },
      },
    },
  };


  const todayOrdersData = {
    labels: ['12am', '8am', '4pm', '11pm'],
    datasets: [{
      label: 'Orders',
      data: [5000, 15000, 7000, 16500],
      borderColor: '#0F60FF',
      tension: 0.4,
      fill: false,
    }],
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
    <div className={styles.analyticsReports}>
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

      {/*Add next section */}
      <div className={styles.newSection}>

        <div className={styles.topSellingCategory}>
          <h2>Top Selling Category</h2>
          <p>Total 10.4k Visitors</p>
          <div className={styles.bubbleChartContainer}>
            <Bubble data={topSellingCategoryData} options={bubbleOptions} />
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
                <Image src="/people.png" alt="Black Dress - Lupin" width="50" height="50"  />
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
            <Line data={todayOrdersData} options={{ responsive: true, maintainAspectRatio: false }} />
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
