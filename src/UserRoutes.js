// UserRoutes.js
import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { baseUrl } from './config';

// User Components
import WebsiteLayout from './layout/frontend/WebsiteLayout';
import UserDashboard from './component/user/UserDashboard';
import UserLogin from './component/user/UserLogin';
import UserRegister from './component/user/UserRegister';
import PredyxAssessment from './component/frontend/PredyxAssessment';

const UserRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated && userRole === 'user') {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('userRole', 'user');
    setAuthenticated(true);
    
    // ✅ Redirect to same page after login
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('redirectUrl');
      navigate(redirectUrl);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('redirectUrl');
    navigate('/login');
  };

  const PrivateRoute = ({ element }) => {
    if (!authenticated) {
      // ✅ Save current URL for redirect after login
      localStorage.setItem('redirectUrl', window.location.pathname);
      return <Navigate to="/login" />;
    }
    return element;
  };

  const routes = useRoutes([

    // ✅ User Dashboard Route
    {
      path: '/',
      element: authenticated ? (
        <>
          <WebsiteLayout onLogout={handleLogout}>
            <Outlet />
          </WebsiteLayout>
        </>
      ) : (
        <UserLogin onLogin={handleLogin} />
      ),
      children: [
        { 
            path: '/predyx-assessment', 
            element: <PrivateRoute element={<PredyxAssessment />} /> 
          },
        { 
          path: '/user/dashboard', 
          element: <PrivateRoute element={<UserDashboard />} /> 
        },
      ],
    },
    // ✅ Login Route (Public)
    {
      path: '/login',
      element: authenticated ? <Navigate to="/predyx-assessment" /> : <UserLogin onLogin={handleLogin} />
    },
    // ✅ Register Route (Public)
    {
      path: '/register',
      element: authenticated ? <Navigate to="/predyx-assessment" /> : <UserRegister onLogin={handleLogin} />
    },
   
  ]);

  return routes;
};

export default UserRoutes;