import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import { Project, Milestone } from '../../types';
import Button from '../../components/common/Button';

const DashboardProjects: React.FC = () => {
  const { currentUser } = useUser();
  const isClient = currentUser?.userType === 'client';
  
  // Get projects based on user type
  const userProjects = mockProjects.filter(project => 
    isClient 
      ? project.clientId === currentUser?.id 
      : project.freelancerId === currentUser?.id
  );
  
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  // Filter projects based on active tab
  const filteredProjects = userProjects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return project.status === 'active';
    return project.status === 'completed';
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        
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
              Tous les projets
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
          </nav>
        </div>
      </div>
      
      <div className="p-6">
        {/* Projects list */}
        {filteredProjects.length > 0 ? (
          <div className="mt-6 space-y-8">
            {filteredProjects.map(project => (
              <ProjectItem 
                key={project.id} 
                project={project}
                isClient={isClient}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              You don't have any {activeTab !== 'all' ? activeTab : ''} projects yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectItemProps {
  project: Project;
  isClient: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, isClient }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completedMilestones = project.milestones.filter(m => m.status === 'completed' || m.status === 'paid').length;
  const totalMilestones = project.milestones.length;
  const progress = Math.round((completedMilestones / totalMilestones) * 100);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };
  
  const getMilestoneBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Pending</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>;
      case 'paid':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Paid</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 mr-3">
                <Link to={`/projects/${project.id}`} className="hover:text-blue-600">
                  {project.title}
                </Link>
              </h3>
              {getStatusBadge(project.status)}
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Started on {new Date(project.startDate).toLocaleDateString()}
              {project.endDate && ` • Completed on ${new Date(project.endDate).toLocaleDateString()}`}
            </p>
          </div>
          
          <Link to={`/projects/${project.id}`}>
            <Button variant="outline" size="sm" rightIcon={<ChevronRight size={16} />}>
              View Details
            </Button>
          </Link>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {completedMilestones} of {totalMilestones} milestones completed
          </div>
        </div>
        
        {/* Project details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-600">
              Duration: {project.endDate 
                ? `${Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                : 'Ongoing'}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-600">
              {project.status === 'active' ? 'In progress' : 'Completed'}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-600">
              Total Budget: ${project.totalAmount}
            </span>
          </div>
        </div>
        
        {/* Expand/collapse button for milestones */}
        <button 
          className="mt-4 flex items-center text-blue-600 text-sm font-medium hover:text-blue-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide' : 'Show'} Milestones
          {isExpanded ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
        </button>
      </div>
      
      {/* Milestones section */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Project Milestones</h4>
          <div className="space-y-3">
            {project.milestones.map(milestone => (
              <MilestoneItem 
                key={milestone.id}
                milestone={milestone}
                isClient={isClient}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface MilestoneItemProps {
  milestone: Milestone;
  isClient: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ milestone, isClient }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between">
        <div>
          <h5 className="font-medium text-gray-900">{milestone.title}</h5>
          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
          {milestone.dueDate && (
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              Due: {new Date(milestone.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-gray-900 font-medium">${milestone.amount}</div>
          <div className="mt-1">{getMilestoneBadge(milestone.status)}</div>
          {isClient && milestone.status === 'completed' && (
            <Button variant="success" size="sm" className="mt-2">
              Release Payment
            </Button>
          )}
          {!isClient && milestone.status === 'pending' && (
            <Button variant="primary" size="sm" className="mt-2">
              Start Work
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  
  function getMilestoneBadge(status: string) {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Pending</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>;
      case 'paid':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Paid</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  }
};

export default DashboardProjects;