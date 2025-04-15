import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';
import { useNavigate } from 'react-router-dom';

type PersonaResumen = {
  id: string;
  nombre: string;
  apellido: string;
};

const PersonasList: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaResumen[]>([]);
  const navigate = useNavigate();

  const cargarPersonas = () => {
    apiTP.get<PersonaResumen[]>('/personas').then((res) => {
      setPersonas(res.data);
    });
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const eliminarPersona = async (id: string) => {
    if (!confirm('Estas seguro de eliminar esta persona?')) return;
    try {
      await apiTP.delete(`/persona/${id}`);
      cargarPersonas();
    } catch (error) {
      console.error('Error al eliminar persona', error);
      alert('No se pudo eliminar la persona');
    }
  };

  const editarPersona = (id: string) => {
    navigate(`/editarPersona/${id}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Personas</h2>
      <button onClick={() => navigate('/crearPersona')} style={{ margin: '1rem 0' }}>
        Agregar persona
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Nombre</th>
            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Apellido</th>
            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td style={{ border: '1px solid black', padding: '0.5rem' }}>{p.nombre}</td>
              <td style={{ border: '1px solid black', padding: '0.5rem' }}>{p.apellido}</td>
              <td style={{ border: '1px solid black', padding: '0.5rem' }}>
                <button onClick={() => editarPersona(p.id)} style={{ marginRight: '0.5rem' }}>Editar</button>
                <button onClick={() => eliminarPersona(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonasList;
