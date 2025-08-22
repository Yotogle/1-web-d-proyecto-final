import { useEffect, useState, useCallback } from 'react';

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '1.5rem', maxWidth: '24rem', width: '100%'
      }}>
        <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1.5rem', textAlign: 'center' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={onConfirm}
            style={{
              padding: '0.625rem 1.25rem', backgroundColor: '#dc2626', color: 'white',
              borderRadius: '0.375rem', border: 'none', cursor: 'pointer'
            }}
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: '0.625rem 1.25rem', backgroundColor: '#d1d5db', color: '#1f2937',
              borderRadius: '0.375rem', border: 'none', cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function ListaAlumnos({ refreshTrigger, onStudentDeleted, api }) {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);

  const fetchAlumnos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching alumnos from:', api.defaults.baseURL + '/');
      const res = await api.get("/");
      setAlumnos(res.data);
    } catch (err) {
      console.error('Error al obtener alumnos:', err);
      setError('Error al cargar la lista de alumnos. Esto puede deberse a que el servidor backend no está corriendo, o la URL configurada es incorrecta. Por favor, asegúrate de que tu backend esté ejecutándose en http://localhost:3000/api/alumnos y que la ruta principal esté disponible.');
      setAlumnos([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (api) {
      fetchAlumnos();
    }
  }, [fetchAlumnos, refreshTrigger, api]);

  const handleDeleteClick = (alumno) => {
    setAlumnoToDelete(alumno);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    if (!alumnoToDelete) return;

    try {
      await api.delete(`/${alumnoToDelete._id}`);
      onStudentDeleted();
    } catch (err) {
      console.error('Error al eliminar alumno:', err);
      setError('Hubo un error al eliminar el alumno. Inténtalo de nuevo.');
    } finally {
      setAlumnoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setAlumnoToDelete(null);
  };

  const handleEdit = (alumno) => {
    alert(`Funcionalidad de edición para: ${alumno.nombre} (ID: ${alumno._id}). ¡Implementa tu lógica aquí!`);
  };

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p>{error}</p>;
  if (alumnos.length === 0) return <p>No hay alumnos registrados. ¡Usa el formulario de arriba para agregar uno!</p>;

  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno._id}>
            <div>
              <p>
                {alumno.nombre}
              </p>
              <p>
                Grupo: {alumno.grupo} | Edad: {alumno.edad}
              </p>
            </div>
            <div>
              <button onClick={() => handleEdit(alumno)}>
                Editar
              </button>
              <button onClick={() => handleDeleteClick(alumno)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && alumnoToDelete && (
        <ConfirmationModal
          message={`¿Estás seguro de que quieres eliminar al alumno ${alumnoToDelete.nombre}? Esta acción es irreversible.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default ListaAlumnos;
