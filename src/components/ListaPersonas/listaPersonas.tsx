import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';

type PersonaResumen = {
  id: string;
  nombre: string;
  apellido: string;
};

const PersonasList: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaResumen[]>([]);

  useEffect(() => {
    apiTP.get<PersonaResumen[]>('/personas').then((res) => {
      setPersonas(res.data);
    });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Personas</h2>
      <ul>
        {personas.map((p) => (
          <li key={p.id}>{p.nombre} {p.apellido}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonasList;
