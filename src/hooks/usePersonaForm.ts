import { useState } from "react";
import { PersonaDTO} from "../tipos/Persona";
import { Auto } from "../tipos/Auto";

export const usePersonaForm = (personaInicial: PersonaDTO) => {
  const [persona, setPersona] = useState<PersonaDTO>(personaInicial);

  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : target.value;

    const name = target.name;

    setPersona((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const nuevosAutos = [...persona.autos];
    nuevosAutos[index] = {
      ...nuevosAutos[index],
      [name]: value,
    };

    setPersona((prev) => ({
      ...prev,
      autos: nuevosAutos,
    }));
  };

  const agregarAuto = () => {
    const nuevoAuto: Auto = {
      marca: "",
      modelo: "",
      anio: new Date().getFullYear(),
      patente: "",
      color: "",
      numeroChasis: "",
      numeroMotor: "",
    };

    setPersona((prev) => ({
      ...prev,
      autos: [...prev.autos, nuevoAuto],
    }));
  };

  const eliminarAuto = (index: number) => {
    const nuevosAutos = [...persona.autos];
    nuevosAutos.splice(index, 1);

    setPersona((prev) => ({
      ...prev,
      autos: nuevosAutos,
    }));
  };

  return {
    persona,
    setPersona,
    handlePersonaChange,
    handleAutoChange,
    agregarAuto,
    eliminarAuto,
  };
};
