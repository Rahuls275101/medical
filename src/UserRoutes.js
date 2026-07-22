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
    // Check for authentication state in localStorage
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
    navigate('/user/dashboard');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const PrivateRoute = ({ path, element }) => {
    return authenticated ? element : <Navigate to={baseUrl + '/login'} />;
  };

  const routes = useRoutes([
    // User Dashboard Route (Protected)
    {
      path: '/user',
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
          path: '/user/dashboard', 
          element: <PrivateRoute path="dashboard" element={<UserDashboard />} /> 
        },
        { 
            path: 'predyx-assessment', 
            element: <PrivateRoute path="dashboard" element={<PredyxAssessment />} /> 
          },
      ],
    },
    // Login Route (Public)
    {
      path: '/login',
      element: authenticated ? <Navigate to="/user/dashboard" /> : <UserLogin onLogin={handleLogin} />
    },
    // Register Route (Public)
    {
      path: '/register',
      element: authenticated ? <Navigate to="/user/dashboard" /> : <UserRegister onLogin={handleLogin} />
    },
  ]);

  return routes;
};

export default UserRoutes;