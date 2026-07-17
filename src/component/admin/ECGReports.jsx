import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';

const ECGReports = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    patient_id: '',
    is_abnormal: '',
    date_from: '',
    date_to: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    report_date: '',
    notes: '',
    ecg_file: null
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchPatients();
    fetchDoctors();
  }, [currentPage, filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        ...filters
      };
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const response = await axios.get(apiBaseUrl + '/ecg', { params });
      setReports(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching ECG reports:', error);
      alert('Failed to fetch ECG reports');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiBaseUrl + '/patients');
      setPatients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(apiBaseUrl + '/doctors');
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PNG, JPG, and PDF files are allowed');
        e.target.value = '';
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        e.target.value = '';
        return;
      }
      setFormData({ ...formData, ecg_file: file });
    }
  };

  const uploadECGReport = async (event) => {
    event.preventDefault();
    
    if (!formData.ecg_file) {
      alert('Please select an ECG report file');
      return;
    }

    if (!formData.patient_id || !formData.doctor_id) {
      alert('Please select patient and doctor');
      return;
    }

    const data = new FormData();
    data.append('ecg_report', formData.ecg_file);
    data.append('patient_id', formData.patient_id);
    data.append('doctor_id', formData.doctor_id);
    data.append('report_date', formData.report_date || new Date().toISOString().split('T')[0]);
    data.append('notes', formData.notes || '');

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await axios.post(apiBaseUrl + '/ecg/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      if (response.data.status) {
        alert('ECG report uploaded successfully!');
        closeUploadModal();
        fetchReports();
        resetForm();
      } else {
        alert(response.data.message || 'Failed to upload ECG report');
      }
    } catch (error) {
      console.error('Error uploading ECG report:', error);
      alert(error.response?.data?.message || 'Error uploading ECG report');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this ECG report?')) {
      return;
    }

    try {
      const response = await axios.delete(apiBaseUrl + `/ecg/${reportId}`);
      if (response.data.status) {
        alert('ECG report deleted successfully!');
        fetchReports();
      } else {
        alert(response.data.message || 'Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert(error.response?.data?.message || 'Error deleting report');
    }
  };

  const downloadReport = async (reportId) => {
    try {
      const response = await axios.get(apiBaseUrl + `/ecg/${reportId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'ecg_report.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report');
    }
  };

  const viewReport = async (reportId) => {
    try {
      const response = await axios.get(apiBaseUrl + `/ecg/${reportId}`);
      if (response.data.status) {
        setSelectedReport(response.data.data);
        setIsViewOpen(true);
        document.body.classList.add('modal-open');
      }
    } catch (error) {
      console.error('Error fetching report details:', error);
      alert('Failed to fetch report details');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({
      patient_id: '',
      doctor_id: '',
      report_date: '',
      notes: '',
      ecg_file: null
    });
    const fileInput = document.getElementById('ecg_file');
    if (fileInput) fileInput.value = '';
  };

  const openUploadModal = () => {
    setIsUploadOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeUploadModal = () => {
    setIsUploadOpen(false);
    document.body.classList.remove('modal-open');
    resetForm();
    setUploading(false);
    setUploadProgress(0);
  };

  const closeViewModal = () => {
    setIsViewOpen(false);
    document.body.classList.remove('modal-open');
    setSelectedReport(null);
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'success') {
      return <span className="badge badge-success">Extracted</span>;
    } else if (status === 'failed') {
      return <span className="badge badge-danger">Failed</span>;
    } else {
      return <span className="badge badge-warning">Pending</span>;
    }
  };

  const getAbnormalBadge = (isAbnormal) => {
    if (isAbnormal === 1) {
      return <span className="badge badge-danger">Abnormal</span>;
    } else if (isAbnormal === 0) {
      return <span className="badge badge-success">Normal</span>;
    } else {
      return <span className="badge badge-secondary">Unknown</span>;
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) {
      return <i className="fas fa-file-pdf text-danger"></i>;
    } else if (fileType?.includes('image')) {
      return <i className="fas fa-file-image text-primary"></i>;
    } else {
      return <i className="fas fa-file"></i>;
    }
  };

  // Helper function to render JSON data in a table - displays ALL keys as-is
  const renderJSONData = (data) => {
    if (!data) return <p className="text-muted">No extracted data available</p>;

    // If data is a string, try to parse it
    let jsonData = data;
    if (typeof data === 'string') {
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        return <pre className="bg-light p-3 border rounded">{data}</pre>;
      }
    }

    // Get all keys from the JSON object
    const keys = Object.keys(jsonData);
    if (keys.length === 0) {
      return <p className="text-muted">No data extracted from this report</p>;
    }

    // Sort keys alphabetically
    const sortedKeys = keys.sort();

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-sm table-hover">
          <tbody>
            {sortedKeys.map(key => {
              const value = jsonData[key];
              let displayValue = value;

              // Handle objects (like extra, full_data)
              if (typeof value === 'object' && value !== null) {
                if (Object.keys(value).length === 0) {
                  displayValue = <span className="text-muted">-</span>;
                } else {
                  displayValue = <pre style={{ margin: 0, fontSize: '12px', maxHeight: '150px', overflow: 'auto' }}>
                    {JSON.stringify(value, null, 2)}
                  </pre>;
                }
              }

              // Handle null/undefined
              if (value === null || value === undefined) {
                displayValue = <span className="text-muted">-</span>;
              }

              // If value is boolean or number, convert to string
              if (typeof value === 'boolean' || typeof value === 'number') {
                displayValue = String(value);
              }

              // Format key: replace underscores with spaces and capitalize
              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

              return (
                <tr key={key}>
                  <td style={{ width: '35%', fontWeight: 'bold', backgroundColor: '#f8f9fa', verticalAlign: 'middle' }}>
                    {formattedKey}
                  </td>
                  <td style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {displayValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ECG Report Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">ECG Reports</li>
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
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={openUploadModal}
                      >
                        <i className="fas fa-upload"></i> Upload ECG Report
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-success btn-sm float-right"
                        onClick={fetchReports}
                      >
                        <i className="fas fa-sync"></i> Refresh
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="card-header border-top">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Patient</label>
                        <select
                          className="form-control form-control-sm"
                          name="patient_id"
                          value={filters.patient_id}
                          onChange={handleFilterChange}
                        >
                          <option value="">All Patients</option>
                          {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>
                              {patient.full_name} ({patient.mobile})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          className="form-control form-control-sm"
                          name="is_abnormal"
                          value={filters.is_abnormal}
                          onChange={handleFilterChange}
                        >
                          <option value="">All</option>
                          <option value="1">Abnormal</option>
                          <option value="0">Normal</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Date From</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="date_from"
                          value={filters.date_from}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Date To</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="date_to"
                          value={filters.date_to}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>&nbsp;</label>
                        <button
                          className="btn btn-warning btn-sm btn-block"
                          onClick={() => {
                            setFilters({ patient_id: '', is_abnormal: '', date_from: '', date_to: '' });
                            setCurrentPage(1);
                          }}
                        >
                          <i className="fas fa-undo"></i> Clear Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {loading ? (
                    <div className="text-center">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Patient</th>
                              <th>Doctor</th>
                              <th>Date</th>
                              <th>File</th>
                              <th>Heart Rate</th>
                              <th>QRS</th>
                              <th>Status</th>
                              <th>Extraction</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.length > 0 ? (
                              reports.map((report, index) => (
                                <tr key={report.id}>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {(currentPage - 1) * 10 + index + 1}
                                  </td>
                                  <td>
                                    <strong>{report.patient_name || 'N/A'}</strong><br/>
                                    <small className="text-muted">ID: {report.patient_id}</small>
                                  </td>
                                  <td>{report.doctor_name || 'N/A'}</td>
                                  <td>{formatDate(report.report_date)}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    {getFileIcon(report.file_type)}
                                    <br/>
                                    <small className="text-muted">
                                      {(report.file_size / 1024).toFixed(1)} KB
                                    </small>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {report.heart_rate ? (
                                      <span className="badge badge-info">
                                        {report.heart_rate} bpm
                                      </span>
                                    ) : 'N/A'}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {report.qrs_duration ? (
                                      <span className="badge badge-secondary">
                                        {report.qrs_duration} ms
                                      </span>
                                    ) : 'N/A'}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {getAbnormalBadge(report.is_abnormal)}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {getStatusBadge(report.extraction_status)}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        className="btn btn-info"
                                        onClick={() => viewReport(report.id)}
                                        title="View Details"
                                      >
                                        <i className="fas fa-eye"></i>
                                      </button>
                                      <button
                                        className="btn btn-success"
                                        onClick={() => downloadReport(report.id)}
                                        title="Download"
                                      >
                                        <i className="fas fa-download"></i>
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deleteReport(report.id)}
                                        title="Delete"
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="10" className="text-center">
                                  <div className="py-4">
                                    <i className="fas fa-file-medical fa-3x text-muted mb-2"></i>
                                    <p className="text-muted">No ECG reports found</p>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={openUploadModal}
                                    >
                                      <i className="fas fa-upload"></i> Upload First Report
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {totalPages > 1 && renderPagination()}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      <div 
        className={`modal ${isUploadOpen ? 'show d-block' : ''}`} 
        tabIndex="-1" 
        role="dialog"
        style={{ 
          backgroundColor: isUploadOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isUploadOpen ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-upload text-primary"></i> Upload ECG Report
              </h5>
              <button
                type="button"
                className="close"
                onClick={closeUploadModal}
                disabled={uploading}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={uploadECGReport}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Patient *</label>
                      <select
                        className="form-control"
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                        required
                        disabled={uploading}
                      >
                        <option value="">Select Patient</option>
                        {patients.map(patient => (
                          <option key={patient.id} value={patient.id}>
                            {patient.full_name} - {patient.mobile}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Doctor *</label>
                      <select
                        className="form-control"
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                        required
                        disabled={uploading}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            Dr. {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Report Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="report_date"
                        value={formData.report_date}
                        onChange={(e) => setFormData({ ...formData, report_date: e.target.value })}
                        disabled={uploading}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Select File *</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="ecg_file"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileChange}
                          disabled={uploading}
                          required
                        />
                        <label className="custom-file-label" htmlFor="ecg_file">
                          {formData.ecg_file ? formData.ecg_file.name : 'Choose ECG file...'}
                        </label>
                      </div>
                      <small className="text-muted">
                        <i className="fas fa-info-circle"></i> Supported: PNG, JPG, PDF (Max 10MB)
                      </small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Notes</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Enter any additional notes about the ECG report..."
                        disabled={uploading}
                      />
                    </div>
                  </div>
                </div>

                {uploading && (
                  <div className="mb-3">
                    <div className="progress">
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                    <small className="text-muted">Uploading and processing ECG report...</small>
                  </div>
                )}

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeUploadModal}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                    {uploading ? ' Uploading...' : ' Upload Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      <div 
        className={`modal ${isViewOpen ? 'show d-block' : ''}`} 
        tabIndex="-1" 
        role="dialog"
        style={{ 
          backgroundColor: isViewOpen ? 'rgba(0,0,0,0.5)' : 'transparent',
          display: isViewOpen ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-heartbeat text-danger"></i> ECG Report Details
              </h5>
              <button
                type="button"
                className="close"
                onClick={closeViewModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedReport && (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-info text-white">
                          <h6 className="mb-0">Patient Information</h6>
                        </div>
                        <div className="card-body">
                          <p><strong>Name:</strong> {selectedReport.patient_name || 'N/A'}</p>
                          <p><strong>Patient ID:</strong> {selectedReport.patient_id}</p>
                          <p><strong>Doctor:</strong> {selectedReport.doctor_name || 'N/A'}</p>
                          <p><strong>Report Date:</strong> {formatDate(selectedReport.report_date)}</p>
                          <p><strong>Uploaded:</strong> {new Date(selectedReport.uploaded_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-success text-white">
                          <h6 className="mb-0">File Information</h6>
                        </div>
                        <div className="card-body">
                          <p><strong>File Name:</strong> {selectedReport.file_name}</p>
                          <p><strong>File Type:</strong> {selectedReport.file_type}</p>
                          <p><strong>File Size:</strong> {(selectedReport.file_size / 1024).toFixed(2)} KB</p>
                          <p><strong>Extraction Status:</strong> {getStatusBadge(selectedReport.extraction_status)}</p>
                          <p>
                            <strong>Status:</strong> {getAbnormalBadge(selectedReport.is_abnormal)}
                            {selectedReport.is_abnormal === 1 && (
                              <span className="text-danger ml-2">(Abnormal ECG detected)</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header bg-warning">
                          <h6 className="mb-0">Extracted ECG Parameters</h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-info">
                                  <i className="fas fa-heart"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">Heart Rate</span>
                                  <span className="info-box-number">
                                    {selectedReport.heart_rate || 'N/A'}
                                    {selectedReport.heart_rate && ' bpm'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-success">
                                  <i className="fas fa-wave-square"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">PR Interval</span>
                                  <span className="info-box-number">
                                    {selectedReport.pr_interval || 'N/A'}
                                    {selectedReport.pr_interval && ' ms'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-primary">
                                  <i className="fas fa-arrow-right"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">QRS Duration</span>
                                  <span className="info-box-number">
                                    {selectedReport.qrs_duration || 'N/A'}
                                    {selectedReport.qrs_duration && ' ms'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-secondary">
                                  <i className="fas fa-clock"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">QT Interval</span>
                                  <span className="info-box-number">
                                    {selectedReport.qt_interval || 'N/A'}
                                    {selectedReport.qt_interval && ' ms'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-danger">
                                  <i className="fas fa-clock"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">QTc Interval</span>
                                  <span className="info-box-number">
                                    {selectedReport.qtc_interval || 'N/A'}
                                    {selectedReport.qtc_interval && ' ms'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box">
                                <span className="info-box-icon bg-warning">
                                  <i className="fas fa-chart-line"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">Axis</span>
                                  <span className="info-box-number">
                                    {selectedReport.axis || 'N/A'}
                                    {selectedReport.axis && '°'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="info-box">
                                <span className="info-box-icon bg-purple">
                                  <i className="fas fa-file-alt"></i>
                                </span>
                                <div className="info-box-content">
                                  <span className="info-box-text">Interpretation</span>
                                  <span className="info-box-number text-left" style={{ fontSize: '14px' }}>
                                    {selectedReport.interpretation || 'No interpretation available'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Extracted Data - JSON as Table */}
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">
                            <i className="fas fa-code"></i> Full Extracted Data (JSON)
                          </h6>
                          {selectedReport.extracted_data && (
                            <button 
                              className="btn btn-sm btn-outline-light"
                              onClick={() => {
                                const data = typeof selectedReport.extracted_data === 'string' 
                                  ? selectedReport.extracted_data 
                                  : JSON.stringify(selectedReport.extracted_data, null, 2);
                                navigator.clipboard?.writeText(data).then(() => {
                                  alert('Data copied to clipboard!');
                                }).catch(() => {});
                              }}
                            >
                              <i className="fas fa-copy"></i> Copy
                            </button>
                          )}
                        </div>
                        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                          {selectedReport.extracted_data ? (
                            renderJSONData(selectedReport.extracted_data)
                          ) : (
                            <p className="text-muted text-center my-3">
                              <i className="fas fa-info-circle"></i> No extracted data available for this report
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedReport.notes && (
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-header bg-secondary text-white">
                            <h6 className="mb-0">Additional Notes</h6>
                          </div>
                          <div className="card-body">
                            <p className="mb-0">{selectedReport.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row mt-3">
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-success"
                        onClick={() => downloadReport(selectedReport.id)}
                      >
                        <i className="fas fa-download"></i> Download Report
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          closeViewModal();
                          if (window.confirm('Are you sure you want to delete this report?')) {
                            deleteReport(selectedReport.id);
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i> Delete Report
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for modals */}
      {isUploadOpen && <div className="modal-backdrop fade show"></div>}
      {isViewOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ECGReports;