import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import logo from "./logo.png";
import heroImg from "./../../images/herp2.jpg";
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
      no: "01",
      text: "Clinical information is collected: History, Laboratory science, Physiology, Imaging, Lifestyle, Physical examination.",
    },
    {
      no: "02",
      text: "The proprietary Clinical Intelligence Algorithm evaluates each observation individually.",
    },
    {
      no: "03",
      text: "Related findings are organised into physiological pathways",
    },
    {
      no: "04",
      text: "Those pathways are interpreted as organ-system trajectories.",
    },
    { no: "05", text: "Clinical priorities are generated." },
    { no: "06", text: "Transparent recommendations are presented." },
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
        <title>Science Of Clinical Intelligence </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-3" style={{ lineHeight: "43px" }}>
            Clinical Intelligence does not begin by inventing new biology.
            <span>
              {" "}
              It begins by understanding the biology we already know.
            </span>
          </h2>

          <p>
            Every laboratory value. Every physiological measurement. Every
            clinical history. Every imaging study. Every examination finding.
            Each contributes a piece of the biological picture.{" "}
          </p>

          <p>
            Predyx organizes these individual observations into structured,
            transparent and reproducible Clinical Intelligence using its
            proprietary Clinical Intelligence Algorithm. The goal is not to
            replace medical science. It is to make medical science easier to
            apply.{" "}
          </p>

          <a href="#" className="action-items-primary-btn mr-2">
            Explore the Science
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
              Clinical Intelligence <span> Begins with Biology. </span>
            </h2>
          </div>

          <div className="predyx-content-box">
            <p>
              <strong>
                Human biology functions as an interconnected system.
              </strong>
            </p>
            <ul className="lists">
              <li> The heart influences the kidneys.</li>
              <li> Metabolism affects the liver.</li>
              <li> Inflammation impacts blood vessels.</li>
              <li> Sleep alters endocrine regulation.</li>
              <li> Nutrition influences every organ system.</li>
            </ul>
            <p>
              {" "}
              Healthcare often measures these systems separately. Predyx
              interprets them together.
              <br />
              Because biology has never been fragmented. Only healthcare data
              has.
            </p>
          </div>
        </div>
      </section>

      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-4">
            <h2 className="predyx2-title mt-2">
              Four Data to <span> Understanding</span>
            </h2>

            <h4 className="predyx2-subtitle mt-2">
              Predyx follows a transparent sequence of clinical reasoning:
            </h4>

            <p className="predyx2-description mt-4">
              The Predyx Clinical Intelligence Algorithm is intentionally
              modality-agnostic. It integrates information from every major
              domain of routine healthcare into one unified physiological
              framework.
            </p>
          </div>

          <div className="row">
            {inputData.map((item, index) => (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="predyx2-card">
                  <div className="predyx2-card-number">{item.no}</div>

                  <div className="predyx2-card-content">
                    <h5>{item.title}</h5>

                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="predyx2-bottom-box mt-4">
            <h3>Predyx is not built around tests.</h3>

            <p className="mb-0">It is built around biology.</p>
          </div>
        </div>
      </section>

      <section className="predyx3-section " style={{ background: "#fff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Deterministic <span>by Design</span>
            </h2>

            <p className="predyx3-description mt-2">
              Predyx does not generate conclusions through probability alone.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              Its Clinical Intelligence Algorithm follows predefined
              physiological relationships built upon established clinical
              science.
            </p>
            <p>
              The same clinical inputs always produce the same clinical
              interpretation.
              <br />
              Transparent. Reproducible. Explainable.
            </p>
          </div>
        </div>
      </section>
      <section className="predyx3-section " style={{ background: "#eaf0f6" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Why Organ-System <span> Trajectories Matter</span>
            </h2>
            <p className="predyx3-description mt-2">
              Health rarely changes overnight. Disease often develops gradually
              through measurable biological progression.{" "}
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              Rather than viewing isolated abnormalities, Predyx evaluates
              whether organ systems appear to be:
            </p>
            <ul className="lists">
              <li> Stable</li>
              <li> Improving</li>
              <li> Under Stress</li>
              <li> Progressing</li>
            </ul>

            <p>
              Understanding direction is often more valuable than identifying a
              single abnormal value.
            </p>
          </div>
        </div>
      </section>
      <section className="predyx3-section " style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Transparent <span>Clinical Reasoning</span>
            </h2>

            <p className="predyx3-description mt-2">
              Every conclusion generated by Predyx can be traced back to the
              observations that contributed to it.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              Clinical Intelligence should never feel mysterious. Physicians
              deserve to understand the reasoning. Individuals deserve to
              understand their health.
            </p>
            <p>Transparency builds confidence. Confidence builds trust.</p>
          </div>
        </div>
      </section>
      <section className="predyx3-section " style={{ background: "#eaf0f6" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Designed to <span> Support Physicians</span>
            </h2>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              <strong>
                Predyx was developed around one fundamental principle:{" "}
              </strong>
              Clinical Intelligence should strengthen medical practice, not
              replace clinical expertise.
            </p>

            <p>
              The physician remains responsible for diagnosis, treatment and
              patient care.
              <br />
              Predyx provides organised biological understanding that supports
              more informed clinical conversations and decision-making.
            </p>
          </div>
        </div>
      </section>
      <section className="predyx3-section " style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              A Living <span>Scientific Platform</span>
            </h2>
            <p className="predyx3-description mt-2">
              Medicine continues to evolve. New biomarkers emerge. Clinical
              evidence expands. Diagnostic technologies improve.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              The Predyx platform is designed to incorporate validated
              scientific advances while preserving transparency, reproducibility
              and consistency.
              <br />
              Innovation should strengthen scientific reasoning—not compromise
              it.
            </p>
          </div>
        </div>
      </section>
      <section className="predyx3-section " style={{ background: "#eaf0f6" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              More <span> then Technology</span>
            </h2>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              Predyx is not simply software. It is a structured clinical
              methodology:
            </p>

            <ul className="lists">
              <li>A proprietary Clinical Intelligence Algorithm.</li>
              <li> A transparent reasoning framework.</li>
              <li> A reproducible scientific architecture.</li>
            </ul>

            <p>Technology delivers it. Clinical science defines it.</p>
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
              Clinical Intelligence should be understandable. Not mysterious.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Predyx does not ask physicians or individuals to trust a black
              box.
              <br />
              It shows how clinical observations become meaningful biological
              understanding through a transparent, reproducible process grounded
              in established medical science.
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Because confidence in healthcare begins with confidence in the
              reasoning behind it.
            </p>
            <a href="#" className="action-items-primary-btn1">
              Explore the Predyx Platform
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
