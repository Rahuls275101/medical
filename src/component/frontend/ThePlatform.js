import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/herp1.jpg";

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
      no: "01",
      title: "Clinical History",
      text: "Age, Sex, Symptoms, Medical history, Family history, Medication history, Previous interventions, Occupational factors.",
    },
    {
      no: "02",
      title: "Lifestyle & Behaviour",
      text: "Nutrition, Physical activity, Sleep, Stress, Recovery, Tobacco, Alcohol and Environmental exposures.",
    },
    {
      no: "03",
      title: "Physical Examination & Anthropometry",
      text: "Height, Weight, BMI, Waist circumference, Blood pressure, Heart rate, Oxygen saturation, Functional capacity and body composition.",
    },
    {
      no: "04",
      title: "Laboratory Science",
      text: "Haematology, Clinical biochemistry, Metabolic biomarkers, Cardiovascular biomarkers, Renal biomarkers, Hepatic biomarkers, Endocrine markers and Genetic information.",
    },
    {
      no: "05",
      title: "Physiological Testing",
      text: "ECG, Exercise testing, Pulmonary function testing, HRV, Sleep assessment, Wearables and Functional performance testing.",
    },
    {
      no: "06",
      title: "Diagnostic Imaging",
      text: "Ultrasound, Echocardiography, CT, MRI, DEXA, FibroScan, Retinal imaging and Vascular imaging.",
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
        <title>The Platform - My Website</title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-3">
            Understanding Biology.<span> Not Guessing It.</span>
          </h2>
          <p>
            Healthcare has entered the age of Artificial Intelligence. Predyx
            was built for something fundamentally different. At its core lies a
            proprietary deterministic Clinical Intelligence Algorithm developed
            to organize established medical knowledge into transparent,
            reproducible clinical reasoning.
          </p>

          <p>
            Rather than generating probabilistic predictions from statistical
            models, the Predyx algorithm interprets physiological relationships,
            biological dependencies, and evidence-based clinical logic to
            produce explainable clinical intelligence that physicians can
            inspect, understand, and trust.
          </p>

          <p>
            Every identical clinical input produces the same clinical output.
            Every recommendation can be traced. Every conclusion can be
            explained. Because medicine should never become a black box.
          </p>
          <a href="#" className="action-items-primary-btn mr-2">
            Explore Predyx IQ
            <i className="fas fa-chevron-right" />
          </a>
          <a href="#" className="action-items-primary-btn">
            Request a Technical Briefing
            <i className="fas fa-chevron-right" />
          </a>

          <img
            src={heroImg}
            alt="About us"
            className="img-fluid"
            style={{ marginTop: "20px" }}
          />
        </div>
      </section>

      <section className="predyx-section">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              The Intelligence <span>Behind Predyx</span>
            </h2>

            <h4 className="predyx-sub-title mt-2">
              Built on Clinical Intelligence.
              <span> Not Artificial Intelligence.</span>
            </h4>
          </div>

          <div className="predyx-content-box">
            <p className="predyx-text">
              Artificial Intelligence has become synonymous with intelligent
              software. Predyx deliberately follows a different scientific
              philosophy.
            </p>

            <p className="predyx-text">
              Instead of attempting to "learn medicine" from historical
              datasets, the Predyx Clinical Intelligence Engine applies a
              proprietary deterministic Clinical Intelligence Algorithm built
              upon established physiology, evidence-based medicine, validated
              clinical thresholds, and structured biological reasoning.
            </p>

            <p className="predyx-text">
              The algorithm does not generate diagnoses. It does not invent
              probabilities. It does not replace physician judgement. It
              organizes biological complexity into transparent clinical
              intelligence that is reproducible, explainable and auditable.
            </p>

            <div className="predyx-highlight-box mt-4">
              <h5 className="predyx-highlight-title">The Result</h5>

              <p className="mb-0">
                It is not another prediction. It is a structured physiological
                interpretation.
              </p>
            </div>
          </div>

          <div className="predyx-process-section mt-5">
            <h3 className="predyx-process-title text-center">
              The Predyx Algorithm Process
            </h3>

            <p className="predyx-process-subtitle text-center">
              Every assessment passes through four sequential stages of
              deterministic reasoning.
            </p>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-number">01</div>

                  <div className="predyx-step-content">
                    <h5>Clinical Integration</h5>

                    <p>
                      Routine healthcare information is organized into a unified
                      physiological framework.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-number">02</div>

                  <div className="predyx-step-content">
                    <h5>Biological Reasoning</h5>

                    <p>
                      The algorithm evaluates biological dependencies rather
                      than isolated abnormalities, recognizing how physiological
                      systems interact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-number">03</div>

                  <div className="predyx-step-content">
                    <h5>Trajectory Estimation</h5>

                    <p>
                      Organ systems are evaluated for direction:
                      <strong> Stable</strong>,<strong> Improving</strong>,
                      <strong> Compensating</strong>,
                      <strong> Progressing</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-number">04</div>

                  <div className="predyx-step-content">
                    <h5>Clinical Prioritisation</h5>

                    <p>
                      Clinically meaningful priorities are identified, guiding
                      physicians while maintaining complete transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="predyx-quote-section mt-3">
            <blockquote>
              “Clinical Intelligence is not generated. It is systematically
              derived through deterministic medical reasoning.”
            </blockquote>
          </div>
        </div>
      </section>
      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-4">
            <h2 className="predyx2-title mt-2">
              What Enters the <span>Predyx Algorithm</span>
            </h2>

            <h4 className="predyx2-subtitle mt-2">
              Clinical Intelligence begins with structured observation.
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
              <div className="col-lg-6 mb-4" key={index}>
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

          <div className="predyx2-future">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <div className="predyx2-future-icon">⬈</div>
              </div>

              <div className="col-md-10">
                <h4>Future Digital Inputs</h4>

                <p className="mb-0">
                  The architecture is designed to evolve. As healthcare
                  advances, the algorithm can incorporate digital biomarkers,
                  remote monitoring, wearable technologies, home diagnostics and
                  future clinical innovations without changing its underlying
                  reasoning framework.
                </p>
              </div>
            </div>
          </div>

          <div className="predyx2-bottom-box mt-4">
            <h3>Predyx is not built around tests.</h3>

            <p className="mb-0">It is built around biology.</p>
          </div>
        </div>
      </section>
      <section className="predyx3-section ">
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Four Layers of <span>Clinical Intelligence</span>
            </h2>

            <p className="predyx3-description mt-2">
              The Predyx Algorithm evaluates every assessment through four
              sequential reasoning layers.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            {layers.map((item, index) => (
              <div className="predyx3-item" key={index}>
                <div className="predyx3-left">
                  <div className="predyx3-circle">{item.number}</div>

                  {index !== layers.length - 1 && (
                    <span className="predyx3-line"></span>
                  )}
                </div>

                <div className="predyx3-card">
                  <h4>{item.title}</h4>

                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="predyx3-footer mt-5">
            <h3>We are not replacing clinical judgement.</h3>

            <p>We are organising it.</p>
          </div>
        </div>
      </section>
      <section className="predyx4-section">
        <div className="container">
          <div className="predyx4-heading text-center mb-5">
            <h2 className="predyx4-title">
              Platform<span> Architecture</span>
            </h2>

            <h4 className="predyx4-subtitle">One platform. Three layers.</h4>
          </div>

          <div className="predyx4-flow">
            <div className="predyx4-item">
              <div className="predyx4-box">Clinical Information</div>
              <div className="predyx4-arrow">&#8595;</div>
            </div>

            <div className="predyx4-item">
              <div className="predyx4-box">
                Proprietary Predyx Clinical Intelligence Algorithm
                <span>(Reasoning Layer)</span>
              </div>
              <div className="predyx4-arrow">&#8595;</div>
            </div>

            <div className="predyx4-item">
              <div className="predyx4-box">
                Predyx IQ
                <span>
                  (Communication, Workflow, Reporting, Visualization Layer)
                </span>
              </div>
              <div className="predyx4-arrow">&#8595;</div>
            </div>

            <div className="predyx4-item">
              <div className="predyx4-box">Physician</div>
              <div className="predyx4-arrow">&#8595;</div>
            </div>

            <div className="predyx4-item">
              <div className="predyx4-box">Patient</div>
            </div>
          </div>

          <div className="predyx4-note mt-5">
            Predyx performs the clinical reasoning. Predyx IQ delivers the
            clinical experience. The separation is deliberate. The separation is
            fundamental.
          </div>
        </div>
      </section>

      <section className="explain-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title">Explainability</h2>
              <p className="section-tag">
                EVERY RECOMMENDATION SURVIVES ONE QUESTION
              </p>
              <h3 className="hero-title">"Doctor... why?"</h3>
            </div>
          </div>
          <div className="decision-card">
            <div className="decision-header">
              <div className="status-dot" />
              <h4>Clinical Warning</h4>
              <span>Progressive Cardiometabolic Trajectory Detected</span>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="info-card">
                  <h5>Evidence Used</h5>
                  <ul>
                    <li>Increasing waist-to-height ratio</li>
                    <li> Persistent hypertriglyceridaemia</li>
                    <li> Progressive HDL decline</li>
                    <li> Declining sleep quality</li>
                    <li>Positive family history</li>
                    <li> Worsening blood pressure trajectory</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="analysis-card">
                  <div className="analysis-block">
                    <h6>Clinical Interpretation</h6>
                    <p>Click to Expand physiological mapping</p>
                  </div>
                  <div className="analysis-block">
                    <h6>
                      Supporting Physiological Relationships & Evidence Base
                    </h6>
                    <p>Click to Expand peer-reviewed source literature</p>
                  </div>
                  <div className="analysis-block">
                    <h6>Suggested Clinical Actions</h6>
                    <p>Click to Expand structured pathway guidelines </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="predyx4-note mt-5">
            Every recommendation expands. Nothing remains hidden. Medicine
            advances through understanding. Trust begins through explanation.
          </div>
        </div>
      </section>

      <section className="predyx6-section">
        <div className="container">
          <div className="predyx6-header mb-5">
            <h2 className="predyx6-title text-center">
              Where Artifical <span>Intelligence Fits</span>
            </h2>
          </div>

          <div className="predyx6-card">
            <div className="predyx6-item">
              <div className="predyx6-count">01</div>

              <div className="predyx6-content">
                <p>
                  Artificial Intelligence has transformed image interpretation,
                  signal processing, and large-scale pattern recognition. Predyx
                  serves a different purpose.
                </p>
              </div>
            </div>

            <div className="predyx6-divider"></div>

            <div className="predyx6-item">
              <div className="predyx6-count">02</div>

              <div className="predyx6-content">
                <p>
                  Its proprietary Clinical Intelligence Algorithm organizes
                  established medical knowledge into deterministic clinical
                  reasoning that remains transparent, reproducible, and fully
                  auditable.
                </p>
              </div>
            </div>

            <div className="predyx6-divider"></div>

            <div className="predyx6-item">
              <div className="predyx6-count">03</div>

              <div className="predyx6-content">
                <p>
                  Artificial Intelligence may identify a specific finding.
                  Predyx explains what that finding means within the broader
                  physiological context of the individual.
                </p>
              </div>
            </div>

            <div className="predyx6-divider"></div>

            <div className="predyx6-item">
              <div className="predyx6-count">04</div>

              <div className="predyx6-content">
                <p className="mb-0">
                  These technologies are complementary. They are not
                  interchangeable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="predyx7-section py-5">
        <div className="container">
          <div className="predyx7-header mb-5">
            <h2 className="predyx7-title text-center">
              Health is <span>a Trajectory</span>
            </h2>
          </div>

          <div className="predyx7-card">
            <p className="predyx7-text">
              Traditional healthcare asks. What is happening today?
              <br />
              Predyx asks: Where is this biology heading?
            </p>

            <p className="predyx7-text mb-5">
              A single assessment captures a moment. Successive assessments
              reveal direction. Direction creates the opportunity for earlier
              intervention. Earlier intervention creates the opportunity to
              preserve health rather than simply treat disease.
            </p>

            <div className="predyx7-flow">
              <div className="predyx7-step">Assessment 1</div>

              <div className="predyx7-arrow">&#10140;</div>

              <div className="predyx7-step predyx7-active">Assessment 2</div>

              <div className="predyx7-arrow">&#10140;</div>

              <div className="predyx7-step">Assessment 3</div>
            </div>

            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-trajectory">
              Trajectory:
              <span> [ Improving | Stable | Progressing ]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="funfacts" ref={ref}>
        <div className="overlay">
          <div className="container" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "35px",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              {" "}
              Clinical Intelligence should never replace the physician.
              <br />
              It should help physicians see further.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Powered by a proprietary deterministic Clinical Intelligence
              Algorithm, Predyx transforms fragmented healthcare information
              into transparent, explainable, and reproducible clinical
              intelligence while keeping the physician at the centre of every
              clinical decision.
            </p>
            <a href="#" className="action-items-primary-btn1">
              Explore Predyx IQ Quick
              <i className="fas fa-chevron-right" />
            </a>
            <a href="#" className="action-items-primary-btn1">
              Request a Technical Briefing
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
