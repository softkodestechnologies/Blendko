import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CreateJobModal.module.css';

const CreateJobModal = ({ onClose }: { onClose: () => void }) => {  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create New Job</h2>

          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flexBasis: '60%' }}>

                <label className={styles.label} htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  className={styles.input}
                  placeholder="Enter job title"
                />
              </div>
              <div style={{ flexBasis: '40%' }}>


                <label className={styles.label} htmlFor="category">Category</label>
                <select className={styles.input} id="category">
                  <option value="">Select Category</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flexBasis: '100%' }}>

                <label className={styles.label} htmlFor="salary">Salary (Optional)</label>
                <input
                  type="number"
                  id="salary"
                  className={styles.input}
                  placeholder="Enter salary"
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flexBasis: '50%' }}>
                <label className={styles.label} htmlFor="jobType">Job Type</label>
                <select className={styles.input} id="jobType">
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div style={{ flexBasis: '50%' }}>
                <label className={styles.label} htmlFor="location">Location</label>
                <select className={styles.input} id="location">
                  <option value="">Select Location</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              className={styles.input}
              placeholder="Enter job description"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              className={styles.input}
              placeholder="Enter requirements"
              rows={3}
            />
          </div>

          <div className={styles.btnGroup}>
            <button type="button" className={styles.previewButton}>
              Preview
            </button>
            <button type="submit" className={styles.submitButton}>
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );};

export default CreateJobModal;

