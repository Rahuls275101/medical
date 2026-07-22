import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';
import logo from '../../images/logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <React.StrictMode>
      <header id="header_1">
        <div className="header-top-bar d-none d-md-block">
          <div className="container-fluid">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-xl-8 col-lg-12 col-md-12 col-12 header-contact-layout1">
                <ul>
                  <li>
                    <i className="fas fa-phone" />
                    Call: +91 9876543210
                  </li>
                </ul>
              </div>
              <div className="col-xl-4 d-none d-xl-block header-contact-layout1">
                <ul style={{ justifyContent: 'end' }}>
                  <li>
                    <i className="far fa-envelope-open" />
                    info@predyxiq.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-menu-area header-menu-layout1">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="row no-gutters d-flex align-items-center w-100">
                <div className="col-lg-2 col-md-2 col-6 logo-area-layout1">
                  <Link to={baseUrl + '/'} className="temp-logo">
                    <img
                      src={logo}
                      alt="AdminLTE Logo"
                      className=""
                      style={{ opacity: 0.8 }}
                    />
                  </Link>
                </div>

                {/* Mobile Toggle Button */}
                <div className="col-6 d-lg-none d-flex justify-content-end">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>

                {/* Navigation Menu */}
                <div className={`col-lg-8 col-md-8 ${isMenuOpen ? '' : 'd-none d-lg-block'}`}>
                  <div className="template-main-menu">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to={baseUrl + '/'}  onClick={() => window.scrollTo(0, 0)} className="nav-link">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/clinical-intelligence'}  onClick={() => window.scrollTo(0, 0)} className="nav-link">Clinical Intelligence</Link>
                      </li>
                      
                      <li className="nav-item">
                        <Link  onClick={() => window.scrollTo(0, 0)} className="nav-link">Products</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/'} onClick={() => window.scrollTo(0, 0)}  className="nav-link">How It Works</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/platform'} onClick={() => window.scrollTo(0, 0)}  className="nav-link">Platform</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/science-of-clinical-intelligence'} onClick={() => window.scrollTo(0, 0)}  className="nav-link">Science</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/predyxiq-services'} onClick={() => window.scrollTo(0, 0)}  className="nav-link">Who We Service</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/predyxiq-quick'} onClick={() => window.scrollTo(0, 0)}  className="nav-link">PredyxIQ Quick</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={baseUrl + '/about'} onClick={() => window.scrollTo(0, 0)} className="nav-link">About</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-lg-2 col-md-2 d-none d-lg-block">
                  <div className="header-action-items-layout1">
                    <ul className="d-flex" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      <li>
                        <a href="#" className="action-items-primary-btn">
                          Request a Demo
                          <i className="fas fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="action-items-primary-btn">
                          Login
                          <i className="fas fa-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </React.StrictMode>
  );
}

export default Header;