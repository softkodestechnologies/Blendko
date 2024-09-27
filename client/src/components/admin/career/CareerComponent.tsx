"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Chart } from 'react-google-charts';
import { FaEllipsisH } from 'react-icons/fa';
import CreateJobModal from '@/components/admin/career/CreateJobModal';
import { useGetJobsQuery } from '@/services/userService';
import styles from './Career.module.css';

const CareerComponent: React.FC = () => {
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const { data, isLoading, isError } = useGetJobsQuery({});
  const jobs = data?.jobs || [];

  const chartData = [
    ['Date', 'Applications'],
    ['2024-01-01', 1000],
    ['2024-02-01', 1170],
    ['2024-03-01', 660],
    ['2024-04-01', 1030],
  ];

  const chartOptions = {
    title: 'Total Job Applications',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading jobs</div>;

  const handleJobClick = (jobId: string) => {
    console.log('JOB ID IS', jobId)
    router.push(`/admin/career/${jobId}`);
  };

  return (
    <div className={styles.careerContainer}>
      <div className={styles.headerActions}>
        <h1 className={styles.title}>Careers</h1>
        <button
          className={styles.createButton}
          onClick={() => setShowCreateJobModal(true)}
        >
          Create Job
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Total Job Listings</h2>
          <p className={styles.statValue}>{jobs.length}</p>
        </div>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Total Job Applications</h2>
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by order id"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter by date range"
        >
          <option value="">Filter by date range</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <table className={styles.jobTable}>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job: any) => (
            <tr key={job.id} onClick={() => handleJobClick(job._id)}>
              <td>{job.jobId}</td>
              <td>{job.title}</td>
              <td>{job.category}</td>
              <td>{job.jobType}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[job?.status.toLowerCase()]}`}>
                  {job.status}
                </span>
              </td>
              <td>{job.date}</td>
              <td>
                <button className={styles.actionButton} title="More options">
                  <FaEllipsisH />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateJobModal && (
        <CreateJobModal onClose={() => setShowCreateJobModal(false)} />
      )}
    </div>
  );
};
export default CareerComponent;
