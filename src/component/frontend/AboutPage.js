import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import logo from "./logo.png";
import heroImg from "./../../images/about.png";
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
        <title>About us </title>
      </Helmet>

      <section className="hero-section" style={{ padding: "40px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
           ABOUT <span>PREDYX</span>
          </h2>
          <h4
            style={{
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "700",
              marginBottom: "15px",
            }}>
We Didn't Set Out to Build Another Healthcare Platform. We Set Out to Change How Healthcare Thinks. 
</h4>
          <p>Medicine has never suffered from a lack of information.</p>

<p>Every day, clinicians navigate a continuous stream of laboratory reports, imaging studies, physiological measurements, and specialist opinions. Yet despite this abundance of data, one fundamental challenge remains: weaving these fragmented signals into a coherent understanding of the patient.</p>

<p>The problem has never been data. The problem has always been understanding.</p>

<p>Predyx was born from a simple realization: the future of medicine will not be defined by generating more information, but by truly understanding the information we already have.
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
      
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  Why <span>  Predyx Exists </span>
                </h2>
               
              </div>
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                
                   
<p>Over the past several decades, medicine has achieved extraordinary specialization. Laboratories generate biochemical insights at cellular resolution, radiologists interpret complex anatomy with breathtaking precision, cardiologists analyze electrical function, and geneticists decode inherited risk.
</p>
<p>While every discipline delivers indispensable expertise, healthcare has grown increasingly compartmentalized. The treating physician is left with the overwhelming task of manually synthesizing these disparate perspectives into a single, actionable clinical narrative.
</p>
<p>Predyx exists to bridge these gaps—not by replacing specialized expertise, but by connecting them into a coherent biological picture.
</p>
                </div>
              </div>
           
        </div>
      </section>
      <section className="explain-section predyx-section pt-2">
        <div className="container">
 <div className="row">

           <div className="col-lg-6 col-md-6">
              <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                   The Foundation of  <br/><span> Clinical Intelligence </span>
                </h2>
               
              </div>
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <p>Healthcare does not need another isolated source of data; it needs a structured layer of intelligence that makes existing data meaningful.
</p>
 <p>Clinical Intelligence is that unifying layer. It does not replace pathology, radiology, or physician judgment. Instead, it strengthens them by illuminating the underlying physiological relationships that already exist across organ systems. Rather than viewing health as a static collection of lab values and test scores, Predyx interprets human biology as a dynamic, interconnected system evolving over time.
</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2 mb-2">
              Built to Integrate.  <br/><span>  Never to Replace.</span>
            </h2>
  
          </div>

          <div className="predyx-content-box">
         
            <p>Predyx was never designed to displace physicians, hospitals, or diagnostic laboratories. It was designed to make each of them more capable, more connected, and more informed.
</p>
<p>Predyx is designed to integrate with existing healthcare infrastructure while respecting established clinical workflows and providing transparent, deterministic reasoning that remains firmly under physician oversight.
</p>
<p>We believe technology should never compete with clinical judgment. It should elevate it.</p>
</div></div></div>
        </div>
      </section>

<section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4">
            <h2 className="predyx-main-title mt-2 mb-2">
              Our Origin &   <span>  Philosophy</span>
            </h2>
  
          </div>

          <div className="predyx-content-box">
         
            <p>Predyx was created by a practicing physician after decades spent caring for patients across the continuum of cardiovascular disease, preventive care, and complex chronic illness.
</p>
 <p>Across thousands of patient encounters, one core truth became unmistakable: life-changing clinical decisions rarely stem from a single abnormal lab value, one isolated scan, or a rigid diagnostic label. They emerge from understanding how physiological signals interact and how biological trajectories shift over time.
</p>
</div>
<div className="row">
            <div className="col-lg-12">
              <div className="quote-box">
               <h4>Predyx is not simply another software platform or diagnostic tool. It is a new architecture for clinical reasoning.

</h4>
                <p>This philosophy continues to guide every algorithm, interface, and integration we build.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
















      <section className="explain-section predyx-section pt-2">
        <div className="container">
          <div className="predyx-header text-center mb-4 pr-5 pl-6">
                <h2 className="predyx-main-title mt-2">
                  Our Guiding  <span> Principles </span>
                </h2>
               
              </div>
          <div className="mns row">
            <div className="col-lg-6 col-md-6">
              
              <div
                className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🧬 Biology First</h5>
                  <p>Technology must reflect human physiology, respecting the organic complexity of the body rather than forcing artificial categorizations.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>👨‍⚕️ Physician-Centric</h5>
                  <p>Clinical Intelligence exists to empower physician oversight and clinical judgment, keeping the human doctor firmly at the center of care.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>🔬 Transparent by Design</h5>
                  <p>Every clinical conclusion must be auditable, explainable, and scientifically defensible—eliminating 'black-box' opacity.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="predyx-content-box">
                <div className="info-card" style={{ padding: "0px" }}>
                  <h5>📈 Prevention Through Understanding</h5>
                  <p>
The greatest promise in modern medicine lies not in detecting end-stage disease earlier, but in recognizing  physiological trajectories.</p>
                  
                 
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </section>
      
      <section
        className="predyx7-section py-5"
        style={{ background: "#f9fcff" }}
      >
        <div className="container">
          <div className="predyx7-header mb-5">
            <h2 className="predyx7-title text-center">
            The Evolution of  <span>Clinical Understanding</span>
            </h2>
          </div>

          <div className="predyx7-card flow">
            <div className="predyx7-trajectory">👂  1816 — Auscultation (Stethoscope)</div>      
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">  1895 — Medical Imaging</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">❤️  1903 — Cardiac Electrophysiology (ECG)</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">🧬  The Genomic Era</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">💻  Digital Medicine</div>
            <div className="predyx7-down-arrow">&#8595;</div>
            <div className="predyx7-trajectory">🔷  Clinical Intelligence    Predyx</div>

            
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
          Every generation of medicine has been defined by a new way of seeing.


            </h2>
            <p
              style={{ fontSize: "16px", color: "#fff", marginBottom: "30px" }}
            >
              The stethoscope allowed physicians to hear what had previously been silent.
Medical imaging allowed us to see inside the body.
Genomics revealed the language of inheritance.<br/><br/>

Clinical Intelligence represents the next step—not by measuring more, but by understanding more.<br/><br/>

Because every meaningful clinical decision begins with understanding.


            </p>
            <a href="#" className="action-items-primary-btn1">
           That is why Predyx exists.

              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
