import React, { useState, useEffect } from 'react';
import { getProductoras } from '../../service/productoraService';
import { ProductoraNew } from './ProductoraNew';
import { ProductoraUpdate } from './ProductoraUpdate';
import { ProductoraDelete } from './ProductoraDelete'; // Importar el componente ProductoraDelete

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // Estado para el modal de edición
  const [selectedProductora, setSelectedProductora] = useState(null); // Estado para la productora seleccionada

  // Obtener la lista de productoras
  const listProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProductoras();
  }, []);

  // Manejar la apertura y cierre del modal de nueva productora
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Manejar la apertura y cierre del modal de edición
  const handleOpenEditModal = (productora) => {
    setSelectedProductora(productora); // Establecer la productora seleccionada
    setOpenEditModal(!openEditModal); // Abrir el modal de edición
  };

  return (
    <div className="container-fluid px-2 px-md-4 py-2 bg-white rounded shadow-sm d-flex flex-column align-items-between">
      {/* Encabezado con título y botón */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 w-100" >
        <h2 className="mb-3 fs-2 text-center text-md-start">Lista de Productoras</h2>
        {openModal ? (
          <ProductoraNew handleOpenModal={handleOpenModal} listProductoras={listProductoras} />
        ) : (
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i> Nueva Productora
          </button>
        )}
      </div>
  
      {/* Contenedor RESPONSIVO */}
      <div className="w-100 d-flex justify-content-center">
        <div className="table-responsive w-100 shadow rounded border bg-white p-2 p-md-4 overflow-x-auto">
          <table className="table align-middle table-hover text-start w-auto">
            <thead className="bg-light text-dark fw-bold">
              <tr>
                <th className="py-2 py-md-3 text-nowrap">Nombre</th>
                <th className="py-2 py-md-3 text-nowrap">Estado</th>
                <th className="py-2 py-md-3 text-nowrap">Slogan</th>
                <th className="py-2 py-md-3 text-nowrap">Descripción</th>
                <th className="py-2 py-md-3 text-center text-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productoras.map((productora) => (
                <tr key={productora._id} className="border-bottom">
                  <td className="py-2 py-md-3 text-dark text-wrap">{productora.nombre}</td>
                  <td className="py-2 py-md-3">
                    <span className={`badge rounded-pill px-2 py-1 px-md-3 py-md-2 ${productora.estado === 'activo' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                      {productora.estado}
                    </span>
                  </td>
                  <td className="py-2 py-md-3 text-muted text-wrap">{productora.slogan}</td>
                  <td className="py-2 py-md-3 text-muted text-wrap">{productora.descripcion}</td>
                  <td className="py-2 py-md-3 ">
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-warning btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill px-2 py-1 px-md-3 py-md-2"
                        onClick={() => handleOpenEditModal(productora)}
                      >
                        <i className="fa-solid fa-pen"></i> Editar
                      </button>
                      <ProductoraDelete productoraId={productora._id} onDeleteSuccess={listProductoras} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {openEditModal && (
        <ProductoraUpdate
          productoraId={selectedProductora._id}
          handleOpenModal={() => setOpenEditModal(false)}
          listProductoras={listProductoras}
        />
      )}
    </div>
  );
  
};