import React from 'react';
import { deleteDirectores } from '../../service/directorService'; // Importar la función de eliminación

export const DirectorDelete = ({ directorId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este director?')) {
      try {
        await deleteDirectores(directorId); // Llama a la función de eliminación
        onDeleteSuccess(); // Notifica al componente padre que la eliminación fue exitosa
      } catch (error) {
        console.error('Error eliminando director:', error);
      }
    }
  };

  return (
    <button
   className="btn btn-danger btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-2 py-1 px-md-3 py-md-2"
   onClick={handleDelete}
>
   <i className="fa-solid fa-trash"></i> Eliminar
   </button>
  );
};