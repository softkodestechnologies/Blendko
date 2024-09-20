import Register from '@/components/ui/auth/Register';

export default function Page() {
  return (
    <section style={{ background: '#F5F5F5' }}>
      <div
        className={`section_container flex center`}
        style={{ minHeight: '100vh' }}
      >
        <Register />
      </div>
    </section>
  );
}
