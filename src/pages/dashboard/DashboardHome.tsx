import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, Clock, Users, Bell, ChevronRight, CheckCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { mockJobs, mockProjects, mockMessages } from '../../data/mockData';
import Button from '../../components/common/Button';

const DashboardHome: React.FC = () => {
  const { currentUser } = useUser();
  const isClient = currentUser?.userType === 'client';
  
  // Filter data based on user type
  const userJobs = isClient 
    ? mockJobs.filter(job => job.clientId === currentUser.id).slice(0, 3)
    : mockJobs.slice(0, 3); // For demo, show all jobs to freelancers
  
  const userProjects = mockProjects.filter(project => 
    isClient 
      ? project.clientId === currentUser.id 
      : project.freelancerId === currentUser.id
  );
  
  // Get recent notifications (placeholder)
  const recentNotifications = [
    { id: 'n1', message: 'New proposal received on "Front-end Developer" job', time: '2 hours ago' },
    { id: 'n2', message: 'Project milestone "Initial Design" completed', time: '1 day ago' },
    { id: 'n3', message: 'You have 3 unread messages', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {currentUser?.name}!</h1>
          <p className="mt-1 text-blue-100">
            Here's an overview of your {isClient ? 'projects and jobs' : 'jobs and earnings'}
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {isClient ? 'Active Jobs' : 'Available Jobs'}
                </p>
                <p className="text-xl font-semibold">
                  {isClient 
                    ? userJobs.filter(j => j.status === 'open').length 
                    : mockJobs.filter(j => j.status === 'open').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {isClient ? 'Active Projects' : 'Ongoing Projects'}
                </p>
                <p className="text-xl font-semibold">
                  {userProjects.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  New Notifications
                </p>
                <p className="text-xl font-semibold">
                  {recentNotifications.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-2 mr-3">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {isClient ? 'Total Spent' : 'Total Earned'}
                </p>
                <p className="text-xl font-semibold">
                  ${isClient ? '3,250' : '4,120'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Jobs/Projects */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isClient ? 'Your Jobs' : 'Recommended Jobs'}
            </h2>
            <Link to={isClient ? "/dashboard/jobs" : "/jobs"} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {userJobs.length > 0 ? (
              userJobs.map(job => (
                <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {job.proposals} proposals • Posted {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.status === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status === 'open' ? 'Active' : 'Closed'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-700">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {job.budget.type === 'fixed' 
                        ? `${job.budget.currency} ${job.budget.amount} (Fixed)` 
                        : `${job.budget.currency} ${job.budget.amount}/hr (Hourly)`}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No jobs found</p>
                {isClient && (
                  <Button variant="primary" size="sm">
                    Post a Job
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Notifications
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
          </div>
          
          <div className="space-y-4">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="border-b border-gray-100 pb-3 last:border-0">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Active Projects
            </h2>
            <Link to="/dashboard/projects" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {userProjects.length > 0 ? (
              userProjects.filter(p => p.status === 'active').slice(0, 2).map(project => (
                <Link key={project.id} to={`/projects/${project.id}`} className="block">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {project.milestones.filter(m => m.status === 'completed').length}/{project.milestones.length} milestones complete
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No active projects</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Messages */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Messages
            </h2>
            <Link to="/messages" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockMessages.length > 0 ? (
              mockMessages.slice(0, 3).map(message => (
                <Link key={message.id} to="/messages" className="block">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex items-start">
                      <img 
                        src={mockMessages.find(m => m.senderId === message.senderId)?.senderId === 'c1' 
                          ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
                          : 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
                        } 
                        alt="Sender" 
                        className="h-10 w-10 rounded-full mr-3 object-cover" 
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {message.senderId.startsWith('c') ? 'Client' : 'Freelancer'}
                        </p>
                        <p className="text-sm text-gray-600 truncate">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!message.read && (
                        <span className="ml-auto h-2 w-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;