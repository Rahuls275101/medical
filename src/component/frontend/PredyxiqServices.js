import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import logo from "./logo.png";
import heroImg from "./../../images/quick2.png";
import minute from "./../../images/quick.png";
import medicalImg from "./../../images/clinical.png";

// Import owl carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MainPage = () => {
  const isCarouselInitialized = useRef(false);
  const isDoctorCarouselInitialized = useRef(false);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

  const evidence = [
    "Experienced physicians",
    " Trusted laboratories",
    " Advanced diagnostic technologies",
    " Hospital information systems",
    " Electronic health records",
    " Public health programmes",
  ];

  const data = [
    {
      title: "Clinical Intelligence for Physicians & Clinics",
      desc: "Helping physicians organise fragmented clinical information into transparent, explainable Clinical Intelligence that supports better clinical decisions.",
      link: "/clinical-intelligence-for-laboratories-diagnostics",
    },
    {
      title: "Clinical Intelligence for Corporate Health",
      desc: "  Transforming workforce health programmes into longitudinal preventive health intelligence.",
      link: "/clinical-intelligence-for-laboratories-diagnostics",
    },
    {
      title: "Clinical Intelligence for Insurance",
      desc: "Supporting preventive engagement and risk intelligence through structured physiological understanding.",
      link: "/clinical-intelligence-for-laboratories-diagnostics",
    },
    {
      title: "Clinical Intelligence for Hospitals & Health Systems",
      desc: "Connecting departments, specialties and patient journeys through integrated Clinical Intelligence.",
      link: "/clinical-intelligence-for-laboratories-diagnostics",
    },
    {
      title: "Clinical Intelligence for Laboratories & Diagnostics",
      desc: "  Transforming laboratory measurements into meaningful physiological interpretation and Clinical Intelligence.",
      link: "/clinical-intelligence-for-laboratories-diagnostics",
    },
  ];

  const inputData = [
    {
      title: "Executive Clinical Summary",
      text: " A concise overview highlighting the individual's current biological status and highest clinical priorities.",
    },
    {
      title: "Overall Clinical Intelligence Score",
      text: "A high-level summary of overall physiological status. Designed to simplify—not replace—the underlying clinical detail.",
    },
    {
      title: "Organ-System Trajectory Dashboard",
      text: "A visual overview of every major physiological system. Each trajectory is presented as Improving | Stable | Needs Attention | Progressing, allowing clinicians and individuals to understand biological direction rather than isolated abnormalities.",
    },
    {
      title: "Positive Health Signals",
      text: "Health is more than identifying risk. The report highlights areas of resilience, physiological stability, and healthy adaptation that deserve recognition and reinforcement.",
    },
    {
      title: "Priority Clinical Actions",
      text: "The most important opportunities for intervention are clearly prioritised and explained. Not everything abnormal is equally important. The report helps distinguish what requires immediate attention from what simply deserves observation.",
    },
    {
      title: "Questions to Discuss With Your Physician",
      text: "Meaningful healthcare begins with meaningful conversations. Every report encourages informed discussion rather than self-diagnosis.",
    },
  ];
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
        <title>Predyxiq Services </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-3" style={{ lineHeight: "43px" }}>
            Healthcare is not delivered by a single organisation, <br />
            <span> technology or professional.</span>
          </h2>

          <p>
            It is built upon physicians, hospitals, laboratories, diagnostic
            technologies, electronic health records, employers, insurers and
            public health systems—each contributing a different part of the
            clinical picture.
          </p>

          <p>Predyx was designed to connect them.</p>

          <p>
            Powered by a proprietary Clinical Intelligence Algorithm, Predyx
            serves as a common intelligence layer that organises fragmented
            clinical information into transparent, explainable and reproducible
            Clinical Intelligence.
          </p>

          <p>
            It does not replace the healthcare ecosystem. It helps the
            healthcare ecosystem work together.
          </p>

          <a href="#" className="action-items-primary-btn mr-2">
            Explore the Solution
            <i className="fas fa-chevron-right" />
          </a>

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
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              Built Once. <span> Applied Eveywhere. </span>
            </h2>
          </div>

          <div className="predyx-content-box">
            <p>
              Most healthcare technologies are designed for a single workflow.
              Predyx was designed differently. The Clinical Intelligence Engine
              remains exactly the same regardless of where it is deployed.
            </p>
            <p>
              Whether supporting an individual assessment, a physician
              consultation, a diagnostic laboratory, a corporate wellness
              programme or a national health initiative, the underlying
              scientific methodology never changes.
            </p>
            <p>The workflow adapts. The science does not.</p>
          </div>
        </div>
      </section>
      <section className="explain-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title">
                Built to Integrated. <span> Never to Replace.</span>
              </h2>
            </div>
          </div>

          <div className="decision-card" style={{ marginTop: "20px" }}>
            <div className="row">
              <div className="col-lg-4">
                <div className="info-card">
                  <h5>Healthcare already possesses extraordinary expertise:</h5>

                  <ul>
                    {evidence.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="analysis-card">
                  <div className="analysis-block">
                    <p>
                      Predyx was never created to replace any of them. It was
                      created to connect them.
                    </p>
                    <p>
                      Rather than asking organisations to abandon existing
                      systems, Predyx sits above them as a transparent Clinical
                      Intelligence layer—bringing fragmented information
                      together into a single, meaningful clinical understanding.
                    </p>
                    <ul className="lists">
                      <li>
                        {" "}
                        It does not replace physicians — It strengthens
                        physician decision-making.
                      </li>
                      <li>
                        {" "}
                        It does not replace laboratory reports — It enhances
                        their clinical interpretation.
                      </li>
                      <li>
                        {" "}
                        It does not replace hospital systems — It connects
                        information across them.
                      </li>
                      <li>
                        {" "}
                        It does not replace clinical judgement — It supports it
                        with organised, explainable reasoning.
                      </li>
                    </ul>
                    <p>
                      Predyx enhances healthcare. It never asks healthcare to
                      start over.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="does-section">
        <div className="container">
          <div className="text-center mb-2">
            <h2 className="section-title">Our <span>Solutions</span></h2>
            <h3 className="section-subtitle" style={{ fontSize: "20px" }}>
              Predyx is a single Clinical Intelligence Platform with
              purpose-built solutions for the healthcare ecosystem.
            </h3>
            <p className="section-text">
              Select the solution most relevant to your organisation to explore
              how Predyx integrates into your workflow.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="timeline">
                {data.map((item, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="number">{index + 1}</div>
                    <div className="content">
                      <h5>{item.title}</h5>
                      <p style={{ marginBottom: "9px" }}>{item.desc}</p>
                      <Link to={item.link} className="service-read-more">
                        Explore Solution →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <img
                src={medicalImg}
                className="img-fluid side-image"
                alt="Medical illustration"
              />
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
              {" "}
             One Platform. One Scientific Foundation.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Different users.<br/>
Different workflows.<br/>
One scientific foundation.<br/>



            </p>
            <a href="#" className="action-items-primary-btn1">
             Built to integrate. Never to replace.
              <i className="fas fa-chevron-right" />
            </a>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
