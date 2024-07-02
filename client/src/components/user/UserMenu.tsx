"use client";

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logOut } from '@/services/userSlice';
import  './UserMenu.css';

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="user-menu">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/favorites">Favorites</Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserMenu;