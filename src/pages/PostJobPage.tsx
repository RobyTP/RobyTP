import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign } from 'lucide-react';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { categoriesList, skillsList } from '../data/mockData';

const PostJobPage: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    budgetType: 'fixed',
    budgetAmount: '',
    experience: 'intermediate',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulation de la création d'une mission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Mission publiée avec succès !');
      navigate('/dashboard/jobs');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la publication de la mission');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Publier une nouvelle mission</h1>
            <p className="mt-2 text-gray-600">
              Décrivez votre projet pour trouver le talent idéal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre de la mission
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
                  placeholder="ex: Développement d'une application web React"
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categoriesList.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description détaillée
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez les objectifs, les livrables attendus et les exigences spécifiques de votre projet..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Compétences requises (séparées par des virgules)
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
              <div className="mt-2 flex flex-wrap gap-2">
                {skillsList.slice(0, 8).map((skill, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      const currentSkills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
                      if (!currentSkills.includes(skill)) {
                        setFormData(prev => ({
                          ...prev,
                          skills: prev.skills ? `${prev.skills}, ${skill}` : skill
                        }));
                      }
                    }}
                    className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budgetType" className="block text-sm font-medium text-gray-700">
                  Type de budget
                </label>
                <select
                  id="budgetType"
                  name="budgetType"
                  required
                  value={formData.budgetType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="fixed">Prix fixe</option>
                  <option value="hourly">Taux horaire</option>
                </select>
              </div>

              <div>
                <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                  {formData.budgetType === 'fixed' ? 'Budget total (€)' : 'Taux horaire (€)'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="budgetAmount"
                    name="budgetAmount"
                    required
                    min="0"
                    value={formData.budgetAmount}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Niveau d'expérience requis
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="entry">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Date limite de candidature
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
              >
                Publier la mission
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;