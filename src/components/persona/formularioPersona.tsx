import React from "react";
import { Genero } from "../../tipos/Persona";
import type { PersonaDTO } from "../../tipos/Persona";
import "./FormularioPersona.css";

interface FormularioPersonaProps {
  persona: PersonaDTO | null;
  setPersona: React.Dispatch<React.SetStateAction<PersonaDTO | null>>;
  handleSubmit: (e: React.FormEvent) => void;
  handlePersonaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAutoChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  agregarAuto: () => void;
  eliminarAuto: (index: number) => void;
}

const FormularioPersona: React.FC<FormularioPersonaProps> = ({
  persona,
  handleSubmit,
  handlePersonaChange,
  handleAutoChange,
  agregarAuto,
  eliminarAuto,
}) => {
  if (!persona) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="formulario-persona">
      <input
        name="nombre"
        placeholder="Nombre"
        value={persona.nombre}
        onChange={handlePersonaChange}
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={persona.apellido}
        onChange={handlePersonaChange}
      />
      <input
        name="dni"
        placeholder="DNI"
        value={persona.dni}
        onChange={handlePersonaChange}
      />
      <input
        name="fechaNacimiento"
        type="date"
        value={persona.fechaNacimiento}
        onChange={handlePersonaChange}
      />
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
        Donante de órganos
      </label>

      <h3>Autos</h3>
      {persona.autos.map((auto, index) => (
        <div key={index} className="auto-card">
          <input
            name="marca"
            placeholder="Marca"
            value={auto.marca}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="modelo"
            placeholder="Modelo"
            value={auto.modelo}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="anio"
            type="number"
            placeholder="Año"
            value={auto.anio}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="patente"
            placeholder="Patente"
            value={auto.patente}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="color"
            placeholder="Color"
            value={auto.color}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="numeroChasis"
            placeholder="Número chasis"
            value={auto.numeroChasis}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <input
            name="numeroMotor"
            placeholder="Número motor"
            value={auto.numeroMotor}
            onChange={(e) => handleAutoChange(e, index)}
          />
          <button
            type="button"
            className="botones-autos botones-eliminar"
            onClick={() => eliminarAuto(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" className="botones-autos" onClick={agregarAuto}>
        Agregar auto
      </button>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioPersona;
