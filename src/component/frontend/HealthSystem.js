import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/hospital.png";
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
        <title>Clinical Intelligence for  Hospitals & Health Systems </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
          Clinical Intelligence for <span> Hospitals & Health Systems</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>Connecting Clinical Data. Strengthening Clinical Decisions.</h4>
          <p>Hospitals generate extraordinary amounts of clinical information every day. Laboratory results, imaging studies, physiological testing, specialist consultations, and electronic medical records each contribute valuable insights into patient care.</p>

<p>The challenge is not access to information. The challenge is transforming fragmented information into meaningful Clinical Intelligence that supports clinicians, strengthens decision-making, and improves continuity of care.</p>

<p>Predyx serves as the Clinical Intelligence layer connecting these diverse clinical signals into a unified understanding of patient health.
</p>

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
                 Modern hospitals excel at generating data but often struggle to create a unified clinical narrative across departments.
</p>
              </div>
              <div
                className="predyx-content-box" style={{minHeight:"345px"}}>
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Common challenges include:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> Fragmented information across specialties</li>
<li> Multiple diagnostic systems operating independently</li>
<li> Limited longitudinal visibility beyond individual encounters</li>
<li> Increasing complexity of chronic disease management</li>
<li> Growing expectations for preventive and personalized care</li>
<li> Administrative and cognitive burden on clinicians</li>
</ul>
                  <p style={{ marginBottom: "0px" }}>
                   The opportunity lies in connecting existing information rather than creating additional complexity.

                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  How <span> Predyx Helps </span>
                </h2>
                <p>Predyx integrates clinical information from across the healthcare ecosystem into a structured, transparent view of patient health.</p>
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>The platform enables:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> Cross-disciplinary clinical integration</li>
<li> Organ-system trajectory assessment</li>
<li> Longitudinal patient intelligence</li>
<li> Structured Clinical Intelligence Reports</li>
<li> Transparent clinical reasoning</li>
<li> Earlier recognition of emerging physiological change</li>
<li> Consistent interpretation across care settings</li>
</ul>
      <p style={{ marginBottom: "0px" }}>Predyx enhances clinical workflows by organizing information into meaningful biological understanding.</p>
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
              Designed to Integrate. <span>   Never to Replace. </span>
            </h2>
            <p> Predyx complements existing hospital infrastructure without disrupting established systems.</p>
          </div>
          <div className="predyx-content-box">
            <h5>It integrates alongside:</h5>
            <ul className="lists">
                <li> Electronic Health Records (EHRs)</li>
<li> Laboratory Information Systems</li>
<li> Radiology and PACS</li>
<li> Cardiology platforms</li>
<li> Health Check Programs</li>
<li> Preventive Medicine Clinics</li>
<li> Specialty Departments</li>
            </ul>
            <p>Predyx is not another hospital information system. It is the Clinical Intelligence layer that helps existing systems work together more effectively.</p>
          </div>
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  What Hospitals  <span> Receive </span>
                </h2>
               
              </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Patient-Level Intelligence</h5>
                  <p>For every patient:</p>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> PredyxIQ™ Clinical Intelligence Report</li>
 <li> Organ-System Health Trajectories</li>
 <li> Clinical Intelligence Score</li>
 <li> Priority Clinical Findings</li>
 <li> Positive Health Signals</li>
 <li> Longitudinal Progress Tracking</li>
 <li> Preventive Care Opportunities</li>

</ul>
                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Enterprise-Level Intelligence</h5>
                  <p>Hospital leadership can gain de-identified insights into:</p>
                  <ul style={{ marginBottom: "20px" }}>
                   <li> Population health trends</li>
<li> Disease burden distribution</li>
<li> Preventive care opportunities</li>
<li> Service-line health profiles</li>
<li> Longitudinal outcome tracking</li>
<li> Clinical program performance</li>


</ul>
<p style={{ marginBottom: "0px" }}>These insights support quality improvement and strategic planning while preserving patient privacy.
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
              Benefits For <span>Clinicians, Hospitals & Patients</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Clinicians</h5>

                  <ul className="lists">
                    <li> Better understanding of personal health</li>
<li> Earlier identification of health risks</li>
<li> Clear preventive guidance</li>
<li> Improved engagement with wellness programs</li>
<li> Greater continuity of care</li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Hospitals</h5>

                  <ul className="lists">
                    <li> Stronger interdisciplinary collaboration</li>
<li> Increased value from existing clinical data</li>
<li> Enhanced preventive medicine services</li>
<li> Improved patient engagement</li>
<li> Support for quality and innovation initiatives</li>


                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Patients</h5>

                  <ul className="lists">
                    <li> More coordinated care</li>
<li> Easier understanding of health status</li>
<li> Earlier identification of biological change</li>
<li> Better continuity across specialties</li>
<li> Personalized preventive strategies</li>



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
             A Typical   <span>Hospital   Workflow</span>
            </h2>
          </div>


          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">Patient Encounter</div>
            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-flow">
              <div className="predyx7-step">Medical History</div>
              <div className="predyx7-step">Laboratory Results </div>
              <div className="predyx7-step">Imaging </div>
              <div className="predyx7-step">ECG </div>
              <div className="predyx7-step">Physiological Testing</div>
              <div className="predyx7-step">Specialist Consultations</div>
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
            <div className="predyx7-trajectory">Multidisciplinary Clinical Review</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Personalized Care Plan</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory mb-5">Longitudinal Follow-up Across the Health System</div>

            <p className="text-center">Every patient interaction contributes to a continuously evolving understanding of health rather than remaining an isolated episode of care.</p>
          </div>
        </div>
      </section>
      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              The Future of  <span> Integrated Healthcare</span>
            </h2>
          

            
          </div>

          <div className="predyx3-timeline mt-5">
            <p>The hospitals of tomorrow will not be defined by how much data they collect, but by how effectively they transform information into better clinical decisions.</p>

<p>Predyx enables health systems to bridge departments, strengthen clinical collaboration, and support physicians with transparent, biologically informed Clinical Intelligence.</p>

<p>It represents a new layer of healthcare infrastructure—connecting information, enhancing understanding, and helping hospitals deliver more coordinated, preventive, and patient-centered care.</p>
           
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
           Transform clinical data into actionable intelligence across your health system.



            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
              Discover how Predyx can integrate into your hospital infrastructure and strengthen interdisciplinary decision-making.


            </p>
            <a href="#" className="action-items-primary-btn1">
            Request Health System Architecture Demo
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
