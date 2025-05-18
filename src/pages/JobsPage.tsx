import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';
import Button from '../components/common/Button';
import { Job } from '../types';
import { mockJobs, skillsList, categoriesList } from '../data/mockData';

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedBudgetType, setSelectedBudgetType] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const filteredJobs = mockJobs.filter(job => {
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (selectedCategory && job.category !== selectedCategory) {
      return false;
    }
    
    if (selectedExperience && job.experience !== selectedExperience) {
      return false;
    }
    
    if (selectedBudgetType && job.budget.type !== selectedBudgetType) {
      return false;
    }
    
    if (selectedSkills.length > 0) {
      const jobHasSelectedSkill = selectedSkills.some(skill => 
        job.skills.includes(skill)
      );
      if (!jobHasSelectedSkill) {
        return false;
      }
    }
    
    return true;
  });
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedExperience('');
    setSelectedBudgetType('');
    setSelectedSkills([]);
  };
  
  const hasActiveFilters = searchTerm || selectedCategory || selectedExperience || 
                           selectedBudgetType || selectedSkills.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trouver des missions</h1>
          <p className="text-gray-600 mt-2">Parcourez les missions disponibles et trouvez votre prochaine opportunité</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher des missions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtres {hasActiveFilters && '•'}
              </button>
              
              <Button variant="primary">
                Rechercher
              </Button>
            </div>
          </div>
          
          {isFiltersOpen && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les catégories</option>
                    {categoriesList.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau d'expérience
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les niveaux</option>
                    <option value="entry">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de budget
                  </label>
                  <select
                    value={selectedBudgetType}
                    onChange={(e) => setSelectedBudgetType(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les types</option>
                    <option value="fixed">Prix fixe</option>
                    <option value="hourly">Taux horaire</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compétences
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillsList.slice(0, 15).map((skill, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedSkills.includes(skill)
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill} {selectedSkills.includes(skill) && <X className="inline h-3 w-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="mr-2"
                  >
                    Effacer les filtres
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'mission trouvée' : 'missions trouvées'}
            {hasActiveFilters && ' avec les filtres actuels'}
          </p>
        </div>
        
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune mission trouvée</h3>
              <p className="text-gray-600 mb-4">
                Essayez d'ajuster vos filtres de recherche ou revenez plus tard pour de nouvelles opportunités.
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Effacer les filtres
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;