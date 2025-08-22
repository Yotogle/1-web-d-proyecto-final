import { useState, useCallback } from 'react';
import { FormularioAlumno } from './Components/FormularioAlumno';
import ListaAlumnos from './Components/ListaAlumnos';
import { api } from './assets/services/api';

export default function App() {

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <>
      <h1>Sistema de Gestión de Alumnos</h1>
      <FormularioAlumno onStudentAdded={handleRefresh} api={api} />
      <ListaAlumnos refreshTrigger={refreshTrigger} onStudentDeleted={handleRefresh} api={api} />
    </>
  );
}
