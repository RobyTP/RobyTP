import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, show available logins from mock data
  const demoLogins = [
    { type: 'Freelancer', email: 'sophie.martin@example.com' },
    { type: 'Client', email: 'david.muller@techcorp.com' }
  ];

  const setDemoLogin = (email: string) => {
    setEmail(email);
    setPassword('password'); // Any password works in the demo
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
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
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Demo accounts info */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-500 text-center mb-4">
            Demo accounts (click to use)
          </h3>
          <div className="space-y-2">
            {demoLogins.map((demo, index) => (
              <button
                key={index}
                className="flex justify-between w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setDemoLogin(demo.email)}
              >
                <span className="font-medium">{demo.type}</span>
                <span className="text-gray-500">{demo.email}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            For demo purposes, any password will work
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;