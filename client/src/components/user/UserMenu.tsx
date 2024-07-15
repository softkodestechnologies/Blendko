"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/services/userSlice';
import './UserMenu.css';
import { useRouter } from 'next/navigation';
import { RootState } from '@/services/store';

const UserMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    dispatch(logOut());
    router.push('/');
  };

  if (!user) {
    return (
      <div className="user-menu">
        <Link className="menu-icons" href="/login">Login</Link>
        <Link className="menu-icons" href="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <h2>Account</h2>
      <Link className="menu-icons" href="/user/account">Profile</Link>
      <Link className="menu-icons" href="/user/orders">Orders</Link>
      <Link className="menu-icons" href="/user/favorites">Favorites</Link>
      <Link className="menu-icons" href="/user/favorites">Account Settings</Link>
      <Link className="menu-icons" href="/user/favorites">Customize Templates</Link>
      <span onClick={handleLogout}>Log Out</span>
    </div>
  );
};

export default UserMenu;