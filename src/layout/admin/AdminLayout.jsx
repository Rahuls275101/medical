import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import $ from "jquery";

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import './AdminLayout.css';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

const AdminLayout = ({ onLogout }) => {
  useEffect(() => {
    // Push Menu
    if ($('[data-widget="pushmenu"]').length) {
      $('[data-widget="pushmenu"]').PushMenu();
    }

    // Treeview
    $('[data-widget="treeview"]').Treeview("init");
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link"
              data-widget="pushmenu"
              role="button"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link"
              data-widget="fullscreen"
              role="button"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#"
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              role="button"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-th-large"></i>
            </a>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <Sidebar />

   
        <Outlet />
     

      {/* Footer */}
      <Footer />

      {/* Optional Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default AdminLayout;