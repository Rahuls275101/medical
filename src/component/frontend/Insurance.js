import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/insurance.png";
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
        <title>Clinical Intelligence for Insurance </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
            Clinical Intelligence  for <span>Insurance</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>Moving Beyond Risk Assessment to Health Intelligence | Final Web Copy</h4>
          <p>Insurance has traditionally focused on identifying risk after it exists. The future of insurance lies in understanding health before disease progresses.</p>
          <p>Predyx introduces a new layer of Clinical Intelligence that enables insurers to better engage members, strengthen preventive health programs, and support healthier populations through longitudinal health insights.</p>

          <img
            src={heroImg}
            alt="About us"
            className="img-fluid"
            style={{ marginTop: "20px", borderRadius: "10px" }}
          />
        </div>
      </section>
      <section className="explain-section predyx-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  The <span> Challenge </span>
                </h2>
                <p>
                  Modern insurers manage vast amounts of health data, yet meaningful preventive engagement remains limited.

                </p>
              </div>
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Common challenges include:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> Reactive health management after disease develops</li>
<li> Limited engagement beyond annual wellness programs</li>
<li> Fragmented medical information across providers</li>
<li> Difficulty identifying members who would benefit from early intervention</li>
<li> Rising burden of chronic diseases</li>
<li> Escalating long-term healthcare costs</li>
</ul>
                  <p style={{ marginBottom: "0px" }}>
                    The opportunity is to use existing clinical information more intelligently—not simply collect more of it.

                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  How <span> Predyx Helps </span>
                </h2>
                <p>Predyx transforms clinical and wellness data into structured Clinical Intelligence, allowing insurers to support members throughout their health journey.</p>
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>The platform enables:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li>Individual Clinical Intelligence Reports</li>
<li> Organ-system trajectory assessment</li>
<li> Longitudinal health monitoring</li>
<li>Identification of modifiable health risks</li>
<li> Personalized preventive engagement</li>
<li> Population-level health intelligence</li>
</ul>
      <p style={{ marginBottom: "0px" }}>This allows insurers to shift from episodic interactions to continuous health engagement.
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2 mb-2">
              Designed to Complement <span>  Existing Insurance Ecosystems </span>
            </h2>
            <p> Predyx integrates with existing healthcare partners rather than replacing them.</p>
          </div>

          <div className="predyx-content-box">
            <h5>It works alongside::</h5>
            <ul className="lists">
               <li> Wellness programs</li>
<li> Health check providers</li>
<li> Network hospitals</li>
<li> Diagnostic laboratories</li>
<li> Primary care physicians</li>
<li> Disease management initiatives</li>
            </ul>
            <p>Predyx strengthens existing preventive strategies by converting clinical information into actionable understanding..</p>
          </div>
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  What Insurers <span> Receive </span>
                </h2>
               
              </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Member-Level Intelligence</h5>
                  <p>Each participating member receives:</p>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> PredyxIQ™ Clinical Intelligence Report</li>
<li> PredyxIQ™ Clinical Intelligence Report</li>
<li> Organ-System Trajectories</li>
<li> Clinical Intelligence Scorev</li>
<li> Priority Health Findings</li>
<li> Positive Health Signals</li>
<li> Personalized preventive guidance</li>
<li> Longitudinal health tracking</li>
</ul>
                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Population-Level Intelligence</h5>
                  <p>Organizations receive de-identified insights including:</p>
                  <ul style={{ marginBottom: "20px" }}>
                   <li>Workforce or member health trends</li>
<li> Distribution of chronic disease risk</li>
<li> Organ-system health patterns</li>
<li> Preventive intervention opportunities</li>
<li> Engagement outcomes</li>
<li> Longitudinal health improvement metrics</li>
</ul>
<p style={{ marginBottom: "0px" }}>All reporting is designed to support population health planning while respecting individual privacy.
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-5">
            <h2 className="predyx2-title mt-2">
              Benefits For <span>Members, Insurers & Healthcare Partners</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Members</h5>

                  <ul className="lists">
                    <li>• Better understanding of personal health
• Earlier identification of health risks
• Clear preventive guidance
• Improved engagement with wellness programs
• Greater continuity of care
</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Insurers</h5>

                  <ul className="lists">
                    <li> Enhanced preventive health initiatives</li>
 <li> Improved member engagement</li>
 <li> Better understanding of population health trends</li>
 <li> Data-driven wellness planning</li>
 <li> Support for long-term health improvement strategies
</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Healthcare Partners</h5>

                  <ul className="lists">
                    <li> Better integration across the care pathway</li>
 <li> More meaningful interpretation of health assessments</li>
 <li> Improved physician engagement</li>
 <li> Stronger continuity between screening, consultation, and follow-up</li>


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="predyx7-section py-5"
        style={{ background: "#eaf0f6" }}
      >
        <div className="container">
          <div className="predyx7-header mb-5">
            <h2 className="predyx7-title text-center">
             A Typical   <span>Insurance  Workflow</span>
            </h2>
          </div>

          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">Member Health Assessment</div>
            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-flow">
              <div className="predyx7-step">Medical History</div>
              <div className="predyx7-step">Lifestyle </div>
              <div className="predyx7-step">Laboratory Results </div>
              <div className="predyx7-step">ECG </div>
              <div className="predyx7-step">Vital Signs</div>
              <div className="predyx7-step">Health Screening</div>
            </div>

            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">
             Predyx Clinical Intelligence Engine
            </div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">
             PredyxIQ™ Clinical Intelligence Report

            </div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Member Engagement & Preventive Programs</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Physician Consultation (where appropriate)</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory mb-5">Longitudinal Health Monitoring</div>

            <p className="text-center">Predyx helps transform periodic wellness interactions into an ongoing understanding of member health.
</p>
          </div>
        </div>
      </section>
      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              The Future of  <span> Preventive Insurance</span>
            </h2>
            <p>Healthcare financing is evolving from paying for illness to supporting health.</p>

            
          </div>

          <div className="predyx3-timeline mt-5">
            <p>Predyx enables insurers to strengthen preventive care by providing meaningful Clinical Intelligence that helps members understand their health, encourages earlier engagement, and supports healthier long-term outcomes.
</p>
<p>Rather than focusing solely on disease, Predyx helps insurers foster a culture of proactive health management.
</p>
           
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
           Empower preventive health through Clinical Intelligence.


            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
              Discover how Predyx can enhance member engagement and transform health data into meaningful, longitudinal intelligence.

            </p>
            <a href="#" className="action-items-primary-btn1">
            Request Insurance Solution Overview
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
