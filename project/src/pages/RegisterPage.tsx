import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase, ArrowRight, Mail, Lock, UserCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer' as 'freelancer' | 'client'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: 'freelancer' | 'client') => {
    setFormData(prev => ({ ...prev, userType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        userType: formData.userType
      };
      
      const success = await register(userData, formData.password, formData.userType);
      
      if (success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Join FreelanceHub to find great opportunities
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Account Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to...
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('freelancer')}
                className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
                  formData.userType === 'freelancer'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <User className={`h-6 w-6 mx-auto ${
                    formData.userType === 'freelancer' ? 'text-blue-500' : 'text-gray-500'
                  }`} />
                  <span className="block mt-2 font-medium">Find Work</span>
                  <span className="text-xs mt-1 block text-gray-500">I'm a freelancer</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleUserTypeChange('client')}
                className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
                  formData.userType === 'client'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <Briefcase className={`h-6 w-6 mx-auto ${
                    formData.userType === 'client' ? 'text-blue-500' : 'text-gray-500'
                  }`} />
                  <span className="block mt-2 font-medium">Hire Talent</span>
                  <span className="text-xs mt-1 block text-gray-500">I'm a client</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight size={18} />}
            >
              Create Account
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-4">
            By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;