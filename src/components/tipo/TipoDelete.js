import React from 'react';
import { deleteTipos } from '../../service/tipoService'; // Importar la función de eliminación

export const TipoDelete = ({ tipoId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este tipo?')) {
      try {
        await deleteTipos(tipoId); // Llama a la función de eliminación
        onDeleteSuccess(); // Notifica al componente padre que la eliminación fue exitosa
      } catch (error) {
        console.error('Error eliminando tipo:', error);
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