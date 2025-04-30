import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Freelancer } from '../../types';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  const { id, name, avatar, title, skills, hourlyRate, rating, jobsCompleted, availability } = freelancer;
  
  const getAvailabilityBadge = () => {
    switch (availability) {
      case 'available':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Available Now' };
      case 'part-time':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Part-Time' };
      case 'not-available':
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Available' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    }
  };
  
  const availabilityBadge = getAvailabilityBadge();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
      <Link to={`/freelancers/${id}`} className="block">
        <div className="p-6">
          <div className="flex items-start">
            <img 
              src={avatar} 
              alt={name} 
              className="h-16 w-16 rounded-full mr-4 object-cover border border-gray-200" 
            />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600">{name}</h3>
                <span className={`px-3 py-1 ${availabilityBadge.bg} ${availabilityBadge.text} text-xs font-medium rounded-full flex items-center`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {availabilityBadge.label}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm font-medium mt-1">{title}</p>
              
              <div className="flex items-center mt-1 mb-3">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{jobsCompleted} jobs completed</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                Member since {new Date(freelancer.createdAt).toLocaleDateString()}
              </span>
              <div className="text-right">
                <span className="font-bold text-gray-900">${hourlyRate}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FreelancerCard;