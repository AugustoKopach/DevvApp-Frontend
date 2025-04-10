import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';
import { useNavigate } from 'react-router-dom';



type Auto = {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  patente: string;
};

const AutosList: React.FC = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiTP.get<Auto[]>('/autos').then((res) => {
      setAutos(res.data);
    });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Autos</h2>
      <button onClick={() => navigate('/agregarAuto')} style={{ margin: '1rem' }}>
        agregarAuto
      </button>
      <ul>
        {autos.map((auto) => (
          <li key={auto.id}>
            {auto.marca} {auto.modelo} ({auto.año}) - Patente: {auto.patente}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutosList;
