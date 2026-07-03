import React from "react";

function Footer() {
  return (
       <React.StrictMode>
        <footer className="main-footer">
            <div className="auto-container">

               
                <div className="widgets-section">
                    <div className="row clearfix">

                       
                        <div className="big-column col-lg-6 col-md-12 col-sm-12">
                            <div className="row clearfix">

                               
                                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                                    <div className="footer-widget logo-widget">
                                        <div className="logo-box">
                                            <a href="index.html"><img src="images/footer-logo.png" alt="" /></a>
                                        </div>
                                        <div className="text">Over 24 years experience and knowledge international
                                            standards, technologicaly changes our industrial systems, we are dedicated
                                            to provides the best solutions to our valued customers there are many
                                            variations solutions.</div>
                                    </div>
                                </div>

                               
                                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                                    <div className="footer-widget links-widget">
                                        <div className="footer-title">
                                            <h2>Products</h2>
                                        </div>
                                        <ul className="footer-lists">
                                            <li><a href="">Agricultural Processing</a></li>
                                            <li><a href="">Chemical Research</a></li>
                                            <li><a href="">Material Engineering</a></li>
                                            <li><a href="">Mechanical Engineering</a></li>
                                            <li><a href="">Petroleum and Gas</a></li>
                                            <li><a href="">Power and Energy</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                 
                        <div className="big-column col-lg-6 col-md-12 col-sm-12">
                            <div className="row clearfix">

                               
                                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                    <div className="footer-widget links-widget">
                                        <div className="footer-title">
                                            <h2>Usefull Links</h2>
                                        </div>
                                        <ul className="footer-lists">
                                             <li><a href="index.html">Home</a></li>
                                            <li><a href="">Products</a></li>
                                            <li><a href="industry.html">Industries</a></li>
                                            <li><a href="">Support</a></li>
                                            <li><a href="">Compnay</a></li>


                                        </ul>
                                    </div>
                                </div>

                               
                                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                    <div className="footer-widget subscribe-widget">
                                        <div className="footer-title">
                                            <h2>Subscribe Us</h2>
                                        </div>
                                        <div className="widget-content">
                                            <div className="text">Sign up today for tips and latest news and exclusive
                                                special offers.</div>
                                            <div className="subscribe-form">
                                                <form method="post" action="">
                                                    <div className="form-group">
                                                        <input type="email" name="email" value=""
                                                            placeholder="Email Address" required/>
                                                        <button type="submit" className="theme-btn"><span
                                                                className="fa fa-send"></span></button>
                                                    </div>
                                                </form>
                                            </div>
                                            <ul className="social-icon-two">
                                                <li className="follow">Follow us :</li>
                                                <li><a href=""><span className="fa fa-facebook"></span></a></li>
                                                <li><a href=""><span className="fa fa-twitter"></span></a></li>
                                                <li><a href=""><span className="fa fa-google-plus"></span></a></li>
                                                <li><a href=""><span className="fa fa-pinterest-p"></span></a></li>
                                                <li><a href=""><span className="fa fa-dribbble"></span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="footer-bottom">
                <div className="auto-container">
                    <div className="copyright">&copy; Copyright 2022. All Rights Reserved. Designed by <a
                            href="" target="_blank">starwebmaker</a>
                    </div>
                </div>
            </div>
        </footer>
         </React.StrictMode>
  );
}

export default Footer;