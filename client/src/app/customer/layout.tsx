"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store'; 
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;