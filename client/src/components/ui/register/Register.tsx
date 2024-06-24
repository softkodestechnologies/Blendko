"use client";
import { useState } from 'react';
import { BiGift } from 'react-icons/bi';
import { MdVisibility, MdVisibilityOff, MdShoppingCart } from 'react-icons/md';
import Link from 'next/link';
import './Register.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // TODO: Implement registration logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="reg-form">
      <h1>Register ah</h1>

      <div className="benefits">
        <ul>
          <li>
            <BiGift />
            Become a loyalty member to earn points and get exclusive offers and rewards
          </li>
          <li>
            <MdShoppingCart />
            Quick order information and tracking
          </li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input type="email" id="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label className="password-label" htmlFor='password'>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password*" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </span>
                </label>
            </div>
            
            <button className="submit-btn mb-10" type="submit">Create Account</button>
            <div className="flex flex-col center">
                <p className="mb-10">By logging in, you agree to the Terms & Conditions and Privacy Policy</p>
                <p className="register">New to Blendko? <Link href="/login">Login</Link></p>
            </div>
    </form>
      
    </div>
  );
};

export default Register;