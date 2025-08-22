import { useState } from "react";
import { useForm } from "react-hook-form";

export function FormularioAlumno({ onStudentAdded, api }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleAddStudent = async (data) => {
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      console.log("Sending data to backend:", data);
      await api.post("/", data);
      setMessage("Alumno agregado exitosamente!");
      reset();
      onStudentAdded();
    } catch (error) {
      console.error("Error al agregar alumno:", error);
      setMessage(
        "Error al agregar el alumno. Por favor, verifica tu conexión o los datos."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Alumno</h2>
      <form onSubmit={handleSubmit(handleAddStudent)}>
        <section>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del alumno"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              maxLength: {
                value: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                message: "El nombre solo puede contener letras y espacios",
              },
            })}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}
          
          <label htmlFor="edad">Edad</label>
          <input
            id="edad"
            type="number"
            placeholder="Edad del alumno"
            {...register("edad", {
              required: "La edad es obligatoria",
              min: { value: 6, message: "La edad debe ser mayor a 5" },
              max: { value: 99, message: "La edad debe ser menor a 100" },
              validate: (value) => {
                if (!/^\d+$/.test(value)) {
                  return "La edad solo puede contener números";
                }
                return true;
              },
            })}
          />
          {errors.edad && <p>{errors.edad.message}</p>}

          <label htmlFor="grupo">Grupo</label>
          <input
            id="grupo"
            type="text"
            placeholder="Grupo del alumno (ej. 1A, B2)"
            {...register("grupo", {
              required: "El grupo es obligatorio",
              maxLength: {
                value: 4,
                message: "El grupo no puede tener más de 4 caracteres",
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "El grupo solo puede contener letras y números",
              },
            })}
          />
          {errors.grupo && <p>{errors.grupo.message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Alumno"}
          </button>
        </section>
      </form>
      {message && (
        <p
          className={`mt-5 text-center font-medium ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

