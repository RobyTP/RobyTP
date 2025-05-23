import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Users, MessageSquare, DollarSign, Settings, ChevronDown, Calendar, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockJobs, mockProjects } from '../data/mockData';

// Dashboard sub-pages
import DashboardHome from './dashboard/DashboardHome';
import DashboardJobs from './dashboard/DashboardJobs';
import DashboardProjects from './dashboard/DashboardProjects';
import DashboardSettings from './dashboard/DashboardSettings';

const DashboardPage: React.FC = () => {
  const { currentUser } = useUser();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Filter data based on user type
  const userJobs = mockJobs.filter(job => 
    currentUser?.userType === 'client' ? job.clientId === currentUser.id : true
  );
  
  const userProjects = mockProjects.filter(project => 
    currentUser?.userType === 'client' 
      ? project.clientId === currentUser.id 
      : project.freelancerId === currentUser.id
  );
  
  // Navigation links based on user type
  const navLinks = [
    { path: "", label: "Overview", icon: <Home size={20} /> },
    ...(currentUser?.userType === 'client' 
      ? [{ path: "jobs", label: "My Jobs", icon: <Briefcase size={20} /> }] 
      : [{ path: "jobs", label: "Find Jobs", icon: <Briefcase size={20} /> }]
    ),
    ...(currentUser?.userType === 'client' 
      ? [{ path: "freelancers", label: "Find Talent", icon: <Users size={20} /> }] 
      : []
    ),
    { path: "projects", label: "Projects", icon: <Calendar size={20} /> },
    { path: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { path: "earnings", label: "Earnings", icon: <DollarSign size={20} /> },
    { path: "settings", label: "Settings", icon: <Settings size={20} /> }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === `/dashboard/${path}` || 
           (path === "" && location.pathname === "/dashboard");
  };
  
const handleLogout = () => {
  router.post('/logout'); // ou axios.post('/logout')
};
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {currentUser?.userType}
                    </p>
                  </div>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-500 hover:text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
                
                {dropdownOpen && (
                  <div className="mt-3 py-2 border-t border-gray-100">
                    <Link to="/dashboard/settings" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Profile Settings
                    </Link>
                    <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              
              {/* Navigation */}
              <nav className="p-2">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={`/dashboard/${link.path}`}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(link.path)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="mr-3">{link.icon}</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Stats */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stats Overview
                </h3>
                <ul className="mt-2 space-y-3">
                  {currentUser?.userType === 'client' ? (
                    <>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Jobs</span>
                        <span className="text-sm font-medium text-gray-900">{userJobs.filter(j => j.status === 'open').length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Projects</span>
                        <span className="text-sm font-medium text-gray-900">{userProjects.filter(p => p.status === 'active').length}</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Projects</span>
                        <span className="text-sm font-medium text-gray-900">{userProjects.filter(p => p.status === 'active').length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-gray-600">Completed Jobs</span>
                        <span className="text-sm font-medium text-gray-900">{currentUser?.userType === 'freelancer' ? (currentUser as any).jobsCompleted : 0}</span>
                      </li>
                    </>
                  )}
                  <li className="flex justify-between">
                    <span className="text-sm text-gray-600">Unread Messages</span>
                    <span className="text-sm font-medium text-gray-900">3</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="" element={<DashboardHome />} />
              <Route path="jobs" element={<DashboardJobs />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="settings" element={<DashboardSettings />} />
              
              {/* Fallback route for unimplemented pages */}
              <Route path="*" element={
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Page Under Construction</h3>
                  <p className="text-gray-600">
                    This section is currently being developed. Please check back later.
                  </p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;