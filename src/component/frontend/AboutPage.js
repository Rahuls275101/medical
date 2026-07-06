import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import about from "./../../images/about2.jpg";
import about2 from "./../../images/about2.png";
import bgImage from "./../../images/figure2.jpg";
import testimonialsBgImage from "./../../images/testimonial-bg1.jpg";
import person1 from "./../../images/testimonial3.jpg";
import person2 from "./../../images/testimonial3.jpg";
import person3 from "./../../images/testimonial3.jpg";

const AboutPage = () => {
  const carouselRef = useRef(null);
  const isCarouselInitialized = useRef(false);

  useEffect(() => {
    // Dynamically import jQuery and owl.carousel
    const loadCarousel = async () => {
      try {
        // Import jQuery first
        const $ = await import('jquery');
        const jquery = $.default || $;
        
        // Set jQuery globally
        window.$ = jquery;
        window.jQuery = jquery;

        // Now import owl.carousel
        await import('owl.carousel');

        // Import CSS
        await import('owl.carousel/dist/assets/owl.carousel.css');
        await import('owl.carousel/dist/assets/owl.theme.default.css');

        // Initialize carousel after a small delay
        setTimeout(() => {
          if (window.$ && window.$.fn && window.$.fn.owlCarousel && !isCarouselInitialized.current) {
            window.$(".testimonial-slider").owlCarousel({
              items: 1,
              loop: true,
              autoplay: true,
              autoplayTimeout: 4000,
              smartSpeed: 800,
              dots: true,
              nav: false,
              margin: 30,
            });
            isCarouselInitialized.current = true;
          }
        }, 200);
      } catch (error) {
        console.error('Error loading carousel:', error);
      }
    };

    loadCarousel();

    // Cleanup
    return () => {
      if (window.$ && window.$.fn && window.$.fn.owlCarousel && isCarouselInitialized.current) {
        try {
          window.$(".testimonial-slider").owlCarousel('destroy');
          isCarouselInitialized.current = false;
        } catch (e) {
          console.log('Carousel already destroyed');
        }
      }
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const facts = [
    {
      number: 59,
      title: "Health Sections",
    },
    {
      number: 4709,
      title: "Happy Patients",
    },
    {
      number: 128,
      title: "Quality Doctors",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>About US - My Website</title>
      </Helmet>

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
                <h1>About Us</h1>
                <ul>
                  <li>
                    <a href="index-2.html">Home</a>
                  </li>
                  <li>About us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-wrap-layout5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-box-layout13">
                <h2 className="item-title">
                  Our Best Laboratory <span>Medical Center</span>
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
                  <img
                    src={about}
                    alt="About us"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="funfacts" ref={ref}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              {facts.map((item, index) => (
                <div className="col-md-4 text-center" key={index}>
                  <div className="fact-box">
                    <h2>
                      {inView ? (
                        <CountUp
                          end={item.number}
                          duration={2.5}
                          separator=","
                        />
                      ) : (
                        0
                      )}
                    </h2>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
                        <a
                          aria-expanded="false"
                          className="accordion-toggle"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                        >
                          Using Innovative Technology
                        </a>
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
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseTwo"
                        >
                          Guarantee Success of Treatments
                        </a>
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
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseThree"
                        >
                          Accepting Insurance Cards
                        </a>
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
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapse4"
                        >
                          Accepting Insurance Cards
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapse4"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapse5"
                        >
                          Accepting Insurance Cards
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapse5"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-box-layout2 col-lg-6">
              <img
                    src={about2}
                    alt="About us"
                    className="img-fluid"
                  />
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial-section"style={{
          backgroundImage: `url(${testimonialsBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="container">
          <div className="owl-carousel testimonial-slider">
            <div className="testimonial-item">
              <img src={person1} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Robert Adison</h3>
              <span>Professor</span>
            </div>

            <div className="testimonial-item">
              <img src={person2} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Excellent doctors and outstanding service.
                Highly recommended.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>John Smith</h3>
              <span>Patient</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default AboutPage;