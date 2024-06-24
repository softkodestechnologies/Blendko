"use state";
import React, { useState} from 'react';
import './Login.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form">
      <form>
    <div className="form-group">
        <input type="email" placeholder="Email Address*" required />
      </div>
      <div className="form-group">
      <label className="password-label" htmlFor='password'>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password*" id="password"  required />
                    <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </span>
       </label>
      </div>
      <div className="flex space-between mb-10">
        <div className="checkbox">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link className="forgot" href="/forgot">Forgot Your Password?</Link>
      </div>
      <button className="submit-btn mb-10" type="submit">Log In</button>
      <div className="flex flex-col center">
        <p className="mb-10">By logging in, you agree to the Terms & Conditions and Privacy Policy</p>
        <p className="register">New to Blendko? <Link href="/register">Register</Link></p>
      </div>
    </form>
    </div>
  );
};

export default Login;
