import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import FreelancerCard from '../components/freelancers/FreelancerCard';
import Button from '../components/common/Button';
import { Freelancer } from '../types';
import { mockFreelancers, skillsList } from '../data/mockData';

const FreelancersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRate, setSelectedRate] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const filteredFreelancers = mockFreelancers.filter(freelancer => {
    if (searchTerm && 
        !freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !freelancer.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (selectedRate) {
      const [min, max] = selectedRate.split('-').map(rate => parseInt(rate));
      if (max && (freelancer.hourlyRate < min || freelancer.hourlyRate > max)) {
        return false;
      } else if (!max && freelancer.hourlyRate < min) {
        return false;
      }
    }
    
    if (selectedAvailability && freelancer.availability !== selectedAvailability) {
      return false;
    }
    
    if (selectedSkills.length > 0) {
      const freelancerHasSelectedSkill = selectedSkills.some(skill => 
        freelancer.skills.includes(skill)
      );
      if (!freelancerHasSelectedSkill) {
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
    setSelectedRate('');
    setSelectedAvailability('');
    setSelectedSkills([]);
  };
  
  const hasActiveFilters = searchTerm || selectedRate || selectedAvailability || selectedSkills.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trouver des freelances</h1>
          <p className="text-gray-600 mt-2">Découvrez des professionnels talentueux pour votre prochain projet</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher des freelances..."
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
                    Taux horaire
                  </label>
                  <select
                    value={selectedRate}
                    onChange={(e) => setSelectedRate(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les taux</option>
                    <option value="10-30">10€ - 30€</option>
                    <option value="30-60">30€ - 60€</option>
                    <option value="60-100">60€ - 100€</option>
                    <option value="100">100€ et plus</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilité
                  </label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes disponibilités</option>
                    <option value="available">Disponible maintenant</option>
                    <option value="part-time">Temps partiel</option>
                    <option value="not-available">Non disponible</option>
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
            {filteredFreelancers.length} {filteredFreelancers.length === 1 ? 'freelance trouvé' : 'freelances trouvés'}
            {hasActiveFilters && ' avec les filtres actuels'}
          </p>
        </div>
        
        <div className="space-y-6">
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map(freelancer => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun freelance trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez d'ajuster vos filtres de recherche pour trouver plus de talents.
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

export default FreelancersPage;