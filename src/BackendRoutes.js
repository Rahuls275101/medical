import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { baseUrl } from './config'; 

import AdminLayout from './layout/admin/AdminLayout';
import AdminPage from './component/admin/AdminPage';
import Category from './component/admin/Category';
import Banner from './component/admin/Banner';
import Cmspage from './component/admin/Cmspage';
import Clients from './component/admin/Clients';
import CmsEditpage from './component/admin/CmsEditpage';
import LoginPage from './component/admin/Login'; 
import SubAdmin from './component/admin/SubAdmin'
import Doctors from './component/admin/Doctors'
import ProfileSettings from './component/admin/ProfileSettings'
import Assessments from './component/admin/Assessments'




const BackendRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication state in localStorage on component mount
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  const handleLogin = () => {
    // Perform authentication logic here (not shown in the provided code)
    localStorage.setItem('authenticated', 'true');
    setAuthenticated(true);
    navigate(baseUrl); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    // Clear authentication state
    setAuthenticated(false);

    // Remove session data from localStorage
    localStorage.removeItem('authenticated');

    // Redirect to the home page or any other desired location
    navigate(baseUrl+'/admin');
  };

  const PrivateRoute = ({ path, element }) => {
    return authenticated ? element : <Navigate to={baseUrl + '/login'} />;
  };

  const routes = useRoutes([
    {
      path: '/admin',
      element: authenticated ? (
        <>
          <AdminLayout onLogout={handleLogout}>
            <Outlet />
          </AdminLayout>
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      ),
      children: [
        { path: '/admin', element: <PrivateRoute path="admin" element={<AdminPage />} /> },
        { path: 'category', element: <PrivateRoute path="category" element={<Category />} /> },
        { path: 'banner', element: <PrivateRoute path="banner" element={<Banner />} /> },
        { path: 'cms-pages', element: <PrivateRoute path="cms-pages" element={<Cmspage />} /> },
        { path: 'cms-pages/:cmsPageId', element: <PrivateRoute path="cms-pages/:cmsPageId" element={<CmsEditpage />} /> },
        { path: 'clients', element: <PrivateRoute path="clients" element={<Clients />} /> },
        { path: 'user-list', element: <PrivateRoute path="clients" element={<SubAdmin />} /> },
        { path: 'doctors', element: <PrivateRoute path="clients" element={<Doctors />} /> },
        { path: 'settings', element: <PrivateRoute path="clients" element={<ProfileSettings />} /> },
        { path: 'report', element: <PrivateRoute path="clients" element={<Assessments />} /> },

        
      ],
    },
  ]);

  return routes;
};

export default BackendRoutes;
