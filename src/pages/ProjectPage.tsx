import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Project Details</h1>
        <div className="space-y-4">
          {/* Project content will be implemented later */}
          <p className="text-gray-600">Loading project {id}...</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;