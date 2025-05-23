import React from 'react';
import ConfidentialitePage from './pages/ConfidentialitePage';
import ConditionsUtilisation from './pages/ConditionsUtilisation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import FreelancersPage from './pages/FreelancersPage';
import FreelancerDetailPage from './pages/FreelancerDetailPage';
import ClientDetailPage from './pages/ClientDetailPage';
import DashboardPage from './pages/DashboardPage';
import MessagesPage from './pages/MessagesPage';
import ProjectPage from './pages/ProjectPage';
import ProposalPage from './pages/ProposalPage';
import SettingsPage from './pages/SettingsPage';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/confidentialite" element={<ConfidentialitePage />} />
              <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/jobs/:jobId/propose" element={
                <ProtectedRoute>
                  <ProposalPage />
                </ProtectedRoute>
              } />
              <Route path="/freelancers" element={<FreelancersPage />} />
              <Route path="/freelancers/:id" element={<FreelancerDetailPage />} />
              <Route path="/clients/:id" element={<ClientDetailPage />} />
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              } />
              <Route path="/projects/:id" element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </UserProvider>
    </Router>
  );
}

export default App;