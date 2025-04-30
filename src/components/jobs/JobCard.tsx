import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Job } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { id, title, description, budget, skills, createdAt, client, proposals, experience } = job;
  
  const formatBudget = () => {
    if (budget.type === 'fixed') {
      return `${budget.currency} ${budget.amount}`;
    } else {
      return `${budget.currency} ${budget.amount}/hr`;
    }
  };
  
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  const truncateDescription = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const getExperienceLevel = () => {
    switch (experience) {
      case 'entry':
        return 'Entry Level';
      case 'intermediate':
        return 'Intermediate';
      case 'expert':
        return 'Expert';
      default:
        return 'Any Level';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
      <Link to={`/jobs/${id}`} className="block">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600">{title}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {budget.type === 'fixed' ? 'Fixed Price' : 'Hourly'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-1 mb-3">
            <Clock className="h-4 w-4 mr-1" /> 
            <span>{timeAgo}</span>
            <span className="mx-2">•</span>
            <span>{proposals} proposals</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{truncateDescription(description)}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{skills.length - 3} more
              </span>
            )}
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src={client.avatar} 
                  alt={client.name} 
                  className="h-8 w-8 rounded-full mr-2 object-cover" 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.company}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium text-gray-900">{formatBudget()}</span>
                  </div>
                  <p className="text-xs text-gray-500">{getExperienceLevel()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;