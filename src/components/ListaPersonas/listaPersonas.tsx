import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';
import { useNavigate } from 'react-router-dom';
import './listaPersonas.css';

type PersonaResumen = {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
};

const ListaPersonas: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaResumen[]>([]);
  const [personaAEliminar, setPersonaAEliminar] = useState<PersonaResumen | null>(null);
  const navigate = useNavigate();

  const cargarPersonas = () => {
    apiTP.get<PersonaResumen[]>('/persona').then((res) => {
      setPersonas(res.data);
    });
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const confirmarEliminar = async () => {
    if (!personaAEliminar) return;

    try {
      await apiTP.delete(`/persona/${personaAEliminar.id}`);
      setPersonaAEliminar(null);
      cargarPersonas();
    } catch (error) {
      console.error('Error al eliminar persona', error);
      alert('No se pudo eliminar la persona');
    }
  };

  const cancelarEliminar = () => {
    setPersonaAEliminar(null);
  };

  const editarPersona = (id: string) => {
    navigate(`/editarPersona/${id}`);
  };

  const verPersona = (id: string) => {
    navigate(`/verPersona/${id}`);
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
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.dni}</td>
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
                    onClick={() => setPersonaAEliminar(p)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="personas__boton personas__boton--ver"
                    onClick={() => verPersona(p.id)}
                  >
                    Ver
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {personaAEliminar && (
        <div className="modal">
          <div className="modal__contenido">
            <p>¿Seguro que querés eliminar a <strong>{personaAEliminar.nombre} {personaAEliminar.apellido}</strong>?</p>
            <div className="modal__acciones">
              <button className="modal__boton modal__boton--confirmar" onClick={confirmarEliminar}>
                Confirmar
              </button>
              <button className="modal__boton modal__boton--cancelar" onClick={cancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPersonas;
