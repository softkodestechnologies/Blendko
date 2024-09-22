"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DiscountTable from '@/components/admin/discounts/DiscountTable';
import CreateDiscountForm from '@/components/admin/discounts/CreateDiscountForm';
import styles from '@/components/admin/Admin.module.css';
import { FaBars, FaUser, FaBell, FaSearch, FaPlus } from 'react-icons/fa';
import { useGetDiscountsQuery, useCreateDiscountMutation, useUpdateDiscountMutation, useDeleteDiscountMutation } from '@/services/userService';

interface Discount {
  id: string;
  name: string;
  code: string;
  type: string;
  value: number;
  startsOn: string;
  expiresOn: string;
  usageLimit: number;
  status: string;
}

const DiscountsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired'>('all');

  const { data, isLoading, isError, error, refetch } = useGetDiscountsQuery({});
  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const [deleteDiscount] = useDeleteDiscountMutation();

  useEffect(() => {
    if (data && data.discounts) {
    }
  }, [data]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDiscounts = data?.discounts.filter(discount =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitDiscount = async (formData: Omit<Discount, 'id'>) => {
    try {
      if (editingDiscount) {
        await updateDiscount({ id: editingDiscount.id, ...formData }).unwrap();
      } else {
        await createDiscount(formData).unwrap();
      }
      setShowForm(false);
      setEditingDiscount(null);
      refetch(); 
    } catch (error) {
      console.error('Failed to submit discount:', error);
    }
  };

  const handleEditDiscount = (discount: Discount) => {
    setEditingDiscount(discount);
    setShowForm(true);
  };

  const handleDeleteDiscounts = async (ids: string[]) => {
    if (!ids.length) {
      console.error('No discounts selected for deletion');
      return;
    }

    try {
      await Promise.all(ids.map(id => deleteDiscount(id).unwrap()));
      setSelectedDiscounts([]);
      refetch();
    } catch (error) {
      console.error('Failed to delete discounts:', error);
    }
  };

  const handleTabChange = (tab: 'all' | 'active' | 'expired') => {
    setActiveTab(tab);
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
            <button className={styles.createButton} onClick={() => { setShowForm(true); setEditingDiscount(null); }}>
              <FaPlus /> Create Coupon
            </button>
          </div>
          <div className={styles.tabContainer}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
                onClick={() => handleTabChange('all')}
              >
                All Coupons
              </button>
              <button 
              className={`${styles.tabButton} ${activeTab === 'active' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('active')}
            >
              Active Coupons
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'expired' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('expired')}
            >
              Expired Coupons
            </button>
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

          {showForm ? (
            <CreateDiscountForm
              onSubmit={handleSubmitDiscount}
              onCancel={() => { setShowForm(false); setEditingDiscount(null); }}
              initialData={editingDiscount}
            />
          ) : (
            <DiscountTable
              discounts={filteredDiscounts || []}
              selectedDiscounts={selectedDiscounts}
              setSelectedDiscounts={setSelectedDiscounts}
              onEdit={handleEditDiscount}
              onDelete={handleDeleteDiscounts}
              activeTab={activeTab}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default DiscountsPage;    