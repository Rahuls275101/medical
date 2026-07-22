// component/user/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../../config';
import './UserDashboard.css';

const UserDashboard = () => {
  // ✅ URL se user ID lo
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProfile(id);
    } else {
      // Agar URL mein ID nahi hai to localStorage se lo
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.patient_id) {
          fetchProfile(user.patient_id);
        } else {
          setError('User ID not found');
          setLoading(false);
        }
      } else {
        setError('Please login to continue');
        setLoading(false);
      }
    }
  }, [id]);

  // ✅ ID ke through profile fetch karo
  const fetchProfile = async (userId) => {
    setLoading(true);
    try {
      // ✅ Direct API call with user ID (NO TOKEN)
      const response = await axios.get(`${apiBaseUrl}/patient/profile/${userId}`);

      console.log('Profile Response:', response.data);

      if (response.data.status === true) {
        setUserData(response.data.data);
        // Update local storage
        localStorage.setItem('user', JSON.stringify(response.data.data));
      } else {
        setError(response.data.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem('authenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('rememberMe');
    
    // Close modal
    setShowLogoutModal(false);
    
    // Redirect to login page
    navigate('/login');
  };

  // ✅ Confirm Logout
  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  if (loading) {
    return (
      <div className="user-dashboard-loading">
        <div className="spinner-border text-primary"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-dashboard-error">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
        <Link to="/login" className="btn btn-primary">
          <i className="fas fa-sign-in-alt"></i> Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Dashboard - PredyxIQ</title>
      </Helmet>

      <div className="user-dashboard-wrapper">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <div className="welcome-content">
            <h1>
              Welcome back, <span>{userData?.name || 'User'}!</span>
            </h1>
            <p>Here's what's happening with your health journey</p>
          </div>
          <div className="welcome-actions">
            <button onClick={confirmLogout} className="btn btn-danger">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
            <Link to={`/user/profile/${userData?.patient_id}`} className="btn btn-primary">
              <i className="fas fa-user"></i> My Profile
            </Link>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card-content" style={{ backgroundColor: '#e8f4fd' }}>
              <div className="stat-icon" style={{ color: '#3498db' }}>
                <i className="fas fa-user"></i>
              </div>
              <div className="stat-info">
                <h3>{userData?.name || 'N/A'}</h3>
                <p>Full Name</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content" style={{ backgroundColor: '#e8f8ee' }}>
              <div className="stat-icon" style={{ color: '#2ecc71' }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="stat-info">
                <h3>{userData?.email || 'N/A'}</h3>
                <p>Email</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content" style={{ backgroundColor: '#fff4e8' }}>
              <div className="stat-icon" style={{ color: '#f39c12' }}>
                <i className="fas fa-phone"></i>
              </div>
              <div className="stat-info">
                <h3>{userData?.mobile || 'N/A'}</h3>
                <p>Mobile</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content" style={{ backgroundColor: '#f0e8ff' }}>
              <div className="stat-icon" style={{ color: '#9b59b6' }}>
                <i className="fas fa-id-card"></i>
              </div>
              <div className="stat-info">
                <h3>#{userData?.patient_id || 'N/A'}</h3>
                <p>Patient ID</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="dashboard-activity">
          <div className="activity-header">
            <h3>Profile Details</h3>
            <Link to={`/user/profile/${userData?.patient_id}`} className="view-all">Edit Profile</Link>
          </div>
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Patient ID:</span>
              <span className="detail-value">#{userData?.patient_id || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{userData?.name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData?.email || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mobile:</span>
              <span className="detail-value">{userData?.mobile || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{userData?.address || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">City:</span>
              <span className="detail-value">{userData?.city || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">State:</span>
              <span className="detail-value">{userData?.state || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">PIN Code:</span>
              <span className="detail-value">{userData?.pin_code || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`badge ${userData?.status === 1 ? 'badge-success' : 'badge-danger'}`}>
                {userData?.status === 1 ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Joined:</span>
              <span className="detail-value">
                {userData?.created_at ? new Date(userData.created_at).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link to={`/user/profile/${userData?.patient_id}`} className="quick-action">
              <i className="fas fa-user-edit"></i>
              <span>Edit Profile</span>
            </Link>
            <Link to={`/user/settings/${userData?.patient_id}`} className="quick-action">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
            <Link to={`/user/appointments/${userData?.patient_id}`} className="quick-action">
              <i className="fas fa-calendar-plus"></i>
              <span>Book Appointment</span>
            </Link>
            <Link to={`/user/reports/${userData?.patient_id}`} className="quick-action">
              <i className="fas fa-file-medical"></i>
              <span>View Reports</span>
            </Link>
            <Link to={`/user/messages/${userData?.patient_id}`} className="quick-action">
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </Link>
            <button onClick={confirmLogout} className="quick-action logout-action">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-sign-out-alt text-danger"></i> Confirm Logout
              </h3>
              <button className="modal-close" onClick={() => setShowLogoutModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
              <p className="text-muted">You will need to login again to access your dashboard.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;