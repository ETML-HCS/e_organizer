const mockColors = {
  primaryColor: "#4CAF50",
  candidateColor: "#2196F3",
  backgroundColor: 'black',
};

const mockTpiEnCours = {
  
  Date_soutenance_tpi: "2023-05-18",
  salle_nom: "Salle A",
  creneau_position: 4,
  candidat_prenom: "John",
  candidat_nom: "Doe",
  expert1_prenom: "Alice",
  expert1_nom: "Smith",
  expert2_prenom: "Bob",
  expert2_nom: "Johnson",
  chef_de_projet_prenom: "Charlie",
  chef_de_projet_nom: "Brown",
};

const mockCreneaux = [
  { creneau_position: 1, start: "08:00", end: "09:00" },
  { creneau_position: 2, start: "09:20", end: "10:20" },
  { creneau_position: 3, start: "10:30", end: "11:30" },
  { creneau_position: 4, start: "10:40", end: "11:40" },
  { creneau_position: 5, start: "11:50", end: "12:50" },
  { creneau_position: 6, start: "13:00", end: "14:00" },
  { creneau_position: 7, start: "14:10", end: "15:10" },
  { creneau_position: 8, start: "16:20", end: "17:20" },
];

const mockTpisDeCejour = [mockTpiEnCours]; // Ajoutez d'autres objets TPI si nécessaire

export { mockTpiEnCours, mockCreneaux, mockTpisDeCejour, mockColors };
