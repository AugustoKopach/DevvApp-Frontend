import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiTP from '../../api/apiTP';
import { PersonaDTO } from '../../tipos/Persona';
import  './verPersona.css';

const VerPersona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [persona, setPersona] = useState<PersonaDTO | null>(null);

  useEffect(() => {
    if (id) {
      apiTP.get<PersonaDTO>(`/persona/${id}`)
        .then((res) => {
          setPersona(res.data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos de la persona:', error);
          alert('No se pudo cargar la información de la persona.');
        });
    }
  }, [id]);

  if (!persona) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="ver-persona">
      <h2>{persona.nombre} {persona.apellido}</h2>
      <p><strong>DNI:</strong> {persona.dni}</p>
      <p><strong>Fecha de Nacimiento:</strong> {persona.fechaNacimiento}</p>
      <p><strong>Género:</strong> {persona.genero}</p>
      <p><strong>Donante de Órganos:</strong> {persona.donanteOrganos ? 'Sí' : 'No'}</p>

      <h3>Autos</h3>
      <button onClick={() => navigate(`/personas/${persona.id}/autos/nuevo`)}>Agregar nuevo</button>

      <table>
        <thead>
          <tr>
            <th>Patente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persona.autos.map((auto) => (
            <tr key={auto.patente}>
              <td>{auto.patente}</td>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>
                <button onClick={() => navigate(`/autos/ver/${auto.patente}`)}>Ver</button>
                <button onClick={() => navigate(`/autos/editar/${auto.patente}`)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="acciones">
        <button onClick={() => navigate(`/editarPersona/${persona.id}`)}>Editar</button>
      </div>
    </div>
  );
};

export default VerPersona;
