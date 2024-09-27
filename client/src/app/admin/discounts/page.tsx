"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DiscountTable from '@/components/admin/discounts/DiscountTable';
import CreateDiscountForm from '@/components/admin/discounts/CreateDiscountForm';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch, FaPlus } from 'react-icons/fa';
import { useGetDiscountsQuery, useCreateDiscountMutation, useUpdateDiscountMutation, useDeleteDiscountMutation } from '@/services/userService';

const DiscountsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired'>('all');

  const { data, isLoading, isError, error } = useGetDiscountsQuery({});
  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const [deleteDiscount] = useDeleteDiscountMutation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDiscounts = data?.discounts
    ? data.discounts.filter((discount: { name: string; code: string }) =>
        discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCreateDiscount = async (data: any) => {
    try {
      await createDiscount(data).unwrap();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create discount:', error);
    }
  };

  const handleEditDiscount = (discount: any) => {
    console.log('Edit discount:', discount.id);
  };

  const handleDeleteDiscounts = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id => deleteDiscount(id).unwrap()));
    } catch (error) {
      console.error('Failed to delete discounts:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading discounts: {(error as any)?.data?.message || 'Unknown error'}</div>;

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className={`${styles.content} container`}>
        <header className={styles.header}>
          <button type="button" title="bars" className={styles.menuButton} onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className={styles.headerRight}>
            <FaSearch className={styles.headerIcon} />
            <FaBell className={styles.headerIcon} />
            <FaUser className={styles.headerIcon} />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Discounts</h1>
            <button className={styles.createButton} onClick={() => setShowCreateForm(true)}>
              <FaPlus /> Create Coupon
            </button>
          </div>
          <div className={styles.tabContainer}>
            <button className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`} onClick={() => setActiveTab('all')}>All Coupons</button>
            <button className={`${styles.tabButton} ${activeTab === 'active' ? styles.activeTab : ''}`} onClick={() => setActiveTab('active')}>Active Coupons</button>
            <button className={`${styles.tabButton} ${activeTab === 'expired' ? styles.activeTab : ''}`} onClick={() => setActiveTab('expired')}>Expired Coupons</button>
          </div>
          <div className={styles.searchContainer}>
            <select title="filterSelect" className={styles.filterSelect}>
              <option>Filter</option>
              {/* Add filter options */}
            </select>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearch}
            />
            <button title="search" className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>

          {showCreateForm ? (
            <CreateDiscountForm
              onSubmit={handleCreateDiscount}
              onCancel={() => setShowCreateForm(false)}
            />
          ) : (
            <DiscountTable
              discounts={filteredDiscounts}
              onEdit={handleEditDiscount}
              onDelete={handleDeleteDiscounts}
              selectedDiscounts={selectedDiscounts}
              setSelectedDiscounts={setSelectedDiscounts}
              activeTab={activeTab}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default DiscountsPage;