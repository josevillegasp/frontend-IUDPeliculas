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
    <div className="container-fluid px-2 px-md-4 py-2 bg-white rounded shadow-sm d-flex flex-column align-items-center">
      {/* Encabezado con título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-3 w-100" style={{ maxWidth: "900px" }}>
        <h2 className="mb-3 fs-2 text-center text-md-start">Lista de Directores</h2>
        {openModal ? (
          <DirectorNew handleOpenModal={handleOpenModal} listDirectores={listDirectores} />
        ) : (
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i> Nuevo Director
          </button>
        )}
      </div>
  
      {/* Contenedor de la tabla responsiva */}
      <div className="table-responsive shadow rounded border bg-white p-2 p-md-4 w-100" style={{ maxWidth: "900px" }}>
        <table className="table align-middle table-hover text-start w-100">
          <thead className="bg-light text-dark fw-bold">
            <tr>
              <th className="py-2 py-md-3 fs-8 fs-md-6">Nombre</th>
              <th className="py-2 py-md-3 fs-8 fs-md-6">Estado</th>
              <th className="py-2 py-md-3 text-center fs-8 fs-md-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {directores.map((director) => (
              <tr key={director._id} className="border-bottom">
                <td className="py-2 py-md-3 text-dark fs-8 fs-md-6">{director.nombre}</td>
                <td className="py-2 py-md-3">
                  <span className={`badge rounded-pill px-2 py-1 px-md-3 py-md-2 ${director.estado === 'activo' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                    {director.estado}
                  </span>
                </td>
                <td className="py-2 py-md-3">
                  <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                    <button
                      className="btn btn-warning btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-2 py-1 px-md-3 py-md-2"
                      onClick={() => handleOpenEditModal(director)}
                    >
                      <i className="fa-solid fa-pen"></i> Editar
                    </button>
                    <DirectorDelete directorId={director._id} onDeleteSuccess={listDirectores} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
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