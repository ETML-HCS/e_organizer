// #region imports
import '../css/TpiDisplay.css';

import React, { useState, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
//#endregion


let tpiNumber = -1;

// Function to generate unique ID

const generateUniqueId = () => {
  console.log(tpiNumber);
  tpiNumber++;
  return tpiNumber;
};

//#region Variables et constantes 
const createNewTPI = () => {
  return {
    tpi: {
      id: generateUniqueId(),
      candidateFirstName: '',
      candidateLastName: '',
      expert1FirstName: '',
      expert1LastName: '',
      expert2FirstName: '',
      expert2LastName: '',
      projectManagerFirstName: '',
      projectManagerLastName: '',
    }
  };
};


const InitListTPI = (nbrTimeSlots) => {
  let tpiList = useMemo(() => {
    const tempList = [];
    for (let i = 0; i < nbrTimeSlots; i++) {
      let newTpi = createNewTPI();
      tempList[i] = newTpi;
    }
    return tempList;
  }, [nbrTimeSlots]);

  return tpiList;
};

//#endregion


//#region Fonction TpiCard
const TpiCard = ({ tpiData, setTpiCardValues, index, onDrag }) => {

  //#region  callback change input text temps réel 
  
  const updateTpiCardValues = (index, updatedFields) => {  
    setTpiCardValues((prevTpiCardValues) => {
      const newTpiCardValues = [...prevTpiCardValues];
      const updatedTpi = {
        ...newTpiCardValues[index],
        ...updatedFields
      };
      newTpiCardValues[index] = updatedTpi;
      
      return newTpiCardValues;
    });
  };

  const handleInputChange = (event, field) => {
    const updatedFields = {
      [field]: event.target.value,
    };
    updateTpiCardValues(index, updatedFields);
  };
  //#endregion

  //#region Construction Input <Text>
  const inputTpi = (placeholder, value, field) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value || ''}
        onChange={(event) => handleInputChange(event, field)}
      />
    );
  };
  //#endregion

  //#region  Callback drag
  const [{ isDragging }, drag] = useDrag( () => ({
      type: 'tpi',
      item: { tpi: tpiData },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (tpi, monitor) => {

        if (monitor.didDrop()) {
          // Appel de la fonction onDrag avec l'index et les données de l'élément
          console.log("Callbag drag : ",index," val :",tpi);
          onDrag(index, tpi);
        }
      },
    }),
  );
  //#endregion

  //#region retour d'un rendu HTML+ClasseName d'un TPI  
  return (
    <div ref={drag} className={`tpiCard${isDragging ? 'dragging' : ''}`}>
      <div className="candidate">
        {inputTpi("Candidate First Name", tpiData.candidateFirstName, 'candidateFirstName')}
        {inputTpi("Candidate Last Name", tpiData.candidateLastName, 'candidateLastName')}
      </div>
      <div className="expert1">
        {inputTpi("Exp 1 First Name", tpiData.expert1FirstName, 'expert1FirstName')}
        {inputTpi("Exp 1 Last Name", tpiData.expert1LastName, 'expert1LastName')}
      </div>
      <div className="expert2">
        {inputTpi("Exp 2 First Name", tpiData.expert2FirstName, 'expert2FirstName')}
        {inputTpi("Exp 2 Last Name", tpiData.expert2LastName, 'expert2LastName')}
      </div>
      <div className="projectManager">
        {inputTpi("PM First Name", tpiData.projectManagerFirstName, 'projectManagerFirstName')}
        {inputTpi("PM Last Name", tpiData.projectManagerLastName, 'projectManagerLastName')}
      </div>
    </div>
  );
  //#endregion
};
//#endregion

const TpiSlot = ({ tpiData, setTpiCardValues, index, onDrop, onDrag }) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tpi',
    drop: () => {
      console.log("Callback Drop ",index," val de tpi : ",tpiData);
      onDrop(index, tpiData);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`tpiSlot${isOver ? 'active' : ''}`}>
      <TpiCard
        index={index}
        tpiData={tpiData}
        onDrag={onDrag}
        setTpiCardValues={setTpiCardValues}
      />
    </div>
  );
};

// Main function that sends the planning and all the necessary functions for editing TPIs.
const TpiDisplay = ({ timeSlots, primaryColor, candidateColor, backgroundColor }) => {

  // variables d'état pour l'échange entre deux tpi 
  const [tpiDataDropping, setTpiDataDropping] = useState(null);
  const [indexTpiDropping, setindexTpiDropping ] = useState(null);

  // il s'agit du nombre de salle affiché et traité à l'écran
  const [roomCount, setRoomCount] = useState(1);

  // props contient tous les données des différents tpi
  const [tpiCardValues, setTpiCardValues] = useState(InitListTPI(timeSlots.length));


  // personnalisation du thème
  const customStyles = {
    '--primary-color': primaryColor,
    '--candidate-color': candidateColor,
    '--content-color': backgroundColor,
  };

  // traitement de l'affichage des créneaux (exemple 09h50)
  const displayTime = (time) => {
    return time.slice(0, 5);
  };

  // traitement de l'affichage des dates (exemple Samedi, le 5 avril)
  const capitalize = (str) => {
    const firstSpaceIndex = str.indexOf(' ');

    if (firstSpaceIndex !== -1) {
      str = str.replace(' ', ', the ');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Fonction qui mémorise les données lorsque l'utilisateur attrappe un TPI 
  const handleDrag = (indexTpiDragging, tpiDataDragging) => {

    tpiCardValues.map((tpicard, i) => {
      console.log(`Valeur du champ tpicard ${i}:`, tpicard);
      return null; // Retourne null pour éviter un avertissement sur la clé de l'élément dans la boucle map
    });
    

    // copie des carte 
    let updatedTpiCardValues = [...tpiCardValues];

    console.log("index dropping : ", indexTpiDropping);

    updatedTpiCardValues[indexTpiDropping] = tpiDataDragging;

    setTpiCardValues(updatedTpiCardValues);

    console.log("Updated tpiCardValues after swap:", updatedTpiCardValues);
    console.log("index dst : ", indexTpiDragging, " src : ", indexTpiDropping, " tpiDest :", tpiDataDropping, "tpiSrc :", tpiDataDragging);
 
    //  // Réinitialiser les valeurs après le drop
    setTpiDataDropping(null);
    setindexTpiDropping(null);
  };
  

  // fonction lorsqu'un tpi est déplacé Drag and drop 
  const handleDrop = (indexTpiDropping, tpiDataDropping) => {

    setTpiDataDropping(tpiDataDropping);
    setindexTpiDropping(indexTpiDropping);

    console.log("Valeur à jour : ",tpiDataDropping, " index : ",indexTpiDropping);

  };
  

  // fonction qui ajout une salle
  const handleAddRoom = () => {
    setRoomCount(roomCount + 1);
    
    const tmp = [...tpiCardValues, ...InitListTPI(roomCount)];
    setTpiCardValues(tmp);
  };

  // fonction qui sauvegarde tout les données
  const handleSaveRoom = () => { };

  // affichage HTML + CSS
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <table className="content-table">
          <tbody>
            <tr>
              {Array.from({ length: roomCount }).map((_, roomIndex) => (
                <td className="content" style={customStyles} key={roomIndex}>
                  <div className="date">
                    {capitalize(
                      format(new Date("2023-06-17"), 'EEEE d MMMM', {
                        locale: frLocale,
                      })
                    )}
                  </div>
                  <div className="timeSlots">
                    <div className="whiteRoom"></div>
                    <div className="room">A23</div>
                    {/* boucle des créneaux, par défaut 8 */}
                    {
                      timeSlots.map((timeSlot, timeSlotIndex) => {

                        console.log("image de tpicardvalues : ", tpiCardValues);

                        return (
                          <React.Fragment key={(roomIndex * 8) + timeSlotIndex}>
                            <div className="schedule">
                              <div className="start">{displayTime(timeSlot.start)}</div>
                              <div className="end">{displayTime(timeSlot.end)}</div>
                            </div>

                            <div className="zone2"></div>
                            {/* Emplacement du tpiData */}
                            <div className="tpis">
                              <TpiSlot
                                index={(roomIndex * 8) + timeSlotIndex}
                                onDrop={handleDrop}
                                onDrag={handleDrag}
                                tpiData={tpiCardValues[(roomIndex * 8) + timeSlotIndex]}
                                setTpiCardValues={setTpiCardValues}
                              />
                            </div>
                            <div className="breakRow"></div>
                          </React.Fragment>
                        );
                      })}

                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div>
          <input type="button" className="addButton" title="Add a room" value="+" onClick={handleAddRoom} />
          <input type="button" className="saveButton" title="Save the data" value="Save" onClick={handleSaveRoom} />
        </div>
      </div>
    </DndProvider>
  );
}; export default TpiDisplay;
