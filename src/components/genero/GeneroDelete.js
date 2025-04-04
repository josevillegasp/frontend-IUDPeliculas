import React from 'react';
import { deleteGeneros } from '../../service/generoService'; // Importar la función de eliminación

export const GeneroDelete = ({ generoId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este género?')) {
      try {
        await deleteGeneros(generoId); // Llama a la función de eliminación
        onDeleteSuccess(); // Notifica al componente padre que la eliminación fue exitosa
      } catch (error) {
        console.error('Error eliminando género:', error);
      }
    }
  };

  return (
    <button
    className="btn btn-danger btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-2 py-1"
    onClick={handleDelete}
 >
    <i className="fa-solid fa-trash"></i> Eliminar
    </button>
  );
};