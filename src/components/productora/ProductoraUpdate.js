import React, { useState, useEffect } from 'react';
import { updateProductoras, getProductoraById } from '../../service/productoraService';
import Swal from 'sweetalert2';

export const ProductoraUpdate = ({ productoraId, handleOpenModal, listProductoras }) => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    estado: '',
    slogan: '',
    descripcion: '',
  });

  // Obtener los datos de la productora por su ID
  useEffect(() => {
    const fetchProductora = async () => {
      try {
        const { data } = await getProductoraById(productoraId);
        setValoresForm(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductora();
  }, [productoraId]);

  // Manejar cambios en los campos del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejar el envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (
      !valoresForm.nombre ||
      !valoresForm.estado ||
      !valoresForm.slogan ||
      !valoresForm.descripcion
    ) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      // Mostrar mensaje de carga
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      // Actualizar la productora
      await updateProductoras(productoraId, valoresForm);

      // Cerrar el modal y actualizar la lista de productoras
      handleOpenModal();
      listProductoras();

      // Cerrar el mensaje de carga
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'No se pudo actualizar la productora', 'error');
    }
  };

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Editar Productora</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={valoresForm.nombre}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={valoresForm.estado}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Slogan</label>
                <input
                  type="text"
                  name="slogan"
                  value={valoresForm.slogan}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={valoresForm.descripcion}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Guardar Cambios</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};