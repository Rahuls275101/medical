import React, { useEffect, useState , useRef } from 'react';
import { baseUrl,apiBaseUrl } from '../../config'; 
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CmsEditpage = () => {
  const { cmsPageId } = useParams();
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
 const navigate = useNavigate();
 
  const editorRef = useRef();



  useEffect(() => {
  const timer = setTimeout(() => {
    if (editorRef.current) {
      window.CKEDITOR.replace(editorRef.current, {
        height: 300,
        // Other CKEditor configuration options go here
      });
    }
  }, 1000); // Delay CKEditor initialization by 1 second

  return () => clearTimeout(timer); // Clear the timer on unmount to prevent memory leaks
}, []);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await axios.get(apiBaseUrl+`/api/cms/${cmsPageId}`);
        setCmsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCmsData();
  }, [cmsPageId]);

 const handleSubmitForm = async (event) => {
  event.preventDefault();
  setSubmitting(true);

  const form = event.target;
  const formData = new FormData(form);
  


  try {
    await axios.post(apiBaseUrl+`/api/updateCms/${cmsPageId}`, formData);
    console.log('CMS data updated successfully');
    setSuccessMessage('CMS data updated successfully');
    navigate(baseUrl+`/cms-pages?success=${encodeURIComponent('CMS data updated successfully')}`);
    // Optionally, you can show a success message or redirect to another page
  } catch (error) {
    console.error('Failed to update CMS data:', error);
    // Handle the error and show an error message to the user
  }

  setSubmitting(false);
};


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          {/* ... */}
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form
                      id="cmsForm"
                      role="form"
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={handleSubmitForm}
                    >
                      <div className="card-body">
                        {/* ... */}
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Page Name*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="cms_page_name"
                              value={cmsData.cms_page_name || ''}
                              required=""
                              onChange={(e) => {
                                setCmsData((prevData) => ({
                                  ...prevData,
                                  cms_page_name: e.target.value
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputFile">Image</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="exampleInputFile"
                                  name="product_image"
                                />
                                <label className="custom-file-label" htmlFor="exampleInputFile">
                                  Choose file
                                </label>
                                <input
                                  type="hidden"
                                  className="custom-file-input"
                                  name="product_image_old"
                                  defaultValue={cmsData.cms_image}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Page Heading*</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cms_page_heading"
                              value={cmsData.cms_page_heading || ''}
                              required=""
                              onChange={(e) => {
                                setCmsData((prevData) => ({
                                  ...prevData,
                                  cms_page_heading: e.target.value
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Small Description*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="cms_page_small_description"
                              value={cmsData.cms_page_small_description || ''}
                              required=""
                              onChange={(e) => {
                                setCmsData((prevData) => ({
                                  ...prevData,
                                  cms_page_small_description: e.target.value
                                }));
                              }}
                            />
                          </div>
                        </div>
                      <div className="col-md-12">
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Long Description</label>
    <div className="mb-3">
      <textarea ref={editorRef}
        placeholder="Enter the course description..."
      
        name="cms_page_description"
        defaultValue= {cmsData.cms_page_description || ''}
      />
    </div>
  </div>
</div>
                      </div>
                      {/* ... */}
                      <div className="card-footer" style={{ textAlign: "center" }}>
                        <button type="submit" className="btn btn-primary">
                          Submit
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
