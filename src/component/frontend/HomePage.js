import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/baner.jpg";
import about from "./../../images/about2.jpg";
import about2 from "./../../images/about2.png";
import bgImage from "./../../images/figure2.jpg";
import testimonialsBgImage from "./../../images/testimonial-bg1.jpg";
import person1 from "./../../images/testimonial3.jpg";
import person2 from "./../../images/testimonial3.jpg";
import person3 from "./../../images/testimonial3.jpg";
import medicalImg from "./../../images/clinical.png";
import workflow from "./../../images/clinical1.png"; // Replace with your image
import dcs from "./../../images/dcs.png"; // Replace with your image

// Import owl carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MainPage = () => {
  const isCarouselInitialized = useRef(false);
  const isDoctorCarouselInitialized = useRef(false);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

  const evidence = [
    "Visceral-to-subcutaneous fat ratio has steadily increased over successive reviews.",
    "Serum triglycerides remain elevated alongside a downward trend in HDL.",
    "Systolic blood pressure trajectory shows an upward, non-dipping pattern.",
    "Objective sleep efficiency has decreased by 14% over three evaluations.",
    "Family history indicates elevated cardiometabolic risk.",
  ];

  const philosophies = [
    {
      title: "Prevention Begins with Recognition",
      text: "Pathologies begin to alter biology long before they receive a clinical diagnosis. Recognizing these subtle systemic changes early is medicine's greatest opportunity.",
      icon: "fa-heartbeat",
    },
    {
      title: "Intelligence Must Be Traceable",
      text: "A clinical output that cannot explain its own reasoning is not clinical intelligence. It is simply a guess in a lab coat.",
      icon: "fa-search",
    },
    {
      title: "Technology Must Support the Clinician",
      text: "Empathy, physical touch, clinical experience, and the patient relationship are irreplaceable. Technology exists solely to clear the analytical noise so the physician can focus on the patient.",
      icon: "fa-user-md",
    },
    {
      title: "Expertise Must Scale Cleanly",
      text: "The exact same rigorous, logical medical principles used to treat a single patient can be scaled to protect a clinic, a corporate team, or an entire regional population.",
      icon: "fa-line-chart",
    },
  ];

  const services = [
    {
      icon: "fa-user-md",
      title: "Primary Care Physicians",
      description:
        "Streamlines early screening, automates pathway mapping, and simplifies longitudinal patient tracking.",
    },
    {
      icon: "fa-stethoscope",
      title: "Specialist Practices",
      description:
        "Offers systemic, cross-organ context that complements highly focused clinical expertise.",
    },
    {
      icon: "fa-hospital",
      title: "Clinics & Hospitals",
      description:
        "Establishes standardized screening protocols, higher diagnostic consistency, and clear referral workflows.",
    },
    {
      icon: "fa-building",
      title: "Corporate Health Programs",
      description:
        "Drives engagement via clear, actionable reports while securing workforce health trends.",
    },
    {
      icon: "fa-globe",
      title: "Public Health Programs",
      description:
        "Enables large-scale community screening with centralized clinical risk stratification.",
    },
    {
      icon: "fa-globe",
      title: "Primary Care Physicians",
      description:
        "Establishes standardized screening protocols, higher diagnostic consistency, and clear referral workflows.",
    },
  ];

  const products = [
    {
      title: "Predyxiq  Quick",
      status: "Launch Product",
      badge: "badge-success",
      description:
        "Rapid preventive screening for everyday practice. A streamlined assessment tool optimized for primary care, corporate health checkups, and rapid diagnostic environments. ",
    },
    {
      title: "Predyxiq ",
      status: "In Development / Early Access Deployments",
      badge: "badge-warning",
      description:
        "Deep, longitudinal clinical intelligence. Our core platform integrates rich medical histories, deep biomarkers, advanced functional imaging, and physiological signals to map long-term organ trajectories.",
    },
    {
      title: "Predyxiq  Corporate",
      status: "Pilot Partnerships Active",
      badge: "badge-primary",
      description:
        "Personal health insights with enterprise-grade wellness visibility. Individuals receive comprehensive preventive reports while organizations gain anonymous, aggregated wellness analytics.",
    },
    {
      title: "Predyxiq  Population",
      status: "Partnership Development",
      badge: "badge-info",
      description:
        "System-wide clinical intelligence designed for healthcare systems, regional clinics, and public health initiatives requiring scalable standardized screening and clinical risk stratification.",
    },
  ];

  const steps = [
    {
      title: "Capture",
      text: "Import medical records, laboratory metrics, lifestyle markers, and vitals.",
    },
    {
      title: "Structure",
      text: "Convert variables into a uniform, standardized physiological dataset.",
    },
    {
      title: "Interpret",
      text: "Evaluate each indicator against established clinical thresholds and medical guidelines.",
    },
    {
      title: "Connect",
      text: "Link related abnormalities to identify underlying biological pathways rather than isolated risks.",
    },
    {
      title: "Map Trajectories",
      text: "Plot the direction of key organ networks (compensating, stable, or declining).",
    },
    {
      title: "Explain",
      text: "Lay out the clinical evidence trail, medical literature, and logic supporting each finding.",
    },
    {
      title: "Act",
      text: "The physician reviews the structured intelligence, adds clinical context, and defines the care plan.",
    },
  ];

  const trajectories = [
    {
      icon: "fas fa-heartbeat",
      title: "Cardiovascular",
      desc: "Integrates blood pressure patterns, arterial markers, cardiac signals and hereditary risk factors into a unified vascular pathway.",
    },
    {
      icon: "fas fa-dna",
      title: "Metabolic",
      desc: "Maps body composition, lipid profiles, glycemic control, inflammatory markers and liver-related signals holistically.",
    },
    {
      icon: "fas fa-dna",
      title: "Renal",
      desc: "Synthesizes kidney function trends, vascular load and metabolic pressures over time to assess renal reserve.",
    },

    {
      icon: "fas fa-running",
      title: "Functional",
      desc: "Tracks exercise capacity, recovery speed, resilience and muscular indicators to assess physical reserve.",
    },
  ];

  const data = [
    {
      title: "Integrates Clinical Signals",
      desc: "Maps family history, lifestyle metrics, physical measurements, biomarkers, and laboratory results within a unified physiological framework.",
    },
    {
      title: "Recognizes Biological Relationships",
      desc: "Evaluates clinical variables as interconnected expressions of underlying bodily processes rather than isolated abnormal test results.",
    },
    {
      title: "Identifies Latent Biological States",
      desc: "Spots coordinated biological patterns before conventional late-stage diagnostic thresholds are crossed.",
    },
    {
      title: "Maps Organ Trajectories",
      desc: "Determines whether organ systems are stable, improving, compensating under stress, or showing progressive decline.",
    },
    {
      title: "Prioritizes Clinical Attention",
      desc: "Highlights subtle physiological trends that require review, preventing alert fatigue by focusing on clinical relevance.",
    },
    {
      title: "Provides Traceable Logic",
      desc: "Every conclusion, trend, or trajectory is transparent and fully auditable, mapping directly back to the original clinical inputs.",
    },
  ];

  const features = [
    {
      icon: "fas fa-file-medical",
      title: "Not another electronic record",
      text: "Electronic records store what has already been observed. Predyxiq helps physicians understand how those observations relate and what they collectively imply.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Not another isolated risk score",
      text: "A single risk score simplifies complexity until it conceals more than it reveals. Predyxiq preserves the clinical integrity of individual physiological pathways.",
    },
    {
      icon: "fas fa-brain",
      title: "Not automated diagnosis",
      text: "Predyxiq organizes physiological complexity to support clinical reasoning. Diagnosis and treatment remain entirely the responsibility of the physician.",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      experience: "12+ Years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      specialization: "Neurologist",
      experience: "10+ Years",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    },
    {
      id: 3,
      name: "Dr. Michael Lee",
      specialization: "Dentist",
      experience: "8+ Years",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    },
    {
      id: 4,
      name: "Dr. Emma Brown",
      specialization: "Dermatologist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    },
    {
      id: 5,
      name: "Dr. David Miller",
      specialization: "Orthopedic",
      experience: "14+ Years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
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

  // Render doctor cards
  const renderDoctorCards = () => {
    return doctors.map((doctor) => (
      <div className="item" key={doctor.id}>
        <div className="doctor-card">
          <img src={doctor.image} alt={doctor.name} className="doctor-img" />
          <div className="doctor-body">
            <h4>{doctor.name}</h4>
            <span className="speciality">{doctor.specialization}</span>
            <p>{doctor.experience} Experience</p>
            <button className="appointment-btn">Book Appointment</button>
          </div>
        </div>
      </div>
    ));
  };

  // Accordion items data
  const accordionItems = [
    {
      id: "collapseOne",
      title: "Using Innovative Technology",
      content:
        "Moimply dummy text of the printing and type settingaindustry. Lorem Ipsum has been the industry's standard dummy text ever since thelong established fact thaaret",
    },
    {
      id: "collapseTwo",
      title: "Guarantee Success of Treatments",
      content:
        "Moimply dummy text of the printing and type settingaindustry. Lorem Ipsum has been the industry's standard dummy text ever since thelong established fact thaaret",
    },
    {
      id: "collapseThree",
      title: "Accepting Insurance Cards",
      content:
        "Moimply dummy text of the printing and type settingaindustry. Lorem Ipsum has been the industry's standard dummy text ever since thelong established fact thaaret",
    },
    {
      id: "collapse4",
      title: "Expert Medical Staff",
      content:
        "Moimply dummy text of the printing and type settingaindustry. Lorem Ipsum has been the industry's standard dummy text ever since thelong established fact thaaret",
    },
    {
      id: "collapse5",
      title: "Modern Facilities",
      content:
        "Moimply dummy text of the printing and type settingaindustry. Lorem Ipsum has been the industry's standard dummy text ever since thelong established fact thaaret",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>About US - My Website</title>
      </Helmet>

      <section className="hero-section">
        <div className="hdsd">
          <div className="container">
            <h3>
              Understanding biological trajectories before disease becomes
              obvious.
            </h3>
            <p>
              Predyxiq transforms fragmented clinical observations into clear,
              explainable biological pathways. By connecting lifestyle signals,
              medical history, biomarkers, and physical measurements, it maps
              out organ-system trajectories that deserve clinical focus—while
              keeping the physician firmly at the center of every decision.
            </p>
            <a href="#" className="action-items-primary-btn">
              Request a Demo
              <i className="fas fa-chevron-right" />
            </a>
            <a href="#" className="action-items-primary-btn1">
              Explore Clinical Intelligence
              <i className="fas fa-chevron-right" />
            </a>

            <h3
              style={{
                color: "#fff",
                marginTop: "30px",
                fontSize: "20px",
              }}
            >
              Discuss a Clinical or Strategic Partnership →
            </h3>
          </div>
        </div>
        <img src={heroImg} alt="About us" className="img-fluid" />
      </section>

      <section className="category-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title">
                Predyxiq <span>Clinical Intelligence</span>
              </h2>
              <p className="subtitle">
                Predyxiq doesn't collect more information. It helps physicians
                understand the information they already have.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="highlight-box">
                <h4>Understanding Medicine Beyond Individual Data Points</h4>
                <p className="mb-0">
                  Modern medicine generates an unprecedented amount of clinical
                  information every day—laboratory values, physiological
                  measurements, symptoms, medical history, imaging, and
                  biomarkers. Yet these observations are often interpreted
                  independently, despite the fact that human biology functions
                  as an interconnected system.
                </p>
                <br />
                <p className="mb-0">
                  Predyxiq transforms isolated clinical signals into a unified
                  biological understanding. By identifying relationships between
                  variables, mapping latent physiological states, and predicting
                  organ trajectories, it delivers meaningful clinical
                  intelligence that supports faster, more confident physician
                  decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="row process text-center">
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-heartbeat" />
                <h5>
                  Clinical
                  <br />
                  Signals
                </h5>
                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-project-diagram" />
                <h5>
                  Biological
                  <br />
                  Relationships
                </h5>
                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-brain" />
                <h5>
                  Latent
                  <br />
                  State Mapping
                </h5>
                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-dna" />
                <h5>
                  Organ
                  <br />
                  Trajectories
                </h5>
                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-chart-line" />
                <h5>
                  Clinical
                  <br />
                  Intelligence
                </h5>
                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="step">
                <i className="fas fa-user-md" />
                <h5>
                  Physician
                  <br />
                  Action
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="quote-box">
                <i className="fas fa-quote-left" />
                <p>
                  "The value of data is not in{" "}
                  <strong>how much we collect</strong>.
                  <br />
                  It is in{" "}
                  <strong>how well we understand what it means.</strong>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="predyxiq-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-title">
              What <span>Predyxiq</span> is
            </h2>
            <h5 className="mini-title">A NEW LAYER IN HEALTHCARE</h5>
            <h3 className="main-title">
              Not another medical application.
              <br />
              <strong>A clinical intelligence platform.</strong>
            </h3>
            <p className="intro-text mt-4">
              Predyxiq is a clinical intelligence platform powered by Predyx—a
              deterministic, rule-based medical reasoning engine. It does not
              replace the electronic health record, nor the physician's
              diagnostic role. Instead, it introduces a highly structured
              intelligence layer between clinical data and clinical action.
            </p>
          </div>
          <div className="row">
            {features.map((item, index) => (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="feature-card">
                  <div className="icon-box">
                    <i className={item.icon}></i>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="does-section">
        <div className="container">
          <div className="text-center mb-2">
            <h2 className="section-title">
              What <span>Predyxiq</span> Does
            </h2>
            <h3 className="section-subtitle">
              From fragmented observations to meaningful clinical understanding.
            </h3>
            <p className="section-text">
              Predyxiq translates disconnected clinical signals into a cohesive,
              highly structured understanding of a patient's overall biology.
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
                      <p>{item.desc}</p>
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

      <section className="trajectory-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Organ <span>Trajectories</span>
            </h2>

            <h5 className="section-subtitle">BEYOND THE SNAPSHOT</h5>

            <h3 className="main-heading">
              Health is not a static score.
              <strong> It is a trajectory.</strong>
            </h3>

            <p className="lead-text mt-2">
              A single laboratory value or physical measurement captures only
              one moment in time. Predyxiq identifies physiological direction by
              understanding how organ systems evolve, enabling clinically
              actionable insights before disease progression becomes obvious.
            </p>
          </div>

          <div className="row">
            {trajectories.map((item, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <div className="trajectory-card d-flex">
                  <div className="icon-circle">
                    <i className={item.icon}></i>
                  </div>

                  <div className="card-content">
                    <h4>{item.title} Trajectory</h4>

                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="note-box mt-3">
            <i className="fas fa-info-circle mr-2"></i>
            Additional specialist pathways—including
            <strong> Neuro-Health</strong>,<strong> Longevity Markers</strong>,
            and
            <strong> Oncology Signal Layers</strong>
            are currently under development.
          </div>
        </div>
      </section>

      <section className="explain-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title">
                Explainability &<span> Transparency</span>
              </h2>

              <p className="section-tag">
                EVERY RECOMMENDATION SURVIVES ONE QUESTION
              </p>

              <h3 className="hero-title">"Doctor... why?"</h3>

              <p className="section-text">
                Clinical support tools are valuable only when physicians
                understand exactly how every recommendation was produced.
                Predyxiq exposes the clinical rules, evidence and reasoning
                behind every conclusion.
              </p>
            </div>
          </div>

          <div className="decision-card">
            <div className="decision-header">
              <div className="status-dot"></div>

              <h4>Clinical Warning</h4>

              <span>Progressive Cardiometabolic Trajectory Detected</span>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div className="info-card">
                  <h5>Evidence Used</h5>

                  <ul>
                    {evidence.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="analysis-card">
                  <div className="analysis-block">
                    <h6>Clinical Interpretation</h6>

                    <p>
                      Multiple physiological signals are moving together,
                      indicating coordinated progression rather than isolated
                      abnormalities.
                    </p>
                  </div>

                  <div className="analysis-block">
                    <h6>Suggested Action</h6>

                    <p>
                      Review cardiovascular risk profile, investigate metabolic
                      contributors, and schedule structured follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="physician-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Physician-First <span>Philosophy</span>
            </h2>

            <h3 className="section-subtitle">
              Technology should empower physicians,
              <strong> not replace them.</strong>
            </h3>

            <p className="section-text">
              Predyxiq organizes complex clinical signals before the
              consultation begins, highlighting meaningful physiological
              patterns while leaving diagnosis, judgment and treatment decisions
              entirely to the physician.
            </p>
          </div>

          <div className="row align-items-center philosophy-wrapper">
            <div className="col-lg-5">
              <div className="philosophy-card left-card">
                <h4>Predyxiq Intelligence</h4>

                <ul>
                  <li>Connects fragmented clinical signals</li>
                  <li>Recognizes biological relationships</li>
                  <li>Provides explainable clinical reasoning</li>
                  <li>Highlights meaningful trajectories</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 text-center">
              <div className="center-circle">
                <i className="fas fa-handshake"></i>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="philosophy-card right-card">
                <h4>Physician Expertise</h4>

                <ul>
                  <li>Clinical judgment</li>
                  <li>Patient context & empathy</li>
                  <li>Medical decision making</li>
                  <li>Treatment responsibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="quote-box">
            <i className="fas fa-quote-left"></i>

            <h4>
              Predyxiq supports the decision.
              <span> The physician makes it.</span>
            </h4>
          </div>
        </div>
      </section>

      <section
        className="physician-section py-5"
        style={{ background: "linear-gradient(135deg, #143b63, #1d5f8c)" }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" style={{ color: "#fff" }}>
              Clinical Intelligence Tailored{" "}
              <span style={{ color: "#33dcff" }}> to Every Level of Care</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="row">
            {products.map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    transition: "0.3s",
                    borderRadius: "12px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="font-weight-bold text-dark mb-0">
                        {item.title}
                      </h5>

                      <span className={`badge ${item.badge}`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-secondary mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="does-section works py-5"
        style={{
          backgroundColor: "#eef3f8",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              How <span>It</span> Works
            </h2>

            <p className="section-text">
              From Health Data to Clinical Intelligence
            </p>
          </div>
          <div className="row ">
            {/* Left Content */}
            <div className="col-lg-6 pr-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="d-flex mb-4 p-3 bg-white shadow-sm rounded"
                >
                  <div
                    className="mr-3 text-white font-weight-bold"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#34485f",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h5 className="font-weight-bold mb-1">{step.title}</h5>

                    <p className="text-muted mb-0">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <img
                src={workflow}
                alt="How It Works"
                className="img-fluid"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.15)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="does-section who-we-serve-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Who <span>We</span> Serve
            </h2>

            <p className="section-text">Empowering Every Level of Healthcare</p>
          </div>

          <div className="row">
            {services.map((item, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="serve-card">
                  <div className="serve-icon">
                    <i className={`fa ${item.icon}`}></i>
                  </div>

                  <h5>{item.title}</h5>

                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sg-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}

            <div className="col-lg-7 mb-4 mb-lg-0 pr-4">
              <h2 className="sg-title">
                Science <span style={{ color: "#4a93d9" }}>& Governance</span>
              </h2>

              <p className="sg-description">
                Predyx is a deterministic engine. It operates on a transparent,
                rules-based architecture mapped to peer-reviewed medical
                literature, established clinical practice guidelines, and
                validated physiological algorithms.
              </p>

              <p className="sg-description">
                Its design ensures complete reproducibility—the same clinical
                inputs will always generate the same transparent clinical
                pathway, giving clinicians an auditable, stable and reliable
                decision support system.
              </p>

              <div className="sg-guideline">
                <div className="sg-icon">
                  <i className="fa fa-shield"></i>
                </div>

                <div>
                  <h5 className="sg-guideline-title">
                    Developer Compliance Guideline
                  </h5>

                  <p className="sg-description mb-0" style={{ color: "#000" }}>
                    Under no circumstances should the system claim to be
                    <strong> autonomous</strong>,
                    <strong> fully diagnostic</strong>, or
                    <strong>
                      {" "}
                      capable of preventing disease independently
                    </strong>
                    . It is designed strictly as a
                    <strong> Clinical Decision Support Tool.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}

            <div className="col-lg-5">
              <div className="sg-image-card">
                <img src={dcs} alt="How It Works" className="img-fluid" />

                <div className="sg-image-overlay">
                  <div className="sg-badge">✔ Transparent</div>

                  <div className="sg-badge">✔ Evidence-Based</div>

                  <div className="sg-badge">✔ Reproducible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fp-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fp-title">
              Founding <span>Philosophy</span>
            </h2>

            <p className="fp-subtitle">
              Guiding principles that define the scientific foundation and
              philosophy behind the platform.
            </p>
          </div>

          <div className="row">
            {philosophies.map((item, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <div className="fp-card">
                  <div className="fp-icon">
                    <i className={`fa ${item.icon}`}></i>
                  </div>

                  <div className="fp-content">
                    <h4 className="fp-card-title">{item.title}</h4>

                    <p className="fp-card-text mb-0">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
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
              “We cannot change yesterday's biology.
              <br />
              We can still change tomorrow's.”
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#fff",
                marginBottom: "30px",
              }}
            >
              Discover how explainable Clinical Intelligence can strengthen
              preventive healthcare - from one clinical encounter to an entire
              population.
            </p>
            <a href="#" className="action-items-primary-btn1">
              Request a Demo
              <i className="fas fa-chevron-right" />
            </a>
            <a href="#" className="action-items-primary-btn1">
              Explore Predyx IQ Quick
              <i className="fas fa-chevron-right" />
            </a>

            <h3
              style={{
                color: "#fff",
                marginTop: "30px",
                fontSize: "20px",
              }}
            >
              Discuss a Clinical or Strategic Partnership →
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
