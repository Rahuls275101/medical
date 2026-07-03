import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';

const SubAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subAdmins, setSubAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    designation: '',
    description: '',
    status: '1'
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchSubAdmins();
  }, [currentPage]);

  // Fetch all sub admins
  const fetchSubAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiBaseUrl + '/sub-admins', {
        params: {
          page: currentPage,
          limit: 10
        }
      });
      setSubAdmins(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching sub admins:', error);
      alert('Failed to fetch sub admins');
    }
  };

  // Create new sub admin
  const createSubAdmin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await axios.post(apiBaseUrl + '/sub-admin/create', data);
      if (response.data.status) {
        alert('Sub Admin created successfully!');
        closeModal();
        fetchSubAdmins();
        resetForm();
      } else {
        alert(response.data.message || 'Failed to create sub admin');
      }
    } catch (error) {
      console.error('Error creating sub admin:', error);
      alert(error.response?.data?.message || 'Error creating sub admin');
    }
  };

  // Update sub admin
  const updateSubAdmin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await axios.put(
        apiBaseUrl + `/sub-admin/${selectedSubAdmin.id}`,
        data
      );
      if (response.data.status) {
        alert('Sub Admin updated successfully!');
        closeEditModal();
        fetchSubAdmins();
      } else {
        alert(response.data.message || 'Failed to update sub admin');
      }
    } catch (error) {
      console.error('Error updating sub admin:', error);
      alert(error.response?.data?.message || 'Error updating sub admin');
    }
  };

  // Update password
  const updatePassword = async (adminId) => {
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.put(
        apiBaseUrl + `/sub-admin/${adminId}/password`,
        { password: newPassword }
      );
      if (response.data.status) {
        alert('Password updated successfully!');
        setNewPassword('');
      } else {
        alert(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert(error.response?.data?.message || 'Error updating password');
    }
  };

  // Delete sub admin
  const deleteSubAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this sub admin?')) {
      return;
    }

    try {
      const response = await axios.delete(
        apiBaseUrl + `/sub-admin/${adminId}`
      );
      if (response.data.status) {
        alert('Sub Admin deleted successfully!');
        fetchSubAdmins();
      } else {
        alert(response.data.message || 'Failed to delete sub admin');
      }
    } catch (error) {
      console.error('Error deleting sub admin:', error);
      alert(error.response?.data?.message || 'Error deleting sub admin');
    }
  };

  // Toggle status
  const toggleStatus = async (adminId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const response = await axios.put(
        apiBaseUrl + `/sub-admin/${adminId}/toggle-status`,
        { status: newStatus }
      );
      if (response.data.status) {
        alert(response.data.message);
        fetchSubAdmins();
      } else {
        alert(response.data.message || 'Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert(error.response?.data?.message || 'Error toggling status');
    }
  };

  // Open edit modal and set selected admin
  const editRecord = (subAdmin) => {
    setSelectedSubAdmin(subAdmin);
    setFormData({
      email: subAdmin.email,
      name: subAdmin.name,
      phone: subAdmin.phone || '',
      address: subAdmin.address || '',
      city: subAdmin.city || '',
      state: subAdmin.state || '',
      pin_code: subAdmin.pin_code || '',
      designation: subAdmin.designation || '',
      description: subAdmin.description || '',
      status: subAdmin.status?.toString() || '1'
    });
    setNewPassword(''); // Reset password field
    openEditModal();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pin_code: '',
      designation: '',
      description: '',
      status: '1'
    });
    setNewPassword('');
  };

  // Modal handlers
  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('modal-open');
  };
  
  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
    resetForm();
  };

  const openEditModal = () => {
    setIsEditOpen(true);
    document.body.classList.add('modal-open');
  };
  
  const closeEditModal = () => {
    setIsEditOpen(false);
    document.body.classList.remove('modal-open');
    setSelectedSubAdmin(null);
    resetForm();
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password change for edit modal
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Pagination
  const handlePageChange = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination" style={{ float: 'right' }}>
        {currentPage > 1 && (
          <li className="page-item" onClick={() => handlePageChange(1)}>
            <button className="page-link">&laquo; First</button>
          </li>
        )}
        {currentPage > 1 && (
          <li className="page-item" onClick={() => handlePageChange(currentPage - 1)}>
            <button className="page-link">&lt; Previous</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="page-item" onClick={() => handlePageChange(currentPage + 1)}>
            <button className="page-link">Next &gt;</button>
          </li>
        )}
        {currentPage < totalPages && (
          <li className="page-item" onClick={() => handlePageChange(totalPages)}>
            <button className="page-link">Last &raquo;</button>
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Sub Admin Management</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Sub Admins</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={openModal}
                    >
                      <i className="fas fa-plus"></i> Add Sub Admin
                    </button>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center">
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                      </div>
                    ) : (
                      <>
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Designation</th>
                              <th>City</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subAdmins.length > 0 ? (
                              subAdmins.map((admin, index) => (
                                <tr key={admin.id}>
                                  <td style={{ textAlign: 'center' }}>
                                    {(currentPage - 1) * 10 + index + 1}
                                  </td>
                                  <td>{admin.name}</td>
                                  <td>{admin.email}</td>
                                  <td>{admin.phone || 'N/A'}</td>
                                  <td>{admin.designation || 'N/A'}</td>
                                  <td>{admin.city || 'N/A'}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    <span
                                      className={`badge badge-${admin.status === 1 ? 'success' : 'danger'}`}
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => toggleStatus(admin.id, admin.status)}
                                    >
                                      {admin.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <button
                                      className="btn btn-info btn-sm mr-1"
                                      onClick={() => editRecord(admin)}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteSubAdmin(admin.id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  No sub admins found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {totalPages > 1 && renderPagination()}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Create Modal */}
      <div 
        className={`modal ${isOpen ? 'show d-block' : ''}`} 
        tabIndex="-1" 
        role="dialog"
        style={{ 
          backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isOpen ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Sub Admin</h5>
              <button
                type="button"
                className="close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={createSubAdmin}>
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
                      <label>Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength="6"
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Sub Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Fixed Password Type */}
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
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Sub Admin</h5>
              <button
                type="button"
                className="close"
                onClick={closeEditModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateSubAdmin}>
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Change Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="new_password"
                        placeholder="Enter new password (optional)"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        minLength="6"
                      />
                      <small className="text-muted d-block">Leave empty to keep current password</small>
                      {newPassword && newPassword.length >= 6 && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm mt-1"
                          onClick={() => updatePassword(selectedSubAdmin?.id)}
                        >
                          <i className="fas fa-key"></i> Update Password
                        </button>
                      )}
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Sub Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for modals */}
      {isOpen && <div className="modal-backdrop fade show"></div>}
      {isEditOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default SubAdmin;