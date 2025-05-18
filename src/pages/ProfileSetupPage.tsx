import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Globe, DollarSign } from 'lucide-react';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

const ProfileSetupPage: React.FC = () => {
  const { currentUser, updateProfile } = useUser();
  const navigate = useNavigate();
  const isFreelancer = currentUser?.userType === 'freelancer';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skills: '',
    hourlyRate: '',
    company: '',
    website: '',
    industry: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const profileData = isFreelancer ? {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        hourlyRate: parseFloat(formData.hourlyRate),
      } : {
        company: formData.company,
        industry: formData.industry,
        website: formData.website,
        location: formData.location,
        description: formData.description,
      };

      await updateProfile(profileData);
      toast.success('Profil configuré avec succès !');

      // Redirection selon le type d'utilisateur
      if (isFreelancer) {
        navigate('/jobs'); // Vers la recherche d'emplois
      } else {
        navigate('/jobs/post'); // Vers la création d'annonce
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la configuration du profil');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isFreelancer ? 'Configurez votre profil freelance' : 'Configurez votre profil entreprise'}
            </h1>
            <p className="mt-2 text-gray-600">
              {isFreelancer 
                ? 'Complétez votre profil pour commencer à trouver des missions'
                : 'Complétez votre profil pour commencer à publier des missions'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isFreelancer ? (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre professionnel
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="ex: Développeur Full Stack"
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    Compétences (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="ex: React, Node.js, TypeScript"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Taux horaire (€)
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      required
                      min="0"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      placeholder="50"
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Nom de l'entreprise
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Secteur d'activité
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Site web
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Localisation
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="ex: Paris, France"
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                {isFreelancer ? 'Description professionnelle' : 'Description de l\'entreprise'}
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder={isFreelancer 
                  ? "Décrivez votre expérience et vos domaines d'expertise..."
                  : "Décrivez votre entreprise et vos besoins en talents..."}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
              >
                {isFreelancer ? 'Commencer à chercher des missions' : 'Commencer à publier des missions'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;