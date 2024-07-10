"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/services/userSlice';
import './UserMenu.css';
import { RootState } from '@/services/store';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  if (!user) {
    return (
      <div className="user-menu">
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <h2>Account</h2>
      <Link href="/user/profile">Profile</Link>
      <Link href="/user/orders">Orders</Link>
      <Link href="/user/favorites">Favorites</Link>
      <Link href="/user/favorites">Account Settings</Link>
      <Link href="/user/favorites">Customize Templates</Link>
      <span onClick={handleLogout}>Log Out</span>
    </div>
  );
};

export default UserMenu;