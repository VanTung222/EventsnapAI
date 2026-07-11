import { Outlet } from 'react-router-dom';

const CheckInLayout = () => {
  return (
    <div>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default CheckInLayout;
