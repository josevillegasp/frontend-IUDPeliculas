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
    <div className="container-fluid px-2 px-md-4 py-2 bg-white rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-3 fs-2">Lista de Géneros</h2>
          {openModal ? (
            <GeneroNew handleOpenModal={handleOpenModal} listGeneros={listGeneros} />
          ) : (
            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={handleOpenModal}>
              <i className="fa-solid fa-plus"></i> Nuevo Género
            </button>
          )}
        </div>
        <div className="table-responsive shadow rounded border bg-white p-1 p-md-3 w-100">
          <table className="table align-middle table-hover text-start w-100">
            <thead className="bg-light text-dark fw-bold">
              <tr>
                <th className="py-1 py-md-3 fs-8 fs-md-6">Nombre</th>
                <th className="py-1 py-md-3 fs-8 fs-md-6">Estado</th>
                <th className="py-1 py-md-3 fs-8 fs-md-6">Descripción</th>
                <th className="py-1 py-md-3 text-center fs-8 fs-md-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {generos.map((genero) => (
                <tr key={genero._id} className="border-bottom">
                  <td className="py-1 py-md-3 text-dark fs-8 fs-md-6">{genero.nombre}</td>
                  <td className="py-1 py-md-3">
                    <span className={`badge rounded-pill px-1 py-1 px-md-3 py-md-2 ${genero.estado === 'activo' ? 'bg-success text-white' : 'bg-danger text-white'}`}>{genero.estado}</span>
                  </td>
                  <td className="py-1 py-md-3 text-muted fs-8 fs-md-6">{genero.descripcion}</td>
                  <td className="py-1 py-md-3 ">
                    <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                      <button
                          className="btn btn-warning btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-1 py-1 px-md-3 py-md-2 w-100 w-sm-auto"
                          onClick={() => handleOpenEditModal(genero)}
                        >
                          <i className="fa-solid fa-pen"></i> Editar
                        </button>
                        <GeneroDelete generoId={genero._id} onDeleteSuccess={listGeneros} />
                    </div> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {openEditModal && (
          <GeneroUpdate
            generoId={selectedGenero._id}
            handleOpenModal={() => setOpenEditModal(false)}
            listGeneros={listGeneros}
          />
        )}
    </div>
  );
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};