import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config'; 
import axios from 'axios';

const Clients = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedClients, setSelectedClients] = useState(null);


  useEffect(() => {
    fetchBannes();
  }, [currentPage]);



  const editRecordClients = (Clients) => {
  setSelectedClients(Clients);
  openEditModal();
};


  const fetchBannes = async () => {
    try {
      const response = await axios.get(apiBaseUrl+'/api/get-clients', {
        params: {
          per_page: 4, // Number of items per page
          page: currentPage, // Current page number
        },
      });
      setClients(response.data.clients);
      setTotalPages(response.data.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };


   const updateClients = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/clients-update/${selectedClients.client_id}`, formData);
      // Category updated successfully
      closeeditModal();
      fetchBannes(); // Fetch categories again to reflect the updated changes
    } catch (error) {
      console.error('Error updating Clients:', error);
    }
  };

   const saveClients = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/clients-process/`, formData);
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
                <h1 className="m-0">Clients</h1>
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
                    Add Clients
                  </a>
                  <div className="card-body">
                    <table
                      id="main_category"
                      className="table table-bordered table-striped">
                      <thead>
                        <tr>
                           <th>#S.No</th>
                  <th>Clients Image</th>
                   <th>Name</th>
                   <th>Page</th>
                  <th>Status</th>
                  <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Clients.map((Clients) => (



                          <tr key={Clients.client_id}>

<td style={{ textAlign: 'center' }}>
                              1
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <img
                                src={apiBaseUrl+`/assets/client/${Clients.client_image}`}
                                style={{ height: '100px', width: '100px' }}
                                alt="Category Image"
                              />
                            </td>
                            <td style={{ textAlign: 'center' }} contentEditable>
                              {Clients.name}
                            </td>
                            <td style={{ textAlign: 'center' }} contentEditable>
                              {Clients.type}
                            </td>
                           
                          
                          
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className={`btn btn-success btn-xs`}
                              >
                                {Clients.client_status}
                              </a>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className="btn btn-info btn-xs editRecordCategory"
                              onClick={() => editRecordClients(Clients)}
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
               Create Clients
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
                 onSubmit={saveClients}
              >
                <div className="card-body">
                  <div className="row">

          <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                         Clients Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                         
                          required=""
                        />
                      </div>
                    </div>

                       <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status*</label>
                        <select className="form-control" name="status"
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
                    <input type="file" class="form-control" name="image"/>
              
                  </div>
                  </div>

               
                   <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Page*</label>
                        <select className="form-control" name="page"
                          required=""
                        >
                          <option value="Our Clients">Our Clients</option>
                          <option value="Our Principles" >Our Principles</option> 
                        </select>
                      </div>
                    </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Redirect Url</label>
                  <input type="text" class="form-control" name="url"  id="edit_categoryDescription"/>
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
               Update Clients
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
                 onSubmit={updateClients}
              >
                <div className="card-body">
                  <div className="row">

          <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                         Clients Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="edit_name"
                          value={selectedClients ? selectedClients.name : ''}
                           onChange={(e) => setSelectedClients((prevState) => ({
      ...prevState,
      name: e.target.value
    }))
  }
                          required=""
                        />
                      </div>
                    </div>

                       <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status*</label>
                        <select className="form-control" name="edit_Clients_status"
                          required="" 
    
                        >
                          <option value="Active" selected={selectedClients && selectedClients.client_status === "Active"}>Active</option>
                          <option value="Inactive" selected={selectedClients && selectedClients.client_status === "Inactive"}>Inactive</option>
                        </select>
                      </div>
                    </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Menu Bnner Image</label>
                    <input type="file" class="form-control" name="edit_client_image"/>
                    <input type="hidden" class="form-control" name="edit_client_image_old" value={selectedClients ? selectedClients.client_image : ''} id="edit_categoryImage"/>
                  </div>
                  </div>

         
                   <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Page*</label>
                        <select className="form-control" name="edit_page"
                          required=""
                        >
                         <option value="Our Clients" selected={selectedClients && selectedClients.type === "Our Clients"}>Our Clients</option>
                          <option value="Our Principles" selected={selectedClients && selectedClients.type === "Our Principles"}>Our Principles</option> 
                        </select>
                      </div>
                    </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Redirect Url</label>
                  <input type="text" class="form-control" name="edit_redirect_url" value={selectedClients ? selectedClients.url: ''}  onChange={(e) => setSelectedClients((prevState) => ({
      ...prevState,
      url: e.target.value
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

export default Clients;
