import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/slide1-1.jpg";
import about from "./../../images/about2.jpg";
import about2 from "./../../images/about2.png";
import bgImage from "./../../images/figure2.jpg";
import testimonialsBgImage from "./../../images/testimonial-bg1.jpg";
import person1 from "./../../images/testimonial3.jpg";
import person2 from "./../../images/testimonial3.jpg";
import person3 from "./../../images/testimonial3.jpg";

const MainPage = () => {
  const carouselRef = useRef(null);
  const isCarouselInitialized = useRef(false);

  useEffect(() => {
    // Dynamically import jQuery and owl.carousel
    const loadCarousel = async () => {
      try {
        // Import jQuery first
        const $ = await import('jquery');
        const jquery = $.default || $;
        
        // Set jQuery globally
        window.$ = jquery;
        window.jQuery = jquery;

        // Now import owl.carousel
        await import('owl.carousel');

        // Import CSS
        await import('owl.carousel/dist/assets/owl.carousel.css');
        await import('owl.carousel/dist/assets/owl.theme.default.css');

        // Initialize carousel after a small delay
        setTimeout(() => {
          if (window.$ && window.$.fn && window.$.fn.owlCarousel && !isCarouselInitialized.current) {
            window.$(".testimonial-slider").owlCarousel({
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
          }
        }, 200);
      } catch (error) {
        console.error('Error loading carousel:', error);
      }
    };

    loadCarousel();

    // Cleanup
    return () => {
      if (window.$ && window.$.fn && window.$.fn.owlCarousel && isCarouselInitialized.current) {
        try {
          window.$(".testimonial-slider").owlCarousel('destroy');
          isCarouselInitialized.current = false;
        } catch (e) {
          console.log('Carousel already destroyed');
        }
      }
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const facts = [
    {
      number: 59,
      title: "Health Sections",
    },
    {
      number: 4709,
      title: "Happy Patients",
    },
    {
      number: 128,
      title: "Quality Doctors",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>About US - My Website</title>
      </Helmet>

      <section className="hero-section"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container p-0">
          <div className="row g-0 align-items-center">
            <div className="col-lg-5 hero-content">
              <div className="content">
                <h1>
                  We take care of your
                  <br />
                  healthy health.
                </h1>
                <p>
                  Simply dummy text of the printing typesetting ipsum dolor
                  consecte dipiscing.
                </p>
                <a href="/" className="btn btn-primary hero-btn">
                  READ MORE
                  <i className="bi bi-chevron-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-wrap-layout5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-box-layout13">
                <h2 className="item-title"><span>
                  The story, the idea,<br />What we believe</span>
                </h2>
                <p>
                  Prevention begins with recognition. — Disease leaves
                  evidence long before it has a name. Recognising that
                  evidence earlier is the single greatest unclaimed
                  opportunity in medicine.
                </p>
                <p>
                  Intelligence should be explainable. — A recommendation a
                  physician cannot trace back to a reason is not
                  intelligence. It is a guess wearing a lab coat.
                </p>
                <p>
                  Technology should strengthen physicians, not replace
                  them. — Clinical judgement includes empathy, context, and
                  values that no algorithm should attempt to reproduce.
                </p>
                <p>
                  Intelligence should scale. People don't. — The same
                  principles that understand one patient can understand a
                  clinic, a workforce, a portfolio, or a population.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-box-layout14">
                <div className="item-video">
                  <img
                    src={about}
                    alt="About us"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="philosophy-section">
      <div className="philosophy-container">

        {/* Two-column grid */}
        <div className="philosophy-grid">
          {/* Left Column */}
          <div className="philosophy-left">
          <h2 style={{
    fontSize: "35px",
    color: "#fff",
    fontWeight: "500",
  }}>Philosophy</h2>
            <p className="philosophy-text">
              Predyx was created to support clinical thinking — not automate it, not replace it. The platform organises complexity before the physician begins reasoning. It highlights what deserves attention. It suggests possibilities without making decisions.
            </p>
            <p className="philosophy-text">
              The physician remains exactly where they belong at the center.
            </p>
          </div>

          {/* Right Column - Explainability */}
          <div className="philosophy-right">
            <div className="explainability-label">
              Every recommendation survives one question.
            </div>
            
            <div className="explainability-statement">
              <span className="doctor-question">Doctor… why?</span>
              
              <ul className="explainability-list">
                <li>
                  <span className="bullet-point">•</span>
                  Waist-to-height ratio has progressively increased
                </li>
                <li>
                  <span className="bullet-point">•</span>
                  Triglycerides elevated, HDL declining across visits
                </li>
                <li>
                  <span className="bullet-point">•</span>
                  Sleep quality has deteriorated over three assessments
                </li>
                <li>
                  <span className="bullet-point">•</span>
                  Blood pressure trajectory is worsening
                </li>
                <li>
                  <span className="bullet-point">•</span>
                  Family history increases lifetime cardiometabolic risk
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

     
    </section>
      {/* ENGINE SECTION - Integrated */}
      <section className="engine-section">
        <div className="container">
          <div className="engine-content">
            {/* Eyebrow */}
            <p className="engine-eyebrow" style={{ textAlign: "center" }}>The Engine</p>

            {/* Headline */}
            <h2 className="engine-headline" style={{ textAlign: "center" }}>
              Healthcare doesn't need more data. It needs <span className="engine-highlight-italic">better understanding.</span>
            </h2>

            {/* Body */}
            <p style={{ textAlign: "center" }}>
              Predyx is not another health application. It is not another electronic medical record. It is a Clinical Intelligence Engine — an intelligence layer that transforms fragmented observations into meaningful understanding. Not another application. Not another record. A new layer in healthcare.
            </p>

            {/* Layers */}
            <div className="engine-layers">
              {/* Layer I */}
              <div className="engine-layer-row">
                <div className="engine-layer-inner">
                  <div className="engine-numeral">I</div>
                  <div className="engine-accent-line" />
                  <div className="engine-layer-content">
                    <div className="engine-layer-title">Clinical Logic</div>
                    <div className="engine-layer-body">
                      Every observation interpreted through structured medical knowledge — published guidelines, validated thresholds, transparent reasoning. Not statistical guesswork.
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer II — highlighted */}
              <div className="engine-layer-row highlighted">
                <div className="engine-layer-inner">
                  <div className="engine-numeral ">II</div>
                  <div className="engine-accent-line" />
                  <div className="engine-layer-content">
                    <div className="engine-layer-title gold">Derived Intelligence</div>
                    <div className="engine-layer-body">
                      The most clinically valuable observations are never directly measured. They are inferred from the relationships between variables.
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer III — highlighted */}
              <div className="engine-layer-row highlighted">
                <div className="engine-layer-inner">
                  <div className="engine-numeral gold">III</div>
                  <div className="engine-accent-line" />
                  <div className="engine-layer-content">
                    <div className="engine-layer-title gold">Risk Stratification</div>
                    <div className="engine-layer-body">
                      Risk evaluated across multiple domains — cardiometabolic, renal, hepatic, lifestyle, frailty — rather than collapsed into a single number that conceals more than it reveals.
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer IV */}
              <div className="engine-layer-row">
                <div className="engine-layer-inner">
                  <div className="engine-numeral">IV</div>
                  <div className="engine-accent-line" />
                  <div className="engine-layer-content">
                    <div className="engine-layer-title">Clinical Recommendations</div>
                    <div className="engine-layer-body">
                      Knowledge becomes useful only when it changes decisions. Every recommendation: transparent, explainable, evidence-based, traceable to its clinical origin.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      

      <section className="funfacts" ref={ref}>
        <div className="overlay">
          <div className="container" style={{
    textAlign: "center",
   
  }}>
            
              <h2 style={{
    fontSize: "35px",
    color: "#fff",
    fontWeight: "600",
  }}>We cannot change yesterday's biology.<br/>We can still change tomorrow's.</h2>
              <p style={{
    fontSize: "16px",
    color: "#fff",
   
  }}>Ready to discover how clinical intelligence changes preventive healthcare?</p>
          
          </div>
        </div>
      </section>

      <section className="why-choose-wrap-layout1">
        <div className="container">
          <div className="row">
            <div className="why-choose-box-layout1 col-lg-6">
              <h2 className="item-title">Why People Choose Us?</h2>
              <p className="sub-title">
                We offer extensive medical services for our patients recommend that
                you use officia.
              </p>
              <div className="choose-list-layout1">
                <div className="panel-group" id="accordion">
                  <div className="panel panel-default">
                    <div className="panel-heading active">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                        >
                          Using Innovative Technology
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapseOne"
                      role="tabpanel"
                      className="panel-collapse collapse show"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseTwo"
                        >
                          Guarantee Success of Treatments
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapseTwo"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseThree"
                        >
                          Accepting Insurance Cards
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapseThree"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapse4"
                        >
                          Accepting Insurance Cards
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapse4"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <a
                          aria-expanded="false"
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapse5"
                        >
                          Accepting Insurance Cards
                        </a>
                      </div>
                    </div>
                    <div
                      aria-expanded="false"
                      id="collapse5"
                      role="tabpanel"
                      className="panel-collapse collapse"
                    >
                      <div className="panel-body">
                        <p>
                          Moimply dummy text of the printing and type
                          settingaindustry. Lorem Ipsum has been the industry's
                          standard dummy text ever since thelong established fact
                          thaaret
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-box-layout2 col-lg-6">
              <img
                src={about2}
                alt="About us"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section" style={{
        backgroundImage: `url(${testimonialsBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="container">
          <div className="owl-carousel testimonial-slider">
            <div className="testimonial-item">
              <img src={person1} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Robert Adison</h3>
              <span>Professor</span>
            </div>

            <div className="testimonial-item">
              <img src={person2} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Excellent doctors and outstanding service.
                Highly recommended.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>John Smith</h3>
              <span>Patient</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>

            <div className="testimonial-item">
              <img src={person3} alt="" className="client-img" />
              <p className="testimonial-text">
                <i className="fa fa-quote-left quote-left"></i>
                Amazing medical team and great support.
                <i className="fa fa-quote-right quote-right"></i>
              </p>
              <h3>Emily Watson</h3>
              <span>Doctor</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;