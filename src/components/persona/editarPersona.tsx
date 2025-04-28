import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiTP from "../../api/apiTP";
import { PersonaDTO } from "../../tipos/Persona";
import FormularioPersona from "./formularioPersona";

const EditarPersona: React.FC = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState<PersonaDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerPersona = async () => {
      if (!id) return;

      try {
        const response = await apiTP.get<PersonaDTO>(`/persona/${id}`);
        setPersona(response.data);
      } catch (err) {
        setError("Error al obtener los datos de la persona.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    obtenerPersona();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona) return;

    try {
      await apiTP.put(`/persona/${id}`, persona);
      alert("Persona actualizada con éxito");
    } catch (err) {
      alert("Error al actualizar persona");
      console.error(err);
    }
  };

  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (!persona) return;

    setPersona((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="editar-persona-container">
      <h2>Editar Persona</h2>
      <FormularioPersona
        persona={persona}
        setPersona={setPersona}
        handleSubmit={handleSubmit}
        handlePersonaChange={handlePersonaChange}
        handleAutoChange={() => {}}
        agregarAuto={() => {}}
        eliminarAuto={() => {}}
      />
    </div>
  );
};

export default EditarPersona;
