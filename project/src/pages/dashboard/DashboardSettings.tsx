import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import Button from '../../components/common/Button';
import { Save, Mail, Lock, User, Briefcase, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const DashboardSettings: React.FC = () => {
  const { currentUser } = useUser();
  const isFreelancer = currentUser?.userType === 'freelancer';
  
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state for profile settings
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    title: isFreelancer ? (currentUser as any)?.title || '' : '',
    description: currentUser?.userType === 'freelancer'
      ? (currentUser as any)?.description || ''
      : (currentUser as any)?.description || '',
    company: !isFreelancer ? (currentUser as any)?.company || '' : '',
    location: 'New York, USA', // Placeholder
    website: !isFreelancer ? (currentUser as any)?.website || '' : '',
    skills: isFreelancer ? (currentUser as any)?.skills?.join(', ') || '' : '',
    hourlyRate: isFreelancer ? (currentUser as any)?.hourlyRate || '' : ''
  });
  
  // Form state for account settings
  const [accountForm, setAccountForm] = useState({
    email: currentUser?.email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Form state for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailMessages: true,
    emailProposals: true,
    emailJobs: true,
    emailPayments: true,
    emailMarketing: false
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accountForm.newPassword !== accountForm.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Account settings updated successfully!');
      setIsLoading(false);
      setAccountForm(prev => ({
        ...prev,
        password: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 1000);
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Notification preferences updated!');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'account'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button 
              className={`pb-3 px-1 ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
          </nav>
        </div>
      </div>
      
      <div className="p-6">
        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Profile avatar */}
              <div>
                <div className="text-center">
                  <img
                    src={currentUser?.avatar || 'https://via.placeholder.com/150'}
                    alt={currentUser?.name}
                    className="h-40 w-40 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Visibility</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Control how your profile appears to other users on the platform.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="public_profile"
                          name="public_profile"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="public_profile" className="font-medium text-gray-700">Public profile</label>
                        <p className="text-gray-500">Your profile is visible to everyone</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="show_earnings"
                          name="show_earnings"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="show_earnings" className="font-medium text-gray-700">Show earnings</label>
                        <p className="text-gray-500">Display your earnings on your profile</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - Profile information */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    {isFreelancer ? (
                      <div className="col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Professional Title
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={profileForm.title}
                            onChange={handleProfileChange}
                            className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Full Stack Developer"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                          Company Name
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={profileForm.company}
                            onChange={handleProfileChange}
                            className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={profileForm.location}
                          onChange={handleProfileChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    {!isFreelancer && (
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={profileForm.website}
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    {isFreelancer ? 'Professional Overview' : 'Company Description'}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={profileForm.description}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={isFreelancer 
                      ? "Describe your experience, skills, and expertise..."
                      : "Tell us about your company, projects, and what you're looking for..."
                    }
                  />
                </div>
                
                {isFreelancer && (
                  <>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={profileForm.skills}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. JavaScript, React, Node.js"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                        Hourly Rate (USD)
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="hourlyRate"
                          name="hourlyRate"
                          value={profileForm.hourlyRate}
                          onChange={handleProfileChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      leftIcon={<Save size={18} />}
                      isLoading={isLoading}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        
        {/* Account Settings */}
        {activeTab === 'account' && (
          <form onSubmit={handleAccountSubmit}>
            <div className="max-w-xl mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={accountForm.email}
                      onChange={handleAccountChange}
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={accountForm.password}
                          onChange={handleAccountChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={accountForm.newPassword}
                          onChange={handleAccountChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={accountForm.confirmPassword}
                          onChange={handleAccountChange}
                          className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
                  
                  <div className="bg-red-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            Permanently delete your account and all of your content. This action is irreversible.
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button variant="danger" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      leftIcon={<Save size={18} />}
                      isLoading={isLoading}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        
        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationSubmit}>
            <div className="max-w-xl mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailMessages"
                      name="emailMessages"
                      type="checkbox"
                      checked={notificationSettings.emailMessages}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailMessages" className="font-medium text-gray-700">Messages</label>
                    <p className="text-gray-500">Receive email notifications when you get a new message</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailProposals"
                      name="emailProposals"
                      type="checkbox"
                      checked={notificationSettings.emailProposals}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailProposals" className="font-medium text-gray-700">
                      {isFreelancer ? 'Proposal Status' : 'New Proposals'}
                    </label>
                    <p className="text-gray-500">
                      {isFreelancer 
                        ? 'Receive email notifications when your proposal status changes'
                        : 'Receive email notifications when you get new proposals on your jobs'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailJobs"
                      name="emailJobs"
                      type="checkbox"
                      checked={notificationSettings.emailJobs}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailJobs" className="font-medium text-gray-700">
                      {isFreelancer ? 'Job Recommendations' : 'Job Status Updates'}
                    </label>
                    <p className="text-gray-500">
                      {isFreelancer 
                        ? 'Receive email notifications about jobs that match your skills'
                        : 'Receive email notifications when there are updates to your posted jobs'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailPayments"
                      name="emailPayments"
                      type="checkbox"
                      checked={notificationSettings.emailPayments}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailPayments" className="font-medium text-gray-700">Payment Updates</label>
                    <p className="text-gray-500">Receive email notifications about payments and transactions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailMarketing"
                      name="emailMarketing"
                      type="checkbox"
                      checked={notificationSettings.emailMarketing}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailMarketing" className="font-medium text-gray-700">Marketing</label>
                    <p className="text-gray-500">Receive emails about promotions, news, and platform updates</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    leftIcon={<Save size={18} />}
                    isLoading={isLoading}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DashboardSettings;