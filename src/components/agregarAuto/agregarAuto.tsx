import React, { useState } from 'react';
import apiTP from '../../api/apiTP';


type AutoDTO = {
  marca: string;
  modelo: string;
  año: number;
  patente: string;
  color: string;
  numeroChasis: string;
  numeroMotor: string;
};

const AgregarAuto: React.FC = () => {
  const [auto, setAuto] = useState<AutoDTO>({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    patente: '',
    color: '',
    numeroChasis: '',
    numeroMotor: ''
  });

  const [idPersona, setIdPersona] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuto({ ...auto, [name]: name === 'año' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiTP.post('/autos', { id: idPersona, auto });
      alert('Auto agregado correctamente');
    } catch (error) {
      alert('Error al agregar auto');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Agregar Auto</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID Persona"
          value={idPersona}
          onChange={(e) => setIdPersona(e.target.value)}
        />
        <input name="marca" placeholder="Marca" value={auto.marca} onChange={handleChange} />
        <input name="modelo" placeholder="Modelo" value={auto.modelo} onChange={handleChange} />
        <input name="año" type="number" placeholder="Año" value={auto.año} onChange={handleChange} />
        <input name="patente" placeholder="Patente" value={auto.patente} onChange={handleChange} />
        <input name="color" placeholder="Color" value={auto.color} onChange={handleChange} />
        <input name="numeroChasis" placeholder="Número Chasis" value={auto.numeroChasis} onChange={handleChange} />
        <input name="numeroMotor" placeholder="Número Motor" value={auto.numeroMotor} onChange={handleChange} />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarAuto;
