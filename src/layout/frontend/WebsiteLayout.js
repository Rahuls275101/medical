import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Outlet } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";

import './css/normalize.css';
import './css/main.css';
import './css/bootstrap.min.css';
import './css/meanmenu.min.css';
import './css/magnific-popup.css';
import './css/elements.css';
import './css/style.css';
import './css/PredyxAssessment.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";







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
       

      </Helmet>
     
      <Outlet />
      <Footer />
    </>
  );
};

export default WebsiteLayout;
