// pages/CmsEditpage.jsx - Fixed navigation
import React, { useEffect, useState, useRef } from 'react';
import { baseUrl, apiBaseUrl } from '../../config';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';



const CmsEditpage = () => {
  const { cmsPageId } = useParams();
  const isEditMode = Boolean(cmsPageId);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    cms_page_name: '',
    cms_page_heading: '',
    cms_page_small_description: '',
    cms_page_description: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    status: 1,
    product_image_old: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const navigate = useNavigate();
  const editorRef = useRef();

  // Initialize CKEditor
  useEffect(() => {
    if (!window.CKEDITOR || !editorRef.current) return;

    if (window.CKEDITOR.instances.cms_page_description) {
        window.CKEDITOR.instances.cms_page_description.destroy(true);
    }

    const editor = window.CKEDITOR.replace("cms_page_description", {
        height: 350,
    });

    return () => {
        if (editor) {
            editor.destroy(true);
        }
    };
}, []);

  // Fetch CMS data for edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchCmsData = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}/cms/${cmsPageId}`);
          if (response.data.status) {
            const data = response.data.data;
            setFormData({
              cms_page_name: data.cms_page_name || '',
              cms_page_heading: data.cms_page_heading || '',
              cms_page_small_description: data.cms_page_small_description || '',
              cms_page_description: data.cms_page_description || '',
              meta_title: data.meta_title || '',
              meta_description: data.meta_description || '',
              meta_keywords: data.meta_keywords || '',
              status: data.status || 1,
              product_image_old: data.cms_image || ''
            });
            
            if (data.cms_image) {
              setImagePreview(`${apiBaseUrl}/assets/images/${data.cms_image}`);
            }
            
            setTimeout(() => {
              if (editorRef.current && typeof window.CKEDITOR !== 'undefined') {
                try {
                  const instance = window.CKEDITOR.instances[editorRef.current.id];
                  if (instance) {
                    instance.setData(data.cms_page_description || '');
                  }
                } catch (err) {
                  console.error('CKEditor set data error:', err);
                }
              }
            }, 1500);
          } else {
            setError(response.data.message || 'Failed to fetch CMS page data');
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching CMS data:', error);
          setError('Failed to fetch CMS page data. Please try again.');
          setLoading(false);
        }
      };

      fetchCmsData();
    }
  }, [cmsPageId, isEditMode]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmitForm = async (event) => {
    event.preventDefault();
  
    if (submitting) return;
  
    setSubmitting(true);
    setError('');
    setSuccessMessage('');
  
    try {
      let description = '';
  
      if (editorRef.current && window.CKEDITOR) {
        const instance = window.CKEDITOR.instances[editorRef.current.id];
        if (instance) {
          description = instance.getData();
        }
      }
  
      if (!formData.cms_page_name?.trim()) {
        setError('Page Name is required');
        return;
      }
  
      if (!formData.cms_page_heading?.trim()) {
        setError('Page Heading is required');
        return;
      }
  
      const payload = new FormData();
  
      payload.append('cms_page_name', formData.cms_page_name.trim());
      payload.append('cms_page_heading', formData.cms_page_heading.trim());
      payload.append(
        'cms_page_small_description',
        formData.cms_page_small_description || ''
      );
      payload.append('cms_page_description', description || '');
      payload.append('meta_title', formData.meta_title || '');
      payload.append('meta_description', formData.meta_description || '');
      payload.append('meta_keywords', formData.meta_keywords || '');
      payload.append('status', formData.status);
  
      if (imageFile instanceof File) {
        payload.append('cms_image', imageFile);
      }
  
      if (isEditMode) {
        payload.append(
          'product_image_old',
          formData.product_image_old || ''
        );
      }
  
      const url = isEditMode
        ? `${apiBaseUrl}/updateCms/${cmsPageId}`
        : `${apiBaseUrl}/createCms`;
  
      const response = await axios.post(url, payload);
  
      if (response.data?.status) {
        const message =
          response.data.message ||
          (isEditMode
            ? 'CMS page updated successfully'
            : 'CMS page created successfully');
  
        setSuccessMessage(message);
  
        setTimeout(() => {
          navigate('/admin/cms-pages?success=' + encodeURIComponent(message));
        }, 800);
      } else {
        setError(response.data?.message || 'Failed to save CMS page');
      }
    } catch (error) {
      console.error(error);
  
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to save CMS page. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // FIXED: Cancel handler
  const handleCancel = () => {
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    navigate(`${cleanBaseUrl}/cms-pages`);
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{isEditMode ? 'Edit' : 'Create'} CMS Page</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3">Loading CMS page data...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{isEditMode ? 'Edit' : 'Create'} CMS Page</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to={`${baseUrl}/dashboard`}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`${baseUrl}/cms-pages`}>CMS Pages</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {isEditMode ? 'Edit' : 'Create'}
                  </li>
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
                  <div className="card-body">
                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle"></i> {error}
                        <button
                          type="button"
                          className="close"
                          onClick={() => setError('')}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                    )}

                    {successMessage && (
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fas fa-check-circle"></i> {successMessage}
                        <button
                          type="button"
                          className="close"
                          onClick={() => setSuccessMessage('')}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                    )}

                    <form
                      id="cmsForm"
                      role="form"
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={handleSubmitForm}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="cms_page_name">
                              Page Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cms_page_name"
                              name="cms_page_name"
                              value={formData.cms_page_name}
                              required
                              onChange={handleInputChange}
                              placeholder="Enter page name"
                            />
                            <small className="form-text text-muted">
                              This will be used to generate the page URL slug
                            </small>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="cms_image">Page Image</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="cms_image"
                                name="cms_image"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                              <label className="custom-file-label" htmlFor="cms_image">
                                {imageFile ? imageFile.name : 'Choose file'}
                              </label>
                            </div>
                            <small className="form-text text-muted">
                              Recommended size: 1200x600px. Max size: 5MB
                            </small>
                            {imagePreview && (
                              <div className="mt-2">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  style={{ maxHeight: '150px', maxWidth: '100%' }}
                                  className="img-thumbnail"
                                />
                              </div>
                            )}
                            <input
                              type="hidden"
                              name="product_image_old"
                              value={formData.product_image_old || ''}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                              className="form-control"
                              id="status"
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
                            <label htmlFor="cms_page_heading">
                              Page Heading <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cms_page_heading"
                              name="cms_page_heading"
                              value={formData.cms_page_heading}
                              required
                              onChange={handleInputChange}
                              placeholder="Enter page heading"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="cms_page_small_description">
                              Small Description
                            </label>
                            <textarea
                              className="form-control"
                              id="cms_page_small_description"
                              name="cms_page_small_description"
                              value={formData.cms_page_small_description}
                              onChange={handleInputChange}
                              rows="2"
                              placeholder="Enter a brief description"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="cms_page_description">
                              Long Description
                            </label>
                            <textarea
                              ref={editorRef}
                              id="cms_page_description"
                              name="cms_page_description"
                              className="form-control"
                              defaultValue={formData.cms_page_description || ''}
                              placeholder="Enter detailed description"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <h5 className="mt-3">SEO Information</h5>
                          <hr />
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="meta_title">Meta Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="meta_title"
                              name="meta_title"
                              value={formData.meta_title}
                              onChange={handleInputChange}
                              placeholder="Enter meta title"
                              maxLength="60"
                            />
                            <small className="form-text text-muted">
                              Recommended length: 50-60 characters
                            </small>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="meta_description">Meta Description</label>
                            <textarea
                              className="form-control"
                              id="meta_description"
                              name="meta_description"
                              value={formData.meta_description}
                              onChange={handleInputChange}
                              rows="2"
                              placeholder="Enter meta description"
                              maxLength="160"
                            />
                            <small className="form-text text-muted">
                              Recommended length: 150-160 characters
                            </small>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="meta_keywords">Meta Keywords</label>
                            <input
                              type="text"
                              className="form-control"
                              id="meta_keywords"
                              name="meta_keywords"
                              value={formData.meta_keywords}
                              onChange={handleInputChange}
                              placeholder="Enter comma-separated keywords"
                            />
                            <small className="form-text text-muted">
                              Separate keywords with commas
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="card-footer" style={{ textAlign: "center" }}>
                        {/* FIXED: Cancel button with proper navigation */}
                        <button
                          type="button"
                          className="btn btn-secondary mr-2"
                          onClick={handleCancel}
                        >
                          <i className="fas fa-arrow-left"></i> Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                              {isEditMode ? 'Updating...' : 'Creating...'}
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save"></i> {isEditMode ? 'Update' : 'Create'}
                            </>
                          )}
                        </button>
                      </div>
                    </form>
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

export default CmsEditpage;