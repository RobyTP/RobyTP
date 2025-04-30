import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Edit, Trash, Eye } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import { Job } from '../../types';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const DashboardJobs: React.FC = () => {
  const { currentUser } = useUser();
  const isClient = currentUser?.userType === 'client';
  
  // Get jobs based on user type
  const userJobs = isClient
    ? mockJobs.filter(job => job.clientId === currentUser.id)
    : mockJobs; // For demo, show all jobs to freelancers
  
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'proposals'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter jobs based on active tab
  const filteredJobs = userJobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return job.status === 'open';
    if (activeTab === 'completed') return job.status === 'completed';
    return false; // For 'draft' tab
  });
  
  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' 
        ? a.proposals - b.proposals 
        : b.proposals - a.proposals;
    }
  });
  
  const handleSort = (newSortBy: 'date' | 'proposals') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };
  
  const renderSortIcon = (column: 'date' | 'proposals') => {
    if (sortBy !== column) return null;
    
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4" /> 
      : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {isClient ? 'My Jobs' : 'Browse Jobs'}
          </h1>
          
          {isClient && (
            <Button leftIcon={<Plus size={18} />}>
              Post a New Job
            </Button>
          )}
        </div>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'all'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Jobs
            </button>
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'active'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'completed'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
            {isClient && (
              <button 
                className={`pb-3 px-1 ${
                  activeTab === 'draft'
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('draft')}
              >
                Drafts
              </button>
            )}
          </nav>
        </div>
      </div>
      
      <div className="p-6">
        {/* Sort options */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {sortedJobs.length} jobs
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <button 
              className={`flex items-center ${
                sortBy === 'date' ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleSort('date')}
            >
              Date {renderSortIcon('date')}
            </button>
            <button 
              className={`flex items-center ${
                sortBy === 'proposals' ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleSort('proposals')}
            >
              Proposals {renderSortIcon('proposals')}
            </button>
          </div>
        </div>
        
        {/* Jobs list */}
        {sortedJobs.length > 0 ? (
          <div className="mt-6 space-y-4">
            {sortedJobs.map(job => (
              <JobItem 
                key={job.id} 
                job={job}
                isClient={isClient}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-6">
              {isClient 
                ? "You haven't posted any jobs yet." 
                : "No jobs match your current filters."}
            </p>
            
            {isClient && (
              <Button leftIcon={<Plus size={18} />}>
                Post Your First Job
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface JobItemProps {
  job: Job;
  isClient: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ job, isClient }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="flex-1">
          <div className="flex items-start">
            <h3 className="text-lg font-medium text-gray-900 mr-3 hover:text-blue-600">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            {getStatusBadge(job.status)}
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            Posted on {new Date(job.createdAt).toLocaleDateString()} • {job.proposals} proposals
          </p>
          
          <p className="text-sm text-gray-700 mt-3 line-clamp-2">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
          <div className="text-gray-900 font-medium">
            {job.budget.type === 'fixed' 
              ? `${job.budget.currency} ${job.budget.amount}`
              : `${job.budget.currency} ${job.budget.amount}/hr`}
          </div>
          <div className="text-sm text-gray-500 capitalize">
            {job.budget.type} Price
          </div>
          
          <div className="mt-4 flex space-x-2 md:justify-end">
            <Link to={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>
                View
              </Button>
            </Link>
            
            {isClient && (
              <>
                <Button variant="outline" size="sm" leftIcon={<Edit size={16} />}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" leftIcon={<Trash size={16} />}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobs;