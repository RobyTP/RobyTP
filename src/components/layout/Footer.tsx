import monlogo from "../../assets/monlogo.png";
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <img src={monlogo} alt="Logo Travay Pam" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">Travay Pam</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              La plateforme leader pour les freelances et les clients qui collaborent sur des projets. Trouvez des talents ou travaillez sur ce que vous aimez.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Pour les Clients</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/freelancers" className="text-gray-400 hover:text-white text-sm">
                  Trouver des Freelances
                </Link>
              </li>
              <li>
                <Link to="/jobs/post" className="text-gray-400 hover:text-white text-sm">
                  Publier une Mission
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Comment Recruter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Témoignages
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Pour les Freelances</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white text-sm">
                  Trouver du Travail
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Créer un Profil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Tests de Compétences
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Ressources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Aide & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  <Link to="/conditions-utilisation#top" className="text-gray-400 hover:text-white text-sm">
                    Conditions d’utilisation
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  <Link to="/confidentialite#top" className="text-gray-400 hover:text-white text-sm">
                    Politique de confidentialité
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Travay Pam. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;