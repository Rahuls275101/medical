import React, { useEffect, useState } from 'react';
import { apiBaseUrl,apiUrl } from '../../config';
import axios from 'axios';

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    profile_image: ''
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: ''
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // Get admin ID from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setProfile(prev => ({ ...prev, id: user.id }));
        fetchProfile(user.id);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const fetchProfile = async (adminId) => {
    try {
      setLoading(true);
      const response = await axios.get(apiBaseUrl + `/profile/${adminId}`);
      if (response.data.status) {
        const data = response.data.data;
        setProfile(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pin_code: data.pin_code || ''
        });
        if (data.admin_image) {
          setPreviewUrl(apiUrl + data.admin_image);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile');
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        apiBaseUrl + `/profile/${profile.id}`,
        formData
      );
      if (response.data.status) {
        alert('Profile updated successfully!');
        setProfile(response.data.data);
        // Update localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          user.name = response.data.data.name;
          user.email = response.data.data.email;
          user.phone = response.data.data.phone;
          localStorage.setItem('user', JSON.stringify(user));
        }
        setIsEditOpen(false);
        fetchProfile(profile.id);
      } else {
        alert(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile');
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('New password and confirm password do not match');
      return;
    }

    if (passwordData.new_password.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.put(
        apiBaseUrl + `/profile/${profile.id}/password`,
        {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password
        }
      );
      if (response.data.status) {
        alert('Password updated successfully!');
        setIsPasswordOpen(false);
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        alert(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert(error.response?.data?.message || 'Error updating password');
    }
  };

  const updateProfileImage = async (event) => {
    event.preventDefault();
    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('profile_image', imageFile);

    try {
      const response = await axios.put(
        apiBaseUrl + `/profile/${profile.id}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.data.status) {
        alert('Profile image updated successfully!');
        setPreviewUrl(apiBaseUrl + response.data.data.profile_image);
        fetchProfile(profile.id);
      } else {
        alert(response.data.message || 'Failed to update profile image');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert(error.response?.data?.message || 'Error updating profile image');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Profile Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Profile Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={previewUrl || '/dist/img/avatar.png'}
                      alt="User profile picture"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="profile-username text-center">{profile.name || 'Admin'}</h3>
                  <p className="text-muted text-center">{profile.admin_type || 'Admin'}</p>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>Email</b> <a className="float-right">{profile.email}</a>
                    </li>
                    <li className="list-group-item">
                      <b>Phone</b> <a className="float-right">{profile.phone || 'N/A'}</a>
                    </li>
                    <li className="list-group-item">
                      <b>Location</b> <a className="float-right">{profile.city || 'N/A'}</a>
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => setIsEditOpen(true)}
                  >
                    <i className="fas fa-edit"></i> Edit Profile
                  </button>
                  <button
                    className="btn btn-warning btn-block mt-2"
                    onClick={() => setIsPasswordOpen(true)}
                  >
                    <i className="fas fa-key"></i> Change Password
                  </button>
                </div>
              </div>

              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Upload Profile Image</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={updateProfileImage}>
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <i className="fas fa-upload"></i> Upload Image
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link active" href="#profile" data-toggle="tab">
                        <i className="fas fa-user"></i> Profile Information
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#settings" data-toggle="tab">
                        <i className="fas fa-cog"></i> Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane active" id="profile">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.name || ''}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={profile.email || ''}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.phone || 'N/A'}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Admin Type</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.admin_type || 'Admin'}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={profile.address || 'N/A'}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.city || 'N/A'}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>State</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.state || 'N/A'}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Pin Code</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profile.pin_code || 'N/A'}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="settings">
                      <p className="text-muted">Settings options coming soon...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      <div
        className={`modal ${isEditOpen ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{
          backgroundColor: isEditOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isEditOpen ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="close" onClick={() => setIsEditOpen(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateProfile}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pin_code"
                        value={formData.pin_code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className={`modal ${isPasswordOpen ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{
          backgroundColor: isPasswordOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isPasswordOpen ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button type="button" className="close" onClick={() => setIsPasswordOpen(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updatePassword}>
                <div className="form-group">
                  <label>Current Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsPasswordOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for modals */}
      {isEditOpen && <div className="modal-backdrop fade show"></div>}
      {isPasswordOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ProfileSettings;