import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import '../css/TpiDisplay.css';

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

// Cette fonction modifie le texte d'entrée en transformant la première lettre en majuscule
// et en ajoutant le mot "le" après le jour en texte lisible.
const capitalize = (str) => {
  const firstSpaceIndex = str.indexOf(' ');

  if (firstSpaceIndex !== -1) {
    str = str.replace(' ', ' le, ');
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const TPI = {
  candidat_prenom: '',
  candidat_nom: '',
  expert1_prenom: '',
  expert1_nom: '',
  expert2_prenom: '',
  expert2_nom: '',
  chef_de_projet_prenom: '',
  chef_de_projet_nom: '',
};

const TpiCard = ({ index, handleDrop }) => {
    
  const [tpiValues, setTpiValues] = useState(TPI);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tpi',
    item: { tpi: TPI, index },

    end: (item, monitor) => {
      console.log("le contenu de item : "+item.index +" le contenu du tpi : "+item.tpi );
      console.log("le contenu de monitor : "+monitor);
      const dropResult = monitor.getDropResult();
      console.log("Résultat de drop : "+dropResult);
      if (item && dropResult) {
        handleDrop(dropResult.index, item.tpi, item.index);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  // Génère un formulaire HTML pour saisir les informations TPI.
  const inputTpi = (placeholder, value, field) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleInputChange(event, field)}
      />
    );
  };
  
  // Met à jour les informations saisies en temps réel par l'utilisateur.
  const handleInputChange = (event, field) => {
    const updatedTpi = { ...tpiValues, [field]: event.target.value };
    setTpiValues(updatedTpi);
  };

  // Renvoie une TPI card formatée en HTML+CSS, l'élément principal de notre planning.
  return (
    <div ref={drag} className="tpiCard" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="candidat">
        {inputTpi("Candidat Prénom", tpiValues.candidat_prenom, 'candidat_prenom')}
        {inputTpi("Candidat Nom", tpiValues.candidat_nom, 'candidat_nom')}
      </div>
      <div className="expert1">
        {inputTpi("Exp 1 Prénom", tpiValues.expert1_prenom, 'expert1_prenom')}
        {inputTpi("Exp 1 Nom", tpiValues.expert1_nom, 'expert1_nom')}
      </div>
      <div className="expert2">
        {inputTpi("Exp 2 Prénom", tpiValues.expert2_prenom, 'expert2_prenom')}
        {inputTpi("Exp 2 nom", tpiValues.expert2_nom, 'expert2_nom')}
      </div>
      <div className="chefDeProjet">
        {inputTpi("CdP Prénom", tpiValues.chef_de_projet_prenom, 'chef_de_projet_prenom')}
        {inputTpi("CdP Nom", tpiValues.chef_de_projet_nom, 'chef_de_projet_nom')}
      </div>
    </div>
  );
};

const TpiSlot = ({ tpi, index, handleDrop, handleDrag }) => {
  
  // Permet de recevoir un TPI et extrait l'état isOver du hook useDrop.
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tpi',
    drop: () => ({ index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const isActive = isOver;

  return (
    <div ref={drop} className={`tpiSlot ${isActive ? 'active' : ''}`}>
      {tpi ? (
        <TpiCard
          tpi={tpi}
          index={index}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      ) : "erreur : pas de tpiCard"}
    </div>
  );
};

// Fonction principale qui envoie le planning et toutes les fonctions nécessaires pour l'édition des TPIs.
const TpiDisplay = ({ creneaux, primaryColor, candidateColor, backgroundColor }) => {

  const [nombreDeSalles, setNombreDeSalles] = useState(0);
  const [tpis, setTpis] = useState([]);

  console.log(tpis);  

  const handleDrop = (salleIndex) => {
    return (item, draggedIndex) => {
      const draggedTpi = item.tpi;
      const updatedTpis = [...tpis];

      if (updatedTpis[salleIndex]?.tpi) {
        const previousIndex = updatedTpis.findIndex((tpi) => tpi.tpi === draggedTpi);
        updatedTpis[previousIndex].tpi = null;
      }

      updatedTpis[salleIndex].tpi = draggedTpi;

      // Swap the slots
      const temp = updatedTpis[draggedIndex].tpi;
      updatedTpis[draggedIndex].tpi = updatedTpis[salleIndex].tpi;
      updatedTpis[salleIndex].tpi = temp;

      setTpis(updatedTpis);
    };
  };

  const handleDrag = (salleIndex) => {
    return () => {
      const updatedTpis = [...tpis];
      updatedTpis[salleIndex].tpi = null;
      setTpis(updatedTpis);
    };
  };

  const display_time = (time) => {
    return time.slice(0, 5);
  };

  const customStyles = {
    '--primary-color': primaryColor,
    '--candidate-color': candidateColor,
    '--content-color': backgroundColor,
  };

  const handleAddSalle = () => {
    setNombreDeSalles(nombreDeSalles + 1);
  };

  const handleSaveSalle = () => {};

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <table className="content-table">
          <tbody>
            <tr>
              {Array.from({ length: nombreDeSalles + 1 }).map((_, salleIndex) => (
                <td className="content" style={customStyles} key={salleIndex}>
                  <div className="date">
                    {capitalize(
                      format(new Date("2023-06-17"), 'EEEE d MMMM', {
                        locale: frLocale,
                      })
                    )}
                  </div>
                  <div className="creneaux">
                    <div className="whiteSalle"></div>
                    <div className="salle">A23</div>

                    {creneaux.map((creneau, creneauIndex) => (

                      <React.Fragment key={creneauIndex}>
                        <div className="horaires">
                          <div className="start">{display_time(creneau.debut)}</div>
                          <div className="end">{display_time(creneau.fin)}</div>
                        </div>

                        <div className="zone2"></div>

                        <div className="tpis">
                        { 
                        (()=> { const key = `${salleIndex} - ${creneauIndex}`; 
                        console.log(key);
                        return (
                          <TpiSlot
                            tpi={true}
                            index={key}
                            handleDrop={handleDrop(key)}
                            handleDrag={handleDrag(key)}
                          />)
                        })()
                      }
                        </div>

                        <div className="breakRow"></div>
                      </React.Fragment>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div>
          <input type="button" className="addButton" title="Ajouter une salle" value="+" onClick={handleAddSalle} />
          <input type="button" className="saveButton" title="Sauvegarder les données" value="Enregistrer" onClick={handleSaveSalle} />
        </div>
      </div>
    </DndProvider>
  );
};

export default TpiDisplay;
