import Register from '@/components/ui/register/Register';

export default function Page() {
  return (
    <div className="flex center login-page">
      <div>
          <h2 className="mb-10">Register</h2>
          <h4 className="mb-10">Existing Customer</h4>
          <div>
            <Register />
          </div>
      </div>
    </div>
  );
}
