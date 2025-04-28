import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';
import { useNavigate } from 'react-router-dom';
import './listaPersonas.css';

type PersonaResumen = {
  id: string;
  nombre: string;
  apellido: string;
};

const ListaPersonas: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaResumen[]>([]);
  const navigate = useNavigate();

  const cargarPersonas = () => {
    apiTP.get<PersonaResumen[]>('/persona').then((res) => {
      setPersonas(res.data);
    });
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const eliminarPersona = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta persona?')) return;
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
    <div className="personas__contenedor">
      <h2 className="personas__titulo">Listado de Personas</h2>
      <button
        className="personas__boton-crear"
        onClick={() => navigate('/crearPersona')}
      >
        Agregar persona
      </button>

      <table className="personas__tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>
                <div className="personas__acciones">
                  <button
                    className="personas__boton personas__boton--editar"
                    onClick={() => editarPersona(p.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="personas__boton personas__boton--eliminar"
                    onClick={() => eliminarPersona(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPersonas;
