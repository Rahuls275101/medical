import React, { useEffect, useState } from 'react';
import { baseUrl,apiBaseUrl } from '../../config'; 
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios';

const Cmspage = () => {
  const [loading, setLoading] = useState(true);
  const [cms, setCms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState(null);
 
 const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('success');

  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(true);

   useEffect(() => {
    if (successMessage) {
      // After 2 seconds, hide the success message
      const timer = setTimeout(() => {
        setDisplaySuccessMessage(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    fetchCms();
  }, [currentPage]);

  const fetchCms = async () => {
    try {
      const response = await axios.get(apiBaseUrl+'/api/get-cms', {
        params: {
          per_page: 4, // Number of items per page
          page: currentPage, // Current page number
        },
      });
      setCms(response.data.cms_pages);
      setTotalPages(response.data.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Cms Page</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                     {displaySuccessMessage && successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
                    <table id="main_category" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#S.No</th>
                          <th>Image</th>
                          <th>Page Name</th>
                          <th>Title</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cms.map((cms) => (
                          <tr key={cms.banner_id}>
                            <td style={{ textAlign: 'center' }}>1</td>
                            <td style={{ textAlign: 'center' }}>
                              {cms.cms_image ? (
                                <img
                                  src={apiBaseUrl+`/assets/images/${cms.cms_image}`}
                                  style={{ height: '100px', width: '100px' }}
                                  alt="Category Image"
                                />
                              ) : (
                                ''
                              )}
                            </td>
                            <td style={{ textAlign: 'center' }} contentEditable>
                              {cms.cms_page_name}
                            </td>
                            <td style={{ textAlign: 'center' }}>{cms.cms_page_heading}</td>
                            <td style={{ textAlign: 'center' }}>
                              <Link
                                to={baseUrl+`/cms-pages/${cms.cms_id}`}
                                className="btn btn-info btn-xs editRecordCategory"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {renderPagination()}
                 
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
