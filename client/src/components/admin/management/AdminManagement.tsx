"use client";
import React from 'react';
import styles from './AdminManagement.module.css';
import { useGetUsersQuery } from '@/services/userService';

interface Admin {
  _id: string;
  email: string;
  role: string[];
  name: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

const AdminManagement: React.FC = () => {
  const { data: usersData, isLoading, isError } = useGetUsersQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  const admins: Admin[] = usersData?.users || [];

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
            <tr key={admin._id}>
              <td>{admin._id}</td>
              <td>{admin.email}</td>
              <td>{admin.role.join(', ')}</td>
              <td>{admin.name}</td>
              <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
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