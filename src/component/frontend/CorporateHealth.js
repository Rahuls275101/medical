import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/corporate-health.png";
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
        <title>Clinical Intelligence for Corporate Health  </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
            Clinical Intelligence  for <span>Corporate Health </span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>From Annual Health Checks to Continuous Workforce Health Intelligence</h4>
          <p>Health screening has traditionally been designed to detect disease. Modern organizations need something more—an understanding of how employee health is changing over time.</p>
          <p>Predyx transforms periodic health assessments into continuous Clinical Intelligence, helping organizations identify emerging health risks earlier, support employee wellbeing, and build healthier, more productive workforces.</p>

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
                  Most corporate health programs generate large volumes of medical data but limited actionable insight.
                </p>
              </div>
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Organizations often face:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li>Annual health check-ups that provide only a snapshot in time</li>
<li>Reports that are difficult for employees to understand</li>
<li>Limited engagement after screening</li>
<li>Rising costs from chronic disease and absenteeism</li>
<li>Fragmented occupational and wellness initiatives</li>
<li>Difficulty measuring the long-term impact of health programs</li>
</ul>
                  <p style={{ marginBottom: "0px" }}>
                    The opportunity is not simply to collect more data—but to create meaningful, longitudinal health intelligence.

                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  How <span> Predyx Helps </span>
                </h2>
                <p>
                  Predyx consolidates clinical, physiological, and lifestyle information into a structured view of employee health.

                </p>
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>The platform enables:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li>Individual Clinical Intelligence Reports for every employee</li>
<li> Organ-system trajectory assessment</li>
<li>Early identification of emerging health risks</li>
<li> Population-level health insights</li>
<li> Longitudinal tracking across annual assessments</li>
<li> Actionable recommendations for preventive interventions</li>

                  </ul>
      <p style={{ marginBottom: "0px" }}>The result is a healthier workforce supported by measurable clinical insight.
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
              Built for Enterprise. <span>  Designed Around People. </span>
            </h2>
            <p>Predyx is designed to integrate seamlessly into existing corporate health programs without disrupting established workflows.</p>
          </div>

          <div className="predyx-content-box">
            <h5>It works alongside:</h5>
            <ul className="lists">
              <li> Annual health check providers</li>
<li> Occupational health services</li>
<li> Corporate wellness initiatives</li>
<li> Hospital partners</li>
<li> Diagnostic laboratories</li>
<li> Insurance wellness programs</li>
            </ul>
            <p>Rather than replacing existing services, Predyx enhances their value by converting isolated health data into meaningful Clinical Intelligence.</p>
          </div>
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  What Organizations  <span> Receive </span>
                </h2>
                <p>
                 
Every deployment delivers intelligence at two complementary levels.


                </p>
              </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Employee Intelligence</h5>
                  <p>Each participant receives:</p>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> PredyxIQ™ Clinical Intelligence Report</li>
<li> Overall Clinical Intelligence Score</li>
<li> Organ-System Trajectories</li>
<li> Priority Clinical Findings</li>
<li> Positive Health Signals</li>
<li> Personalized preventive recommendations</li>
<li> Longitudinal progress tracking</li>
</ul>
                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Population Intelligence</h5>
                  <p>Leadership receives de-identified, aggregated insights such as:</p>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> Overall workforce health profile</li>
<li> Distribution of metabolic and cardiovascular risk</li>
<li> Organ-system health trends</li>
<li> Emerging population health patterns</li>
<li> Preventive opportunity areas</li>
<li> Year-on-year health improvements</li>
</ul>
<p style={{ marginBottom: "0px" }}>No individual medical confidentiality is compromised while enabling meaningful organizational planning.
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
              Benefits For <span>Employees, Employers & Healthcare Partners</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Employees</h5>

                  <ul className="lists">
                    <li>Greater understanding of personal health</li>
<li>Earlier identification of modifiable risks</li>
<li> Clear, actionable health guidance</li>
<li> Improved engagement in preventive care</li>
<li>Longitudinal tracking of progress</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Employers</h5>

                  <ul className="lists">
                    <li> Enhanced value from annual health assessments</li>
<li> Support for healthier, more productive teams</li>
<li> Better measurement of wellness initiatives</li>
<li> Data-driven preventive health planning</li>
<li> Stronger employee health engagement</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Healthcare Partners</h5>

                  <ul className="lists">
                    <li> Improved interpretation of screening results</li>
<li> More meaningful physician consultations</li>
<li> Better continuity of care</li>
<li> Greater integration across healthcare providers</li>

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
             A Typical   <span>Enterprise Workflow</span>
            </h2>
          </div>

          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">Employee Health Assessment</div>
            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-flow">
              <div className="predyx7-step">Medical History</div>
              <div className="predyx7-step">Lifestyle </div>
              <div className="predyx7-step">Laboratory Tests</div>
              <div className="predyx7-step">Vitals </div>
              <div className="predyx7-step">ECG</div>
              <div className="predyx7-step">Anthropometry</div>
            </div>

            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">
              Predyx Clinical Intelligence Engine
            </div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">
              Individual PredyxIQ™ Clinical Intelligence Report
            </div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Aggregated Population Health Dashboard</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Preventive Programs & Clinical Follow-up</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory mb-5">Annual Reassessment & Longitudinal Tracking</div>

            <p className="text-center">Each assessment builds on the previous one, enabling organizations to monitor workforce health trends rather than isolated screening events.</p>
          </div>
        </div>
      </section>
      

      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              The Future of  <span> Workforce Health</span>
            </h2>

            
          </div>

          <div className="predyx3-timeline mt-5">
            <p>The most successful organizations understand that employee health is not simply a benefit—it is a strategic asset.</p>
<p>Predyx helps organizations move beyond annual health reports toward continuous Clinical Intelligence, enabling informed decisions, stronger preventive strategies, and healthier, more resilient workforces.
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
            Build a healthier workforce through Clinical Intelligence.

            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
              Discover how Predyx can transform corporate health assessments into measurable, longitudinal health intelligence for your organization.

            </p>
            <a href="#" className="action-items-primary-btn1">
            Request Enterprise Solution Overview
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
