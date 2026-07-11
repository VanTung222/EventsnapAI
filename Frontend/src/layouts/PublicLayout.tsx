import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
