// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl } from '../../config';
import logo from './../../images/logo1.png';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [adminType, setAdminType] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setAdminType(parsedUser.admin_type || '');
        console.log('User from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Check if user is Super Admin
  const isSuperAdmin = adminType === 'Supar Admin';

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
      <img
  src={logo}
  alt="AdminLTE Logo"
  className=""
  style={{ height: '35px' }}
/>
        <span className="brand-text font-weight-light"></span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Dashboard */}
            <li className="nav-item">
              <Link to={baseUrl} className={`nav-link ${location.pathname === baseUrl ? 'active' : ''}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>

     

            {/* Clients - Visible to all */}
            <li className="nav-item">
              <Link to={baseUrl + '/admin/doctors'} className={`nav-link ${location.pathname.includes('/doctors') ? 'active' : ''}`}>
                <i className="nav-icon fas fa-users"></i>
                <p>Doctors</p>
              </Link>
            </li>

            {/* User List - Only for Super Admin */}
            {isSuperAdmin && (
              <li className="nav-item">
                <Link to={baseUrl + '/admin/user-list'} className={`nav-link ${location.pathname.includes('/user-list') ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-user-cog"></i>
                  <p>User List</p>
                </Link>
              </li>
            )}

{isSuperAdmin && (
              <li className="nav-item">
                <Link to={baseUrl + '/admin/report'} className={`nav-link ${location.pathname.includes('/report') ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-user-cog"></i>
                  <p>Report List</p>
                </Link>
              </li>
            )}

{isSuperAdmin && (
              <li className="nav-item">
                <Link to={baseUrl + '/admin/ecg-reports'} className={`nav-link ${location.pathname.includes('/report') ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-user-cog"></i>
                  <p>ECG Reports</p>
                </Link>
              </li>
            )}

            {/* Settings - Only for Super Admin */}
         
              <li className="nav-item">
                <Link to={baseUrl + '/admin/settings'} className={`nav-link ${location.pathname.includes('/settings') ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-cog"></i>
                  <p>Settings</p>
                </Link>
              </li>
            

    

         
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;