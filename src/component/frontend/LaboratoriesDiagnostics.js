import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/laboratort.png";
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
        <title>Clinical Intelligence for Laboratories  &  Diagnostics </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
          Clinical Intelligence for <span> Laboratories  &  Diagnostics</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>Transforming Laboratory Results into Clinical Understanding.</h4>
          <p>Every single day, diagnostic laboratories process millions of remarkably precise clinical measurements. These numbers form the bedrock of modern medicine. Yet, all too often, they end up trapped in rigid PDF reports—isolated values that leave physicians to piece together the bigger biological picture on their own.</p>
<p>Predyx bridges this gap. By weaving raw laboratory data into structured Clinical Intelligence, we help diagnostic centers, clinicians, and patients extract true, actionable meaning from every single investigation.</p>

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
                  The Real-World  <span> Challenge </span>
                </h2>
                <p>
                 Modern diagnostic centers are exceptional at producing accurate data. The bottleneck begins the moment those results are delivered.
</p>
              </div>
              <div
                className="predyx-content-box" style={{minHeight:"345px"}}>
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Common challenges include:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                    <li> Dozens of standalone biomarkers reported in isolation, leaving the 'so what?' unaddressed</li>
 <li> Rapidly growing complexity in specialized testing that outpaces standard reference ranges</li>
 <li>  A total disconnect between lab values and other clinical signals—like ECGs, imaging, and lifestyle history</li>
 <li> Dense, intimidating PDF printouts that leave patients confused rather than empowered</li>
 <li> Zero continuity between past and present labs, missing the subtle shifts in long-term health</li>
 <li>  A rising demand for preventive, personalized care that standard lab templates simply can't fulfill</li>

</ul>
                  <p style={{ marginBottom: "0px" }}>
                   Medicine doesn't need another test panel. It needs a better way to understand the tests we already run.

                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  How Predyx  <span> Changes the Game </span>
                </h2>
                <p>Predyx sits directly above existing laboratory workflows as a smart intelligence layer. It seamlessly connects biomarker data with underlying physiology, imaging, ECGs, and real-world lifestyle factors.
</p>
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Here is what that looks like in practice:</h5>
                  <ul style={{ marginBottom: "20px" }}>
                     <li> Translates raw lab numbers into interconnected organ-system evaluations</li>
<li> Tracks biological trajectories over time to catch health shifts long before disease takes hold</li>
<li>Synthesizes biomarker data with structural diagnostics (ECG, imaging, vital signs)</li>
<li> Builds effortless longitudinal comparisons across repeat lab visits</li>
<li> Generates clean, visually intuitive Clinical Intelligence Reports for patients</li>
<li>Delivers concise, structured biological summaries designed specifically for busy physicians</li>


</ul>
      <p style={{ marginBottom: "0px" }}>Isolated numbers become a coherent, human story about a patient's health.</p>
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
              Designed to Elevate, <span>    Never Disrupt </span>
            </h2>
            <p> Predyx was built to partner with laboratories—not compete with them or force costly infrastructure overhauls.</p>
          </div>
          <div className="predyx-content-box">
            <h5>Our platform integrates effortlessly across:</h5>
            <ul className="lists">
                <li> National reference laboratories</li>
<li> Hospital-based pathology departments</li>
<li> Preventive health package providers</li>
<li> Executive wellness and longevity centers</li>
<li> Corporate health screening networks</li>
<li> Specialized molecular and diagnostic facilities</li>
            </ul>
            <p>By turning routine diagnostic results into clear, meaningful insights, Predyx elevates labs from transactional data providers to indispensable clinical partners.</p>
          </div>
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  What Laboratories  <span>  & Partners Receive </span>
                </h2>
               
              </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>Patient-Facing Intelligence</h5>
                  <p>Every test generates a complete, intuitive report package:</p>
                  <ul style={{ marginBottom: "20px" }}>
                   <li> The PredyxIQ™ Clinical Intelligence Report</li>
<li> Visual Organ-System Trajectory Wheels</li>
<li> An overall Clinical Intelligence Score</li>
<li> Prioritized clinical insights and key focus areas</li>
<li> Positive health signals that reinforce good progress</li>
<li> Clear, longitudinal health trends comparing past tests</li>
<li> Personalized, evidence-based preventive guidance</li>


</ul>
                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5> Population-Level Intelligence</h5>
                  <p>Diagnostic partners unlock high-level, privacy-first organizational insights:</p>
                  <ul style={{ marginBottom: "20px" }}>
                   <li> Macro-level population biomarker trends</li>
<li> Early metabolic and cardiovascular risk patterns</li>
<li> Targeted preventive health opportunities across patient cohorts</li>
<li> Longitudinal screening outcomes over time</li>
<li> Utilization trends across diagnostic panels</li>
<li> Actionable data to optimize preventive health packages</li>

</ul>

                </div>
              </div>
            </div>
            <div className="col-md-12 text-center mt-5"><p style={{ marginBottom: "0px", textAlign:"center" }}>All analytics are fully de-identified, strictly protecting patient confidentiality while delivering immense strategic value.
</p></div>
          </div>
        </div>
      </section>
      <section className="predyx2-section">
        <div className="container">
          <div className="predyx2-heading text-center mb-5">
            <h2 className="predyx2-title mt-2">
              Value  <span> Delivered</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5> For Laboratories & Diagnostic Centers</h5>

                  <ul className="lists">
                    
<li> Stand out in a crowded market with premium, high-value reporting</li>
<li> Build deeper, more collaborative relationships with referring physicians</li>
<li> Deliver an exceptional patient experience that drives repeat engagement</li>
<li> Unlock new revenue streams in preventive and longevity healthcare</li>
<li> Position your lab as an advanced Clinical Intelligence partner</li>


                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Physicians</h5>

                  <ul className="lists">
                    
<li> Cut through the clutter of multi-page lab results in seconds</li>
<li> See how lab values interact with ECGs, imaging, and patient history</li>
<li> Rely on structured, transparent reasoning to guide clinical decisions</li>
<li> Track patient progress effortlessly across months and years</li>
<li> Have richer, far more productive consultations with patients</li>



                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="predyx2-card">
                <div className="predyx2-card-content">
                  <h5>For Patients</h5>

                  <ul className="lists">
                   <li>Finally understand what lab results actually mean in plain, human language</li>
<li>Feel motivated to take charge of their health through clear visuals</li>
<li> Watch biological health evolve over time rather than guessing</li>
<li> Walk into doctor visits prepared with meaningful questions</li>
<li> Receive practical, reassuring guidance on lifestyle and follow-ups</li>




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
             The Diagnostic   <span>Workflow in Action</span>
            </h2>
          </div>


          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">Sample Collection & High-Precision Testing</div>
            <div className="predyx7-down-arrow">&#8595;</div>

            <div className="predyx7-flow">
              <div className="predyx7-step">Biomarkers</div>
              <div className="predyx7-step">Pathology Data</div>
              <div className="predyx7-step">Physiological Measurements </div>
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
            <div className="predyx7-trajectory">Focused Physician Consultation</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">Patient Action & Targeted Prevention</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory mb-5">Longitudinal Tracking Over Time</div>

            <p className="text-center">Instead of ending with a static printout, every lab test becomes an ongoing benchmark in a patient's lifelong health journey.
</p>
          </div>
        </div>
      </section>
      <section className="predyx3-section" style={{ background: "#f9fcff" }}>
        <div className="container">
          <div className="predyx3-header text-center">
            <h2 className="predyx3-title mt-2">
              The Future of   <span> Diagnostic Medicine</span>
            </h2>
          

            
          </div>

          <div className="predyx3-timeline mt-5">
            <p>The next era of diagnostic medicine isn't just about printing precise numbers—it's about helping people understand what those numbers actually mean over time.
</p>
<p>Predyx allows diagnostic centers to transition from data providers into true partners in patient health. By connecting rigorous laboratory science with the full biological context, we help unlock the true value hidden inside every test you perform.
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
         Turn your diagnostic data into powerful Clinical Intelligence.



            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
            Discover how Predyx integrates with your laboratory workflows to elevate your reporting and transform patient care.




            </p>
            <a href="#" className="action-items-primary-btn1">
          Explore Partnering with Predyx
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
