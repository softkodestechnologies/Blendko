"use client";

import React from 'react';
import styles from './AdminRoles.module.css';

interface Role {
  name: string;
  description: string;
  users: string[];
}

const AdminRoles: React.FC = () => {
  const roles: Role[] = [
    {
      name: 'Admin',
      description: 'Can manage teams and create, update products.',
      users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    },
    {
      name: 'Contributor',
      description: 'Can create and update Products.',
      users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    },
    {
      name: 'Designers',
      description: 'Can create, update and delete design models.',
      users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    },
    {
      name: 'Editor',
      description: 'Can create, update and delete products.',
      users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Role</span>
        <span>Users</span>
        <span>Created Date</span>
      </div>
      <div class={styles.table}>
        {roles.map((role, index) => (
            <div key={index} className={styles.roleRow}>
            <div className={styles.roleInfo}>
                <h2>{role.name}</h2>
                <p>{role.description}</p>
            </div>
            <div className={styles.userAvatars}>
                {role.users.slice(0, 4).map((user, userIndex) => (
                <div key={userIndex} className={styles.userAvatar}>
                    {user[0].toUpperCase()}
                </div>
                ))}
                {role.users.length > 4 && (
                <div className={styles.userAvatar}>+{role.users.length - 4}</div>
                )}
            </div>
            <button className={styles.assignButton}>
                <span className={styles.assignIcon}>👤</span>
                Assign member
            </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoles;