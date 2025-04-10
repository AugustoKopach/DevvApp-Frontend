import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';

type Auto = {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  patente: string;
};

const AutosList: React.FC = () => {
  const [autos, setAutos] = useState<Auto[]>([]);

  useEffect(() => {
    apiTP.get<Auto[]>('/autos').then((res) => {
      setAutos(res.data);
    });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Autos</h2>
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
