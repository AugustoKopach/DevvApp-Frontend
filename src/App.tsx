import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/home';
import PersonasList from './components/ListaPersonas/listaPersonas';
import AutosList from './components/listaAutos/listaAutos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personas" element={<PersonasList />} />
        <Route path="/autos" element={<AutosList />} />
      </Routes>
    </Router>
  );
};

export default App;