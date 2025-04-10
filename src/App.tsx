import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/home';
import PersonasList from './components/ListaPersonas/listaPersonas';
import AutosList from './components/listaAutos/listaAutos';
import AgregarAuto from './components/agregarAuto/agregarAuto';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personas" element={<PersonasList />} />
        <Route path="/autos" element={<AutosList />} />
        <Route path='/agregarAuto' element={<AgregarAuto/> } />
      </Routes>
    </Router>
  );
};

export default App;