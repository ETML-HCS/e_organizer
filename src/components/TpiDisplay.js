  import '../css/TpiDisplay.css';

  import React, { useState, createContext, useContext, useEffect } from 'react';
  import { DndProvider, useDrag, useDrop } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';

  import { format } from 'date-fns';
  import frLocale from 'date-fns/locale/fr';

  let tpiNumber = -1;

  // Function to generate unique ID
  const generateUniqueId = () => {
    tpiNumber++;
    return tpiNumber;
  };

  const createNewTPI = () => {
    return {
      id: generateUniqueId(),
      candidateFirstName: '',
      candidateLastName: '',
      expert1FirstName: '',
      expert1LastName: '',
      expert2FirstName: '',
      expert2LastName: '',
      projectManagerFirstName: '',
      projectManagerLastName: '',
    };
  };

  // Component to input information and drag a TPI card
  const TpiCard = ({ tpiData, setTpiCardValues, roomIndex, timeSlotIndex }) => {

    console.log("Dans la fonction TpiCard tpiData: ", setTpiCardValues);

    const updateTpiCardValues = (roomIndex, timeSlotIndex, updatedFields) => {
      setTpiCardValues((prevTpiCardValues) => {
        const newTpiCardValues = [...prevTpiCardValues];
        const updatedTpi = { ...newTpiCardValues[roomIndex][timeSlotIndex], ...updatedFields };
        newTpiCardValues[roomIndex][timeSlotIndex] = updatedTpi;
        return newTpiCardValues;
      });
    };
    
    const handleInputChange = (event, field) => {
      const updatedFields = {
        [field]: event.target.value,
      };
      updateTpiCardValues(roomIndex, timeSlotIndex, updatedFields);
    };
    
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

    return (
      <div className="tpiCard">
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
  };


  const TpiSlot = ({ tpiData, setTpiCardValues, roomIndex, timeSlotIndex, onDrop }) => {

    console.log(tpiData);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'tpi',
      drop: (item, monitor) => {
        const tpiData = monitor.getItem().item;
        onDrop(item, roomIndex, timeSlotIndex, tpiData);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div ref={drop} className={`tpiSlot${isOver ? 'active' : ''}`}>
        <TpiCard
          roomIndex={roomIndex}
          timeSlotIndex={timeSlotIndex}
          tpiData={tpiData}
          setTpiCardValues={setTpiCardValues}
        />
      </div>
    );
  };

  // Main function that sends the planning and all the necessary functions for editing TPIs.
  const TpiDisplay = ({ timeSlots, primaryColor, candidateColor, backgroundColor }) => {

    // il s'agit du nombre de salle affiché et traité à l'écran
    const [roomCount, setRoomCount] = useState(0);

    let tpiList = [];

    for (let j = 0; j < roomCount + 1; j++) {
      tpiList[j] = [];
      for (let i = 0; i < timeSlots.length; i++) {
        const newTpi = createNewTPI();
        tpiList[j][i] = newTpi;
      }
    }

    // props contient tous les données des différents tpi (idée [Salle][Creneau])
    const [tpiCardValues, setTpiCardValues] = useState(tpiList);

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

    // fonction lorsqu'un tpi est déplacé
    const handleDrop = (item, roomIndex, timeSlotIndex, tpiData) => {
      console.log("valeur de item: ", item, " val d'index : ", roomIndex, " val tpidata: ", tpiData);
      console.log("Updated tpiCardValues:", tpiCardValues);
    };

    // fonction qui ajout une salle
    const handleAddRoom = () => {
      setRoomCount(roomCount + 1);
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
                {Array.from({ length: roomCount + 1 }).map((_, roomIndex) => (
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
                            <React.Fragment key={timeSlotIndex}>
                              <div className="schedule">
                                <div className="start">{displayTime(timeSlot.start)}</div>
                                <div className="end">{displayTime(timeSlot.end)}</div>
                              </div>

                              <div className="zone2"></div>
                              {/* Emplacement du tpiData */}
                              <div className="tpis">
                                <TpiSlot
                                  roomIndex={roomIndex}
                                  timeSlotIndex={timeSlotIndex}
                                  onDrop={handleDrop}
                                  tpiData={tpiCardValues[roomIndex][timeSlotIndex]}
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
  };

  export default TpiDisplay;
