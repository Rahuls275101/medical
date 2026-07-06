import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import bgImage from "./../../images/figure2.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form Data:', formData);
    setFormStatus('success');
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setFormStatus(''), 5000);
  };

  const contactInfo = [
    {
      icon: 'fa fa-map-marker',
      title: 'Our Location',
      details: '123 Medical Center, Healthcare City, HC 12345'
    },
    {
      icon: 'fa fa-phone',
      title: 'Phone Number',
      details: '+1 (555) 123-4567',
      sub: '+1 (555) 987-6543'
    },
    {
      icon: 'fa fa-envelope',
      title: 'Email Address',
      details: 'info@medicalcenter.com',
      sub: 'support@medicalcenter.com'
    },
    {
      icon: 'fa fa-clock-o',
      title: 'Working Hours',
      details: 'Monday - Friday: 8:00 AM - 8:00 PM',
      sub: 'Saturday: 9:00 AM - 5:00 PM'
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Contact Us - My Website</title>
      </Helmet>

      {/* Banner Section */}
      <section 
        className="inner-page-banner bg-common inner-page-top-margin" 
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs-area">
                <h1>Contact Us</h1>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>Contact us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-wrap-layout1">
        <div className="container">
          <div className="row">
            {contactInfo.map((info, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                <div className="contact-box-layout1">
                  <div className="item-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="item-content">
                    <h3 className="item-title">{info.title}</h3>
                    <p>{info.details}</p>
                    {info.sub && <p className="sub-info">{info.sub}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-wrap-layout1">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-12">
              <div className="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094197!2d144.9537353153167!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f4b3f3%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Medical Center Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-wrap-layout1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading text-center">
                <h2 className="item-title">Get In Touch</h2>
                <p className="sub-title">
                  Have any questions or need medical assistance? Feel free to reach out to us.
                  Our team is here to help you 24/7.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {formStatus === 'success' && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Thank you!</strong> Your message has been sent successfully.
                  <button 
                    type="button" 
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                    onClick={() => setFormStatus('')}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control"
                        rows="6"
                        placeholder="Write your message here..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="fa fa-paper-plane"></i> Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


     
    </div>
  );
};

export default ContactPage;