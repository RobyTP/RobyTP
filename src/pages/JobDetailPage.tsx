import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, DollarSign, Send, Briefcase, MapPin, Star } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const job = mockJobs.find(job => job.id === id);
  const { isAuthenticated, currentUser } = useUser();
  const isClient = currentUser?.userType === 'client';

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
          <p className="mt-2 text-gray-600">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Job Header */}
          <div className="px-6 py-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.category}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'open' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>

            {/* Budget and Requirements */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Budget
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {job.budget.type === 'fixed'
                    ? `${job.budget.currency}${job.budget.amount}`
                    : `${job.budget.currency}${job.budget.amount}/hr`
                  }
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {job.budget.type} Price
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Star className="h-4 w-4 mr-1" />
                  Experience Level
                </div>
                <div className="text-lg font-semibold text-gray-900 capitalize">
                  {job.experience} Level
                </div>
                <div className="text-sm text-gray-500">
                  {job.proposals} proposals so far
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  Project Length
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {job.deadline 
                    ? `Due by ${new Date(job.deadline).toLocaleDateString()}`
                    : 'To be discussed'
                  }
                </div>
                <div className="text-sm text-gray-500">
                  Estimated timeline
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Project Description</h2>
              <div className="mt-4 prose max-w-none text-gray-600">
                {job.description}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">About the Client</h2>
              <div className="mt-4">
                <div className="flex items-center">
                  <img
                    src={job.client.avatar}
                    alt={job.client.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/clients/${job.client.id}`} className="hover:text-green-600">
                        {job.client.name}
                      </Link>
                    </h3>
                    <p className="text-gray-500">{job.client.company}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{job.client.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Member since {new Date(job.client.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!isClient && job.status === 'open' && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                {isAuthenticated ? (
                  <Link to={`/jobs/${job.id}/propose`}>
                    <Button
                      variant="primary"
                      fullWidth
                      leftIcon={<Send size={18} />}
                    >
                      Submit Proposal
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="primary"
                      fullWidth
                    >
                      Sign in to Apply
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;