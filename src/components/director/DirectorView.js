import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../service/directorService';
import { DirectorNew } from './DirectorNew';
import { DirectorUpdate } from './DirectorUpdate';
import { DirectorDelete } from './DirectorDelete'; // Importar el componente DirectorDelete

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);

  const listDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listDirectores();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenEditModal = (director) => {
    setSelectedDirector(director);
    setOpenEditModal(!openEditModal);
  };

  return (
    <div className="container-fluid">
      <h2>Lista de Directores</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director._id}>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>
              <button
               className="btn btn-warning btn-sm"
               style={{ width: '120px' }} // Mismo ancho fijo de 120px
                onClick={() => handleOpenEditModal(director)}
>
                <i className="fa-solid fa-pen"></i> Editar
                 </button>
                <DirectorDelete
                  directorId={director._id}
                  onDeleteSuccess={listDirectores} // Pasar la función para actualizar la lista
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal ? (
        <DirectorNew
          handleOpenModal={handleOpenModal}
          listDirectores={listDirectores}
        />
      ) : (
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Nuevo Director
        </button>
      )}

      {openEditModal && (
        <DirectorUpdate
          directorId={selectedDirector._id}
          handleOpenModal={() => setOpenEditModal(false)}
          listDirectores={listDirectores}
        />
      )}
    </div>
  );
}; 