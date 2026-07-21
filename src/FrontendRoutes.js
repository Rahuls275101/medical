import React from 'react';
import { useRoutes } from 'react-router-dom';
import WebsiteLayout from './layout/frontend/WebsiteLayout';
import HomePage from './component/frontend/HomePage';
import ThePlatform from './component/frontend/ThePlatform';
import PredyxiqQuick from './component/frontend/PredyxiqQuick';
import ClinicalIntelligence from './component/frontend/ClinicalIntelligence';
import PredyxiqServices from './component/frontend/PredyxiqServices';
import ScienceOfClinicalIntelligence from './component/frontend/ScienceOfClinicalIntelligence';
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
        { path: 'platform', element: <ThePlatform /> },
        { path: 'predyxiq-quick', element: <PredyxiqQuick /> },
        { path: 'clinical-intelligence', element: <ClinicalIntelligence /> },
        { path: 'predyxiq-services', element: <PredyxiqServices /> },
        { path: 'science-of-clinical-intelligence', element: <ScienceOfClinicalIntelligence /> },
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
