import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Complaints from './pages/Complaints';
import Bills from './pages/Bills';
import Emergency from './pages/Emergency';
import Chatbot from './pages/Chatbot';
import Events from './pages/Events';
import Jobs from './pages/Jobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="bills" element={<Bills />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="events" element={<Events />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
