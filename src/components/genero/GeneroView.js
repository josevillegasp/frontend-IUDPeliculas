import React, { useState, useEffect } from 'react';
import { getGeneros } from '../../service/generoService';
import { GeneroNew } from './GeneroNew';
import { GeneroUpdate } from './GeneroUpdate';
import { GeneroDelete } from './GeneroDelete'; // Importar el componente GeneroDelete

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // Estado para el modal de edición
  const [selectedGenero, setSelectedGenero] = useState(null); // Estado para el género seleccionado

  // Obtener la lista de géneros
  const listGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listGeneros();
  }, []);

  // Manejar la apertura y cierre del modal de nuevo género
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Manejar la apertura y cierre del modal de edición
  const handleOpenEditModal = (genero) => {
    setSelectedGenero(genero); // Establecer el género seleccionado
    setOpenEditModal(!openEditModal); // Abrir el modal de edición
  };

  return (
    <div className="container-fluid">
      <h2>Lista de Géneros</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>
              <td>
              <button
               className="btn btn-warning btn-sm"
               style={{ width: '120px' }} // Mismo ancho fijo de 120px
                onClick={() => handleOpenEditModal(genero)}
>
                <i className="fa-solid fa-pen"></i> Editar
                 </button>
                <GeneroDelete
                  generoId={genero._id}
                  onDeleteSuccess={listGeneros} // Pasar la función para actualizar la lista
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para abrir el modal de nuevo género */}
      {openModal ? (
        <GeneroNew
          handleOpenModal={handleOpenModal}
          listGeneros={listGeneros}
        />
      ) : (
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Nuevo Género
        </button>
      )}

      {/* Modal de edición */}
      {openEditModal && (
        <GeneroUpdate
          generoId={selectedGenero._id} // Pasar el ID del género seleccionado
          handleOpenModal={() => setOpenEditModal(false)} // Cerrar el modal de edición
          listGeneros={listGeneros}
        />
      )}
    </div>
  );
};