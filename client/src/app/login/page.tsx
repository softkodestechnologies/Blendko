"use client";
import Login from '@/components/ui/login/Login';

export default function Page() {
  return (
    <div className="flex center login-page">
      <div>
        <div className="login-section">
          <h2 className="mb-10">Log in</h2>
          <h4 className="mb-10">Existing Customer</h4>
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
}
