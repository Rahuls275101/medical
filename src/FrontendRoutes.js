import React from 'react';
import { useRoutes } from 'react-router-dom';
import WebsiteLayout from './layout/frontend/WebsiteLayout';
import HomePage from './component/frontend/HomePage';
import AboutPage from './component/frontend/AboutPage';
import MainPage from './component/frontend/MainPage';
import ContactPage from './component/frontend/ContactPage';
import PredyxAssessment from './component/frontend/PredyxAssessment';



const FrontendRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <WebsiteLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'main', element: <MainPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'predyx-assessment', element: <PredyxAssessment /> },
      ],
    },
  ]);

  return <>{routes}</>;
};

export default FrontendRoutes;
