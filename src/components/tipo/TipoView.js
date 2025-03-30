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
    <div className="container-fluid px-2 px-md-4 py-2 bg-white rounded shadow-sm d-flex flex-column align-items-center">
      {/* Encabezado con título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-3 w-100" style={{ maxWidth: "900px" }}>
        <h2 className="mb-3 fs-2 text-center text-md-start">Lista de Tipos</h2>
        {openModal ? (
          <TipoNew handleOpenModal={handleOpenModal} listTipos={listTipos} />
        ) : (
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i> Nuevo Tipo
          </button>
        )}
      </div>
  
      {/* Contenedor de la tabla responsiva */}
      <div className="table-responsive shadow rounded border bg-white p-2 p-md-4 w-100" style={{ maxWidth: "900px" }}>
        <table className="table align-middle table-hover text-start w-100">
          <thead className="bg-light text-dark fw-bold">
            <tr>
              <th className="py-2 py-md-3 fs-8 fs-md-6">Nombre</th>
              <th className="py-2 py-md-3 fs-8 fs-md-6">Descripción</th>
              <th className="py-2 py-md-3 text-center fs-8 fs-md-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo._id} className="border-bottom">
                <td className="py-2 py-md-3 text-dark fs-8 fs-md-6">{tipo.nombre}</td>
                <td className="py-2 py-md-3 text-muted fs-8 fs-md-6">{tipo.descripcion}</td>
                <td className="py-2 py-md-3">
                  <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                    <button
                        className="btn btn-warning btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-2 py-1 px-md-3 py-md-2"
                        onClick={() => handleOpenEditModal(tipo)}
                      >
                        <i className="fa-solid fa-pen"></i> Editar
                      </button>
                      <TipoDelete tipoId={tipo._id} onDeleteSuccess={listTipos} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {openEditModal && (
        <TipoUpdate
          tipoId={selectedTipo._id}
          handleOpenModal={() => setOpenEditModal(false)}
          listTipos={listTipos}
        />
      )}
    </div>
  );
  
  
};