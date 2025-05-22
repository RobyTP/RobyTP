// src/pages/ConditionsUtilisation.jsx
import { useEffect } from 'react';

const ConditionsUtilisation = () => {
  useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div id="top" className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Conditions d’utilisation</h1>
      <p className="mb-6 text-sm text-gray-500">Dernière mise à jour : 16/05/2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Objectif de Travay Pam</h2>
        <p>
          Notre site a pour objectif de mettre en relation des clients et des freelancers dans un cadre de prestation
          de services. La plateforme agit uniquement comme intermédiaire, facilitant la communication et les transactions entre les parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Comportement des utilisateurs</h2>
        <ul className="list-disc list-inside">
          <li>Adopter un comportement respectueux dans leurs échanges, quel que soit le contexte ;</li>
          <li>
            Ne pas harceler, discriminer, menacer ou insulter d'autres utilisateurs, sous peine de sanctions, y
            compris la suspension ou la suppression du compte.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Utilisation des informations</h2>
        <p>
          Les informations que vous entrez sur le site (ex. : nom, prénom, courriel, adresse IP, etc.) peuvent être
          utilisées par l’équipe de gestion pour :
        </p>
        <ul className="list-disc list-inside">
          <li>Retrouver ou contacter un utilisateur (client ou freelancer) en cas d’incident ou de comportement suspect ;</li>
          <li>Répondre à des obligations légales, à la demande des autorités compétentes.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Responsabilité des transactions</h2>
        <p>
          Le site n’intervient pas dans la validation des transactions entre utilisateurs. En aucun cas, les
          propriétaires du site ne pourront être tenus responsables du non-remboursement d’une somme versée, même en
          cas de travail non effectué.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Rôle de la plateforme</h2>
        <p>
          Le site est un outil de mise en relation. Il ne garantit ni la qualité des services, ni l’issue des
          transactions. Aucune responsabilité ne pourra être imputée à l’équipe du site pour tout litige ou dommage.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Frais et commissions</h2>
        <p>
          Une commission est prélevée par le site sur toutes les transactions. Les modalités exactes seront précisées
          dans la section Tarification, FAQ ou Politique de paiement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Modifications des conditions</h2>
        <p>
          Cette page peut être modifiée à tout moment. Toute modification prend effet dès sa publication. Il est de
          votre responsabilité de consulter régulièrement les conditions en vigueur.
        </p>
      </section>
    </div>
  );
};

export default ConditionsUtilisation;
