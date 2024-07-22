"use client";

import React from 'react';
import styles from './AdminManagement.module.css';

interface Admin {
  id: number;
  email: string;
  role: string;
  name: string;
  createdDate: string;
  status: 'Active' | 'Inactive';
}

const AdminManagement: React.FC = () => {
  const admins: Admin[] = [
    { id: 1, email: 'femas1234@sbox.com', role: 'Admin User', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Active' },
    { id: 2, email: 'femas1234@sbox.com', role: 'Manager', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Active' },
    { id: 3, email: 'femas1234@sbox.com', role: 'Admin 2', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Inactive' },
    { id: 4, email: 'femas1234@sbox.com', role: 'Employee 1', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Active' },
    { id: 5, email: 'femas1234@sbox.com', role: 'Super Admin', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Inactive' },
    { id: 6, email: 'femas1234@sbox.com', role: 'Admin 3', name: 'Udah Isaiah', createdDate: '02/09/2024', status: 'Inactive' },
  ];

  return (
    <div className={styles.adminManagement}>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>{admin.name}</td>
              <td>{admin.createdDate}</td>
              <td>
                <span className={`${styles.status} ${styles[admin.status.toLowerCase()]}`}>
                   {admin.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;