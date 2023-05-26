import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavigationMenu from './components/Nav';

import Accueil from './pages/HomePage';
import Eval from './pages/AssessmentPage';
import Inscription from './pages/RegistrationPage';
import TPI from './pages/TPIPage';
import GreenPayroll from './pages/GreenPayrollPage';
import Page404 from './pages/Page404';

import TpiJournalPage from './pages/tpi/JournalPage';
import TpiPlanningPage from './pages/tpi/SchedulePage';
import TpiSuiviPage from './pages/tpi/SuiviTPIPage';

import TpiDisplay from './components/TpiDisplay';
import Test from './components/test';


// pour les tests 
import { mockTpiEnCours, mockCreneaux, mockTpisDeCejour, mockColors } from "./mocks/mockDataTpiDisplay";


function App() {
  return (
    <BrowserRouter>
      <NavigationMenu />
      <main>
        <Routes>
          <Route path="*" element={<div className="page-container"><Page404 /></div>} />

          <Route path="/" element={<div className="page-container"><Accueil /></div>} />
          <Route path="/soutenances" element={<div className="page-container"><Eval /></div>} />
          <Route path="/inscription" element={<div className="page-container"><Inscription /></div>} />
          <Route path="/tpi" element={<div className="page-container"><TPI /></div>} />
          <Route path="/payroll" element={<div className="page-container"><GreenPayroll /></div>} />

          <Route path="/tpi/planning" element={<TpiPlanningPage />} />
          <Route path="/tpi/journal" element={<TpiJournalPage />} />
          <Route path="/tpi/suivi" element={<TpiSuiviPage />} />

          <Route path="/test" element={
            
            <div className="tpi-display-page-container"> <TpiDisplay timeSlots={mockCreneaux}
              primaryColor={mockColors.primaryColor} candidateColor={mockColors.candidateColor}
              backgroundColor={mockColors.backgroundColor} />
            </div>
           
            }
          />

          <Route path='/test2' element={
            <div className="page-container" >
              <Test></Test>

            </div>
          }/>

         

        </Routes>
      </main>
    </BrowserRouter>


  );
}

export default App;
