import React, { useState } from 'react';
import styles from './AdminManagement.module.css';
import { useGetAdminsQuery, useDeleteAdminMutation, useUpdateAdminStatusMutation } from '@/services/userService';
import AddAdminForm from './AddAdminForm';
import AlertDialog from './AlertDialog';
import { RedDeleteIcon, EditButtonIcon } from '../../../../public/svg/icon';

interface Admin {
  _id: string;
  email: string;
  role: string[];
  name: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

const AdminManagement: React.FC = () => {
  const { data: adminData, isLoading, isError } = useGetAdminsQuery({});
  const [deleteAdmin] = useDeleteAdminMutation();
  const [updateAdminStatus] = useUpdateAdminStatusMutation();
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading admins</div>;

  const admins: Admin[] = adminData?.admins || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteAdmin(id);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleStatusUpdate = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await updateAdminStatus({ id, status: newStatus });
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  return (
    <div className={styles.adminManagement}>
      <button className={styles.addAdminBtn} onClick={() => setShowAddAdminForm(true)}>Add Admin</button>
      {showAddAdminForm && (
        <AddAdminForm
          onClose={() => setShowAddAdminForm(false)}
          adminToEdit={selectedAdmin}
          onAdminAdded={() => setSelectedAdmin(null)}
        />
      )}
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.email}</td>
              <td>{admin.role.join(', ')}</td>
              <td>{admin.name}</td>
              <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleStatusUpdate(admin._id, admin.status)}
                  className={`${styles.statusButton} ${styles[admin.status.toLowerCase()]}`}
                >
                  {admin.status}
                </button>
              </td>
              <td>
                <button className={styles.editBtn} title="edit" onClick={() => {
                  setSelectedAdmin(admin);
                  setShowAddAdminForm(true);
                }}>
                  <EditButtonIcon />
                </button>
                <AlertDialog
                  title="Confirm Delete"
                  description="Are you sure you want to delete this admin? This action cannot be undone."
                  confirmLabel="Delete"
                  cancelLabel="Cancel"
                  onConfirm={() => handleDelete(admin._id)}
                  onCancel={() => {}}
                  trigger={<RedDeleteIcon />} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;