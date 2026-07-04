import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

import '../css/bootstrap.min.css'
import '../css/animate.min.css';
import '../css/main.css';
import '../css/normalize.css';
import '../css/main.css';
import '../css/bootstrap.min.css';
import '../css/animate.min.css';
import '../fonts/flaticon.css';
import '../css/meanmenu.min.css';
import '../css/magnific-popup.css';
import '../vendor/OwlCarousel/owl.carousel.min.css';
import '../vendor/OwlCarousel/owl.theme.default.min.css';
import '../vendor/slider/css/nivo-slider.css';
import '../css/elements.css';


const WebsiteLayout = ({ isFrontend }) => {


     useEffect(() => {
    const scriptUrls = [
    
      
    ];

       // Load the scripts dynamically
    scriptUrls.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      // Clean up: remove the scripts when the component unmounts
      scriptUrls.forEach((url) => {
        const script = document.querySelector(`[src="${url}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);


  return (
  
    <> 
    <Header />

      <Helmet>
        <title>Home - My Website</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
      </Helmet>
     
      <Outlet />
  <Footer />
    </>
  );
};

export default WebsiteLayout;


