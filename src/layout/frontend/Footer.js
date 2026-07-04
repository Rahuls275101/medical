import React from "react";

function Footer() {
  return (
       <React.StrictMode>
        <footer>
  <section className="footer-top-wrap">
    <div className="container">
      <div className="row">
        <div className="single-item col-lg-4 col-md-6 col-12">
          <div className="footer-box" style={{ paddingRight: 51 }}>
            <div className="footer-logo">
              {" "}
              <a href="index-2.html">
                <img
                  src="img/logo.png"
                  className="img-fluid"
                  alt="footer-logo"
                  style={{ height: 50 }}
                />
              </a>{" "}
            </div>
            <div className="footer-about">
              <p>
                On the other hand we denounce with righteous indignation and
                dislike mr turet suscipit lobortis nisl ut aliquip erat volutpat
                autem vel eum iriure dolor in hendrerit
              </p>
            </div>
          </div>
        </div>
        <div className="single-item col-lg-3 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Quick Links</h3>
            </div>
            <div className="footer-quick-link">
              <ul>
                <li>
                  {" "}
                  <a href="#">Home</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Medical Leadership Workshops</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">About Us</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Blog</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Resources</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Faq</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Contact</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="single-item col-lg-2 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Departments</h3>
            </div>
            <div className="footer-departments">
              <ul>
                <li>
                  <a href="single-departments.html">Dental Care</a>
                </li>
                <li>
                  <a href="single-departments.html">Medicine</a>
                </li>
                <li>
                  <a href="single-departments.html">Orthopedic</a>
                </li>
                <li>
                  <a href="single-departments.html">Emergency</a>
                </li>
                <li>
                  <a href="single-departments.html">Skilled Doctors</a>
                </li>
                <li>
                  <a href="single-departments.html">Certified Clinic</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="single-item col-lg-3 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Connect with us</h3>
            </div>
            <div className="footer-contact-info">
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt" />
                  59 Street, 1200 Techpark
                </li>
                <li>
                  <i className="fas fa-phone" />
                  +91 9876543210
                </li>
                <li>
                  <i className="far fa-envelope" />
                  clinicianleader@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-center-wrap">
    <div className="container">
      <div className="row no-gutters">
        <div className="col-lg-4 col-12">
          <div className="footer-social">
            <ul>
              <li>Follow Us:</li>
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-skype" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="newsletter-title">
                <h4 className="item-title">Stay informed and healthy</h4>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="newsletter-form">
                <div className="input-group stylish-input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your e-mail"
                  />
                  <span className="input-group-addon">
                    <button type="submit">
                      {" "}
                      <span aria-hidden="true">SIGN UP!</span>{" "}
                    </button>
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-bottom-wrap">
    <div className="copyright">
      Copyright @ 2026 Clinician Leader. All Rights Reserved.
      <a href="https://www.starwebmaker.com/" target="_blank">
        {" "}
        Designed by Star Web Maker
      </a>
    </div>
  </section>
</footer>

         </React.StrictMode>
  );
}

export default Footer;