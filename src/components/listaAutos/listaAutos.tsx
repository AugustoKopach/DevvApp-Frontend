import React, { useEffect, useState } from 'react';
import apiTP from '../../api/apiTP';
import { useNavigate } from 'react-router-dom';
import './listaAutos.css';

type AutoResumen = {
  id: string;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  duenioid: string;
};

const ListaAutos: React.FC = () => {
  const [autos, setAutos] = useState<AutoResumen[]>([]);
  const [autoAEliminar, setAutoAEliminar] = useState<AutoResumen | null>(null);
  const navigate = useNavigate();

  const cargarAutos = () => {
    apiTP.get<AutoResumen[]>('/autos').then((res) => {
      console.log(res.data);
      setAutos(res.data);
    });
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const confirmarEliminar = async () => {
    if (!autoAEliminar) return;

    try {
      await apiTP.delete(`/autos/${autoAEliminar.patente}`);
      setAutoAEliminar(null);
      cargarAutos();
    } catch (error) {
      console.error('Error al eliminar auto', error);
      alert('No se pudo eliminar el auto');
    }
  };

  const cancelarEliminar = () => {
    setAutoAEliminar(null);
  };

  const editarAuto = (patente: string) => {
    navigate(`/autos/editar/${patente}`);
  };

  const verAuto = (patente: string) => {
    navigate(`/autos/ver/${patente}`);
  };

  const verDuenio = (duenioid: string) => {
    navigate(`/verPersona/${duenioid}`);
  };

  return (
    <div className="autos__contenedor">
      <h2 className="autos__titulo">Listado de Autos</h2>

      <table className="autos__tabla">
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
          {autos.map((auto) => (
            <tr key={auto.patente}>
              <td>{auto.patente}</td>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>
                <div className="autos__acciones">
                  <button
                    className="autos__boton autos__boton--ver"
                    onClick={() => verAuto(auto.patente)}
                  >
                    Ver
                  </button>
                  <button
                    className="autos__boton autos__boton--editar"
                    onClick={() => editarAuto(auto.patente)}
                  >
                    Editar
                  </button>
                  <button
                    className="autos__boton autos__boton--eliminar"
                    onClick={() => setAutoAEliminar(auto)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="autos__boton autos__boton--ver-duenio"
                    onClick={() => verDuenio(auto.duenioid)}
                  >
                    Ver dueño
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {autoAEliminar && (
        <div className="modal">
          <div className="modal__contenido">
            <p>
              ¿Seguro que querés eliminar el auto con patente{' '}
              <strong>{autoAEliminar.patente}</strong>?
            </p>
            <div className="modal__acciones">
              <button
                className="modal__boton modal__boton--confirmar"
                onClick={confirmarEliminar}
              >
                Confirmar
              </button>
              <button
                className="modal__boton modal__boton--cancelar"
                onClick={cancelarEliminar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAutos;
