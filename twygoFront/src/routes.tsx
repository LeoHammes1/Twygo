import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import CourseManagement from './pages/Manegement';
import Reports from './pages/Reports';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/management" element={<CourseManagement />} /> 
        <Route path="/reports" element={<Reports/>} />  
      </Routes>
    </Router>
  );
};

export default AppRoutes;
