"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateUser, syncCartWithServer } from '@/services/userSlice';
import { useGetUserProfileQuery } from '@/services/userService'; 

const SuccessPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: userData, refetch } = useGetUserProfileQuery({});

  useEffect(() => {
    const refreshUserData = async () => {
      await refetch();
      if (userData) {
        const emptyCart: any[] = [];
        dispatch(updateUser(userData?.user));
        dispatch(syncCartWithServer(emptyCart)); // Sync the empty cart with the server
      }
      
      console.log(userData?.user);
    };

    refreshUserData();
  }, [dispatch, refetch, userData]);

  return (
    <div className="flex flex-col center">
      <div className="flex flex-col center not-found">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order has been processed successfully.</p>
        <Link href="/">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;