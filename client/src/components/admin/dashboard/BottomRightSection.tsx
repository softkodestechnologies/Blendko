import React from 'react';
import { Chart } from "react-google-charts";
import styles from './BottomRightSection.module.css';

const BottomRightSection = () => {
  return (
    <div className={styles.bottomRight}>
      <div className={styles.userSection}>
        <h2>Users in last 30 minutes</h2>
        <div className={styles.usersValue}>16.5K</div>
        <p>Users per minute</p>
        <div className={styles.userChart}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="60%"
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
          <div className={styles.countryPanel}>
            <div className={styles.countryFlag}></div>
            <div className={styles.countryDetails}>
                <h3>30k</h3>
                <p>United States</p>
            </div>
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
            <h3>25.8%</h3>
          </div>
          
          <div className={styles.countryPanel}>
            <div className={styles.countryFlag}></div>
            <div className={styles.countryDetails}>
                <h3>30k</h3>
                <p>United States</p>
            </div>
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
            <h3>25.8%</h3>
          </div>

          <div className={styles.countryPanel}>
            <div className={styles.countryFlag}></div>
            <div className={styles.countryDetails}>
                <h3>30k</h3>
                <p>United States</p>
            </div>
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
            <h3>25.8%</h3>
          </div>

          <div className={styles.countryPanel}>
            <div className={styles.countryFlag}></div>
            <div className={styles.countryDetails}>
                <h3>30k</h3>
                <p>United States</p>
            </div>
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
            <h3>25.8%</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomRightSection;