import React from 'react';
import { deleteProductoras } from '../../service/productoraService'; // Importar la función de eliminación

export const ProductoraDelete = ({ productoraId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta productora?')) {
      try {
        await deleteProductoras(productoraId); // Llama a la función de eliminación
        onDeleteSuccess(); // Notifica al componente padre que la eliminación fue exitosa
      } catch (error) {
        console.error('Error eliminando productora:', error);
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