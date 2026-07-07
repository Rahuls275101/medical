import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { baseUrl,apiBaseUrl } from '../../config'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from './logo.png';
import bg from "./login-bg-3.jpg";

const Login = ({ onLogin }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('login-page');

    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(apiBaseUrl +'/login', {
        email: email,
        password: password
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        console.log('Login successful');
        
        // ✅ Store user data in localStorage
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          console.log('User data stored:', response.data.user);
        }
        
        // ✅ Store token
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
        }

        // ✅ Set authentication state
        localStorage.setItem('authenticated', 'true');
        
        // Call parent onLogin
        if (onLogin) {
          onLogin();
        }
        
        // Navigate to dashboard
        navigate();
      } else {
        console.log('Login failed: ' + (response.data.message || 'Invalid credentials'));
        setAuthenticated(false);
        showAlert('error', response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        if (error.response.status === 401) {
          showAlert('error', 'Invalid email or password. Please try again.');
        } else if (error.response.status === 404) {
          showAlert('error', 'API endpoint not found. Please check the URL.');
        } else {
          showAlert('error', error.response.data?.message || 'Login failed. Please try again.');
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        showAlert('error', 'Network error. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        showAlert('error', 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showAlert = (type, message) => {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    `;

    alertContainer.appendChild(alert);

    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>Login - Admin Panel</title>
      </Helmet>
<div style={{
    backgroundImage: `url(${bg})`
  }}>
   <div className="login-over">
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-header">
              <div className="brand-icon1">
               <img
  src={logo}
  alt="AdminLTE Logo"
  className=""
/>
              </div>
              <h2>Welcome Back</h2>
              <p className="login-subtitle">Sign in to continue to your dashboard</p>
            </div>

            <div className="login-body">
              <div id="alertContainer" />
              
              <form onSubmit={handleLogin} noValidate>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-envelope"></i> Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-lock"></i> Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-input ${errors.password ? 'input-error' : ''}`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={toggleShowPassword}
                      tabIndex="-1"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                    {errors.password && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMe}
                      disabled={isLoading}
                    />
                    <span className="checkmark"></span>
                    Remember Me
                  </label>
                  <a href="forgot-password.html" className="forgot-link">
                    Forgot Password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="login-footer">
                <p>
                  Don't have an account?{' '}
                  <a href="register.html" className="register-link">
                    Register now
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="login-footer-text">
            <p>&copy; 2026 PredyxIQ. All rights reserved.</p>
          </div>
        </div>
      </div></div></div>
    </>
  );
};

export default Login;