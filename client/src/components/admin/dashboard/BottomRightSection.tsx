import React from 'react';
import { Chart } from "react-google-charts";
import styles from './BottomRightSection.module.css';
interface RecentUser {
  _id: string;
  count: number;
}

interface SalesCountry {
  _id: string;
  sales: number;
}

const BottomRightSection: React.FC<{ salesByCountry: SalesCountry[], recentUsers: RecentUser[] }> = ({ salesByCountry, recentUsers }) => {
  const totalUsers = recentUsers.reduce((sum: number, minute: RecentUser) => sum + minute.count, 0);
  return (
    <div className={styles.bottomRight}>
      <div className={styles.userSection}>
        <h2>Users in last 30 minutes</h2>
        <div className={styles.usersValue}>{totalUsers}</div>
        <p>Users per minute</p>
        <div className={styles.userChart}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="60%"
            data={[
              ['Minute', 'Users'],
              ...recentUsers.map(minute => [`${minute._id}`, minute.count]),
            ]}
            options={{
              legend: { position: 'none' },
              bar: { groupWidth: '95%' },
              colors: ['#0F60FF'],
              chartArea: { width: '100%', height: '60%' },
            }}
          />
        </div>
      </div>

      <div className={styles.salesByCountry}>
        <div className="flex space-between mb-20">
          <h3>Sales by Country</h3>
          <h3>Sales</h3>
        </div>
        <div className={styles.countryChart}>
        {salesByCountry.map((country: SalesCountry, index: number) => (
          <div key={index} className={styles.countryPanel}>
            <div className={styles.countryFlag}></div>
            <div className={styles.countryDetails}>
              <h3>${country.sales.toFixed(2)}k</h3>
              <p>{country._id}</p>
            </div>
            <div className={styles.loaderContainer}>
              <div className={styles.loader} style={{ width: `${(country.sales / salesByCountry[0].sales) * 100}%` }}></div>
            </div>
            <h3>{((country.sales / salesByCountry.reduce((sum: number, c: SalesCountry) => sum + c.sales, 0)) * 100).toFixed(1)}%</h3>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default BottomRightSection;