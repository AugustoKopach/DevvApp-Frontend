import React, { useState } from "react";
import apiTP from "../../api/apiTP";
import { Genero } from "../../tipos/Persona";
import type { PersonaDTO } from "../../tipos/Persona";
import FormularioPersona from "./formularioPersona";

const CrearPersona: React.FC = () => {
  const [persona, setPersona] = useState<PersonaDTO | null>({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    genero: Genero.Masculino,
    donanteOrganos: false,
    autos: [
      {
        marca: "",
        modelo: "",
        anio: new Date().getFullYear(),
        patente: "",
        color: "",
        numeroChasis: "",
        numeroMotor: "",
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona) return;
    try {
      await apiTP.post("/persona", persona);
      alert("Persona creada con éxito");
    } catch (error) {
      alert("Error al crear persona");
      console.error(error);
    }
  };

  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (persona) {
      const { name, type, value, checked } = e.target as HTMLInputElement;
      if (type === "checkbox") {
        setPersona((prevPersona) => {
          if (prevPersona) {
            return { ...prevPersona, [name]: checked };
          }
          return null;
        });
      } else {
        setPersona((prevPersona) => {
          if (prevPersona) {
            return { ...prevPersona, [name]: value };
          }
          return null;
        });
      }
    }
  };

  const handleAutoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setPersona((prevPersona) => {
      if (prevPersona) {
        const updatedAutos = [...prevPersona.autos];
        updatedAutos[index] = { ...updatedAutos[index], [name]: value };
        return { ...prevPersona, autos: updatedAutos };
      }
      return null;
    });
  };

  const agregarAuto = () => {
    setPersona((prevPersona) => {
      if (prevPersona) {
        return {
          ...prevPersona,
          autos: [
            ...prevPersona.autos,
            {
              marca: "",
              modelo: "",
              anio: new Date().getFullYear(),
              patente: "",
              color: "",
              numeroChasis: "",
              numeroMotor: "",
            },
          ],
        };
      }
      return null;
    });
  };

  const eliminarAuto = (index: number) => {
    setPersona((prevPersona) => {
      if (prevPersona) {
        const updatedAutos = prevPersona.autos.filter((_, i) => i !== index);
        return { ...prevPersona, autos: updatedAutos };
      }
      return null;
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Crear Persona</h2>
      <FormularioPersona
        persona={persona}
        setPersona={setPersona}
        handleSubmit={handleSubmit}
        handlePersonaChange={handlePersonaChange}
        handleAutoChange={handleAutoChange}
        agregarAuto={agregarAuto}
        eliminarAuto={eliminarAuto}
      />
    </div>
  );
};

export default CrearPersona;
