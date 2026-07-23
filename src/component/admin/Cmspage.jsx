// pages/Cmspage.jsx - Updated with API integration
import React, { useEffect, useState } from 'react';
import { baseUrl, apiBaseUrl,apiUrl } from '../../config';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Cmspage = () => {
  const [loading, setLoading] = useState(true);
  const [cms, setCms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('success');
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(true);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setDisplaySuccessMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    fetchCms();
  }, [currentPage]);

  const fetchCms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}/get-cms`, {
        params: {
          per_page: perPage,
          page: currentPage,
          search: search || undefined
        },
      });

      if (response.data.status) {
        setCms(response.data.cms_pages || []);
        setTotalPages(response.data.pagination?.total_pages || 0);
        setTotalItems(response.data.pagination?.total || 0);
      } else {
        setError(response.data.message || 'Failed to fetch CMS pages');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching CMS pages:', error);
      setError('Failed to load CMS pages. Please try again.');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCms();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const response = await axios.delete(`${apiBaseUrl}/deleteCms/${id}`);
        if (response.data.status) {
          // Refresh list
          fetchCms();
          setDisplaySuccessMessage(true);
          // Show success message
          const successMsg = response.data.message || 'CMS page deleted successfully';
          setDisplaySuccessMessage(true);
          // You can add a success toast here
        } else {
          alert(response.data.message || 'Failed to delete CMS page');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete CMS page. Please try again.');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const action = newStatus === 1 ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${action} this CMS page?`)) {
      try {
        const response = await axios.patch(`${apiBaseUrl}/toggleCmsStatus/${id}`, {
          status: newStatus
        });
        if (response.data.status) {
          fetchCms();
        } else {
          alert(response.data.message || 'Failed to update status');
        }
      } catch (error) {
        console.error('Toggle status error:', error);
        alert('Failed to update status. Please try again.');
      }
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination" style={{ float: 'right' }}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(1)}>
            &laquo; First
          </button>
        </li>

        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            &lt; Previous
          </button>
        </li>

        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => handlePageChange(number)}>
              {number}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next &gt;
          </button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(totalPages)}>
            Last &raquo;
          </button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">CMS Pages</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to={baseUrl + '/dashboard'}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">CMS Pages</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-6">
                        {/* <Link to={baseUrl + '/create-cms'} className="btn btn-primary">
                          <i className="fas fa-plus"></i> Create New Page
                        </Link> */}
                      </div>
                      <div className="col-md-6">
                        <form onSubmit={handleSearch} className="form-inline float-right">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search pages..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="input-group-append">
                              <button className="btn btn-primary" type="submit">
                                <i className="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {displaySuccessMessage && successMessage && (
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fas fa-check-circle"></i> {successMessage}
                        <button
                          type="button"
                          className="close"
                          onClick={() => setDisplaySuccessMessage(false)}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                    )}

                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle"></i> {error}
                        <button
                          type="button"
                          className="close"
                          onClick={() => setError(null)}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                    )}

                    {loading ? (
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <p>Loading CMS pages...</p>
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th style={{ width: '50px' }}>#S.No</th>
                                <th style={{ width: '120px' }}>Image</th>
                                <th>Page Name</th>
                                <th>Title</th>
                                <th style={{ width: '80px' }}>Status</th>
                                <th style={{ width: '150px' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cms.length > 0 ? (
                                cms.map((page, index) => (
                                  <tr key={page.cms_id}>
                                    <td style={{ textAlign: 'center' }}>
                                      {(currentPage - 1) * perPage + index + 1}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      {page.cms_image ? (
                                        <img
                                          src={`${apiBaseUrl}/assets/images/${page.cms_image}`}
                                          style={{ height: '60px', width: '60px', objectFit: 'cover' }}
                                          alt={page.cms_page_name}
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '';
                                          }}
                                        />
                                      ) : (
                                        <span className="text-muted">No Image</span>
                                      )}
                                    </td>
                                    <td>
                                      <strong>{page.cms_page_name}</strong>
                                      <br />
                                      <small className="text-muted">Slug: {page.cms_slug}</small>
                                    </td>
                                    <td>{page.cms_page_heading}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <span className={`badge badge-${page.status === 1 ? 'success' : 'danger'}`}>
                                        {page.status === 1 ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      <Link
                                        to={`${baseUrl}/admin/cms-pages/${page.cms_id}`}
                                        className="btn btn-info btn-sm"
                                        title="Edit"
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Link>
                                      <button
                                        onClick={() => handleToggleStatus(page.cms_id, page.status)}
                                        className={`btn btn-${page.status === 1 ? 'warning' : 'success'} btn-sm ml-1`}
                                        title={page.status === 1 ? 'Deactivate' : 'Activate'}
                                      >
                                        <i className={`fas fa-${page.status === 1 ? 'pause' : 'play'}`}></i>
                                      </button>
                                  
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center text-muted py-4">
                                    <i className="fas fa-inbox fa-2x d-block"></i>
                                    <p>No CMS pages found</p>
                                    <Link to={baseUrl + '/create-cms'} className="btn btn-primary btn-sm">
                                      Create New Page
                                    </Link>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {totalItems > 0 && (
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <p className="text-muted">
                                Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, totalItems)} of {totalItems} entries
                              </p>
                            </div>
                            <div className="col-md-6">
                              {renderPagination()}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cmspage;