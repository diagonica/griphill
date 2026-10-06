import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import AdminOrders from './components/AdminOrders.jsx';
import Terms from './components/Terms.jsx';
import Privacy from './components/Privacy.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track-order" element={<Home />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
