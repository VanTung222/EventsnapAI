import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100dvh', fontFamily: 'Inter, Arial, sans-serif' }}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
