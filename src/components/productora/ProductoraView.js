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
    <div className="container-fluid">
      <h2>Lista de Productoras</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora) => (
            <tr key={productora._id}>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>
              <button
               className="btn btn-warning btn-sm"
               style={{ width: '120px' }} // Mismo ancho fijo de 120px
                onClick={() => handleOpenEditModal(productora)}
>
                <i className="fa-solid fa-pen"></i> Editar
                 </button>
                <ProductoraDelete
                  productoraId={productora._id}
                  onDeleteSuccess={listProductoras} // Pasar la función para actualizar la lista
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para abrir el modal de nueva productora */}
      {openModal ? (
        <ProductoraNew
          handleOpenModal={handleOpenModal}
          listProductoras={listProductoras}
        />
      ) : (
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Nueva Productora
        </button>
      )}

      {/* Modal de edición */}
      {openEditModal && (
        <ProductoraUpdate
          productoraId={selectedProductora._id} // Pasar el ID de la productora seleccionada
          handleOpenModal={() => setOpenEditModal(false)} // Cerrar el modal de edición
          listProductoras={listProductoras}
        />
      )}
    </div>
  );
};