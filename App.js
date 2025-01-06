import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import AddCase from './AddCases.js'; // Ensure the path is correct
import AddOfficer from './AddOfficers.js';
import AddComplaints from './AddComplaints.js';
import AddCriminals from './AddCriminals.js';
import AddDuties from './AddDuties.js';
import AddIncident from './AddIncidents.js';
import AddFeedback from './AddFeedback.js';
import AddStation from './AddSrations.js';
import InterStationCommunication from'./AddCommunications.js';
const PoliceMgmtSystem = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);

  
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [criminals, setCriminals] = useState([]);
  const [duties, setDuties] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stations, setStations] = useState([]);
  const [communications, setCommunications] = useState([]);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nationalId: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'Citizen',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating a successful login
    setIsAuthenticated(true);
    setCurrentUser({ ...loginData, role: 'Admin' }); // Placeholder for actual authentication logic
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Register the user (for now just adding to the users list)
    setUsers([...users, registerData]);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const renderAuthForms = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {showRegister ? 'Register' : 'Login'}
        </h2>
        <div className="auth-content">
          {showRegister ? (
            <form onSubmit={handleRegister} className="auth-form">
              <input
                type="text"
                placeholder="National ID"
                className="form-input"
                value={registerData.nationalId}
                onChange={(e) => setRegisterData({ ...registerData, nationalId: e.target.value })}
              />
              <input
                type="text"
                placeholder="First Name"
                className="form-input"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-input"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="form-input"
                value={registerData.phoneNumber}
                onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <select
                className="form-select"
                value={registerData.role}
                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              >
                <option value="Citizen">Citizen</option>
                <option value="Officer">Officer</option>
                <option value="Admin">Admin</option>
              </select>
              <button type="submit" className="btn btn-primary">Register</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowRegister(false)}
              >
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">Login</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowRegister(true)}
              >
                Register New Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>Active Cases</h3>
        <div className="dashboard-value">
          {cases.filter(c => c.status !== 'Resolved').length}
        </div>
      </div>
      <div className="dashboard-card">
        <h3>Available Officers</h3>
        <div className="dashboard-value">
          {officers.filter(o => o.availabilityStatus === 'Available').length}
        </div>
      </div>
      <div className="dashboard-card">
        <h3>Recent Complaints</h3>
        <div className="dashboard-value">{complaints.length}</div>
      </div>
    </div>
  );

  
  
  const renderCases = () => (
    <div className="Cases-content">
      <h2>Cases</h2>
      <AddCase />
    </div>
  );
  
  
  const renderOfficers = () => (
    <div className="officers-content">
      <h2>Officers</h2>
      <AddOfficer/>
      {/* Add officer content here */}
    </div>
  );

  const renderComplaints = () => (
    <div className="complaints-content">
      <h2>Complaints</h2>
      <AddComplaints/>
      {/* Add complaints content here */}
    </div>
  );

  const renderCriminals = () => (
    <div className="criminals-content">
      <h2>Criminals</h2>
      <AddCriminals/>
      {/* Add criminals content here */}
    </div>
  );

  const renderDuties = () => (
    <div className="duties-content">
      <h2>Duties</h2>
      <AddDuties/>
      {/* Add duties content here */}
    </div>
  );

  const renderIncidents = () => (
    <div className="incidents-content">
      <h2>Incidents</h2>
      <AddIncident/>
      {/* Add incidents content here */}
    </div>
  );

  const renderFeedback = () => (
    <div className="feedback-content">
      <h2>Feedback</h2>
      <AddFeedback/>
      {/* Add feedback content here */}
    </div>
  );

  const renderStations = () => (
    <div className="stations-content">
      <h2>Stations</h2>
      <AddStation/>
      {/* Add stations content here */}
    </div>
  );

  const renderCommunications = () => (
    <div className="communications-content">
      <h2>Communications</h2>
      <InterStationCommunication/>
      {/* Add communications content here */}
    </div>
  );

  const renderNavigation = () => (
    <div className="navigation">
      <div className="nav-header">
        <h1>
          Police Station Management System <i className="fa fa-shield" style={{ marginRight: '10px' }}></i></h1>
        <div className="nav-user">
          <span className="user-email">{currentUser?.email}</span>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="nav-tabs">
        {['dashboard', 'cases', 'officers', 'complaints', 'criminals', 'duties', 'incidents', 'feedback', 'stations', 'communications'].map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
  

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'cases':
        return renderCases();
      case 'officers':
        return renderOfficers();
      case 'complaints':
        return renderComplaints();
      case 'criminals':
        return renderCriminals();
      case 'duties':
        return renderDuties();
      case 'incidents':
        return renderIncidents();
      case 'feedback':
        return renderFeedback();
      case 'stations':
        return renderStations();
      case 'communications':
        return renderCommunications();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        renderAuthForms()
      ) : (
        <>
          {renderNavigation()}
          <main className="main-content">
            {renderContent()}
          </main>
        </>
      )}
    </div>
  );
};

export default PoliceMgmtSystem;
