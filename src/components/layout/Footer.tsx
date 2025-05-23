import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import monlogo from '../../assets/monlogo.png';

const Footer: React.FC = () => {
  const user = null;
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError("Veuillez entrer votre adresse email.");
      setSuccess(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Adresse email invalide.");
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setError('');
    setEmail('');
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <footer className="bg-[#333333] text-white relative">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center">
              <img src={monlogo} alt="Logo Travay Pam" className="h-10 w-auto" />
              <span className="ml-3 text-xl font-bold text-white">Travay Pam</span>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Plateforme pour freelances et clients collaborant sur des projets. Trouvez un talent ou faites ce que vous aimez.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#"><Facebook className="h-5 w-5 hover:text-white" /></a>
              <a href="#"><Twitter className="h-5 w-5 hover:text-white" /></a>
              <a href="#"><Linkedin className="h-5 w-5 hover:text-white" /></a>
              <a href="#"><Github className="h-5 w-5 hover:text-white" /></a>
            </div>
          </div>

          {/* Clients */}
          {!user && (
            <div>
              <h3 className="text-sm font-semibold uppercase">Clients</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/freelancers" className="text-white/80 hover:text-white text-sm">Trouver des Freelances</Link></li>
                <li><Link to="/jobs/post" className="text-white/80 hover:text-white text-sm">Publier une Mission</Link></li>
              </ul>
            </div>
          )}

          {/* Freelances */}
          {!user && (
            <div>
              <h3 className="text-sm font-semibold uppercase">Freelances</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/jobs" className="text-white/80 hover:text-white text-sm">Trouver du Travail</Link></li>
                <li><Link to="/create-profile" className="text-white/80 hover:text-white text-sm">Créer un Profil</Link></li>
              </ul>
            </div>
          )}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase">Newsletter</h3>
            <p className="mt-4 text-sm text-white/80">
              Recevez les dernières missions et actus directement par mail. Restez connecté à la communauté.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full px-3 py-2 rounded-md text-black placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-[#333333] font-semibold rounded-md hover:bg-gray-100 transition"
              >
                S’abonner
              </button>
            </form>
            {error && (
              <p role="alert" aria-live="assertive" className="mt-2 text-sm text-red-400 animate-pulse">{error}</p>
            )}
          </div>
        </div>

        {/* Popup de succès */}
        {success && (
          <div
            role="alert"
            aria-live="polite"
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in"
          >
            ✅ Vous êtes inscrit à la newsletter !
          </div>
        )}
      </div>

      {/* Barre légale modifiée */}
      <div className="bg-[#2A2A2A] py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm text-white/90">
          <p className="text-white/90">
            &copy; 2025 Travay Pam. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/support" className="hover:text-white">Aide & Support</Link>
            <Link to="/terms" className="hover:text-white">Conditions d'Utilisation</Link>
            <Link to="/privacy" className="hover:text-white">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
