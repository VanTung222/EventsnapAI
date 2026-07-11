import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
        <Link to="/admin">Admin Dashboard</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
