// pages/Assessments.jsx
import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';


const Assessments = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    fetchReports();
  }, [currentPage]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus) params.append('status', filterStatus);

      const response = await axios.get(`${apiBaseUrl}/reports?${params}`);
      
      if (response.data.success) {
        setReports(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 0);
        setTotalReports(response.data.pagination?.total || 0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching reports:', error);
      alert('Failed to fetch reports');
    }
  };

  const viewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
    document.body.classList.add('modal-open');
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setSelectedReport(null);
    document.body.classList.remove('modal-open');
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchReports();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getBandColor = (band) => {
    if (!band) return '#6c757d';
    switch(band.toLowerCase()) {
      case 'low': return '#28a745';
      case 'mild': return '#ffc107';
      case 'moderate': return '#fd7e14';
      case 'high': return '#dc3545';
      case 'very high': return '#c00';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    if (!priority) return 'secondary';
    if (priority === 'Urgent Review') return 'danger';
    if (priority === 'High Review') return 'danger';
    if (priority === 'High') return 'warning';
    if (priority === 'Moderate') return 'info';
    return 'success';
  };

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
              <h1 className="m-0">Patient Reports</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Reports</li>
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
                    <div className="col-md-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by patient name, mobile..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" onClick={handleSearch}>
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        value={filterStatus}
                        onChange={(e) => {
                          setFilterStatus(e.target.value);
                          setCurrentPage(1);
                          fetchReports();
                        }}
                      >
                        <option value="">All Risk Bands</option>
                        <option value="Low">Low</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Very High">Very High</option>
                      </select>
                    </div>
                    <div className="col-md-5 text-right">
                      <span className="badge badge-info p-2" style={{ fontSize: '14px' }}>
                        <i className="fas fa-file-medical"></i> Total: {totalReports} Reports
                      </span>
                      <button 
                        className="btn btn-sm btn-primary ml-2" 
                        onClick={fetchReports}
                      >
                        <i className="fas fa-sync"></i> Refresh
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-center">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>
                      <p>Loading reports...</p>
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                          <thead>
                            <tr>
                              <th style={{ width: '50px' }}>#</th>
                              <th>Patient Name</th>
                              <th>Mobile</th>
                              <th>PBS Score</th>
                              <th>Risk Band</th>
                              <th>Priority</th>
                              <th>Date</th>
                              <th style={{ width: '80px' }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.length > 0 ? (
                              reports.map((report, index) => {
                                const rawInputs = report.raw_inputs || {};
                                const patient = report.patient || {};
                                
                                return (
                                  <tr key={report.assessment_id}>
                                    <td style={{ textAlign: 'center' }}>
                                      {(currentPage - 1) * 10 + index + 1}
                                    </td>
                                    <td>
                                      <strong>{patient.name || rawInputs.patient_name || 'N/A'}</strong>
                                    </td>
                                    <td>{patient.mobile || rawInputs.mobile_number || 'N/A'}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                                      {report.pbs || 0}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: getBandColor(report.risk_band),
                                          color: 'white',
                                          padding: '5px 12px',
                                          fontSize: '12px'
                                        }}
                                      >
                                        {report.risk_band || 'N/A'}
                                      </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      <span className={`badge badge-${getPriorityColor(report.priority)}`}>
                                        {report.priority || 'N/A'}
                                      </span>
                                    </td>
                                    <td>
                                      {report.created_at 
                                        ? new Date(report.created_at).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })
                                        : 'N/A'
                                      }
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => viewReport(report)}
                                        title="View Report"
                                      >
                                        <i className="fas fa-eye"></i> view
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  <i className="fas fa-inbox fa-2x d-block mb-2"></i>
                                  No reports found
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

      {/* Report View Modal - Bootstrap 4 */}
      {showReportModal && selectedReport && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          role="dialog"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'block',
            overflowY: 'auto',
            zIndex: 1055,
            paddingRight: '17px'
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ background: '#1a237e', color: 'white' }}>
                <h5 className="modal-title">
                  <i className="fas fa-file-medical-alt"></i> Patient Report
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeReportModal}
                  style={{ color: 'white' }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {(() => {
                  const rawInputs = selectedReport.raw_inputs || {};
                  const derived = selectedReport.derived || {};
                  const domainScores = selectedReport.domain_scores || {};
                  const patient = selectedReport.patient || {};
                  const topDrivers = selectedReport.top_drivers || [];
                  const recommendations = selectedReport.recommendations || [];

                  return (
                    <div style={{ padding: '10px' }}>
                      {/* Header */}
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '15px', 
                        borderBottom: '2px solid #1a237e',
                        marginBottom: '20px'
                      }}>
                        <h2 style={{ color: '#1a237e', margin: 0 }}>Predyx Quick Assessment Report</h2>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          gap: '20px', 
                          marginTop: '10px', 
                          fontSize: '12px', 
                          color: '#666' 
                        }}>
                          <span><strong>Report ID:</strong> {selectedReport.assessment_code || selectedReport.assessment_id || 'N/A'}</span>
                          <span><strong>Date:</strong> {selectedReport.created_at ? new Date(selectedReport.created_at).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>

                      {/* Score Card */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '12px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                          <span style={{ fontSize: '48px', fontWeight: '700', color: '#1a237e' }}>
                            {selectedReport.pbs || 0}
                          </span>
                          <span style={{ fontSize: '16px', color: '#666' }}>PBS Score</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: getBandColor(selectedReport.risk_band),
                              color: 'white',
                              padding: '5px 20px',
                              borderRadius: '20px',
                              fontWeight: '600',
                              fontSize: '16px'
                            }}
                          >
                            {selectedReport.risk_band || 'Unknown'}
                          </span>
                          <span className={`badge badge-${getPriorityColor(selectedReport.priority)}`}>
                            Priority: {selectedReport.priority || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      {/* Patient Info & Measurements */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '15px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                          <h5 style={{ marginTop: 0, color: '#1a237e' }}>👤 Patient Information</h5>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '14px' }}>
                            <div><strong>Name:</strong> {patient.name || rawInputs.patient_name || 'N/A'}</div>
                            <div><strong>Age:</strong> {patient.age || rawInputs.age || 'N/A'}</div>
                            <div><strong>Sex:</strong> {patient.sex || rawInputs.sex || 'N/A'}</div>
                            <div><strong>Mobile:</strong> {patient.mobile || rawInputs.mobile_number || 'N/A'}</div>
                            {patient.email && <div><strong>Email:</strong> {patient.email}</div>}
                          </div>
                        </div>

                        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                          <h5 style={{ marginTop: 0, color: '#1a237e' }}>📏 Measurements</h5>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '14px' }}>
                            <div><strong>Height:</strong> {rawInputs.height_cm || 'N/A'} cm</div>
                            <div><strong>Weight:</strong> {rawInputs.weight_kg || 'N/A'} kg</div>
                            <div><strong>BMI:</strong> {derived.bmi || 'N/A'} ({derived.bmi_category || 'N/A'})</div>
                            <div><strong>Waist:</strong> {rawInputs.waist_cm || 'N/A'} cm</div>
                            <div><strong>Hip:</strong> {rawInputs.hip_cm || 'N/A'} cm</div>
                            <div><strong>WHR:</strong> {derived.whr || 'N/A'}</div>
                            <div><strong>WHtR:</strong> {derived.whtr || 'N/A'}</div>
                            <div><strong>SBP:</strong> {rawInputs.sbp_mmHg || 'N/A'} mmHg</div>
                          </div>
                        </div>
                      </div>

                      {/* Domain Scores */}
                      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                        <h5 style={{ marginTop: 0, color: '#1a237e' }}>📈 Domain Scores</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                          <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
                            <div><strong>Constitutional</strong></div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>{domainScores.constitutional || 0}/15</div>
                          </div>
                          <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
                            <div><strong>Adiposity</strong></div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>{domainScores.adiposity || 0}/30</div>
                          </div>
                          <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
                            <div><strong>Hemodynamic</strong></div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>{domainScores.hemodynamic || 0}/15</div>
                          </div>
                          <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
                            <div><strong>Behaviour</strong></div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>{domainScores.behaviour || 0}/10</div>
                          </div>
                          <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
                            <div><strong>Disease</strong></div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>{domainScores.disease || 0}/30</div>
                          </div>
                        </div>
                      </div>

                      {/* Top Drivers */}
                      {topDrivers.length > 0 && (
                        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                          <h5 style={{ marginTop: 0, color: '#1a237e' }}>🎯 Top Risk Drivers</h5>
                          {topDrivers.map((driver, i) => (
                            <div key={i} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              padding: '8px 12px', 
                              background: 'white', 
                              borderRadius: '4px', 
                              marginBottom: '5px',
                              borderLeft: '4px solid #1a237e'
                            }}>
                              <span>{i+1}. {driver.label || 'Unknown'}</span>
                              <span style={{ fontWeight: '600', color: '#dc3545' }}>+{driver.points || 0}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interpretation */}
                      {selectedReport.interpretation && (
                        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                          <h5 style={{ marginTop: 0, color: '#1a237e' }}>💬 Clinical Interpretation</h5>
                          <p style={{ background: 'white', padding: '15px', borderRadius: '4px', margin: 0, lineHeight: '1.6' }}>
                            {selectedReport.interpretation}
                          </p>
                        </div>
                      )}

                      {/* Recommendations */}
                      {recommendations.length > 0 && (
                        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                          <h5 style={{ marginTop: 0, color: '#1a237e' }}>💡 Recommendations</h5>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {recommendations.map((rec, i) => (
                              <li key={i} style={{ 
                                padding: '8px 15px', 
                                background: 'white', 
                                borderRadius: '4px', 
                                marginBottom: '5px',
                                borderLeft: '4px solid #28a745'
                              }}>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{ 
                        textAlign: 'center', 
                        paddingTop: '15px', 
                        borderTop: '1px solid #eee',
                        fontSize: '12px',
                        color: '#888'
                      }}>
                        <p>⚠️ This is a screening report, not a diagnosis. Please consult your doctor for medical advice.</p>
                        <p style={{ fontSize: '11px', color: '#aaa' }}>
                          Engine: Predyx Quick v1.0 | Report ID: {selectedReport.assessment_code || selectedReport.assessment_id || 'N/A'}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeReportModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
