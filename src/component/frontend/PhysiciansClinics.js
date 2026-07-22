import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/servie1.png";
import minute from "./../../images/quick.png";

// Import owl carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MainPage = () => {
  const isCarouselInitialized = useRef(false);
  const isDoctorCarouselInitialized = useRef(false);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

  const layers = [
    {
      number: "01",
      title: "Clinical Logic",
      description:
        "Applies established physiology, validated thresholds, published evidence and accepted clinical guidelines.",
    },
    {
      number: "02",
      title: "Biological Intelligence",
      description:
        "Recognizes coordinated physiological behaviour, discovers latent biological states and identifies shared biological pathways.",
    },
    {
      number: "03",
      title: "Trajectory Intelligence",
      description:
        "Interprets health as movement rather than a single score. Maps longitudinal trajectories across cardiovascular, metabolic, renal, hepatic, respiratory, neurological, functional, endocrine and longevity domains.",
    },
    {
      number: "04",
      title: "Clinical Intelligence",
      description:
        "Transforms biological understanding into transparent, reproducible clinical recommendations that remain fully explainable and traceable to the underlying evidence.",
    },
  ];
  const comparisonData = [
    {
      conventional: "Single-disease focused",
      predyx: "Whole-person assessment",
    },
    {
      conventional: "Static score",
      predyx: "Biological trajectory",
    },
    {
      conventional: "Independent risk factors",
      predyx: "Interconnected physiology",
    },
    {
      conventional: "Probability estimate",
      predyx: "Deterministic clinical reasoning",
    },
    {
      conventional: "Difficult to explain",
      predyx: "Fully transparent and reproducible",
    },
    {
      conventional: "Episodic",
      predyx: "Longitudinal intelligence",
    },
  ];

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
        <title>Clinical Intelligence for Physicians & Clinics </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
            Clinical Intelligencefor <span>Physician & Clinics</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            Built Around the Physician. Designed Around the Consultation.{" "}
          </h4>

          <p>
            Every consultation is an opportunity to change the course of a
            patient's health. Yet physicians today face an unprecedented
            challenge—more clinical information, greater complexity, and less
            time to interpret it all.
          </p>

          <p>
            Predyx was created to support the physician by transforming
            fragmented clinical data into structured, transparent, and
            actionable Clinical Intelligence. It does not replace clinical
            judgement; it enhances it.
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
                  Modern medicine generates more data than ever before, but
                  information alone does not improve decisions.
                </p>
              </div>
              <div
                className="predyx-content-box"
                style={{ minHeight: "367px" }}
              >
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Physicians routinely navigate::</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li>
                      {" "}
                      Multiple laboratory reports from different providers
                    </li>
                    <li> ECGs, imaging studies and physiological tests</li>
                    <li> Lifestyle and behavioural risk factors</li>
                    <li> Previous consultations and medical records</li>
                    <li>
                      {" "}
                      Increasing patient expectations around prevention and
                      longevity
                    </li>
                    <li>
                      {" "}
                      Limited consultation time despite growing complexity
                    </li>
                  </ul>
                  <p style={{ marginBottom: "0px" }}>
                    The challenge is no longer access to data—it's making sense
                    of it.
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
                  Predyx integrates diverse clinical data into a unified patient
                  biological health view for better decisions.
                </p>
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>
                    Using its proprietary deterministic Clinical Intelligence
                    Engine, Predyx:
                  </h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li>
                      {" "}
                      Organises fragmented clinical information into one
                      structured assessment
                    </li>
                    <li>
                      {" "}
                      Interprets biological relationships across organ systems
                    </li>
                    <li>
                      {" "}
                      Identifies emerging health trajectories before overt
                      disease develops
                    </li>
                    <li> Prioritises clinically significant findings</li>
                    <li>
                      {" "}
                      Highlights positive health signals alongside areas
                      requiring attention
                    </li>
                    <li>
                      {" "}
                      Tracks change over time through longitudinal assessments
                    </li>
                  </ul>
                  <p style={{ marginBottom: "0px" }}>
                    The result is a clearer understanding of the patient—not
                    just individual test results.
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
              Built to Integrate. <span> Never to Replace. </span>
            </h2>
            <p>
              Predyx has been designed to complement the physician's workflow
              rather than alter it.
            </p>
          </div>

          <div className="predyx-content-box">
            <p>
              {" "}
              It works alongside existing practice patterns, laboratory
              partners, imaging providers, and electronic health record systems.
            </p>

            <p>
              {" "}
              Predyx never generates hidden conclusions or black-box
              recommendations. Every insight is derived through transparent,
              deterministic clinical reasoning that physicians can understand,
              review, and apply using their own expertise.
            </p>

            <p>
              {" "}
              Clinical judgement remains where it belongs—with the physician.
            </p>
          </div>
        </div>
      </section>

      <section className="predyx3-section " style={{ background: "#fff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              What Physicians <span> Receive</span>
            </h2>

            <p className="predyx3-description mt-2">
              Every assessment is translated into a concise Clinical
              Intelligence Report that is structured around biological
              understanding rather than isolated measurements.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <h5>Each report includes:</h5>
            <ul className="lists">
              <li>Overall Clinical Intelligence Score</li>
              <li> Organ-System Trajectory Overview</li>
              <li>Priority Clinical Findings</li>
              <li> Positive Health Signals</li>
              <li> Risk Stratification</li>
              <li> Longitudinal Comparison (where available)</li>
              <li> Personalised Follow-up Recommendations</li>
              <li> Patient-friendly Clinical Summary</li>
            </ul>
            <p>
              Instead of reviewing dozens of disconnected values, physicians
              receive a structured overview that supports efficient and informed
              decision-making.
            </p>
          </div>
        </div>
      </section>

      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-5">
            <h2 className="predyx2-title mt-2">
              Benefits For <span>Physicians, Patients & Clinics</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Physicians</h5>

                  <ul className="lists">
                    <li>
                      Faster interpretation of complex clinical information
                    </li>
                    <li>Reduced cognitive burden during consultations</li>
                    <li>
                      Transparent reasoning supporting clinical confidence
                    </li>
                    <li>Improved preventive and longitudinal care</li>
                    <li>More meaningful patient conversations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Patients</h5>

                  <ul className="lists">
                    <li>Better understanding of their own health</li>
                    <li> Clear visual representation of biological status</li>
                    <li> Increased engagement and adherence</li>
                    <li> Shared decision-making with their physician</li>
                    <li> Earlier opportunities for prevention</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Clinics</h5>

                  <ul className="lists">
                    <li> Enhanced preventive health services</li>
                    <li> Standardised clinical reporting</li>
                    <li> Improved patient experience</li>
                    <li>
                      {" "}
                      Greater differentiation in an increasingly competitive
                      healthcare environment
                    </li>
                    <li>
                      {" "}
                      Seamless integration into existing clinical workflows
                    </li>
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
              A Typical <span>Clinical Workflow</span>
            </h2>
          </div>

          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">Patient Assessment</div>
            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-flow">
              <div className="predyx7-step">Clinical History</div>
              <div className="predyx7-step">Lifestyle</div>
              <div className="predyx7-step">Physical Examination</div>
              <div className="predyx7-step">Laboratory Results</div>
              <div className="predyx7-step">ECG</div>
              <div className="predyx7-step">Imaging</div>
              <div className="predyx7-step">Vital Signs</div>
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
            <div className="predyx7-trajectory">Physician Consultation</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Shared Clinical Decision</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory mb-5">
              Longitudinal Follow-up
            </div>

            <p className="text-center">
              Every new assessment builds upon the previous one, enabling
              physicians to monitor biological trajectories rather than isolated
              events.
            </p>
          </div>
        </div>
      </section>

      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              The Future of <span> Clinical Practice</span>
            </h2>

            <p className="predyx3-description mt-2">
              Healthcare is moving beyond the treatment of established disease
              toward the continuous understanding of health.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              {" "}
              Predyx enables this transition by providing physicians with a
              unified, biologically informed view of each patient—supporting
              earlier intervention, more personalised care, and more meaningful
              conversations.
            </p>
            <p>
              {" "}
              It is not another software platform. It is a new layer of Clinical
              Intelligence designed to help physicians practice the medicine
              they trained for.
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
              Empower every consultation with Clinical Intelligence.
            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
              Discover how Predyx can integrate seamlessly into your practice
              and help transform fragmented clinical information into
              meaningful, actionable understanding.
            </p>
            <a href="#" className="action-items-primary-btn1">
              Request a Clinical Intelligence Demo
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
