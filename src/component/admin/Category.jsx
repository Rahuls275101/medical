import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config'; 
import axios from 'axios';

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
const [createCategory, setCreateCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);



  const editRecordCategory = (category) => {
  setSelectedCategory(category);
  openEditModal();
};


  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiBaseUrl+'/api/categories', {
        params: {
          per_page: 4, // Number of items per page
          page: currentPage, // Current page number
        },
      });
      setCategories(response.data.categories);
      setTotalPages(response.data.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };

    const updateCategory = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/category-update/${selectedCategory.category_id}`, formData);
      // Category updated successfully
      closeeditModal();
      fetchCategories(); // Fetch categories again to reflect the updated changes
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };


    const saveCategory = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await axios.post(apiBaseUrl+`/api/category-save/`, formData);
      // Category updated successfully
      closeModal();
      fetchCategories(); // Fetch categories again to reflect the updated changes
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
                <h1 className="m-0">Category</h1>
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
                    Add Category
                  </a>
                  <div className="card-body">
                    <table
                      id="main_category"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Menu Order</th>
                          <th style={{ textAlign: 'center' }}>Category ID</th>
                          <th style={{ textAlign: 'center' }}>Menu Category</th>
                          <th style={{ textAlign: 'center' }}>Image</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.category_id}>
                            <td style={{ textAlign: 'center' }} contentEditable>
                              {category.menu_order}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {category.category_id}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <a href={`category/${category.category_id}`}>
                                {category.category_name} ({category.subCatCount})
                              </a>
                              <br />
                              {category.subCatName}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <img
                                src={apiBaseUrl+`/assets/images/${category.category_image}`}
                                style={{ height: '100px', width: '100px' }}
                                alt="Category Image"
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className={`btn btn-${category.category_status_color} btn-xs`}
                              >
                                {category.category_status}
                              </a>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <a
                                href="javascript:void(0);"
                                className="btn btn-info btn-xs editRecordCategory"
                              onClick={() => editRecordCategory(category)}
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
                Create New Category
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
                
                 onSubmit={saveCategory}
              >
                <div className="card-body">
                  <div className="row">
             
                     <div class="col-md-8">  
                  <div class="form-group">
                  <label for="exampleInputEmail1">Menu category name*</label>
                  <input type="text" class="form-control" name="category_name" onChange={(e) => setCreateCategory((prevState) => ({
      ...prevState,
      category_name: e.target.value
    }))
  }
 required=""/>
                  </div>
                  </div>

                  <div class="col-md-4"> 
                  <div class="form-group">
                    <label for="exampleInputPassword1">Status*</label>
                  

                        <select
                          className="form-control"
                          name="category_status"
                          required=""
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select> 
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Menu category image*</label>
                    <input type="file" class="form-control" name="category_image" required=""/>
                  </div>
                  </div>


                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Title</label>
                  <input type="text" class="form-control" name="category_title"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Keyword</label>
                  <input type="text" class="form-control" name="category_keyword"/>
                  </div>
                  </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Description</label>
                  <input type="text" class="form-control" name="category_description"/>
                  </div>
                  </div>
                    <div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
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
                Create New Category
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
                  onSubmit={updateCategory}
              >
                <div className="card-body">
                  <div className="row">

          <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Category Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="edit_category_name"
                          value={selectedCategory ? selectedCategory.category_name : ''}
                           onChange={(e) => setSelectedCategory((prevState) => ({
      ...prevState,
      category_name: e.target.value
    }))
  }
                          required=""
                        />
                      </div>
                    </div>

                       <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status*</label>
                        <select className="form-control" name="edit_category_status"
                          required=""

                        >
                          <option value="Active" selected={selectedCategory && selectedCategory.category_status === "Active"} >Active</option>
                          <option value="Inactive" selected={selectedCategory && selectedCategory.category_status === "Inactive"}>Inactive</option>
                        </select>
                      </div>
                    </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Menu Category Image</label>
                    <input type="file" class="form-control" name="edit_category_image"/>
                    <input type="hidden" class="form-control" name="edit_category_image_old" value={selectedCategory ? selectedCategory.category_image : ''} id="edit_categoryImage"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Title</label>
                  <input type="text" class="form-control" name="edit_category_title" value={selectedCategory ? selectedCategory.metaTitle : ''}  onChange={(e) => setSelectedCategory((prevState) => ({
      ...prevState,
      metaTitle: e.target.value
    }))
  } id="edit_categoryTitle"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Keyword</label>
                  <input type="text" class="form-control" name="edit_category_keyword" value={selectedCategory ? selectedCategory.metaKeyword : ''}  onChange={(e) => setSelectedCategory((prevState) => ({
      ...prevState,
      metaKeyword: e.target.value
    }))
  } id="edit_categoryKeyword"/>
                  </div>
                  </div>
                  
                  <div class="col-md-12">
                  <div class="form-group">
                  <label for="exampleInputEmail1">Meta Description</label>
                  <input type="text" class="form-control" name="edit_category_description" value={selectedCategory ? selectedCategory.metaDescription : ''}  onChange={(e) => setSelectedCategory((prevState) => ({
      ...prevState,
      metaDescription: e.target.value
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

export default Category;
