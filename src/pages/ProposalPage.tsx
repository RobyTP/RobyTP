import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Clock, DollarSign } from 'lucide-react';
import Button from '../components/common/Button';
import { mockJobs } from '../data/mockData';
import { toast } from 'react-toastify';

const ProposalPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === jobId);

  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    proposedBudget: job?.budget.type === 'fixed' ? job.budget.amount : '',
    estimatedDuration: '',
    attachments: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
          <p className="mt-2 text-gray-600">The job you're trying to propose to doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Proposal submitted successfully!');
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      toast.error('Failed to submit proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Job Summary */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Submit Proposal</h1>
            <div className="mt-2">
              <h2 className="text-lg font-medium text-gray-900">{job.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{job.category}</p>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-500">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>
                  {job.budget.type === 'fixed' 
                    ? `Fixed - ${job.budget.currency}${job.budget.amount}`
                    : `Hourly - ${job.budget.currency}${job.budget.amount}/hr`
                  }
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{job.experience} level</span>
              </div>
            </div>
          </div>

          {/* Proposal Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <div className="mt-1">
                <textarea
                  rows={6}
                  required
                  value={proposalData.coverLetter}
                  onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="Introduce yourself and explain why you're the best fit for this job..."
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Highlight your relevant experience and approach to this project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {job.budget.type === 'fixed' ? 'Proposed Budget' : 'Hourly Rate'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    required
                    value={proposalData.proposedBudget}
                    onChange={(e) => setProposalData(prev => ({ ...prev, proposedBudget: e.target.value }))}
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder={job.budget.type === 'fixed' ? 'Total amount' : 'Rate per hour'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Duration
                </label>
                <div className="mt-1">
                  <select
                    required
                    value={proposalData.estimatedDuration}
                    onChange={(e) => setProposalData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select duration</option>
                    <option value="less-than-1-week">Less than 1 week</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="more-than-6-months">More than 6 months</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setProposalData(prev => ({ ...prev, attachments: files }));
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload relevant work samples or documents (optional)
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                leftIcon={<Send size={18} />}
              >
                Submit Proposal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;