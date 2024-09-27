import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { FaEllipsisH } from 'react-icons/fa';
import ApplicationDetailsModal from './ApplicationDetailsModal';
import { useGetApplicationsQuery } from '@/services/userService';
import styles from './Career.module.css';

interface AllApplicationsComponentProps {
  jobId: string;
}

const AllApplicationsComponent: React.FC<AllApplicationsComponentProps> = ({ jobId }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const { data, isLoading, isError } = useGetApplicationsQuery(jobId);

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
  if (isError) return <div>Error loading applications</div>;

  const applications = data?.applications || [];  
  const filteredApplications = applications.filter((app: any) => app.job === jobId); 

  return (
    <div className={styles.applicationsContainer}>
      <h1 className={styles.title}>All Applications</h1>

      <div className={styles.chartContainer}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="200px"
          data={chartData}
          options={chartOptions}
        />
      </div>

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by applicant name"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          title="filter"
          className={styles.filterSelect}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <table className={styles.applicationTable}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Job Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application: any) => (
            <tr key={application.id}>
              <td>{application.applicantName}</td>
              <td>{application.jobTitle}</td>
              <td>{application.type}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[application.status.toLowerCase()]}`}>
                  {application.status}
                </span>
              </td>
              <td>{application.appliedAt}</td>
              <td>
                <button
                  title="jobProfile"
                  className={styles.actionButton}
                  onClick={() => {
                    setSelectedApplication(application);
                    setShowDetailsModal(true);
                  }}
                >
                  <FaEllipsisH />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetailsModal && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default AllApplicationsComponent;