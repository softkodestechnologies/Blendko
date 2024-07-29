"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store'; 
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'; 

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
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
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

const getDisplayName = (WrappedComponent: React.ComponentType) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAuth;
