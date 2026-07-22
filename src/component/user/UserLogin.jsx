// component/user/UserLogin.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../../config';
import './UserLogin.css';
import logo from '../../images/logo.png';

const UserLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    document.body.classList.add('user-login-page');
    
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    return () => {
      document.body.classList.remove('user-login-page');
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
    if (apiError) setApiError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
    if (apiError) setApiError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // ✅ Using actual patient login API
      const response = await axios.post(`${apiBaseUrl}/patient/login`, {
        email: email,
        password: password
      });

      console.log('Login Response:', response.data);

      if (response.data.status === true) {
        // Store user data
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Store authentication status
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userRole', 'user');

        // Remember me
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('userEmail');
        }

        // Call parent login function
        if (onLogin) {
          onLogin();
        }
        
        // Navigate to dashboard
        navigate();
      } else {
        setApiError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setApiError(error.response.data?.message || 'Invalid credentials. Please try again.');
      } else if (error.request) {
        setApiError('Network error. Please check your connection.');
      } else {
        setApiError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Login - PredyxIQ</title>
      </Helmet>

      <div className="user-login-wrapper">
        <div className="user-login-overlay">
          <div className="user-login-container">
            <div className="user-login-card">
              <div className="user-login-header">
                <div className="user-login-logo">
                  <img src={logo} alt="PredyxIQ" />
                </div>
                <h2>Welcome Back!</h2>
                <p>Sign in to access your dashboard</p>
              </div>

              <div className="user-login-body">
                {apiError && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle"></i> {apiError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={toggleShowPassword}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                      />
                      <span className="checkmark"></span>
                      Remember Me
                    </label>
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </div>

                  <button 
                    type="submit" 
                    className="login-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <div className="user-login-footer">
                  <p>
                    Don't have an account? <Link to="/register">Register now</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;