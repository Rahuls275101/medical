import React from 'react';
import { useRoutes } from 'react-router-dom';
import WebsiteLayout from './layout/frontend/WebsiteLayout';
import HomePage from './component/frontend/HomePage';
import ThePlatform from './component/frontend/ThePlatform';
import PredyxiqQuick from './component/frontend/PredyxiqQuick';
import ClinicalIntelligence from './component/frontend/ClinicalIntelligence';
import PredyxiqServices from './component/frontend/PredyxiqServices';
import PhysiciansClinics from './component/frontend/PhysiciansClinics';
import CorporateHealth from './component/frontend/CorporateHealth';
import Insurance from './component/frontend/Insurance';
import HealthSystem from './component/frontend/HealthSystem';
import LaboratoriesDiagnostics from './component/frontend/LaboratoriesDiagnostics';
import ScienceOfClinicalIntelligence from './component/frontend/ScienceOfClinicalIntelligence';
import AboutPage from './component/frontend/AboutPage';
import MainPage from './component/frontend/MainPage';
import ContactPage from './component/frontend/ContactPage';




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
        { path: 'physicians-clinics', element: <PhysiciansClinics /> },
        { path: 'corporate-health', element: <CorporateHealth /> },
        { path: 'insurance', element: <Insurance /> },
        { path: 'health-system', element: <HealthSystem /> },
        { path: 'laboratories-diagnostics', element: <LaboratoriesDiagnostics /> },
        { path: 'science-of-clinical-intelligence', element: <ScienceOfClinicalIntelligence /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'main', element: <MainPage /> },
        { path: 'contact', element: <ContactPage /> },
    
      ],
    },
  ]);

  return <>{routes}</>;
};

export default FrontendRoutes;
