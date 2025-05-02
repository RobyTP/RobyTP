import monlogo from "../../assets/monlogo.png";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, MessageSquare, LogOut, Search, Bell } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
            <img src={monlogo} alt="Logo" className="h-10 w-auto" />              
            <span className="ml-2 text-xl font-bold text-gray-900">Travay Pam</span>
            </Link>
          </div>

          {/* Navigation Bureau */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Trouver des Missions
            </Link>
            <Link to="/freelancers" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Trouver des Freelances
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Tableau de Bord
                </Link>
                <Link to="/messages" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Messages
                </Link>
              </>
            )}
          </nav>

          {/* Section Droite Bureau */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative flex items-center">
                <button className="p-1 rounded-full text-gray-500 hover:text-green-600 focus:outline-none">
                  <Bell size={20} />
                </button>
                <div className="ml-4 flex items-center">
                  <div className="relative group">
                    <button className="flex items-center focus:outline-none">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                      />
                      <span className="ml-2 font-medium">{currentUser?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Tableau de Bord
                      </Link>
                      <Link to={`/${currentUser?.userType}s/${currentUser?.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profil
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Se Connecter</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">S'inscrire</Button>
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Trouver des Missions
            </Link>
            <Link
              to="/freelancers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Trouver des Freelances
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de Bord
                </Link>
                <Link
                  to="/messages"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-4">
                  <Link
                    to={`/${currentUser?.userType}s/${currentUser?.id}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se Connecter
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;