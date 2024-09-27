import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CreateJobModal.module.css';

const ApplicationDetailsModal = ({ onClose, application }: { onClose: () => void, application: { applicantName: string, applicantEmail: string, resume: string, phone: string, coverLetter: string } }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Application Details</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>
            <strong>Applicant Name:</strong> {application.applicantName}
          </p>
          <p>
            <strong>Email:</strong> {application.applicantEmail}
          </p>
          <p>
            <strong>Phone:</strong> {application.phone}
          </p>
          <p>
            <strong>Resume:</strong> {application.resume}
          </p>
          <p>
            <strong>Cover Letter:</strong> {application.coverLetter}
          </p>
        </div>
      </div>
    </div>
  );
};export default ApplicationDetailsModal;
