import { useEffect } from 'react';

const ConfidentialitePage = () => {
  useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div id="top" className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
      <p className="text-sm text-gray-500 mb-6">Travay Pam – Dernière mise à jour : 16/05/2025</p>

      <p className="mb-4">
        Chez Travay Pam, nous accordons une grande importance à la protection de vos données personnelles.
        Cette politique vise à vous informer de manière claire sur la manière dont vos informations sont
        collectées, utilisées, stockées et protégées.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Données collectées</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Données d’identification : nom, prénom, adresse courriel, numéro de téléphone, etc.</li>
        <li>Données d’usage : historique des connexions, pages visitées, temps passé, etc.</li>
        <li>Données transactionnelles : montants échangés, dates des paiements, détails des prestations.</li>
        <li>Données techniques : adresse IP, type de navigateur, système d’exploitation.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Finalité de la collecte</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Faciliter la mise en relation entre clients et freelancers ;</li>
        <li>Assurer la sécurité de la plateforme et prévenir les abus ou comportements frauduleux ;</li>
        <li>Contacter un utilisateur en cas d’incident ou de conflit ;</li>
        <li>Analyser et améliorer les services proposés ;</li>
        <li>Répondre aux obligations légales ou sur demande des autorités compétentes.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Partage des données</h2>
      <p className="mb-4">
        Travay Pam ne vend, ne loue, ni ne communique vos données à des tiers à des fins commerciales.
        Vos informations peuvent toutefois être partagées avec :
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Les autorités légales si la loi l’exige ;</li>
        <li>
          Des prestataires de services techniques (hébergement, sécurité, paiement), uniquement dans la
          mesure nécessaire à leur mission ;
        </li>
        <li>
          D’autres utilisateurs dans le cadre du fonctionnement normal du site (par exemple, lorsqu’un
          client contacte un freelancer ou vice versa).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Sécurité des données</h2>
      <p className="mb-4">
        Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos
        données contre tout accès non autorisé, altération ou destruction.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Durée de conservation</h2>
      <p className="mb-4">
        Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des finalités
        pour lesquelles elles ont été collectées, et au maximum pour les délais légaux applicables.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Vos droits</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Droit d’accès à vos données ;</li>
        <li>Droit de rectification en cas d’erreur ou de mise à jour ;</li>
        <li>Droit à la suppression (dans certaines limites légales) ;</li>
        <li>Droit d’opposition au traitement dans certains cas.</li>
      </ul>
      <p className="mb-4">
        Pour exercer ces droits, vous pouvez nous contacter à : <strong>[adresse courriel à ajouter]</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Utilisation des cookies</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Améliorer votre navigation ;</li>
        <li>Mémoriser vos préférences ;</li>
        <li>Analyser le trafic et les performances du site.</li>
      </ul>
      <p className="mb-4">
        Vous pouvez gérer ou désactiver les cookies via les paramètres de votre navigateur.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Modifications de la politique</h2>
      <p className="mb-4">
        Cette politique peut être modifiée à tout moment. En cas de mise à jour importante, les utilisateurs
        seront informés via le site ou par courriel.
      </p>
    </div>
  );
};

export default ConfidentialitePage;
