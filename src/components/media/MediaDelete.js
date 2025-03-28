import React from 'react';
import { deleteMedias } from '../../service/mediaService'; // Importar la función de eliminación

export const MediaDelete = ({ mediaId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este media?')) {
      try {
        await deleteMedias(mediaId); // Llama a la función de eliminación
        onDeleteSuccess(); // Notifica al componente padre que la eliminación fue exitosa
      } catch (error) {
        console.error('Error eliminando media:', error);
      }
    }
  };

  return (
    <button
    className="btn btn-danger btn-sm btn-fixed-width"
    onClick={handleDelete}
 >
    <i className="fa-solid fa-trash"></i> Eliminar
    </button>
  );
};