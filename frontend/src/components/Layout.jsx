import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Layout.css';

const Layout = ({ children }) => {
  const { teamName } = useParams();
  
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              📅 Days Since
            </Link>
            <div className="header-actions">
              {teamName && (
                <nav className="nav">
                  <Link to={`/${teamName}`} className="nav-link">
                    Dashboard
                  </Link>
                  <Link to={`/${teamName}/add-event`} className="nav-link">
                    Add Event
                  </Link>
                </nav>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p className="text-center text-gray-500">
            Track your team's important events
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
