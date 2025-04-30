import React from 'react';
import { useParams } from 'react-router-dom';

const FreelancerDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Freelancer Profile</h1>
          <div className="space-y-6">
            {/* Placeholder content - replace with actual freelancer data */}
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Freelancer #{id}</h2>
                <p className="text-gray-600">Loading freelancer details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetailPage;