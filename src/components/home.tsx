import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Inicio</h1>
      <button onClick={() => navigate('/personas')} style={{ margin: '1rem' }}>
        Personas
      </button>
      <button onClick={() => navigate('/autos')} style={{ margin: '1rem' }}>
        Autos
      </button>
    </div>
  );
};

export default Home;