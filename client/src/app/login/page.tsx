'use client';
import Login from '@/components/ui/auth/Login';

export default function Page() {
  return (
    <section style={{ background: '#F5F5F5' }}>
      <div
        className={`section_container flex center`}
        style={{ minHeight: '80vh' }}
      >
        <Login />
      </div>
    </section>
  );
}
