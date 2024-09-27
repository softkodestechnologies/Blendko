'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState } from '@/services/store';
import { useDispatch, useSelector } from 'react-redux';

import './UserMenu.css';

import { logOut } from '@/services/userSlice';
import AnimatedText from '../ui/AnimateOnHover';
import { userMenuLinks } from '@/utils/data/dummy';

const UserMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    dispatch(logOut());
    router.push('/');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col user-menu">
      <h2>Account</h2>

      <ul className="flex flex-col user-menu-links">
        {userMenuLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.url} className="menu-icons">
              <AnimatedText text={link.title} />
            </Link>
          </li>
        ))}

        <button onClick={handleLogout} title="Logout">
          <AnimatedText text="Logout" />
        </button>
      </ul>
    </div>
  );
};
export default UserMenu;
