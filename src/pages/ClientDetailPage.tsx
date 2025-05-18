import React from 'react';
import { useParams } from 'react-router-dom';

const ClientDetailPage = () => {
  const { id } = useParams();

  //juste un essai pour voir ce que ça donne
  const postedJobs = [
    {
      id: 1,
      title: "Développeur Frontend React",
      description: "Nous recherchons un développeur React expérimenté.",
      postedDate: "2025-04-25",
    },
    {
      id: 2,
      title: "Designer UI/UX",
      description: "Création d'une interface intuitive pour une app mobile.",
      postedDate: "2025-04-22",
    },
  ];

  //fin du bloc d'essai

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Client Profile</h1>
        <div className="space-y-6">
          {/* Placeholder content - will be populated with actual client data */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Client #{id}</h2>
              <p className="text-gray-600">Member since 2024</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-700">
              This is a placeholder for the client's description. The actual content will be populated
              with data from the backend.
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Posted Jobs</h3>
            <div className="space-y-4">
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <div key={job.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <p className="text-sm text-gray-400 mt-2">Publié le {job.postedDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Cet employeur n’a encore publié aucun emploi.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailPage;