import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const HomeScreen = lazy(() => import('./home/home'));

const AppRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomeScreen /> }],
  },
];

function Layout() {
  return <Outlet />;
}

export default AppRoutes;
