// component/user/UserRegister.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../../config';

import logo from '../../images/logo.png';

const UserRegister = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',      // ✅ phone se mobile kiya (database column match)
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('user-register-page');
    return () => {
      document.body.classList.remove('user-register-page');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (apiError) setApiError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    // ✅ Name validation
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // ✅ Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // ✅ Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // ✅ Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // ✅ Mobile validation (required)
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // ✅ Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      // ✅ API call to patient/register
      const response = await axios.post(`${apiBaseUrl}/patient/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile
      });

      console.log('Registration Response:', response.data);

      if (response.data.status === true) {
        setSuccessMessage('Registration successful! Redirecting to dashboard...');
        
        // ✅ Auto login after registration
        setTimeout(() => {
          // Store user data
          if (response.data.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
          }
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('userRole', 'user');
          
          if (onLogin) {
            onLogin();
          }
          navigate('/user/dashboard');
        }, 2000);
      } else {
        setApiError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        setApiError(error.response.data?.message || 'Registration failed. Please try again.');
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
        <title>User Registration - PredyxIQ</title>
      </Helmet>

      <div className="user-register-wrapper">
        <div className="user-register-overlay">
          <div className="user-register-container">
            <div className="user-register-card">
              <div className="user-register-header">
                <div className="user-register-logo">
                  <img src={logo} alt="PredyxIQ" />
                </div>
                <h2>Create Account</h2>
                <p>Join us and start your health journey</p>
              </div>

              <div className="user-register-body">
                {apiError && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle"></i> {apiError}
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle"></i> {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* ✅ Full Name */}
                  <div className="form-group">
                    <label>Full Name <span className="required">*</span></label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* ✅ Email */}
                  <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* ✅ Mobile Number */}
                  <div className="form-group">
                    <label>Mobile Number <span className="required">*</span></label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-phone"></i>
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>

                  {/* ✅ Password */}
                  <div className="form-group">
                    <label>Password <span className="required">*</span></label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                    <small className="password-hint">
                      Must be at least 6 characters long
                    </small>
                  </div>

                  {/* ✅ Confirm Password */}
                  <div className="form-group">
                    <label>Confirm Password <span className="required">*</span></label>
                    <div className="input-group">
                      <span className="input-group-icon">
                        <i className="fas fa-check-circle"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* ✅ Terms & Conditions */}
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
                      <span className="required">*</span>
                    </label>
                    {errors.agreeTerms && (
                      <div className="invalid-feedback">{errors.agreeTerms}</div>
                    )}
                  </div>

                  {/* ✅ Submit Button */}
                  <button 
                    type="submit" 
                    className="register-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <div className="user-register-footer">
                  <p>
                    Already have an account? <Link to="/login">Sign in</Link>
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

export default UserRegister;