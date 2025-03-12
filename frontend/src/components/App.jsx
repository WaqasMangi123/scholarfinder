import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './profile';
import Education from './education';
import Experience from './experience';
import TemplateSelection from './templateselection';
import ConsolidatedView from './consolidatedview';
import FrontPage from './frontpage';
import { DataProvider } from './datacontext';
import PrintButton from './printbutton';
import ContactUs from './contact';
import AboutUs from './about';
import AllScholorships from './allscholorships';
import ScholarshipListing from './scholorshiplisting';
import AdminPage from './adminpage';
import AdminDashboard from './admindashboard';
import AllUser from './alluser';
import Recommendation from './recommendation';
import AdminBlog from './adminblogs';
import Blog from './blog';
import ScrapingWebsiteDetail from './scrappingwebsitedetail';
import RealTimeData from './realtimedata';
import ScholarBot from './scholarbot'; // Import ScholarBot component
import ScholarshipTips from './tips'; // Import the new Tips page

import { useAuthContext } from '../../hooks/UseAuthContext';

const App = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'https://embed.tawk.to/672012f32480f5b4f5955a27/1ibakk21o';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <DataProvider>
      <Router>
        <ScholarBot /> {/* ScholarBot will appear on every page */}
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/Register" element={!user ? <Register /> : <Navigate to="/home" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="/education" element={user ? <Education /> : <Navigate to="/" />} />
          <Route path="/experience" element={user ? <Experience /> : <Navigate to="/" />} />
          <Route path="/templateselection" element={user ? <TemplateSelection /> : <Navigate to="/" />} />
          <Route path="/consolidated-view" element={user ? <ConsolidatedViewWrapper /> : <Navigate to="/" />} />
          <Route path="/contact" element={user ? <ContactUs /> : <Navigate to="/" />} />
          <Route path="/about" element={user ? <AboutUs /> : <Navigate to="/" />} />
          <Route path="/adminpage" element={user ? <AdminPage /> : <Navigate to="/" />} />
          <Route path="/allscholorships" element={<AllScholorships />} />
          <Route path="/scholorshiplisting" element={<ScholarshipListing />} />
          <Route path="/recommendation" element={user ? <Recommendation /> : <Navigate to="/" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/adminblogs" element={user ? <AdminBlog /> : <Navigate to="/" />} />
          <Route path="/admindashboard" element={user ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/alluser" element={user ? <AllUser /> : <Navigate to="/" />} />
          <Route path="/scrappingwebsitedetail" element={<ScrapingWebsiteDetail />} />
          <Route path="/realtimedata" element={<RealTimeData />} />
          <Route path="/tips" element={<ScholarshipTips />} /> {/* Add Tips page route */}
        </Routes>
      </Router>
    </DataProvider>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ConsolidatedViewWrapper = () => {
  const query = useQuery();
  const template = query.get('template');
  return (
    <>
      <ConsolidatedView template={template} />
      <PrintButton template={template} />
    </>
  );
};

export default App;
