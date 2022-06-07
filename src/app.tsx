import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import AppRoutes from './app-routes';
import './app.css';

export default function App() {
  const appRoutes = useRoutes(AppRoutes);
  return <Suspense fallback={'Loading...'}>{appRoutes}</Suspense>;
}
