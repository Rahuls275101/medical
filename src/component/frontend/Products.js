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
        <title>Products </title>
      </Helmet>

       <section className="hero-section" style={{ padding: "140px 0px" }}>
        <div className="container text-center">
          <h2 className="predyx-main-title mb-2" style={{ lineHeight: "35px" }}>
           Coming  <span>Soon</span>
          </h2>
        </div>
      </section>

      
    </div>
  );
};

export default MainPage;
