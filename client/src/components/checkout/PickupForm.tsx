import React, { useState } from 'react';
import styles from './PickupForm.module.css';

const PickupForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
  };

  return (
    <div className={styles.pickupForm}>
      <h4 className={styles.formTitle}>Select a store or click and collect location</h4>
      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a store"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.saveButton}>Save & Continue</button>
      </form>
    </div>
  );
};

export default PickupForm;