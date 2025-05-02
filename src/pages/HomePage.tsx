import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Briefcase, Shield, CheckCircle, TrendingUp, Star } from 'lucide-react';
import Button from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { skillsList } from '../data/mockData';

const HomePage: React.FC = () => {
  const { isAuthenticated, currentUser } = useUser();
  
  const popularSkills = skillsList.slice(0, 8);
  
  return (
    <div>
      {/* Section Héro */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Trouvez les meilleurs <span className="text-blue-300">freelances</span> pour votre entreprise
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connectez-vous avec des freelances talentueux en quelques minutes. Gérez vos projets et paiements en toute confiance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  currentUser?.userType === 'client' ? (
                    <Link to="/freelancers">
                      <Button variant="secondary" size="lg" leftIcon={<Users size={20} />}>
                        Trouver des Talents
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/jobs">
                      <Button variant="secondary" size="lg" leftIcon={<Briefcase size={20} />}>
                        Trouver du Travail
                      </Button>
                    </Link>
                  )
                ) : (
                  <>
                    <Link to="/register" className="w-full sm:w-auto">
                      <Button variant="secondary" size="lg" fullWidth>
                        S'inscrire
                      </Button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                      <Button variant="outline" size="lg" fullWidth className="bg-white bg-opacity-10 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20">
                        Se Connecter
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              <div className="mt-8">
                <p className="text-blue-200 mb-2">Compétences populaires :</p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill, index) => (
                    <Link 
                      key={index} 
                      to={`/jobs?skill=${skill}`}
                      className="px-3 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full text-sm transition-colors duration-150"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg" 
                alt="Freelances collaborant" 
                className="rounded-lg shadow-xl object-cover h-96 w-full transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Comment ça marche */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça fonctionne</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple pour trouver le talent idéal pour votre projet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Publiez une Mission</h3>
              <p className="text-gray-600">
                Créez une annonce détaillée décrivant votre projet, vos exigences et votre budget. Soyez précis pour attirer les bons candidats.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <div className="bg-teal-100 text-teal-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sélectionnez un Talent</h3>
              <p className="text-gray-600">
                Examinez les propositions, les profils et les portfolios pour trouver le freelance parfait. Échangez avec les candidats pour discuter des détails.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <div className="bg-amber-100 text-amber-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Réalisez vos Projets</h3>
              <p className="text-gray-600">
                Travaillez avec votre freelance choisi à travers des étapes, communiquez efficacement et effectuez le paiement une fois satisfait.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" className="px-8">Commencer</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Section Catégories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Découvrez nos Catégories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Parcourez nos différentes catégories pour trouver les compétences dont vous avez besoin
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link to="/jobs?category=Web Development" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg" 
                  alt="Développement Web" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Développement Web</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Design" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg" 
                  alt="Design" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Design</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Writing" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg" 
                  alt="Rédaction" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Rédaction</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Marketing" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg" 
                  alt="Marketing" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Marketing</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Mobile Development" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg" 
                  alt="Développement Mobile" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Développement Mobile</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Data Science" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg" 
                  alt="Science des Données" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Science des Données</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs?category=Business" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg" 
                  alt="Business" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-medium text-lg">Business</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/jobs" className="group block">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg bg-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Search className="h-12 w-12 text-white mx-auto mb-2" />
                    <h3 className="text-white font-medium text-lg">Voir Toutes les Catégories</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Section Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Témoignages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients et freelances disent de leur expérience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="Avatar Client" 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-medium text-gray-900">Robert Johnson</h4>
                  <p className="text-gray-500 text-sm">PDG, TechStart</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Nous avons trouvé un développeur exceptionnel qui nous a aidé à lancer notre MVP en un temps record. La qualité des talents sur la plateforme est remarquable."
              </p>
              <div className="flex text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" 
                  alt="Avatar Freelance" 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-medium text-gray-900">Jessica Chen</h4>
                  <p className="text-gray-500 text-sm">Designer UX/UI</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "La plateforme a transformé ma carrière. Je peux maintenant travailler avec des clients du monde entier et avoir un contrôle total sur mon emploi du temps."
              </p>
              <div className="flex text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg" 
                  alt="Avatar Client" 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-medium text-gray-900">Mark Wilson</h4>
                  <p className="text-gray-500 text-sm">Directeur Marketing, GrowthCo</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Les rédacteurs que nous avons engagés nous ont aidés à doubler notre trafic organique. La plateforme facilite la recherche de talents spécialisés."
              </p>
              <div className="flex text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients et freelances qui réussissent déjà avec notre plateforme
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
            <Button
              size="lg"
              className="bg-green-600 text-white border border-transparent hover:bg-transparent hover:border-white hover:text-white px-8 transition-all duration-200"
            >
              Inscription Gratuite
            </Button>

            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8">
                Trouver des Talents
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-teal-200 text-sm">Aucune carte de crédit requise pour commencer</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;