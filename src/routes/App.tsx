import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center">
            ...loading
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};
