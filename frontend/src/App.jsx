import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout.jsx';
import TeamSelector from './pages/TeamSelector.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddEvent from './pages/AddEvent.jsx';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TeamSelector />} />
            <Route path="/:teamName" element={<Dashboard />} />
            <Route path="/:teamName/add-event" element={<AddEvent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
