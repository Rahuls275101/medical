import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';

const Doctors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    education: '',
    expertise: '',
    specialization: '',
    experience_years: '',
    consultation_fee: '',
    available_days: '',
    available_time: '',
    description: '',
    status: '1'
  });

  useEffect(() => {
    fetchDoctors();
  }, [currentPage]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiBaseUrl + '/doctors', {
        params: {
          page: currentPage,
          limit: 10
        }
      });
      setDoctors(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching doctors:', error);
      alert('Failed to fetch doctors');
    }
  };

  const createDoctor = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await axios.post(apiBaseUrl + '/doctor/create', data);
      if (response.data.status) {
        alert('Doctor created successfully!');
        closeModal();
        fetchDoctors();
        resetForm();
      } else {
        alert(response.data.message || 'Failed to create doctor');
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
      alert(error.response?.data?.message || 'Error creating doctor');
    }
  };

  const updateDoctor = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await axios.put(
        apiBaseUrl + `/doctor/${selectedDoctor.id}`,
        data
      );
      if (response.data.status) {
        alert('Doctor updated successfully!');
        closeEditModal();
        fetchDoctors();
      } else {
        alert(response.data.message || 'Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert(error.response?.data?.message || 'Error updating doctor');
    }
  };

  const deleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    try {
      const response = await axios.delete(
        apiBaseUrl + `/doctor/${doctorId}`
      );
      if (response.data.status) {
        alert('Doctor deleted successfully!');
        fetchDoctors();
      } else {
        alert(response.data.message || 'Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert(error.response?.data?.message || 'Error deleting doctor');
    }
  };

  const toggleStatus = async (doctorId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const response = await axios.put(
        apiBaseUrl + `/doctor/${doctorId}/toggle-status`,
        { status: newStatus }
      );
      if (response.data.status) {
        alert(response.data.message);
        fetchDoctors();
      } else {
        alert(response.data.message || 'Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert(error.response?.data?.message || 'Error toggling status');
    }
  };

  const editRecord = (doctor) => {
    console.log('Editing doctor:', doctor); // Debug log
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name || '',
      email: doctor.email || '',
      phone: doctor.phone || '',
      address: doctor.address || '',
      city: doctor.city || '',
      state: doctor.state || '',
      pin_code: doctor.pin_code || '',
      education: doctor.education || '',
      expertise: doctor.expertise || '',
      specialization: doctor.specialization || '',
      experience_years: doctor.experience_years || '',
      consultation_fee: doctor.consultation_fee || '',
      available_days: doctor.available_days || '',
      available_time: doctor.available_time || '',
      description: doctor.description || '',
      status: doctor.status?.toString() || '1'
    });
    openEditModal();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pin_code: '',
      education: '',
      expertise: '',
      specialization: '',
      experience_years: '',
      consultation_fee: '',
      available_days: '',
      available_time: '',
      description: '',
      status: '1'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    setSelectedDoctor(null);
    resetForm();
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
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Doctor Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Doctors</li>
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
                    <i className="fas fa-plus"></i> Add Doctor
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
                            <th>Specialization</th>
                            <th>Experience</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctors.length > 0 ? (
                            doctors.map((doctor, index) => (
                              <tr key={doctor.id}>
                                <td style={{ textAlign: 'center' }}>
                                  {(currentPage - 1) * 10 + index + 1}
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.specialization || 'N/A'}</td>
                                <td>{doctor.experience_years || 'N/A'} yrs</td>
                                <td>₹{doctor.consultation_fee || 'N/A'}</td>
                                <td style={{ textAlign: 'center' }}>
                                  <span
                                    className={`badge badge-${doctor.status === 1 ? 'success' : 'danger'}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleStatus(doctor.id, doctor.status)}
                                  >
                                    {doctor.status === 1 ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <button
                                    className="btn btn-info btn-sm mr-1"
                                    onClick={() => editRecord(doctor)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteDoctor(doctor.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center">
                                No doctors found
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
              <h5 className="modal-title">Create Doctor</h5>
              <button
                type="button"
                className="close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={createDoctor}>
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
                      <label>Phone *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Specialization</label>
                      <input
                        type="text"
                        className="form-control"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Experience (Years)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience_years"
                        value={formData.experience_years}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Consultation Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        name="consultation_fee"
                        value={formData.consultation_fee}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Education</label>
                      <textarea
                        className="form-control"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Expertise</label>
                      <textarea
                        className="form-control"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Available Days</label>
                      <input
                        type="text"
                        className="form-control"
                        name="available_days"
                        placeholder="Mon, Wed, Fri"
                        value={formData.available_days}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Available Time</label>
                      <input
                        type="text"
                        className="form-control"
                        name="available_time"
                        placeholder="9:00 AM - 5:00 PM"
                        value={formData.available_time}
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
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Added */}
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
              <h5 className="modal-title">Update Doctor</h5>
              <button
                type="button"
                className="close"
                onClick={closeEditModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateDoctor}>
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
                      <label>Phone *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Specialization</label>
                      <input
                        type="text"
                        className="form-control"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Experience (Years)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience_years"
                        value={formData.experience_years}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Consultation Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        name="consultation_fee"
                        value={formData.consultation_fee}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Education</label>
                      <textarea
                        className="form-control"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Expertise</label>
                      <textarea
                        className="form-control"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Available Days</label>
                      <input
                        type="text"
                        className="form-control"
                        name="available_days"
                        placeholder="Mon, Wed, Fri"
                        value={formData.available_days}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Available Time</label>
                      <input
                        type="text"
                        className="form-control"
                        name="available_time"
                        placeholder="9:00 AM - 5:00 PM"
                        value={formData.available_time}
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
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Doctor
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
    </div>
  );
};

export default Doctors;