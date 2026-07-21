import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/quick1.png";
import minute from "./../../images/quick.png";

// Import owl carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MainPage = () => {
  const isCarouselInitialized = useRef(false);
  const isDoctorCarouselInitialized = useRef(false);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

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
        <title>The Predyxiq™ Clinical Intelligence Report </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-3" style={{ lineHeight: "43px" }}>
            Most health reports present information.
            <br />
            <span>
              {" "}
              The PredyxIQ™ Clinical Intelligence Report presents understanding.
            </span>
          </h2>

          <p>
            Powered by the Predyx Clinical Intelligence Engine, it transforms
            fragmented clinical information into a clear, structured
            interpretation of your biological state, organ-system trajectories,
            and clinical priorities.
          </p>

          <p>
            Rather than asking you to interpret dozens of disconnected results,
            it brings them together into one coherent clinical narrative.
          </p>

          <p>Not more information. Better understanding.</p>
          <a href="#" className="action-items-primary-btn mr-2">
            View Sample Report
            <i className="fas fa-chevron-right" />
          </a>
          <a href="#" className="action-items-primary-btn">
            Start Your Quick Assessment
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
              Healthcare doesn't need more Reports
              <br />
              <span> It Needs Better Interpretation. </span>
            </h2>
          </div>

          <div className="predyx-content-box">
            <p>
              Every year, billions of laboratory results, ECGs, imaging studies,
              physiological measurements, and clinical assessments are
              generated. Most remain isolated. Each tells only part of the
              story.
            </p>

            <p>
              The PredyxIQ™ Clinical Intelligence Report brings those pieces
              together into a unified physiological interpretation, allowing
              physicians and individuals to understand the body as an
              interconnected biological system rather than a collection of
              unrelated test results.
            </p>

            <p>
              Because understanding begins when information becomes connected.
            </p>
          </div>

          <div className="predyx-process-section mt-5">
            <h3 className="predyx-process-title text-center">
              Designed around Biology
            </h3>

            <p className="predyx-process-subtitle text-center">
              Traditional reports are organised by laboratory departments or
              investigation types. Predyx is organised around the human body.
              Each physiological system is evaluated independently before being
              integrated into a whole-body clinical assessment.
            </p>

            <div className="row justify-content-center">
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5> Cardiovascular Trajectory</h5>
                    <p>
                      Circulation, Blood pressure, Lipids, ECG, Exercise
                      capacity, Recovery
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Metabolic Trajectory</h5>
                    <p>
                      Body composition, Glucose regulation, Insulin sensitivity,
                      Inflammation, Nutrition, Liver
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Liver Trajectory</h5>
                    <p>
                      Liver biomarkers, Fat accumulation, Metabolic influences,
                      Lifestyle contributors
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Kidney Trajectory</h5>
                    <p>
                      Renal function, Blood pressure, Metabolic influences,
                      Hydration
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Brain & Cognitive Trajectory</h5>
                    <p>Sleep, Stress, Mood, Recovery, Cognitive function.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Respiratory Trajectory</h5>
                    <p>
                      Smoking, Exercise tolerance, Pulmonary health,
                      Environmental influences
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Functional & Longevity Trajector</h5>
                    <p>
                      {" "}
                      Mobility, Strength, Recovery, Frailty, Healthy ageing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="predyx-quote-section mt-3">
            <blockquote>
              “Every organ tells part of the story. Clinical Intelligence
              emerges when those stories are interpreted together.”
            </blockquote>
          </div>
        </div>
      </section>
      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-5">
            <h2 className="predyx2-title mt-2">
              What every clinical <span> Intelligence report Includes</span>
            </h2>
            <h4 className="predyx2-subtitle mt-2">
              Every report follows the same transparent structure. Designed for
              consistency. Built for clarity.
            </h4>
          </div>

          <div className="row">
            {inputData.map((item, index) => (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="predyx2-card">
                  <div className="predyx2-card-content">
                    <h5>{item.title}</h5>

                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="explain-section predyx-section">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              Transparent <span> by Design </span>
            </h2>

            <h4 className="predyx-sub-title mt-2">
              Every recommendation answer one simple question
            </h4>
            <h3 class="hero-title">"Why?"</h3>
          </div>

          <div className="predyx-content-box">
            <div className="info-card" style={{ padding: "0px" }}>
              <h5>Selecting any recommendation reveals:</h5>
              <ul style={{ marginBottom: "20px" }}>
                <li> Clinical observations that contributed</li>
                <li>
                  {" "}
                  Biological relationships identified by the Predyx Clinical
                  Intelligence Algorithm
                </li>
                <li> Supporting clinical rationale</li>
                <li> Recommended next steps</li>
                <li> Follow-up considerations</li>
              </ul>
              <p style={{ marginBottom: "0px" }}>
                Every conclusion is transparent. Every recommendation is
                reproducible. Every decision remains explainable.
                <br />
                Because confidence begins with understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="predyx3-section " style={{ background: "#fff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              One Report. <span>Two Audiences.</span>
            </h2>

            <p className="predyx3-description mt-2">
              The PredyxIQ™ Clinical Intelligence Report was designed to serve
              both the individual and the physician.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              <strong>- For Individuals:</strong> Simple language. Beautiful
              visualisation. Clear priorities. Greater understanding.
            </p>
            <p>
              <strong>- For Physicians:</strong> Structured clinical reasoning.
              Organ-system integration. Transparent methodology. More productive
              consultations. One report. One shared understanding.
            </p>

            <p>
              <strong>One report. One shared understanding.</strong>
            </p>
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
              A Report that <span>evolves with you</span>
            </h2>
            <p className="predyx3-description mt-2 text-center">
              Health is dynamic. The Clinical Intelligence Report is designed to
              evolve alongside it.
            </p>
          </div>

          <div className="predyx7-card">
            <p>
              Each assessment becomes another point on your biological timeline.
              Over time, isolated observations become measurable trajectories.
              Those trajectories become meaningful clinical insight.
            </p>
            <p>
              Rather than simply documenting disease, the report helps reveal
              the direction in which health is moving.
            </p>

            <div className="predyx7-flow mt-5">
              <div className="predyx7-step">Assessment 1</div>

              <div className="predyx7-arrow">&#10140;</div>

              <div className="predyx7-step predyx7-active">Assessment 2</div>

              <div className="predyx7-arrow">&#10140;</div>

              <div className="predyx7-step">Assessment 3</div>
            </div>

            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-trajectory">
              Longitudinal Organ Trajectories
            </div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">
              Clinical Intelligence Dashboard
            </div>
          </div>
        </div>
      </section>

      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Built for <span> Clinical Decisions</span>
            </h2>

            <p className="predyx3-description mt-2">
              The PredyxIQ™ Clinical Intelligence Report is not intended to
              replace physician judgement. It exists to support it.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              By transforming fragmented healthcare information into organised
              clinical understanding, it allows clinicians to spend less time
              assembling data and more time making informed decisions with their
              patients.
            </p>

            <p>
              Clinical Intelligence should simplify medicine. Not complicate it.
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
              {" "}
              Every test tells part of your story.
              <br />
              The PredyxIQ™ Clinical Intelligence Report helps you understand
              the whole story.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Powered by the proprietary Predyx Clinical Intelligence Algorithm,
              every report transforms routine healthcare information into
              transparent, explainable, and reproducible Clinical
              Intelligence—helping physicians and individuals see not only where
              health stands today, but where it may be heading tomorrow.
            </p>
            <a href="#" className="action-items-primary-btn1">
              View a Sample Clinical Intelligence Report
              <i className="fas fa-chevron-right" />
            </a>
            <a href="#" className="action-items-primary-btn1">
              Start Your Quick Assessment
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
