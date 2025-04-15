import React, { useState } from 'react';
import apiTP from '../../api/apiTP';
import { Genero } from '../../tipos/Persona';
import type { Auto } from '../../tipos/Auto';

type PersonaDTO = {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  genero: Genero;
  donanteOrganos: boolean;
  autos: Auto[];
};

const CrearPersona: React.FC = () => {
  const [persona, setPersona] = useState<PersonaDTO>({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    genero: Genero.Masculino,
    donanteOrganos: false,
    autos: [
      {
        marca: '',
        modelo: '',
        anio: new Date().getFullYear(),
        patente: '',
        color: '',
        numeroChasis: '',
        numeroMotor: ''
      }
    ]
  });

  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setPersona({ ...persona, [name]: e.target.checked });
    } else {
      setPersona({ ...persona, [name]: value });
    }
  };

  const handleAutoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const nuevosAutos = [...persona.autos];
    nuevosAutos[index] = {
      ...nuevosAutos[index],
      [name]: name === 'anio' ? Number(value) : value
    };
    setPersona({ ...persona, autos: nuevosAutos });
  };

  const agregarAuto = () => {
    setPersona({
      ...persona,
      autos: [
        ...persona.autos,
        {
          marca: '',
          modelo: '',
          anio: new Date().getFullYear(),
          patente: '',
          color: '',
          numeroChasis: '',
          numeroMotor: ''
        }
      ]
    });
  };

  const eliminarAuto = (index: number) => {
    const nuevosAutos = persona.autos.filter((_, i) => i !== index);
    setPersona({ ...persona, autos: nuevosAutos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiTP.post('/persona', persona);
      alert('Persona creada con exito');
      console.log(response.data);
    } catch (error) {
      alert('Error al crear persona');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Crear Persona</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={persona.nombre} onChange={handlePersonaChange} />
        <input name="apellido" placeholder="Apellido" value={persona.apellido} onChange={handlePersonaChange} />
        <input name="dni" placeholder="DNI" value={persona.dni} onChange={handlePersonaChange} />
        <input name="fechaNacimiento" type="date" value={persona.fechaNacimiento} onChange={handlePersonaChange} />

        <select name="genero" value={persona.genero} onChange={handlePersonaChange}>
          <option value={Genero.Masculino}>Masculino</option>
          <option value={Genero.Femenino}>Femenino</option>
          <option value={Genero.NoBinario}>No-Binario</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="donanteOrganos"
            checked={persona.donanteOrganos}
            onChange={handlePersonaChange}
          />
          Donante de organos
        </label>

        <h3>Autos</h3>
        {persona.autos.map((auto, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '1rem' }}>
            <input name="marca" placeholder="Marca" value={auto.marca} onChange={(e) => handleAutoChange(e, index)} />
            <input name="modelo" placeholder="Modelo" value={auto.modelo} onChange={(e) => handleAutoChange(e, index)} />
            <input name="anio" type="number" placeholder="Anio" value={auto.anio} onChange={(e) => handleAutoChange(e, index)} />
            <input name="patente" placeholder="Patente" value={auto.patente} onChange={(e) => handleAutoChange(e, index)} />
            <input name="color" placeholder="Color" value={auto.color} onChange={(e) => handleAutoChange(e, index)} />
            <input name="numeroChasis" placeholder="Numero chasis" value={auto.numeroChasis} onChange={(e) => handleAutoChange(e, index)} />
            <input name="numeroMotor" placeholder="Numero motor" value={auto.numeroMotor} onChange={(e) => handleAutoChange(e, index)} />
            <button type="button" onClick={() => eliminarAuto(index)}>Eliminar</button>
          </div>
        ))}

        <button type="button" onClick={agregarAuto}>
          Agregar auto
        </button>
        <br /><br />
        <button type="submit">Crear Persona</button>
      </form>
    </div>
  );
};

export default CrearPersona;
