import React from 'react';
import '../css/Page-Container.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="title">TPI Central Hub</h1>
      <p className="subtitle">La Plateforme Centrale pour la Gestion de vos Travaux Pratiques Individuels</p>
      <div className="content">
        <p className="description">Bienvenue sur TPI Central Hub, votre solution complète pour simplifier et optimiser la gestion de vos Travaux Pratiques Individuels. Notre plateforme vous permet de gérer tous les aspects de vos travaux pratiques de manière efficace et intuitive.</p>

        <div className="features">
          <h2 className="features-title">Fonctionnalités clés :</h2>
          <ul className="features-list">
            <li>Suivi des TPI : Suivez facilement l'avancement de vos travaux pratiques individuels, en un coup d'œil. Visualisez les tâches accomplies, les échéances à venir et gardez le contrôle sur votre progression.</li>
            <li>Planning intégré : Consultez et gérez votre planning de travaux pratiques directement depuis notre application. Ne manquez aucune échéance importante et organisez votre emploi du temps avec simplicité.</li>
            <li>Inscriptions simplifiées : Inscrivez-vous rapidement aux projets, attribuez les experts, les candidats et les chefs de projets de manière fluide. Notre système de gestion des inscriptions facilite la coordination et la communication entre les parties prenantes.</li>
            <li>Gestion du journal de travail : Tenez un journal de travail détaillé pour enregistrer vos activités, vos réflexions et vos progrès tout au long de vos TPI. Analysez votre travail et prenez des décisions éclairées pour améliorer vos performances.</li>
            <li>Collaboration optimisée : Travaillez en équipe de manière transparente. Communiquez avec les membres du projet, partagez des fichiers, discutez des idées et collaborez efficacement pour atteindre vos objectifs.</li>
            <li>Personnalisation avancée : Adaptez l'interface à vos besoins et préférences. Personnalisez votre tableau de bord, organisez vos tâches et configurez des rappels pour rester toujours à jour.</li>
          </ul>
        </div>

        <p className="description">Notre équipe dévouée est là pour vous accompagner à chaque étape. Nous croyons en l'importance de simplifier la gestion des TPI, afin que vous puissiez vous concentrer sur l'essentiel : votre réussite académique.</p>

        <p className="description">Inscrivez-vous dès aujourd'hui à TPI Central Hub et découvrez une nouvelle manière de gérer vos Travaux Pratiques Individuels de façon efficace et centrée sur vos besoins.</p>

        <button className="cta-button">Inscrivez-vous maintenant !</button>
      </div>
    </div>
  );
};

export default HomePage;
