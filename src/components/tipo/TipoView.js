import React, { useState, useEffect } from 'react';
import { getTipos } from '../../service/tipoService';
import { TipoNew } from './TipoNew';
import { TipoUpdate } from './TipoUpdate';
import { TipoDelete } from './TipoDelete'; // Importar el componente TipoDelete

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // Estado para el modal de edición
  const [selectedTipo, setSelectedTipo] = useState(null); // Estado para el tipo seleccionado

  // Obtener la lista de tipos
  const listTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listTipos();
  }, []);

  // Manejar la apertura y cierre del modal de nuevo tipo
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Manejar la apertura y cierre del modal de edición
  const handleOpenEditModal = (tipo) => {
    setSelectedTipo(tipo); // Establecer el tipo seleccionado
    setOpenEditModal(!openEditModal); // Abrir el modal de edición
  };

  return (
    <div className="container-fluid">
      <h2>Lista de Tipos</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo._id}>
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td>
              <button
               className="btn btn-warning btn-sm"
               style={{ width: '120px' }} // Mismo ancho fijo de 120px
                onClick={() => handleOpenEditModal(tipo)}
>
                <i className="fa-solid fa-pen"></i> Editar
                 </button>
                <TipoDelete
                  tipoId={tipo._id}
                  onDeleteSuccess={listTipos} // Pasar la función para actualizar la lista
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para abrir el modal de nuevo tipo */}
      {openModal ? (
        <TipoNew
          handleOpenModal={handleOpenModal}
          listTipos={listTipos}
        />
      ) : (
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Nuevo Tipo
        </button>
      )}

      {/* Modal de edición */}
      {openEditModal && (
        <TipoUpdate
          tipoId={selectedTipo._id} // Pasar el ID del tipo seleccionado
          handleOpenModal={() => setOpenEditModal(false)} // Cerrar el modal de edición
          listTipos={listTipos}
        />
      )}
    </div>
  );
};