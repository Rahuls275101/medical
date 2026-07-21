import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/herp1.jpg";
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
      no: "01",
      title: "Complete the Assessment",
      text: "A guided digital questionnaire collects clinically relevant information in minutes.",
    },
    {
      no: "02",
      title: "Clinical Intelligence Processing",
      text: "The information is interpreted by the proprietary Predyx Clinical Intelligence Algorithm. No Artificial Intelligence is used for clinical reasoning. Every assessment follows transparent, deterministic logic.",
    },
    {
      no: "03",
      title: "Trajectory Analysis",
      text: "Biological relationships are organised into organ-system trajectories. Rather than isolated abnormalities, the algorithm evaluates physiological direction.",
    },
    {
      no: "04",
      title: "Your Personal Report",
      text: "Receive a clear, structured report designed for both individuals and physicians. Understand what is reassuring. Understand what deserves attention. Understand what to do next.",
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
        <title>PredyxIQ Quick - My Website</title>
      </Helmet>

      <section className="hero-section" style={{ padding: "60px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-3" style={{ fontSize: "25px" }}>
            Healthcare has traditionally answered one question:
            <br />
            <span> “What disease do I have?”</span>
          </h2>
          <h2 className="predyx-main-title mb-3" style={{ fontSize: "25px" }}>
            PredyxIQ Quick asks a different question:
            <br />
            <span> “Where is my health heading?”</span>
          </h2>

          <p>
            In just a few minutes, Predyx IQ Quick transforms routine health
            information into a structured assessment of biological
            trajectory—helping individuals and physicians recognize potential
            risks long before disease becomes clinically apparent.
          </p>

          <p>
            Powered by the Predyx Clinical Intelligence Engine, it provides a
            fast, evidence-based overview of your current health direction and
            highlights where further evaluation may be valuable.
          </p>

          <p>This is not a diagnosis. It is the beginning of understanding.</p>
          <a href="#" className="action-items-primary-btn mr-2">
            Start Your Assessment
            <i className="fas fa-chevron-right" />
          </a>
          <a href="#" className="action-items-primary-btn">
            Watch How It Works
            <i className="fas fa-chevron-right" />
          </a>
        </div>
      </section>

      <section className="explain-section predyx-section">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              Less Than <span> a Minute. </span>
            </h2>

            <h4 className="predyx-sub-title mt-2">
              Years of clinical science behind every result
            </h4>
          </div>

          <div className="predyx-content-box">
            <img
              src={minute}
              alt="About us"
              className="img-fluid"
              style={{ marginBottom: "20px", borderRadius: "10px" }}
            />

            <div className="info-card" style={{ padding: "0px" }}>
              <h5 style={{ marginBottom: "13px;" }}>
                A Different Way to Begin Healthcare.
              </h5>
              <h5 style={{ marginBottom: "13px;" }}>
                Most health journeys begin only after symptoms appear.
              </h5>
              <h5 style={{ marginBottom: "13px;" }}>
                Predyx IQ Quick begins much earlier.
              </h5>
              <p className="predyx-text">
                In less than a minute, a small number of carefully selected
                clinical questions are transformed by the Predyx Clinical
                Intelligence Engine into a structured understanding of your
                current biological trajectory.
              </p>
              <ul>
                <li>No lengthy forms.</li>
                <li>No complex medical terminology.</li>
                <li>No unnecessary data entry.</li>
                <li>
                  Just the essential clinical information needed to begin
                  understanding where your health may be heading.
                </li>
                <li>
                  Because meaningful prevention should be simple enough for
                  everyone.
                </li>
              </ul>
            </div>
          </div>

          <div className="predyx-process-section mt-5">
            <h3 className="predyx-process-title text-center">
              What does Predyx IQ Quick Evaluates?
            </h3>

            <p className="predyx-process-subtitle text-center">
              Unlike conventional risk calculators that focus on a single
              disease, Predyx IQ Quick evaluates health across multiple
              interconnected physiological domains. Each domain contributes to
              an integrated understanding of the individual's overall biological
              trajectory.
            </p>

            <div className="row">
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5> Cardiovascular Health</h5>
                    <p>
                      Blood pressure, symptoms, family history, lifestyle,
                      cardiovascular risk factors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Metabolic Health</h5>
                    <p>
                      {" "}
                      Weight, waist measurements, glucose regulation, nutrition,
                      physical activity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Kidney Health</h5>
                    <p>
                      {" "}
                      Medical history, blood pressure, diabetes risk, laboratory
                      inputs when available.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Liver Health</h5>
                    <p>
                      {" "}
                      Metabolic profile, body composition, lifestyle,
                      liver-related investigations where available.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Respiratory Health</h5>
                    <p>
                      {" "}
                      Smoking history, respiratory symptoms, exercise tolerance,
                      environmental exposure.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Brain & Cognitive Health</h5>
                    <p>
                      Sleep, stress, mood, cognitive symptoms, vascular
                      contributors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Functional Health</h5>
                    <p>
                      Mobility, fatigue, exercise capacity, physical resilience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="predyx-step-card">
                  <div className="predyx-step-content">
                    <h5>Lifestyle & Longevity</h5>
                    <p>
                      Nutrition, Recovery, Sleep, Stress, Behaviour, Healthy
                      ageing.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="predyx-quote-section mt-3">
            <blockquote>
              “Health is never one organ. Health is the interaction between them
              all.”
            </blockquote>
          </div>
        </div>
      </section>
      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-5">
            <h2 className="predyx2-title mt-2">
              How it <span>Works</span>
            </h2>
            <h4 className="predyx2-subtitle mt-2">
              Simple for the individual. Sophisticated underneath.
            </h4>
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
        </div>
      </section>

      <section className="explain-section predyx-section">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              Your <span> Report </span>
            </h2>

            <h4 className="predyx-sub-title mt-2">
              Beautifully designed. Scientifically rigorous. Easy to understand.
            </h4>
          </div>

          <div className="predyx-content-box">
            <div className="info-card" style={{ padding: "0px" }}>
              <h5>The Predyx IQ Quick Report includes:</h5>
              <ul style={{ marginBottom: "20px" }}>
                <li> Overall Clinical Intelligence Score</li>
                <li> Organ-System Trajectory Overview</li>
                <li> Priority Areas for Attention</li>
                <li> Positive Health Signals</li>
                <li> Lifestyle Opportunities</li>
                <li> Suggested Clinical Follow-up</li>
                <li> Questions to Discuss with Your Physician</li>
              </ul>
              <p style={{ marginBottom: "0px" }}>
                Every recommendation includes a clear explanation of why it
                appears. Nothing is hidden. Nothing is arbitrary.
              </p>
              <p>
                <strong>
                  (Visual Directive: Full-page report mock-up with colour-coded
                  organ trajectories, overall score, and concise action
                  priorities.)
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="predyx3-section " style={{ background: "#fff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              Built for Physicians. <span>Accessible to Everyone.</span>
            </h2>

            <p className="predyx3-description mt-2">
              Predyx IQ Quick is designed to strengthen—not replace—the
              relationship between individuals and their physicians.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              <strong>For individuals, it provides clarity.</strong>
              <br />
              For physicians, it provides structured clinical context before the
              consultation even begins.
            </p>

            <p>
              Better conversations. Better prioritisation. Better preventive
              care.
            </p>
          </div>
        </div>
      </section>
      <section className="predyx3-section">
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              From Quick Assessment to{" "}
              <span> Continous health Intelligence</span>
            </h2>

            <p className="predyx3-description mt-2">
              Predyx IQ Quick is not the destination. It is the beginning.
            </p>
          </div>

          <div className="predyx3-timeline mt-5">
            <p>
              As additional information becomes available—laboratory
              investigations, ECGs, imaging, physiological testing, wearable
              data, or longitudinal follow-up—the same Predyx Clinical
              Intelligence Engine continuously refines its understanding of the
              individual's biological trajectory.
            </p>

            <p>
              Health is no longer viewed as a single report. It becomes an
              evolving clinical narrative.
            </p>

            <p>
              (Visual Directive: A growing timeline showing the Quick Assessment
              expanding into richer longitudinal health intelligence.)
            </p>
          </div>
        </div>
      </section>

      <section
        className="explain-section predyx-section"
        style={{ background: "#f9fcff" }}
      >
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2">
              Who is <span> It For?</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="predyx-step-card">
                <div className="predyx-step-content">
                  <h5>Individuals</h5>
                  <p>Understand your health before symptoms appear.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="predyx-step-card">
                <div className="predyx-step-content">
                  <h5>Physicians</h5>
                  <p>
                    Receive structured clinical intelligence before
                    consultation.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="predyx-step-card">
                <div className="predyx-step-content">
                  <h5>Organisations</h5>
                  <p>
                    Screen large populations consistently using the same
                    transparent clinical methodology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="predyx8-section">
        <div className="container">
          <div className="predyx8-header text-center mb-4">
            <h2 className="predyx8-title">
              Why PredyxIQ Quick <span>is Different</span>
            </h2>
          </div>

          <div className="table-responsive predyx8-table-wrapper">
            <table className="table predyx8-table mb-0">
              <thead>
                <tr>
                  <th>Conventional Health Risk Calculators</th>

                  <th>PredyxIQ Quick</th>
                </tr>
              </thead>

              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.conventional}</td>

                    <td className="predyx8-highlight">{item.predyx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
