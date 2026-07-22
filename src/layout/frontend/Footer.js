import React from "react";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';
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
                


        <div className="single-item col-lg-2 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Platform</h3>
            </div>
            <div className="footer-quick-link">
              <ul>
                <li>
                {" "}
                  <a href="#">Clinical Intelligence</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">How It Works</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Science</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Organ Trajectories</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Explainability</a>{" "}
                </li>
               
              </ul>
            </div>
          </div>
        </div>
        



        <div className="single-item col-lg-2 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Products</h3>
            </div>
            <div className="footer-departments">
             <ul>
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
                  <a href="#">Corporate</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Population</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Product Roadmap</a>{" "}
                </li>
               
              </ul>
            </div>
          </div>
        </div>


        <div className="single-item col-lg-2 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Company</h3>
            </div>
            <div className="footer-departments">
             <ul>
                <li>
                {" "}
                  <a href="#">About</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Who We Serve</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Resources</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Partnerships</a>{" "}
                </li>
                <li>
                  <Link to={baseUrl + '/contact'}>Contact</Link>
                  
                </li>
               
              </ul>
            </div>
          </div>
        </div>

        <div className="single-item col-lg-2 col-md-6 col-12">
          <div className="footer-box">
            <div className="footer-header">
              <h3>Legal</h3>
            </div>
            <div className="footer-departments">
             <ul>
                <li>
                {" "}
                  <a href="#">Privacy Policy</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Terms of Use</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Clinical Disclaimer</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Consent & Data Processing </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Cookie Policy</a>{" "}
                </li>
                 <li>
                  {" "}
                  <a href="#">Data Security</a>{" "}
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
      © 2026 Predyxiq. All rights reserved. Predyxiq provides clinical decision support and preventive health intelligence. It is not a diagnostic tool and does not replace professional medical judgment, clinical evaluation, or personalized treatment.
<br/><br/>
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