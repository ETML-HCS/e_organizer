import '../css/TpiDisplay.css';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const CreateTpi = (idTpi) => {
  let tpi = {
    id: idTpi ?? -1,
    candidate: { firstName: '', lastName: '' },
    expert1: { firstName: '', lastName: '' },
    expert2: { firstName: '', lastName: '' },
    projectManager: { firstName: '', lastName: '' }
  };
  return tpi;
};

const TpiCard = ({ propsTpi, updateTpiData, indexRoom, indexTimeSlot }) => {

  const [isDragged, setIsDragged] = useState(false);


  const handleChange = (event, field, category) => {
    const updatedTpi = {
      ...propsTpi,
      [category]: {
        ...propsTpi[category],
        [field]: event.target.value
      }
    };
    updateTpiData(indexRoom, indexTimeSlot, updatedTpi);
  };

  const renderInput = (placeholder, value, field, category) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => handleChange(event, field, category)}
      />
    );
  };
  
  const handleDragStart = (event) => {
    
    setIsDragged(true);
    
    const setData = {indexRoom : indexRoom , indexTimeSlot: indexTimeSlot, tpiData : propsTpi};

    event.dataTransfer.setData('text/plain', JSON.stringify(setData));
    console.log("Dans handleDragStart : ", JSON.stringify(setData));
  };

  const handleDragEnd = (event) => {
    setIsDragged(false);
    console.log("Drag end ",event.target);
  };

  const { candidate, expert1, expert2, projectManager } = propsTpi;

  return (
    <React.Fragment >
      <div className={`TpiCard${isDragged ? '_dragged' : ''}`} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}

      draggable>
        <div className="candidate">
          {renderInput('First Name', candidate.firstName, 'firstName', 'candidate')}
          {renderInput('Last Name', candidate.lastName, 'lastName', 'candidate')}
        </div>
        <div className="expert1">
          {renderInput('First Name', expert1.firstName, 'firstName', 'expert1')}
          {renderInput('Last Name', expert1.lastName, 'lastName', 'expert1')}
        </div>
        <div className="expert2">
          {renderInput('First Name', expert2.firstName, 'firstName', 'expert2')}
          {renderInput('Last Name', expert2.lastName, 'lastName', 'expert2')}
        </div>
        <div className="projectManager">
          {renderInput('First Name', projectManager.firstName, 'firstName', 'projectManager')}
          {renderInput('Last Name', projectManager.lastName, 'lastName', 'projectManager')}
        </div>
      </div>
    </React.Fragment>
  );
};

// const TpiSlot = ({indexRoom,indexTimeSlot}) => {

//   console.log("TpiSlot : ", " room ",indexRoom, " timeSlot ", indexTimeSlot)

//   const isOver = true;
//   return (
//     <div className={`tpiSlot${isOver ? 'active' : ''}`}>

//     </div>
//   );
// };

/*************************************************************************************
 * Fonction principale: les propos sont des paramètres génériques 
 * @timeSlots = le nombre de «TPI» par salle (créneaux horaires)
 * @primaryColor = couleur principale de l’organisateur 
 * @candidateColor = couleur du fond où est affiché le nom, prénom du candidat 
 * @backgroundColor = la couleur du fond habituellement noir
 * @returne un render () HTML 
 **************************************************************************************/
const TpiDisplay = ({ timeSlots, primaryColor, candidateColor, backgroundColor }) => {

  // Applique les couleurs 
  const customStyles = {
    '--primary-color': primaryColor,
    '--candidate-color': candidateColor,
    '--content-color': backgroundColor,
  };

  //Variable d'état representant le nombre de salles à l'écran
  const [roomCount, setRoomCount] = useState(0);

  const createNewListTpiCards = (nbTimeSlots,nbRooms) => {
  
    let listTpiCards = [];
    let roomListTpiCards = [];
    for (let pos = 0; pos < nbTimeSlots; pos++) {
      roomListTpiCards[pos] = CreateTpi((nbRooms * 8) + pos);
    }
    listTpiCards.push(roomListTpiCards);
    
    return listTpiCards;
  };

  const [tpiCards, setTpiCards] = useState(createNewListTpiCards(timeSlots.length,roomCount));
  console.log("tpiCards ", tpiCards);

  // Formatage de l'heure affichée
  const displayTime = (time) => {
    return time.slice(0, 5);
  };

  // Formatage de la date affichée
  const capitalize = (str) => {
    const firstSpaceIndex = str.indexOf(' ');

    if (firstSpaceIndex !== -1) {
      str = str.replace(' ', ', le ');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateTpiData = (roomIndex, timeSlotIndex, updatedTpi) => {
    const updatedTpiCards = [...tpiCards];
    updatedTpiCards[roomIndex][timeSlotIndex] = updatedTpi;
    setTpiCards(updatedTpiCards);
  };

  /* Ajout d'une salle avec ses créneaux horaires */
  const handleAddRoom = () => {
    
    let newRoom = roomCount +1;
    setRoomCount(newRoom);

    // Créez les nouveaux tpiCards pour l'affichage
    const newTpiCards = createNewListTpiCards(timeSlots.length,newRoom)[0];
    
    // Faites une copie du tableau existant de tpiCards
    const copyTpiCards = [...tpiCards];
    
    // Ajoutez les nouveaux tpiCards à la copie du tableau existant
    copyTpiCards.push(newTpiCards);
  
    // Mettez à jour le state avec la copie modifiée du tableau tpiCards
    setTpiCards(copyTpiCards);
  
    console.log("Ajout d'une salle :", copyTpiCards);
  };
  

  
  // Sauvegard des tpis (position tpislod ===> en lien avec l'id tpi ?)
  // Solution simple, comme tous les fragments doivent possèder un id unique 
  // nous pouvons donc l'utiliser afin d'associer au moment de la sauvegarde à l'id du tpi 

  // ou encore plus simple mémoriser chaque salle dans un JSON ?
  // ce qui vient à simplement convertir la variable d'état en sauvegarde ... puis la charger 
  const handleSaveRoom = () => {

    console.log("Sauvegarder en cours ... ");

    


  };

  const handleDragOver = (tpi) => {
 
    console.log('Drag over event occurred. ', tpi);
    // Ajoutez ici votre logique personnalisée pour le survol (drag over)
  };

  const handleDropOver = (event) => {
    event.preventDefault();
    console.log('Drop over event occurred.');
    // Ajoutez ici votre logique personnalisée pour le dépôt (drop over)
  };

  const handleDrop = (event, targetRoomIndex, targetTimeSlotIndex) => {
    event.preventDefault();
  
    // TpiCard déplacée (les coordonnées suffisent ?)
    const getData = JSON.parse(event.dataTransfer.getData('text/plain'));
  
    const draggedTpiCard = tpiCards[getData.indexRoom][getData.indexTimeSlot]; 
    const droppedTpiCard = tpiCards[targetRoomIndex][targetTimeSlotIndex];
  
    // Échanger les TpiCards
    tpiCards[targetRoomIndex][targetTimeSlotIndex] = draggedTpiCard;
    tpiCards[getData.indexRoom][getData.indexTimeSlot] = droppedTpiCard;
  
    // Mettre à jour les TpiCards
    setTpiCards([...tpiCards]);
  };
  

  const handleDrag = (event) => {
    console.log('Drag event occurred. ',event);
    // Ajoutez ici votre logique pour gérer l'événement de glissement (drag)
  };

  // Render HTML
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {console.log("Render tpiDisplay")}
        <table className="content-table">
          <tbody>
            <tr>{Array.from({ length: roomCount }).map((_, roomIndex) => (
              <td className="content" style={customStyles} key={roomIndex}>
                <div className="date">
                  {capitalize(
                    format(new Date("2023-06-17"), 'EEEE d MMMM', { locale: frLocale, })
                  )}
                </div>
                <div className="timeSlots">
                  <div className="whiteRoom" />
                  <div className="room">A23</div>
                  {timeSlots.map((timeSlot, timeSlotIndex) => {
                    return (
                      <React.Fragment key={(roomIndex * 8) + timeSlotIndex} >
                        <div className="schedule">
                          <div className="start">{displayTime(timeSlot.start)}</div>
                          <div className="end">{displayTime(timeSlot.end)}</div>
                        </div>

                        <div className="zone2"></div>
                        {/********  Emplacement des données du tpi **********/}

                        <div  className="TpiSlot" onDrop={event => handleDrop(event, roomIndex, timeSlotIndex)} onDragOver={handleDragOver} >
                          <TpiCard
                            propsTpi={tpiCards[roomIndex][timeSlotIndex]}
                            indexRoom={roomIndex}
                            indexTimeSlot={timeSlotIndex}
                            onDragStart={handleDrag}
                            onDragEnd={handleDrag}
                            updateTpiData={updateTpiData}
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


// let tpiDataList = [];

// const CreateNewTpiData = (nbRooms, nbTimeSlots) => {

//   let tpiDataRoom = [];
//   for (let timeSlot = 0; timeSlot < nbTimeSlots; timeSlot++) {
//     tpiDataRoom[timeSlot] = CreateTpi(0);
//   }
//   tpiDataList[nbRooms] = tpiDataRoom;

//   return tpiDataList;

// };