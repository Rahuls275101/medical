import React from "react";
import logo from '../../images/logo.png';
import logo1 from '../../images/logo1.png';

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
              <a href="#">
                <img
  src={logo1}
  alt="AdminLTE Logo"
  className=""
  style={{ opacity: 0.8 }}
/>
    
              </a>{" "}
            </div>
            <div className="footer-about">
              <p>
                On the other hand we denounce with righteous indignation and
                dislike mr turet suscipit lobortis nisl ut aliquip erat volutpat
                autem vel eum iriure dolor in hendrerit
              </p>
              <div className="footer-social">
            <ul>
             
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f" />
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
                  <a href="#">Predyx IQ Quick</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Predyx IQ</a>{" "}
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
                  info@predyxiq.com
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
      <div className="copyright"style={{textAlign: 'center'}}>
      Copyright @ 2026 PREDYX IQ. All Rights Reserved.
      <a href="https://www.starwebmaker.com/" target="_blank">
        {" "}
        Designed by Star Web Maker
      </a>
    </div>
    </div>
  </section>
  
</footer>

         </React.StrictMode>
  );
}

export default Footer;