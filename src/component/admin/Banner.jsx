import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config'; 
import axios from 'axios';

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState(null);


  useEffect(() => {
    fetchBannes();
  }, [currentPage]);



  const editRecordBanner = (banner) => {
  setSelectedBanner(banner);
  openEditModal();
};


  const fetchBannes = async () => {
    try {
      const response = await axios.get(apiBaseUrl+'/api/get-banner', {
        params: {
          per_page: 4, // Number of items per page
          page: currentPage, // Current page number
        },
      });
      setBanner(response.data.banner);
      setTotalPages(response.data.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };


   const updateBanner = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/banner-update/${selectedBanner.banner_id}`, formData);
      // Category updated successfully
      closeeditModal();
      fetchBannes(); // Fetch categories again to reflect the updated changes
    } catch (error) {
      console.error('Error updating Banner:', error);
    }
  };

   const saveBanner = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/banner-process/`, formData);
      // Category updated successfully
      closeModal();
      fetchBannes(); // Fetch categories again to reflect the updated changes
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


    const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeeditModal = () => {
    setIsEditOpen(false);
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
                <h1 className="m-0">Banner</h1>
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
                  <a
                    href="javascript:void(0);"
                    style={{ width: '16%' }}
                    className="btn btn-block btn-primary btn-sm"
                    onClick={openModal}
                  >
                    Add Banner
                  </a>
                  <div className="card-body">
                    <table
                      id="main_category"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                           <th>#S.No</th>
                  <th>Banner Image</th>
                   <th>Page</th>
                  <th>Status</th>
                  <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banner.map((banner) => (



                          <tr key={banner.banner_id}>

                        <td style={{ textAlign: 'center' }}>
                              1
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <img
                                src={apiBaseUrl+`/assets/images/${banner.banner_image}`}
                                style={{ height: '100px', width: '100px' }}
                                alt="Category Image"
                              />
                            </td>
                            <td style={{ textAlign: 'center' }} contentEditable>
                              {banner.page}
                            </td>
                           
                          
                          
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className={`btn btn-${banner.banner_status_color} btn-xs`}
                              >
                                {banner.banner_status}
                              </a>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className="btn btn-info btn-xs editRecordCategory"
                              onClick={() => editRecordBanner(banner)}
                              >
                                Edit
                              </a>
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

      {/* Modal */}

 <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="addMainCategory"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
               Create Banner
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form
               role="form"
                  id="SavedMainCategory"
                  encType="multipart/form-data"
                 onSubmit={saveBanner}
              >
                <div className="card-body">
                  <div className="row">

          <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                         Banner Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_title"
                         
                          required=""
                        />
                      </div>
                    </div>

                       <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status*</label>
                        <select className="form-control" name="banner_status"
                          required="" 
    
                        >
                          <option value="Active" >Active</option>
                          <option value="Inactive" >Inactive</option>
                        </select>
                      </div>
                    </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Menu Bnner Image</label>
                    <input type="file" class="form-control" name="home_banner"/>
              
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Description</label>
                  <input type="text" class="form-control" name="description" id="edit_categoryTitle"/>
                  </div>
                  </div>

                   <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Page*</label>
                        <select className="form-control" name="page"
                          required=""
                        >
                         <option value="Home" >Home</option>
                         
                        </select>
                      </div>
                    </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Redirect Url</label>
                  <input type="text" class="form-control" name="redirect_url"  id="edit_categoryDescription"/>
                  </div>
                  </div>



  <div>
                
                  <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                  
             
                    {/* ...other fields */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



       <div
        className={`modal fade ${isEditOpen ? 'show' : ''}`}
        id="addMainCategory"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
        style={{ display: isEditOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
               Update Banner
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeeditModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form
               role="form"
                  id="SavedMainCategory"
                  encType="multipart/form-data"
                 onSubmit={updateBanner}
              >
                <div className="card-body">
                  <div className="row">

          <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                         Banner Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="edit_banner_first_name"
                          value={selectedBanner ? selectedBanner.banner_first_title : ''}
                           onChange={(e) => setSelectedBanner((prevState) => ({
      ...prevState,
      banner_first_title: e.target.value
    }))
  }
                          required=""
                        />
                      </div>
                    </div>

                       <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status*</label>
                        <select className="form-control" name="edit_banner_status"
                          required="" 
    
                        >
                          <option value="Active" selected={selectedBanner && selectedBanner.banner_status === "Active"}>Active</option>
                          <option value="Inactive" selected={selectedBanner && selectedBanner.banner_status === "Inactive"}>Inactive</option>
                        </select>
                      </div>
                    </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Menu Bnner Image</label>
                    <input type="file" class="form-control" name="edit_banner_image"/>
                    <input type="hidden" class="form-control" name="edit_banner_image_old" value={selectedBanner ? selectedBanner.banner_image : ''} id="edit_categoryImage"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Description</label>
                  <input type="text" class="form-control" name="edit_banner_description" value={selectedBanner ? selectedBanner.banner_description: ''}  onChange={(e) => setSelectedBanner((prevState) => ({
      ...prevState,
     banner_description: e.target.value
    }))
  } id="edit_categoryTitle"/>
                  </div>
                  </div>

                   <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Page*</label>
                        <select className="form-control" name="edit_page"
                          required=""
                        >
                         <option value="Home" selected={selectedBanner && selectedBanner.page === "Home"}>Home</option>
                         
                        </select>
                      </div>
                    </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Redirect Url</label>
                  <input type="text" class="form-control" name="edit_redirect_url" value={selectedBanner ? selectedBanner.redirect_url: ''}  onChange={(e) => setSelectedBanner((prevState) => ({
      ...prevState,
      redirect_url: e.target.value
    }))
  } id="edit_categoryDescription"/>
                  </div>
                  </div>



  <div>
                  <input type="hidden" name="edit_category_id" id="edit_categoryID" value=""/>  
                  <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                  
             
                    {/* ...other fields */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
                  

    
    </>
  );
};

export default Banner;
