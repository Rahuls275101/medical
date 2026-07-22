import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import minute from "./../../images/quick.png";

// Import owl carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MainPage = () => {
  const isCarouselInitialized = useRef(false);
  const isDoctorCarouselInitialized = useRef(false);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

  
  

  useEffect(() => {
    // Load jQuery and owl.carousel
    const loadCarousel = async () => {
      try {
        // Import jQuery
        const jQueryModule = await import("jquery");
        const $ = jQueryModule.default || jQueryModule;

        // Set jQuery globally
        window.jQuery = $;
        window.$ = $;

        // Import owl.carousel
        await import("owl.carousel");

        setIsCarouselReady(true);

        // Initialize carousels after a small delay to ensure DOM is ready
        setTimeout(() => {
          initializeCarousels();
        }, 500);
      } catch (error) {
        console.error("Error loading carousel:", error);
        setIsCarouselReady(false);
      }
    };

    const initializeCarousels = () => {
      const $ = window.$;

      if (!$ || !$.fn || !$.fn.owlCarousel) {
        console.error("jQuery or owlCarousel not available");
        return;
      }

      // Initialize testimonial carousel
      if (!isCarouselInitialized.current) {
        const testimonialElement = $(".testimonial-slider");
        if (testimonialElement.length) {
          try {
            testimonialElement.owlCarousel({
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
            console.log("Testimonial carousel initialized");
          } catch (e) {
            console.error("Error initializing testimonial carousel:", e);
          }
        }
      }

      // Initialize doctor carousel
      if (!isDoctorCarouselInitialized.current) {
        const doctorElement = $(".doctor-slider");
        if (doctorElement.length) {
          try {
            doctorElement.owlCarousel({
              loop: true,
              margin: 25,
              nav: false,
              dots: false,
              autoplay: true,
              autoplayTimeout: 3000,
              smartSpeed: 800,
              responsive: {
                0: {
                  items: 1,
                },
                576: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              },
            });
            isDoctorCarouselInitialized.current = true;
            console.log("Doctor carousel initialized");
          } catch (e) {
            console.error("Error initializing doctor carousel:", e);
          }
        }
      }
    };

    loadCarousel();

    // Cleanup
    return () => {
      const $ = window.$;
      if ($ && $.fn && $.fn.owlCarousel) {
        try {
          if (isCarouselInitialized.current) {
            $(".testimonial-slider").owlCarousel("destroy");
            isCarouselInitialized.current = false;
          }
          if (isDoctorCarouselInitialized.current) {
            $(".doctor-slider").owlCarousel("destroy");
            isDoctorCarouselInitialized.current = false;
          }
        } catch (e) {
          console.log("Carousel already destroyed or not initialized");
        }
      }
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div>
      <Helmet>
        <title>About us </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
           CONTACT  <span>PREDYX</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>
Let's Shape the Future of Healthcare Together. 
</h4>
          <p>Every meaningful advancement in medicine begins with a simple, thoughtful conversation.</p>
<p>Whether you are a practicing clinician curious about bringing Clinical Intelligence into your consultations, a healthcare executive evaluating modern models of preventive care, or a strategic partner exploring technological collaboration, we would be delighted to connect.</p>
<p>Together, we can explore how a deeper biological understanding can shape a more connected, proactive, and precise future for healthcare.</p>

          
        </div>
      </section>
       <section className="explain-section predyx-section">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                 How Can   <span> We Help? </span>
                </h2>
               
              </div>
          <div className="mns row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🩺 Clinical Practice & Care</h5>
                  <p>Discover how Predyx supports physicians and specialty practices with deterministic, explainable reasoning.</p>

<a href="" className="service-read-more">
                       Contact Our Clinical Team →
                      </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🏥 Enterprise Solutions</h5>
                  <p>Explore system-wide Clinical Intelligence implementations for hospitals, health networks, laboratories, corporate wellness programs, insurers.</p>
<a href="" className="service-read-more">Speak with Our Enterprise Team →</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🤝 Strategic Partnerships</h5>
                  <p>Collaborate with us across institutional research, clinical trial validation, technology integration, and co-development initiatives.</p>
<a href="" className="service-read-more">Explore Partnership Opportunities → </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🎙 Media & Keynotes</h5>
                  <p>For conference keynotes, panel discussions, interviews, academic publications, and press inquiries.</p>

<a href="" className="service-read-more">Contact Communications →</a>
                  
                 
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </section>

<section className="predyx-contact-section py-5">
      <div className="container">
        <div className="predyx-contact-wrapper">

          <h2 className="predyx-contact-title text-center mb-4">
            Direct <span>Communication Channels</span>
          </h2>

          <div className="row no-gutters predyx-contact-box">

            {/* Left Side */}
            <div className="col-lg-6 predyx-directory-left">
              <h4 className="predyx-directory-title">Directory</h4>

              <div className="predyx-directory-item">
                <h5>General Inquiries</h5>
                <a href="mailto:info@predyx.com">
                  info@predyx.com
                </a>
                <p>
                  For general questions and background on Predyx.
                </p>
              </div>

              <div className="predyx-directory-item">
                <h5>Business & Commercial</h5>
                <a href="mailto:business@predyx.com">
                  business@predyx.com
                </a>
                <p>
                  For enterprise partnerships, licensing, and strategic
                  initiatives.
                </p>
              </div>

              <div className="predyx-directory-item">
                <h5>Clinical Operations</h5>
                <a href="mailto:clinical@predyx.com">
                  clinical@predyx.com
                </a>
                <p>
                  For physician queries, clinical logic, and implementation.
                </p>
              </div>

              <div className="predyx-directory-item mb-0">
                <h5>Institutional Collaborations</h5>
                <a href="mailto:partners@predyx.com">
                  partners@predyx.com
                </a>
                <p>
                  For academic research and joint health innovations.
                </p>
              </div>

            </div>

            {/* Right Side */}
            <div className="col-lg-6 predyx-headquarter-right">

              <div className="predyx-headquarter-box">

                <h4 className="predyx-headquarter-title">
                  📍 Headquarters
                </h4>

                <p className="mb-4">
                  Predyx Headquarters
                  <br />
                  New Delhi, India
                </p>

                <div className="predyx-map-placeholder">
                  [Interactive Location Map Integration]
                </div>

                <div className="predyx-meeting-content">
                  <h5>Schedule a Conversation</h5>

                  <p>
                    Sometimes the most impactful partnerships begin face-to-face.
                    We welcome the opportunity to host you for a private discussion
                    or arrange a digital consultation at your convenience.
                  </p>

<a href="" className="service-read-more">Reserve a Time on Our Calendar →</a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>







      <section className="funfacts" ref={ref}>
        <div className="overlay">
          <div className="container" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "28px",
                color: "#fff",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
          Every lasting partnership begins with a conversation.



            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
             Whether you are guiding the health of a single patient, an entire enterprise, or an urban population, we welcome the opportunity to explore how Clinical Intelligence can support your mission.



            </p>
            <a href="#" className="action-items-primary-btn1">
           We look forward to connecting

              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
