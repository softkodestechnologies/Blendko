"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

interface ReferPage {
    params: {
      referralCode: string;
    };
  }

const ReferPage: React.FC<ReferPage> = ({ params }) => {
  const { referralCode } = params;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem('referralCode', referralCode);
      if (!user) {
        router.push('/register');
      } else {
        router.push('/')
      }
    }
    setIsLoading(false);
  }, [user, router, referralCode]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {user ? (
        <div>
            <p>Welcome, {user.name}!</p>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ReferPage;
