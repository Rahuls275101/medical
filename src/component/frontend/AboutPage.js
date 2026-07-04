
import React from 'react';
import { Helmet } from 'react-helmet-async';
const AboutPage = () => {
  return (
    <div>
 <Helmet>
  <title>About US - My Website</title>
</Helmet>

     <>
  <section
    className="inner-page-banner bg-common inner-page-top-margin"
    data-bg-image="img/figure/figure2.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumbs-area">
            <h1>About Us</h1>
            <ul>
              <li>
                {" "}
                <a href="index-2.html">Home</a>{" "}
              </li>
              <li>About us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Inne Page Banner Area End Here */}
  {/* About Us Start Here */}
  <section className="about-wrap-layout5">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about-box-layout13">
            <h2 className="item-title">
              Our Best Laboratory <span>Medical Center</span>{" "}
            </h2>
            <p>
              We offer extensive medical services for our patients recommend
              that you use officia.simply dummy text of theprinting and
              typesetting industry medical officia.simply dummy text of
              theprinting and typesetting industry. We offer extensive medical
              services for our patients recommend that you use officia.simply
              dummy text of theprinting and typesetting industry medical
              officia.simply dummy text of theprinting and typesetting industry.
            </p>
            <ul className="list-info">
              <li>Qualified Staff of Doctors</li>
              <li>Feel like you are at Home Services</li>
              <li>24x7 Emergency Services</li>
              <li>Easy and Affordable Billing</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-box-layout14">
            <div className="item-video">
              {" "}
              <img src="img/about/about2.jpg" alt="about" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    className="progress-wrap-layout2 bg-overlay bg-overlay-primary80 bg-common parallaxie"
    data-bg-image="img/figure/figure1.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="progress-box-layout2 col-md-4">
          <div className="inner-item">
            <div className="counting-text counter" data-num={59}>
              59
            </div>
            <p>Health Sections</p>
          </div>
        </div>
        <div className="progress-box-layout2 col-md-4">
          <div className="inner-item">
            <div className="counting-text counter" data-num={4709}>
              4709
            </div>
            <p>Happy Patients</p>
          </div>
        </div>
        <div className="progress-box-layout2 col-md-4">
          <div className="inner-item">
            <div className="counting-text counter" data-num={128}>
              128
            </div>
            <p>Quality Doctors</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Progress Area End Here */}
  {/* Why Choose Area Start Here */}
  <section className="why-choose-wrap-layout1">
    <div className="container">
      <div className="row">
        <div className="why-choose-box-layout1 col-lg-6">
          <h2 className="item-title">Why People Choose Us?</h2>
          <p className="sub-title">
            We offer extensive medical services for our patients recommend that
            you use officia.
          </p>
          <div className="choose-list-layout1">
            <div className="panel-group" id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading active">
                  <div className="panel-title">
                    {" "}
                    <a
                      aria-expanded="false"
                      className="accordion-toggle"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                    >
                      Using Innovative Technology
                    </a>{" "}
                  </div>
                </div>
                <div
                  aria-expanded="false"
                  id="collapseOne"
                  role="tabpanel"
                  className="panel-collapse collapse show"
                >
                  <div className="panel-body">
                    <p>
                      Moimply dummy text of the printing and type
                      settingaindustry. Lorem Ipsum has been the industry’s
                      standard dummy text ever since thelong established fact
                      thaaret{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">
                    {" "}
                    <a
                      aria-expanded="false"
                      className="accordion-toggle collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwo"
                    >
                      Guarantee Success of Treatments
                    </a>{" "}
                  </div>
                </div>
                <div
                  aria-expanded="false"
                  id="collapseTwo"
                  role="tabpanel"
                  className="panel-collapse collapse"
                >
                  <div className="panel-body">
                    <p>
                      Moimply dummy text of the printing and type
                      settingaindustry. Lorem Ipsum has been the industry’s
                      standard dummy text ever since thelong established fact
                      thaaret{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">
                    {" "}
                    <a
                      aria-expanded="false"
                      className="accordion-toggle collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThree"
                    >
                      Accepting Insurance Cards
                    </a>{" "}
                  </div>
                </div>
                <div
                  aria-expanded="false"
                  id="collapseThree"
                  role="tabpanel"
                  className="panel-collapse collapse"
                >
                  <div className="panel-body">
                    <p>
                      Moimply dummy text of the printing and type
                      settingaindustry. Lorem Ipsum has been the industry’s
                      standard dummy text ever since thelong established fact
                      thaaret{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="why-choose-box-layout2 col-lg-6">
          {" "}
          <img
            src="img/about/about2.png"
            alt="about"
            className="img-fluid"
          />{" "}
        </div>
      </div>
    </div>
  </section>
  <section
    className="testmonial-wrap-layout2 bg-common"
    data-bg-image="img/testimonial/testimonial-bg1.jpg"
  >
    <div className="container">
      <div
        className="rc-carousel dot-control-layout2"
        data-loop="true"
        data-items={1}
        data-margin={30}
        data-autoplay="true"
        data-autoplay-timeout={5000}
        data-smart-speed={2000}
        data-dots="true"
        data-nav="false"
        data-nav-speed="false"
        data-r-x-small={1}
        data-r-x-small-nav="false"
        data-r-x-small-dots="true"
        data-r-x-medium={1}
        data-r-x-medium-nav="false"
        data-r-x-medium-dots="true"
        data-r-small={1}
        data-r-small-nav="false"
        data-r-small-dots="true"
        data-r-medium={1}
        data-r-medium-nav="false"
        data-r-medium-dots="true"
        data-r-large={1}
        data-r-large-nav="false"
        data-r-large-dots="true"
        data-r-extra-large={1}
        data-r-extra-large-nav="false"
        data-r-extra-large-dots="true"
      >
        <div className="testmonial-box-layout3">
          <div className="item-img">
            {" "}
            <img
              src="img/testimonial/testimonial3.jpg"
              className="img-fulid rounded-circle"
              alt="Robert Addison"
            />{" "}
          </div>
          <div className="item-content">
            <p>
              Rimply dummy text of the printing and tRimply dummy text of the
              printing and typesetting industry. psum has been the industry.
            </p>
            <h3 className="item-title">Robert Adison</h3>
            <h4 className="sub-title">Professor</h4>
          </div>
        </div>
        <div className="testmonial-box-layout3">
          <div className="item-img">
            {" "}
            <img
              src="img/testimonial/testimonial3.jpg"
              className="img-fulid rounded-circle bg-common"
              alt="Robert Addison"
            />{" "}
          </div>
          <div className="item-content">
            <p>
              Rimply dummy text of the printing and tRimply dummy text of the
              printing and typesetting industry. psum has been the industry.
            </p>
            <h3 className="item-title">Robert Adison</h3>
            <h4 className="sub-title">Professor</h4>
          </div>
        </div>
        <div className="testmonial-box-layout3">
          <div className="item-img">
            {" "}
            <img
              src="img/testimonial/testimonial3.jpg"
              className="img-fulid rounded-circle bg-common"
              alt="Robert Addison"
            />{" "}
          </div>
          <div className="item-content">
            <p>
              Rimply dummy text of the printing and tRimply dummy text of the
              printing and typesetting industry. psum has been the industry.
            </p>
            <h3 className="item-title">Robert Adison</h3>
            <h4 className="sub-title">Professor</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    </div>
  );
};

export default AboutPage;
